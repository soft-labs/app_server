/**
 * Engine de aplicações - TShark.
 * Implementa gateway de APIS e funções globais.
 * @author labs
 * @since 01/01/2016
 * @param app { koa }
 * @constructor
 */
function TShark(app, no_cache){

    // Roteadores registrados
    this.routers = {

        // Default
        ts_router: require('./routers/_default.js'),
        ts_comps : require('./routers/_comps.js'),

        // Especiais
        dreams   : require('./routers/dreams.js')
    };

    this.pool = {conn:{}, map: {}};
    this.app  = app;
    this.no_caching_require = no_cache;
}


//region :: Includes

const extend    = require('extend')
    , fs        = require('fs-extra')
    , util      = require('util')
    , jade      = require('jade')
    , reload    = require('require-reload')(require)
    , BizObject = require('tshark/biz_object.js')
    , cookies   = require('tshark/cookie.js')
    , log       = require('tshark/_log.js')
    , types     = require('tshark/types.js')
    , apn       = require('apn')
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
    var html = '';
    
    try {
        var check = templId.split('.');
        if (!check || check.length != 2 || check[1] != 'jade') {
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

        if (!templ) {
            var arq = 'business_objects/' + templId;
            if (!templ && fs.existsSync(arq)) {
                templ = arq;
            }
        }

        if (templ) {
            try {
                html = jade.renderFile(templ, ctx || {});
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e){
        log.erro(e);
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
    var fields = [];
    
    try {
        var tmp = templ.match(re || /row\.(\w+)/g);
        if (tmp != null) {
            fields = tmp.map(function (f) {
                return f.split('.')[1];
            });
        }
    } catch (e){
        log.erro(e);
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
            yield this.pool[appId][cacheId].checkConnection(connParams);
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
    try {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                if (util.isObject(source[prop]) && !util.isArray(source[prop])) {
                    myextend(target[prop], source[prop])
                } else {
                    target[prop] = source[prop];
                }
            }
        });
    } catch (e){
        log.erro(e);
    }
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
    var mod = false;
    
    try {
        var owner = path[0]
            , pack = path[1]
            , bobj = path[2]
            ;

        // Business Object    
        var op = 'business_objects/'
            + owner + '/'
            + pack + '/'
            + bobj + '/'
            + bobj + '.js';
        var obj = this.no_caching_require ? reload(op) : require(op);

        // Extende
        if (!obj['extended']) {
            util.inherits(obj, BizObject);
        }

        // Cria
        mod = new obj(path);

        // Extends
        mod.parent = false;
        if (mod['extends']){
            try {
                mod.parent = this.initObj(mod['extends'], context);
                mod.source.metadata = extend(true, mod.parent.source.metadata, mod.source.metadata);
                
            } catch (e){
                log.erro(e, 'InitObj:extends => ' + mod['extends']);
            }
        }

        // Overwrite e customização
        context.state.config.flowPaths.down.forEach((path) => {
            var arq = path + 'modulos/' + owner + '/' + pack + '/' + '/' + bobj + '.server.js'
            try {
                if (fs.existsSync(arq)) {
                    var overObj = new (require(arq))();
                    myextend(mod, overObj);
                }
            } catch (e) {
                console.log(e);
            }
        });

        // Vinculo ao engine
        mod.engine = this;

        // Path
        mod.path = {
            owner: owner,
            pack: pack,
            obj: bobj,
            asArray: [owner, pack, bobj],
            asString: owner + '/' + pack + '/' + bobj
        };

        // Params
        mod.context = this.app.context;
        mod.state = context.state;
        mod.params = extend(true, context.request.query || {}, context.request.body || {});
        
        // Init
        if (mod['init'] && typeof mod.init == 'function'){
            mod.init(context);
        }
        
    } catch (e){
        log.erro(e);
    }
    
    // Retorna
    return mod;
};


//region :: Funções Globais

/**
 * Salva imagem em base64
 * @param path
 * @param data
 * @returns {string|*}
 */
TShark.prototype.saveBase64Image = function(path, data) {
    try {
        var img = this.decodeBase64Image(data)
            , ext = 'png'
            ;

        switch (img.type) {
            case 'image/jpeg':
                ext = 'jpg';
                break;

            default:
                ext = 'png';
        }
        path += '.' + ext;
        fs.writeFile(path, img.data);
        return path;

    } catch (e){
        log.erro(e, 'Imagem: '+path);
    }
};

/**
 * Recompoe uma imagem base64
 * @param dataString
 * @returns {*}
 */
TShark.prototype.decodeBase64Image = function(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        , response = {}
        ;

    if (matches) {
        if (matches.length !== 3) {
            return new Error('String base64 inválida');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
    } else {
        response.type = 'image/png';
        response.data = new Buffer(dataString, 'base64');
    }

    return response;
};

//endregion



// Exporta
module.exports = TShark;