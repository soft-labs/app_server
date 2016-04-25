/**
 * Engine de aplicações - TShark.
 * Implementa gateway de APIS e funções globais.
 * @author labs
 * @since 01/01/2016
 * @param app { koa }
 * @constructor
 */
function TShark(app, no_cache){
    this.router = router;
    this.pool = {conn:{}, map: {}};
    this.app = app;
    this.no_caching_require = no_cache;
}


//region :: Includes

const router    = require('koa-router')()
    , koaBody   = require('koa-body')()
    , extend    = require('extend')
    , fs        = require('fs-extra')
    , util      = require('util')
    , jade      = require('jade')
    , reload    = require('require-reload')(require)
    , BizObject = require('tshark/biz_object.js')
    , cookies   = require('tshark/cookie.js')
    , log       = require('tshark/_log.js')
;

// endregion


//region :: Paths em objetos

/**
 * Garante a existência do path em um objeto
 * @param obj { {} } Objeto onde o path deve existir
 * @param path { [] } Array com path
 * @param final_obj { {} } Opcional - Objeto a ser criado ao fim do path 
 */
TShark.prototype.assurePath = (obj, path, final_obj) => {
    var criou = false;
    path.forEach((p) => {
        if (!obj[p]){
            criou = true; 
            obj[p] = {};
        }
        obj = obj[p];
    });
    if (criou &&final_obj) {
        extend(obj, final_obj);
    }
    return criou;
};


/**
 * Remove um path de um objeto
 * @param obj
 * @param path
 */
TShark.prototype.removePath = (obj, path) => {
    delete (obj[path[0]]);
};


/**
 * Retorna um subobjeto em base percorrendo path
 * @param base
 * @param path
 * @returns {*}
 */
TShark.prototype.getObjPath = (base, path) => {
    var obj = base;
    path.forEach((p) => {
        obj = obj[p];
    });
    return obj;
};

//endregion


//region :: FileSystem

/**
 * Verifica se um diretório existe, senão cria.
 * @param path
 * @return path
 */
TShark.prototype.assureDir = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    return path;
};

/** ???
 * Verifica e registra os paths de customização
 * @param obj
 * @param path
 */
TShark.prototype.checkCustomPaths = function(obj, path) {
    obj.paths = {
        self    : this.app.context.config.paths.default.clientes + '/' + path.join('/'),
        default : this.app.context.config.paths.default,
        views   : { filial: false, cliente: false },
        modulos : { filial: false, cliente: false },
        lib     : { filial: false, cliente: false },
        www     : { filial: false, cliente: false }
    };

    var level = 'cliente'
        , len = path.length
        , paths = ['views', 'modulos', 'lib', 'www']
    ;
    
    for (var i = 0; i < len; i++){
        var p = this.app.context.config.paths.default.clientes + '/' + path.join('/');
        paths.forEach((s) => {
            if (fs.existsSync(p + '/' + s)){
                obj.paths[s][level] = p + '/' + s;
            }
        });
        level = 'filial';
        path.unshift();
    }
};

/**
 * Retorna o path customizado ou o oficial para um dado tipo
 * @param tipo { string } 'views', 'modulos', 'lib' ou 'www'
 * @return path { string }
 */
TShark.prototype.getPathFor = function(tipo){
    var cliente = this.app.context.running[this.app.request['c_key']];
    return cliente.paths[tipo].filial  ||
           cliente.paths[tipo].cliente ||
           cliente.paths.default[tipo];
};

/**
 * Procura o arquivo pelos paths customizados e retorna o primeiro
 * que encontrar.
 * @param ctx
 * @param fname {string}
 * @param tipo {string} 'up' | 'down'
 * @returns { string || false }
 */
TShark.prototype.findInPath = function(ctx, fname, tipo){
    ctx.config.flowPaths[tipo].forEach((path) => {
        if (fs.existsSync(path + fname)){
            return path + fname;
        }
    });

    if (fs.existsSync(fname)){
        return fname;
    }
    return false;
};

//endregion


//region :: Configs

/**
 * Pega configuração de um cliente para o usuário atual
 * @returns {{}}
 */
TShark.prototype.getConfig = function(ctx, client) {
    var user_key = cookies.getLoggedUser(ctx, client);
    return this.app.context.running[user_key];
};


//endregion


//region :: Render de templates

/**
 * Renderiza um arquivo de template
 * @param templId
 * @param ctx
 * @param base
 * @returns {string}
 */
TShark.prototype.render = function *(templId, ctx, base){
    var check   = templId.split('.')
        , html  = ''
    ;

    if (!check || check.length != 2 || check[1] != 'jade'){
        templId += '.jade';
    }

    // Rastreia o template
    var templ;
    base = base || 'views';
    ctx.state.config.flowPaths.up.forEach((path) => {
        var arq = path + base + '/' + templId;
        if (!templ && fs.existsSync(arq)) {
            templ = arq;
        }
    });

    if(!templ){
        var arq = 'business_objects/' + templId;
        if (!templ && fs.existsSync(arq)) {
            templ = arq;
        }
    }

    if (templ){
        try {
            html = jade.renderFile(templ, ctx || {});
        } catch (e){
            console.error(e);
        }
    }

    // Retorna
    return html;
};

/**
 * Renderiza um string de template
 * @param template
 * @param params
 * @returns {*}
 */
TShark.prototype.renderStr = function(template, params) {
    return new Promise((resolve, reject) => {
        resolve(jade.renderFile(templ, params));
    });
};

/**
 * Recebe um template e processa o conteúdo extraindo 'row.[field]'
 * dele e retornando em um array
 * @param templ { string } Template a ser pesquisado
 * @param re { regex } Regular expression de tag (opcional, default para /row\.(\w+)/g
 * @returns {Array}
 */
TShark.prototype.parseFields = function(templ, re){
    if (!templ) return [];

    var tmp = templ.match(re || /row\.(\w+)/g)
        , fields = []
        ;

    if (tmp != null){
        fields = tmp.map(function(f){
            return f.split('.')[1];
        });
    }

    return fields;
};


//endregion


// region :: Acesso à dados

var MySql       = require('./sql/mysql')
    , SqlServer = require('./sql/sqlserver')
;

TShark.prototype.getConnection = function *(ctx, id){

    // Descobre id em config
    if (id && typeof id != 'string' && ctx.state.config['businessObjects']){
        var path = id;
        if (ctx.state.config['businessObjects'][path[0]]) {
            id = ctx.state.config['businessObjects'][path[0]]['conn'] || id;

            if (ctx.state.config['businessObjects'][path[0]][path[1]]) {
                id = ctx.state.config['businessObjects'][path[0]][path[1]]['conn'] || id;
            }
        }
    }
    if (!id){
        id = 'default';
    }

    // Parametros de conexão
    var connParams = ctx.state.config.conexoes[id];
    if (!connParams){
        console.log('Não existe configuração para a conexão "' + id + '"');
        return;
    }
    connParams['id'] = id;

    var appId = ctx.state.config.app.join('/');
    if (!this.pool[appId]){
        this.pool[appId] = {};
    }

    // Conecta
    try {
        var cacheId = id;

        // Retorna cache
        if (this.pool[appId][cacheId]) {
            return this.pool[appId][cacheId];

        // Abre conexão
        } else {

            // Instancia o driver
            var db = false;
            switch (connParams.tipo) {
                case 'mysql'    : db = MySql;       break;
                case 'sqlserver': db = SqlServer;   break;
                default:
                    console.log('Driver de dados não suportado: ' + connParams.tipo);
                    return false;
            }

            // mapeia
            this.pool[appId][cacheId] = yield new db(connParams);
            return this.pool[appId][cacheId];
                
        }
    } catch (e){
        log.erro(e);
    }
    
};


// endregion


//region :: Utils

function myextend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            if (util.isObject(source[prop]) && !util.isArray(source[prop])){
                myextend(target[prop], source[prop])
            } else {
                target[prop] = source[prop];
            }
        }
    });
    return target;
}


//endregion


/**
 * Inicializa um Objeto de negócio
 * @param path
 * @param context
 * @return { BizObject }
 */
TShark.prototype.initObj = function(path, context){
    var owner  = path[0]
        , pack = path[1]
        , bobj = path[2]
    ;

    // Business Object    
    var op = 'business_objects/'
        + owner + '/'
        + pack + '/'
        + bobj + '/'
        + bobj + '.js';
    var obj = this.no_caching_require  
        ? reload(op)
        : require(op)
    ;

    // Extende
    if (!obj['extended']) {
        util.inherits(obj, BizObject);
    }

    // Cria
    var mod = new obj(path);

    // Overwrite e customização
    context.state.config.flowPaths.down.forEach((path) => {
        var arq = path + 'modulos/' + owner + '/' + pack + '/' + bobj + '/' + bobj + '.server.js'
        try {
            if (fs.existsSync(arq)) {
                var overObj = new (require(arq))();
                myextend(mod, overObj);
            }
        } catch (e){
            console.log(e);
        }
    });

    // Vinculo ao engine
    mod.engine = this;

    // Path
    mod.path = {
        owner   : owner,
        pack    : pack,
        obj     : bobj,
        asArray : [owner, pack, bobj],
        asString: owner + '/' + pack + '/' + bobj
    };

    // Params
    mod.context = this.app.context;
    mod.state   = context.state;
    mod.params  = extend(true, context.request.query || {}, context.request.body || {});
    
    // Retorna
    return mod;
};


//region :: Roteamentos e entradas de APIs


/**
 * Registra o inicio de um roteamento
 */
router.use(function *timeLog(next) {
    console.log('Time start: ', Date.now());

    var tmp = this.captures[0].split('/').slice(3);
    this.state.api = {
        url: this.originalUrl,
        call: tmp[tmp.length-1],
        path:  tmp,
        params: extend(true, this.request.query || {}, this.request.body || {})
    };

    yield next;
});

/**
 * Validação de chamadas de API
 */
router.use(function *(next) {

    // Se pedir com educação
    if (this.state.api.path[0] == 'sys'      &&
        this.state.api.path[1] == 'app'      &&
        this.state.api.path[2] == 'security' &&
        this.state.api.path[3] == 'login'){


        yield next;

    // Senão...
    } else {
        var user_key = cookies.getLoggedUser(this);

        // You shall not pass!
        if (!user_key || !this.app.context.running[user_key]) {
            this.throw(404, 'Not Found');

        // Multipass!!
        } else {
            this.state.config = this.app.context.running[user_key];
            yield next;
        }
    }
});


/**
 * Entrada de API :: GET
 *   Oferece suporte para apis:
 *    - get  | url: owner/pack/mod                       | Lista todos os registros do mod
 *    - get  | url: owner/pack/mod?query='teste um dois' | Filtra os registros do mod por query
 *    - get  | url: owner/pack/mod/123                   | Retorna o registro id=123
 *    - get  | url: owner/pack/mod/_new                  | Retorna um form para pré inserção
 *    - get  | url: owner/pack/mod/123/edit              | Retorna um form para edição do registro id=123
 * @since 21/02/16
 */
router.get(/^\/(\w+)\/tshark\/.*$/, function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod   = this.app.engine.initObj(this.state.api.path, this)
        , len = this.state.api.path.length
    ;

    // Form de edição
    if (len == 5) {
        this.state.api.call = 'edit';
        mod.params['key'] = this.state.api.path[3];
        this.body = yield mod.form(this);

    } else {

        // Form de inserção
        if (len == 4 && this.state.api.path[3] == '_new') {
            this.state.api.call = 'create';
            mod.params['key'] = 'NEW_KEY';
            this.body = yield mod.form(this);

        // Listagem
        } else {
            this.state.api.call = (this.request.query['query']
                ? 'search'
                : len == 4 && this.state.api.path[3]
                    ? 'get'
                    : 'list'
            );
            this.body = yield mod.get(this);
        }
    }

    /**
     * Finaliza
     */
    yield next;
});

/**
 * Entrada de API :: POST
 *   Oferece suporte para apis:
 *    - insert  | url: owner/pack/mod                    | Insere um novo registro no mod
 *    - exec    | url: owner/pack/mod/getStats           | Executa uma função definida no mod
 * 11/04/16
 */
router.post(/^\/(\w+)\/tshark\/.*/, function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod   = this.app.engine.initObj(this.state.api.path, this)
        , len = this.state.api.path.length
    ;

    // Execução de função
    if (len = 4){
        var func = this.state.api.call;
        this.state.api.call = 'exec';

        /**
         * Executa a função no objeto
         */
        try {
            var res = yield mod[func](this);
            if (typeof res != 'object'){
                this.body = {
                    result: res
                };
            } else {
                this.body = res;
            }
            this.body['func'] = func;
            this.state.api.call = this.state.api.path.pop();
        } catch (e){
            console.log(e);
        }

    } else {
        this.body = yield mod.insert(this);
    }

    /**
     * Finaliza
     */
    yield next;

});

/**
 * Entrada de API :: PUT
 *   Oferece suporte para apis:
 *    - update  | url: owner/pack/mod                    | Atualiza um registro no mod
 * 25/04/16
 */
router.put(/^\/(\w+)\/tshark\/.*/, function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod   = this.app.engine.initObj(this.state.api.path, this)
        , len = this.state.api.path.length
    ;

    // Execução de função
    this.body = yield mod.update(this);

    /**
     * Finaliza
     */
    yield next;

});


/**
 * Finaliza a chamada
 * @since 31/03/16
 */
router.get(/^\/(\w+)\/tshark\/.*$/, function *(next) {
    endRoute(this);
});
router.post(/^\/(\w+)\/tshark\/.*$/, function *(next) {
    endRoute(this);
});
router.put(/^\/(\w+)\/tshark\/.*$/, function *(next) {
    endRoute(this);
});
router.delete(/^\/(\w+)\/tshark\/.*$/, function *(next) {
    endRoute(this);
});

/**
 * Registra o fim de um roteamento
 * @param ctx
 */
function endRoute(ctx){

    // Ajusta o pacote de retorno
    ctx.body = ctx.body || {};
    ctx.body['callback'] = ctx.state.api.call;
    ctx.body['path'] = ctx.state.api.path.splice(0, 3);

    // Fecha
    console.log('Time finish: ', Date.now());

}

//endregion


//region :: Controle de erros
/*
router.use(function errorLog(err, req, res, next) {
    var r = {
        status: 500,
        error: err.message,
        stack: err.stack
    };
    console.error(r);

   // if (app.get('env') !== 'development') {
   //     r.stack = '';
  //  }

    res.send(r);
});


// catch 404 and forward to error handler
router.use(function (err, req, res, next) {
    var err = new Error('TSHARK Not Found');
    err.status = 404;
    next(err);
});

*/
//endregion


// Exporta
module.exports = TShark;