/**
 * Engine de aplicações - TShark.
 *  Roteamentos e entradas de APIs default com ponto 
 *  de entrada 'tshark'
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
;


/**
 * Registra o inicio de um roteamento
 */
router.use(function *timeLog(next) {
    try {
        var tmp = this.captures[0].split('/').slice(3);
        this.state.api = {
            url: this.originalUrl,
            call: tmp[tmp.length - 1],
            path: tmp,
            params: extend(true, this.request.query || {}, this.request.body || {})
        };
    } catch (e){
        log.erro(e, 'timelog');
    }

    yield next;
});

/**
 * Validação de chamadas de API
 */
router.use(function *(next) {
    var ok = false;

    try {
        // Se pedir com educação
        if (this.state.api.path[0] == 'sys' &&
            this.state.api.path[1] == 'app' &&
            this.state.api.path[2] == 'security' &&
            this.state.api.path[3] == 'login') {

            var tmp = this.req.headers.referer.split('/').slice(-2);
            this.state.config = this.app.context.clientes[tmp[0]][tmp[1]];

            ok = true;
        }

        // Token
        if (this.req.headers['token']) {

            // Validar o token de acesso aqui

            ok = true;
        }

        // Senão...
        if (!ok) {
            var user_key = cookies.getLoggedUser(this);

            // You shall not pass!
            if (!user_key || !this.app.context.running[user_key]) {
                this.throw(404, 'Not Found');

                // Multipass!!
            } else {
                this.state.user_key = user_key;
                this.state.config = this.app.context.running[user_key];
                ok = true
            }
        }

    } catch (e){
        log.erro(e, 'TShark Router - validação');
    }

    if (ok){
        yield next;
    } else {
        this.throw(404, 'Not Found');
    }
});


/**
 * Entrada de API :: GET
 *   Oferece suporte para apis:
 *    - get  | url: owner/pack/mod                       | Lista todos os registros do mod
 *    - get  | url: owner/pack/mod?query='teste um dois' | Filtra os registros do mod por query
 *    - get  | url: owner/pack/mod/123                   | Retorna o registro id=123
 *    - get  | url: owner/pack/mod/new                   | Retorna um form para pré inserção
 *    - get  | url: owner/pack/mod/123/edit              | Retorna um form para edição do registro id=123
 * @since 21/02/16
 */
router.get(/^\/(\w+)\/tshark\/.*$/, function *(next) {
    try {

        /**
         * Instancia o módulo
         * @type BizObject
         */
        var mod = this.app.engine.initObj(this.state.api.path, this)
            , len = this.state.api.path.length
            ;

        // Form de edição
        if (len == 5) {
            this.state.api.call = 'edit';
            mod.params['key'] = this.state.api.path[3];
            this.body = yield mod.form(this);

        } else {

            // Form de inserção
            if (len == 4 && this.state.api.path[3] == 'new') {
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
                if (len == 4) {
                    mod.params['key'] = this.state.api.path[3];
                }
                this.body = yield mod.get(this);

                if (mod.params['template'] && mod.params['template'] == '_choose') {
                    this.state.api.call = 'choose';
                }
            }
        }

    } catch (e){
        log.erro(e);
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
    try {

        /**
         * Instancia o módulo
         * @type BizObject
         */
        var mod = this.app.engine.initObj(this.state.api.path, this)
            , len = this.state.api.path.length
            ;

        // Execução de função
        if (len = 4) {
            var func = this.state.api.call;
            if (!func) {
                func = this.state.api.call = 'insert';
            }

            /**
             * Executa a função no objeto
             */
            try {
                var res = yield mod[func](this);
                if (typeof res != 'object') {
                    this.body = {
                        result: res
                    };
                } else {
                    this.body = res;
                }
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e){
        log.erro(e);
    }

    /**
     * Finaliza
     */
    yield next;

});

/**
 * Entrada de API :: PUT
 *   Oferece suporte para apis:
 *    - update  | url: owner/pack/mod/123                 | Atualiza um registro no mod
 * 25/04/16
 */
router.put(/^\/(\w+)\/tshark\/.*/, function *(next) {
    try {

        /**
         * Instancia o módulo
         * @type BizObject
         */
        var mod = this.app.engine.initObj(this.state.api.path, this)
            , len = this.state.api.path.length
            ;

        // Execução de função
        this.state.api.call = 'update';
        this.body = yield mod.update(this);

    } catch (e){
        log.erro(e);
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
router.delete(/^\/(\w+)\/tshark\/.*/, function *(next) {
    try {

        /**
         * Instancia o módulo
         * @type BizObject
         */
        var mod = this.app.engine.initObj(this.state.api.path, this)
            , len = this.state.api.path.length
            ;

        // Execução de função
        this.state.api.call = 'delete';
        mod.params['key'] = this.state.api.path[3];
        this.body = yield mod.delete(this);

    } catch (e){
        log.erro(e);
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
    ctx.body = ctx.body || {};
    ctx.body['callback'] = ctx.state.api.call;
    ctx.body['path'] = ctx.state.api.path.splice(0, 3);

    // Fecha
    // console.log('Time finish: ', Date.now());

}


module.exports = router;