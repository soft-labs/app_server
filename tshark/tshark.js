/**
 * Engine de aplicações - TShark.
 * Implementa gateway de APIS e funções globais.
 * @author labs
 * @since 01/01/2016
 * @param app { koa }
 * @constructor
 */
function TShark(app){
    this.router = router;
    this.pool = {conn:{}, map: {}};
    this.app = app;
}


//region :: Includes

const router    = require('koa-router')()
    , koaBody   = require('koa-body')()
    , extend    = require('extend')
    , fs        = require('fs-extra')
    , util      = require('util')
    , jade      = require('jade')
    , BizObject = require('tshark/biz_object.js')
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
 * @param fname {string}
 * @param tipo {string} 'views', 'modulos', 'lib' ou 'www'
 * @returns { string || false }
 */
TShark.prototype.findInPath = function(fname, tipo){
    var cliente = this.getConfig();

    if (cliente) {
        if (cliente.paths[tipo].filial && fs.existsSync(cliente.paths[tipo].filial + '/' + fname)) {
            return cliente.paths[tipo].filial + '/' + fname;
        }

        if (cliente.paths[tipo].cliente && fs.existsSync(cliente.paths[tipo].cliente + '/' + fname)) {
            return cliente.paths[tipo].cliente + '/' + fname;
        }

        if (cliente.paths.default[tipo] && fs.existsSync(cliente.paths.default[tipo] + '/' + fname)) {
            return cliente.paths.default[tipo] + '/' + fname;
        }
    }

    if (fs.existsSync(fname)){
        return fname;
    }

    return false;
};

//endregion


//region :: Configs

/**
 * Pega configuração de um cliente / filial
 * @returns {{}}
 */
TShark.prototype.getConfig = function(ctx) {
    var key = require('./cookie').getKey(ctx);
    return this.app.context.running[key];
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
    var config = this.getConfig(ctx);

    // Descobre id em config
    if (id && typeof id != 'string' && config['businessObjects']){
        var path = id;
        if (config['businessObjects'][path[0]]) {
            id = config['businessObjects'][path[0]]['conn'] || id;

            if (config['businessObjects'][path[0]][path[1]]) {
                id = config['businessObjects'][path[0]][path[1]]['conn'] || id;
            }
        }
    }
    if (!id){
        id = 'default';
    }

    // Parametros de conexão
    var connParams = config.conexoes[id];
    if (!connParams){
        console.log('Não existe configuração para a conexão "' + id + '"');
        return;
    }
    connParams['id'] = id;

    var appId = config.app.join('/');
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
            this.pool[appId][cacheId] = new db(connParams);
            return this.pool[appId][cacheId];
                
        }
    } catch (e){
        console.log(e);
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
    var obj = require('business_objects/'
        + owner + '/'
        + pack + '/'
        + bobj + '/'
        + bobj + '.js'
    );

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
 * Verificação de registro e log de chamadas API
 */
router.use(function *timeLog(next) {
    console.log('Time start: ', Date.now())

    var key = require('./cookie').getKey(this);

    // Seta o config no request para o cliente atual
    if (!key || !this.app.context.running[key]) {
        this.throw(404, 'Not Found');

    } else {
        this.state.config = this.app.context.running[key];
        yield next;
    }
});

/**
 * Registra o inicio de um roteamento
 * @param ctx
 */
router.use(function *(next) {
    var tmp = this.captures[0].split('/').slice(3);
    this.state.api = {
        url: this.originalUrl,
        path:  tmp,
        call: '',
        params: extend(true, this.request.query || {}, this.request.body || {})
    };
    
    yield next;
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
    var mod      = this.app.engine.initObj(this.state.api.path, this)
        , len    = this.state.api.path.length
    ;

    // Form de edição
    if (len == 5) {
        this.state.api.call = 'edit';
        this.body = yield mod.form();

    } else {

        // Form de inserção
        if (len == 4 && this.state.api.path[3] == '_new') {
            this.state.api.call = 'create';
            this.body = yield mod.form();

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
     * Ajusta o path da api
     */
    var func = this.state.api.call;
    this.state.api.call = this.state.api.path.pop();

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod = this.app.engine.initObj(this.state.api.path, this);

    /**
     * Executa a função no objeto
     */
    try {
        this.body = yield mod[func](this);
    } catch (e){
        console.log(e);
    }

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
    ctx.body['callback'] = ctx.state.api.call;

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