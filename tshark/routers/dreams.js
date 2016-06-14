/**
 * Engine de aplicações - TShark.
 *  Roteamentos e entradas de APIs para o Dreams com ponto
 *  de entrada 'dreams' e customização de APIs
 * @author labs
 * @since 01/01/2016
 * @constructor
 */
const router  = require('koa-router')()
    , log     = require('tshark/_log.js')
    , extend    = require('extend')
    , fs        = require('fs-extra')
    , util      = require('util')
    , cookies   = require('tshark/cookie.js')
    , reload    = require('require-reload')(require)
;

var
    // Mapa de APIs dinâmicas
    apiMap = {

        // Login
        'login'         : {mod: 'dreams/users/users',                  provider: 'login'},
        'forgotpwd'     : {mod: 'dreams/users/users',                  exec: 'forgotPwd'},

        // Usuários
        'users'         : {mod: 'dreams/users/users',                  provider: 'default'},
        'profile'       : {mod: 'dreams/users/users',                  provider: 'profile'},
        'follow'        : {mod: 'dreams/users/user_follow',            provider: 'default'},
        'followall'     : {mod: 'dreams/users/user_follow',            provider: 'default'},
        'followers'     : {mod: 'dreams/users/user_followers',         provider: 'default'},

        // Sonhos
        'dreams'        : {mod: 'dreams/dreams/dreams',                provider: 'default'},
        'mydreams'      : {mod: 'dreams/dreams/dreams',                provider: 'mydreams'},
        'feedall'       : {mod: 'dreams/dreams/dreams',                provider: 'feedall'},
        'feedfollowing' : {mod: 'dreams/dreams/dreams',                provider: 'feedfollowing'},
        'dreamtoo'      : {mod: 'dreams/users/users_dreams_rel',       provider: 'default'},
        'tocometrue'    : {mod: 'dreams/dreams/dreams',                provider: 'tocometrue'},
        'comingtrue'    : {mod: 'dreams/dreams/dreams',                provider: 'comingtrue'},
        'cametrue'      : {mod: 'dreams/dreams/dreams',                provider: 'cametrue'},

        'albuns'        : {mod: 'dreams/dreams/dream_albuns',          provider: 'default'},
        'albumcomments' : {mod: 'dreams/comments/comments_albuns_rel', provider: 'default'},
        'albumlikes'    : {mod: 'dreams/users/users_like_albuns_rel',  provider: 'default'},

        'dreamcomments' : {mod: 'dreams/comments/comments_dreams_rel', provider: 'default'},
        'dreamlikes'    : {mod: 'dreams/users/users_like_dreams_rel',  provider: 'default'},


        'denuncy'       : {mod: 'dreams/denuncy/denuncy',              provider: 'default'},
        'dreamdenuncy'  : {mod: 'dreams/denuncy/denuncy_dreams_rel',   provider: 'default'},
        'albumdenuncy'  : {mod: 'dreams/denuncy/denuncy_albuns_rel',   provider: 'default'}
    }

    // Token de segurança
    , security_token = 'b778b0aad2ceda1b1577a77ba1f295e14fce706b33d17469cf477194f76a633a'

    // Retorno de status
    , send_http_status = true
;

/**
 * Registra o inicio de um roteamento
 */
router.use(function *timeLog(next) {
    var ok      = false
        , tmp   = this.captures[0].split('/').splice(1)
        , client= ['dreams', 'mobile']
    ;

    // Token de acesso
    if (this.req.headers['x-api-auth-token']){
        ok = (this.req.headers['x-api-auth-token'] == security_token);
    }

    if (!ok){
        this.throw(401, 'Access denied');
    }

    // API
    this.state.api = {
        url: this.originalUrl,
        call: tmp[tmp.length-1],
        path:  tmp,
        params: extend(true, this.request.query || {}, this.request.body || {})
    };

    // Registra o contexto do cliente
    this.app.engine.assurePath(this.app.context.clientes, client, {
        _log: {
            _last_access    : '',
            _logged_users   : { }
        },
        app: client,
        flowPaths: {
            up: [
                global.appRoot + '/apps/dreams/mobile/',
                global.appRoot + '/apps/dreams/_common/',
                global.appRoot + '/_common/'
            ],
            down: [
                global.appRoot + '/_common/',
                global.appRoot + '/apps/dreams/_common/',
                global.appRoot + '/apps/dreams/mobile/'
            ]
        }
    });

    // Seta o config no request para o cliente atual
    this.state.config = this.app.engine.getObjPath(this.app.context.clientes, client);

    // limpa cache de config
    this.state.config.flowPaths.down.forEach((path) => {
        if (fs.existsSync(path + '/config.js')) {
            extend(true, this.state.config, reload(path + '/config.js') || {});
        }
    });

    yield next;
});

/**
 * Entrada de API :: GET
 *   Oferece suporte para apis:
 *    - get  | url: owner/pack/mod                       | Lista todos os registros do mod
 *    - get  | url: owner/pack/mod?query='teste um dois' | Filtra os registros do mod por query
 *    - get  | url: owner/pack/mod/123                   | Retorna o registro id=123
 * @since 21/02/16
 */
router.get('/mobile/dreams/*', function *(next) {
    
    /**
     * Instancia o módulo
     * @type BizObject
     */
    var api      = this.state.api.path[2]
        , map    = apiMap[api]
        , mod    = this.app.engine.initObj(map.mod.split('/'), this)
        , status = 204 // Nenhum resultado disponível
        , res    = {
            success: 0
        }
    ;

    if (mod) {
        mod.params['_mobile_'] = true;
        this.state.api.call = this.request.query['query'] ? 'search' : 'list';

        if (!mod.params['provider']) {
            mod.params['provider'] = {}
        }

        if (!mod.params['provider']['id']) {
            mod.params['provider']['id'] = map.provider;
        }
        var tmp = yield mod.get(this);
        if (tmp['data'] && tmp.data['rows'] && tmp.data.rows.length > 0) {
            status = 200;
            res = {
                success : 1,
                data    : {
                    page: tmp.data.page,
                    rows: tmp.data.rows
                }
            };
        }
    }

    // Status
    if (send_http_status) {
        this.response.status = status;
    } else {
        res['status'] = status;
    }

    // Retorna
    this.body = res;
});


/**
 * Entrada de API :: POST
 *   Oferece suporte para apis:
 *    - insert  | url: owner/pack/mod                    | Insere um novo registro no mod
 *    - exec    | url: owner/pack/mod/getStats           | Executa uma função definida no mod
 * 11/04/16
 */
router.post('/mobile/dreams/*', function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var api      = this.state.api.path[2]
        , map    = apiMap[api]
        , mod    = this.app.engine.initObj(map.mod.split('/'), this)
        , status = 417 // Falhou
        , func   = map['exec'] ? map['exec'] : 'insert'
        , res    = {
            success: 0
        }
    ;

    if (mod) {

        // Executa a função no objeto
        try {
            res = yield mod[func](this);
            if (res.success){
                status = 200;
            }
        } catch (e) {
            console.log(e);
        }
    }

    // Status
    if (send_http_status) {
        this.response.status = status;
    } else {
        res['status'] = status;
    }

    // Retorna
    this.body = res;
});


















/*
function *old(){
        // Form de edição
        if (len == 5 && ctx.state.api.path[4] == 'edit') {
            ctx.state.api.call = 'edit';
            mod.params['key'] = ctx.state.api.path[3];
            ctx.body = yield mod.form(ctx);

        } else {

            // Form de inserção
            if (len == 4 && ctx.state.api.path[3] == 'new') {
                ctx.state.api.call = 'create';
                mod.params['key'] = 'NEW_KEY';
                ctx.body = yield mod.form(ctx);

                // Listagem
            } else {
                ctx.state.api.call = (ctx.request.query['query']
                        ? 'search'
                        : len == 4 && ctx.state.api.path[3]
                        ? 'get'
                        : 'list'
                );
                if (len == 4) {
                    mod.params['key'] = ctx.state.api.path[3];
                }
                if (!mod.params['provider']) {
                    mod.params['provider'] = {}
                }

                if (!mod.params['provider']['id']) {
                    mod.params['provider']['id'] = ctx.app.context.config.apiMap[ctx.state.api.path[2]].provider;
                }

                /*
                 mod.params['provider'] = {
                 id: mod.params['provider'] ? mod.params['provider'] : ctx.app.context.config.apiMap[ctx.state.api.path[2]].provider
                 };*

                if (ctx.app.context.config.apiMap[ctx.state.api.path[2]]['exec']){
                    var func = ctx.app.context.config.apiMap[ctx.state.api.path[2]]['exec'];
                    ctx.body = yield mod[func](ctx);

                } else {
                    ctx.body = yield mod.get(ctx);
                }
            }
        }
    }
}*/

/**
 * Entrada de API :: PUT
 *   Oferece suporte para apis:
 *    - update  | url: owner/pack/mod/123                 | Atualiza um registro no mod
 * 25/04/16
 */
router.put(/^\/api\/dreams\/.*/, function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod   = this.app.engine.initObj(this.state.api.path, this)
        , len = this.state.api.path.length
        ;

    if (mod) {
        // Execução de função
        this.state.api.call = 'update';
        this.body = yield mod.update(this);
    }

    /**
     * Finaliza
     */
    yield next;

});

/**
 * Entrada de API :: DELETE
 *   Oferece suporte para apis:
 *    - delete  | url: owner/pack/mod/123                 | Remove um registro no mod
 * 25/04/16
 */
router.delete(/^\/api\/dreams\/.*/, function *(next) {

    /**
     * Instancia o módulo
     * @type BizObject
     */
    var mod   = this.app.engine.initObj(this.state.api.path, this)
        , len = this.state.api.path.length
        ;

    if (mod) {
        // Execução de função
        this.state.api.call = 'delete';
        mod.params['key'] = this.state.api.path[3];
        this.body = yield mod.delete(this);
    }

    /**
     * Finaliza
     */
    yield next;

});



module.exports = router;