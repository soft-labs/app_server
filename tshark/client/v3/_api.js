/**
 *  TShark - Client 3.0
 *
 *   Implementa processamento e gateway de APIs tanto
 *  para chamandas ao server quanto para os eventos de
 *  callback padrão das mesmas.
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 11/01/16.
 */
var tshark = tshark || new TShark()
    , app  = app    || {}
;


/**
 * Mapeamento de verbos da API
 *
 *  GET     /owner/pack/mod[?query=params]   (dados)                list | search
 *  GET     /owner/pack/mod/{key}            (dados)                especifico
 *  GET     /owner/pack/mod/{key}/form       (dados & interface)    especifico
 *  GET     /owner/pack/mod/{key}|_new/form  (dados & interface)    edit | create
 *  POST    /owner/pack/mod/_new             (dados)                insert
 *  PUT     /owner/pack/mod/{key}            (dados)                update
 *  DELETE  /owner/pack/mod/{key}            (dados)                delete
 *  POST    /owner/pack/mod/{key}/{*}        (dados & interface)    exec func
 *
 * Abaixo, mapeamento 'amigável' para uso em interfaces:
 *   Ex: "list owner pack mod"
 *       "get owner pack mod" data-key="234"
 */
TShark.prototype.api_map = {

    // Comando de layout    | Verbo       | URL
    search  :               ['GET',       '/?query={query}'],
    get     :               ['GET',       '/{key}'],
    list    :               ['GET',       '/'],
    
    create  :               ['GET',       '/_new'],
    edit    :               ['GET',       '/{key}/edit'],

    exec    :               ['POST',      '/{func}'],
    insert  :               ['POST',      '/'],

    update  :               ['PUT',       '/{key}'],
    
    delete  :               ['DELETE',    '/{key}'],

    save    :               ['POST',      '/']

};

/**
 * Reseta apis Semantic
 */
$.fn.api.settings.api = {};


/**
 * Implementação da classe
 */
(function() {

    /**
     * Eventos de controle de chamadas de Api
     * Exceto onde notado, o contexto de 'this' é o objeto de
     * chamada da API
     * @since 06/10/15
     */
    TShark.prototype.api = {

        /**
         * Exibe mensagens em console
         */
        silent: (app['mode'] && app['mode'] == 'desenv'),

        /**
         * Ajusta a API dinamicamente.
         * Contexo 'this': elemento DOM originador da chamada
         */
        beforeSend: function (settings) {
            return _before(settings, $(this));
        },

        /**
         * Ajusta callback
         */
        onSuccess: function (response) {
            return _callback(response);
        },


        onResponse: function (ctx, response) {
            // make some adjustments to response
            return response;
        },
        successTest: function (response) {
            // test whether a json response is valid
            return response && response.success;
        },
        onComplete: function (response) {
            // always called after xhr complete
        },

        /**
         * Erro no server
         */
        onFailure: function (response) {
            if (response) {
                if (response['error']) alertify.error(response.error);
                if (console && response['stack']) {
                    console.error(response.error);
                    console.error(response.stack);
                }
            }
        },

        /**
         * Erro no server
         */
        onError: function (errorMessage) {
            alertify.error(errorMessage);
            if (console) {
                console.error(errorMessage);
            }
        },

        /**
         * Erro no server
         */
        onAbort: function (errorMessage) {
            //alertify.error(errorMessage);
            if (console) {
                console.log(errorMessage);
            }
        }
    };
    
    /**
     * Executa chamadas de api direto via call.
     *  Ex: mod.call('list softlabs financeiro fin_bancos', {provider: 'provTeste'})
     * @param api {string} Caminho completo da api
     * @param data {{}} (Opcional) Dados extras 
     */
    TShark.prototype.call = function(api, data){
        data = data || {};
        
        data.action = api;
        $('#_direct_api_helper_')
            .data(data)
            .api('query');
    };

    /**
     * Registra e redireciona um callback padrão para uma função em
     * objeto.
     * @param callback {string} Nome do callback default a registrar ex: 'onList'
     * @param obj {{}} Objeto onde existe a função
     * @param func {function} Função com assinatura (mod, response, next)
     */
    TShark.prototype.registerCallback = function(callback, obj, func) {
        tshark._reg_callbacks[callback] = {
            context: obj,
            callback: func
        };
    };


    /**
     * Gateway para processamento de APIs antes do envio ao
     * server
     * @param settings
     * @param el
     * @returns {*}
     * @private
     */
    function _before(settings, el) {
        var d = $.extend({}, $(el).data() || {});

        // Ajusta API
        var api   = (d['action'] ? d.action : settings.action).replace(/\s{2,}/g, ' ').split(' ')
            , map = api.shift()
        ;

        if (!tshark.api_map[map]) {
            alertify.error("API não reconhecida: '" + map + "'");
            return false;
        }

        // Ajusta função
        if (map == 'exec'){
            $(el).data('func', api.pop());
        }

        // Só roda em modulo registrado
        var path = api.join('.');
        if (tshark.isRegistered(path)) {

            // Executa onBefore
            var Func = map.capitalize()
                , mod = tshark.getMod(path)
            ;

            // Interno
            if (tshark[map + '_before']) {
                if (!tshark[map + '_before'].call(mod, el, settings)) return false;
            }

            // Interno - modulo
            if (mod[map + '_before'] && !settings['_on_before_']) {
                map = mod[map + '_before'].call(mod, el, settings);
                if (!map) return false;
                Func = map.capitalize();
            }
            
            // Externo - app
            if (app['onBefore' + Func] && !settings['_on_before_']) {
                if (!app['onBefore' + Func].call(app, el, settings)) return false;
            }

            // Externo - modulo
            if (mod['onBefore' + Func] && !settings['_on_before_']) {
                if (!mod['onBefore' + Func].call(mod, el, settings)) return false;
            }

            // Ajusta template
            if (settings['template'] && mod.templates[settings['template']]) {
                settings['_no_template_'] = true;
            }

            // Ajusta dados
            delete(d['moduleApi']);
            delete(d['action']);
            settings.data = $.extend(settings.data, d);
            settings.dataType = 'JSON';

            // Ajusta settings
            settings.url = 'tshark/' + api.join('/') + tshark.api_map[map][1];
            settings.method = method = tshark.api_map[map][0];
            settings['_on_before_'] = false;

        } else {
            tshark.register(path, function () {
                $(el).api('query');
            });
            settings = false;
        }

        // Retorna
        return settings;
    }

    /**
     * Gateway para processamento de retornos de API
     * @param response
     * @since 06/10/15
     * @private
     */
    function _callback(response) {
        var func    = response.callback
            , Func  = func.capitalize()
            , id    = response.path.join('.')
            , mod   = tshark.getMod(id)
            , overwrite = false
            , isForm = (func == 'edit' || func == 'create')
            , o
            , f
        ;

        if (mod && func) {

            //region :: Forms

            if (isForm){

                // Before / Overwrite no módulo
                if (mod['onForm']) {
                    mod['onForm'].call(mod, response, function () {
                        tshark['form_callback'].call(tshark, mod, response);
                    });

                // Overwrite registrado
                } else if (tshark._reg_callbacks['onForm']) {
                    o = tshark._reg_callbacks['onForm'].context;
                    f = tshark._reg_callbacks['onForm'].callback;

                    f.call(o, mod, response, function () {
                        tshark['onForm'].call(tshark, mod, response);
                    });

                // Default interno
                } else {
                    tshark['form_callback'].call(tshark, mod, response);
                }
            }

            //endregion

            //region :: APIs

            // Before / Overwrite no módulo
            if (mod['on' + Func]) {
                mod['on' + Func].call(mod, response, function () {
                    tshark[func + '_callback'].call(tshark, mod, response);
                });

            // Overwrite registrado
            } else if (tshark._reg_callbacks['on' + Func]) {
                o = tshark._reg_callbacks['on' + Func].context;
                f = tshark._reg_callbacks['on' + Func].callback;

                f.call(o, mod, response, function () {
                    tshark[func + '_callback'].call(tshark, mod, response);
                });

            // Default
            } else if (tshark[func + '_callback']) {
                tshark[func + '_callback'].call(tshark, mod, response);
            }

            //endregion

            //region :: After Form

            if (isForm && mod['onAfterForm']){
                mod['onAfterForm'].call(mod, response);

                // Overwrite registrado
            } else if (isForm && tshark._reg_callbacks['onAfterForm']) {
                o = tshark._reg_callbacks['onAfterForm'].context;
                f = tshark._reg_callbacks['onAfterForm'].callback;

                f.call(o, mod, response, function(){});
            }

            //endregion

            //region :: After APIs

            if (mod['onAfter' + Func]) {
                mod['onAfter' + Func].call(mod, response);

                // Overwrite registrado
            } else if (tshark._reg_callbacks['onAfter' + Func]) {
                o = tshark._reg_callbacks['onAfter' + Func].context;
                f = tshark._reg_callbacks['onAfter' + Func].callback;

                f.call(o, mod, response, function(){});
            }

            //endregion

        }
    }

    

    //region :: API List

    /**
     * onBefore: Chamado antes de descer ao server
     *  - this é o módulo da operação.
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    TShark.prototype.list_before = function(sender, settings){

        // Seta template default
        settings.data['template'] = 'list';

        // Libera
        return true;
    };

    /**
     * Callback de listagem de dados
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.list_callback = function (mod, response) {

        if (response['layout']) {
            mod.templates = $.extend(mod.templates, response.layout);
        }

        if (response['data']) {
            mod.data.reset(response['data']);
        }

    };

    //endregion


    //region :: API Search

    /**
     * onBefore: Garante a presença do valor de pesquisa em query.
     * O valor é recuperado com base no id de componente de pesquisa armazenado
     * em data-comp de sender, ou se não houver a propriedade, pega o valor em sender.
     * Ex: input#my_search
     *     button(rv-data-action='api.search', data-comp='#my_search')
     * @since 15/03/16
     */
    TShark.prototype.search_before = function (sender, settings) {
        var id = $(sender).data('comp');
        settings.throttle = 600;
        $(sender).data('query', (id && $(id)
                ? $(id).val()
                : $(sender).val()
        ));

        // Libera
        return true;
    };

    /**
     * Callback de search
     * @param mod { TShark.modulo }
     * @param response
     * @since 15/03/16
     */
    TShark.prototype.search_callback = function (mod, response) {
        if (response['data']) {
            mod.data.reset(response['data']);
        }
    };

    //endregion


    //region :: Forms

    /**
     * onBefore: Verifica se sender possui data-key. Se sim, ele é recuperado
     * e o form será populado com o registro equivalente (pré update).
     * Se não, o form é recuperado vazio (pré insert)
     *
     * Ex: .row(rv-data-action='api.form', rv-data-key='row.clientes_key')
     *     .button(data-action='api-form')
     * @since 18/03/16
     */
    TShark.prototype.form_before = function (sender, settings) {

        // Libera
        return true;
    };

    /**
     * Exibe mensagens vindas do server
     * @param mod { TShark.modulo }
     * @param response
     * @since 19/03/16
     */
    TShark.prototype.form_callback = function (mod, response) {
        if (response['data']){
            mod.data.setRow(response.form.key, response['data'].rows[0]);
        }

        if (response['layout']){
            response['formId'] = tshark.createForm(mod, response.layout);
            
            // Bind
            /*tshark.rebind(                              // Rebind pq a cada form o módulo de origem de dados pode ter mudado
                '#form',                                // Bind feito no ponto mais alto do layout
                mod,                                    // (Novo) Mod de origem dos dados
                [".description", mod.form.obj]          // Aplica o template em uma região do layout '.description'
            );*/

        }

    };

    //endregion


    //region :: API Create

    TShark.prototype.create_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.create_callback = function (mod, response) {
        tshark.bind();
    };

    //endregion


    //region :: API Edit

    TShark.prototype.edit_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.edit_callback = function (mod, response) {

    };

    //endregion


    //region :: API Exec

    /**
     * onBefore: Chamado antes de descer ao server
     *  - this é o módulo da operação.
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    TShark.prototype.exec_before = function(sender, settings){

        // Libera
        return true;
    };

    /**
     * Callback de listagem de dados
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.exec_callback = function (mod, response) {

        if (response['data']) {
            mod.data.reset(response['data']);
        }

    };

    //endregion


    //region :: API Update

    TShark.prototype.update_before = function (sender, settings) {

        // Libera
        return true;
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.update_callback = function (mod, response) {

    };

    //endregion



    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.showMessage_callback = function (params) {
        var msg = params.mensagem;

        switch (msg.tipo) {
            case 0:
                alertify.alert("Erro interno", msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            case 1:
                alertify.error(msg.msg, msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            case 2:
                alertify.alert(msg.msg, msg.desc);
                console.log(msg.msg);
                console.log(msg.desc);
                break;

            default:
                alertify.notify(msg.msg, msg.desc);
                break;
        }

    };


    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.get_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.create_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.insert_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.delete_callback = function (params) {
    };

    //endregion


})($);