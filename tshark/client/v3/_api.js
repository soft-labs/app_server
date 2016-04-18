/**
 * Created by labs on 11/01/16.
 */


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
    
    delete  :               ['DELETE',    '/{key}']

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
         * Ajusta a API dinamicamente.
         * Contexo 'this': elemento DOM originador da chamada
         */
        beforeSend: function (settings) {
            var d = $.extend({}, $(this).data() || {});

            // Ajusta API
            var api   = (d['action'] ? d.action : settings.action).split(' ')
                , map = api.shift()
                , el  = this
            ;

            if (!tshark.api_map[map]) {
                alertify.error("API não reconhecida: '" + map + "'");
            }

            // Ajusta função
            if (map == 'exec'){
                $(this).data('func', api.pop());
            }

            // Registra modulo
            var id = api.join('.');
            if (!tshark.isRegistered(id)) {
                tshark.register(id, function () {
                    $(el).api('query');
                });
                return false;
            }

            // Executa onBefore
            var Func = map.capitalize()
                , mod = tshark.getMod(id)
            ;

            // Interno
            if (tshark[map + '_before']) {
                tshark[map + '_before'].call(mod, el, settings);
            }

            // Externo
            if (mod['onBefore' + Func] && !settings['_on_before_']) {
                if (!mod['onBefore' + Func].call(mod, el, settings)) return false;
            }

            // Ajusta template
            if (settings['template'] && mod.templates[settings['template']]){
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

            // Retorna
            return settings;
        },

        /**
         * Ajusta callback
         */
        onSuccess: function (response) {
            // valid response and response.success = true
            tshark.callback(response);
        },

        onResponse: function (response) {
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
     * Gateway para processamento de retornos de API
     * @since 06/10/15
     */
    TShark.prototype.callback = function (response) {
        var func    = response.callback
            , Func  = func.capitalize()
            , id    = response.path.join('.')
            , mod   = this.getMod(id)
            , overwrite = false
            , isForm = (func == 'edit' || func == 'create')
        ;

        if (mod && func) {

            // Forms
            if (isForm){

                // Before / Overwrite no módulo
                if (mod['onForm']) {
                    mod['onForm'].call(mod, response, function () {
                        tshark['form_callback'].call(tshark, mod, response);
                    });

                // Default interno
                } else {
                    this['form_callback'].call(this, mod, response);
                }
            }

            // Before / Overwrite no módulo
            if (mod['on' + Func]) {
                mod['on' + Func].call(mod, response, function () {
                    tshark[func + '_callback'].call(tshark, mod, response);
                });

            // Default
            } else {
                this[func + '_callback'].call(this, mod, response);
            }

            // After
            if (isForm && mod['onAfterForm']){
                mod['onAfterForm'].call(mod, response);
            }
             
            if (mod['onAfter' + Func]) {
                mod['onAfter' + Func].call(mod, response);
            }
        }
    };

    function resetDataCallback(api, data, mod){
        mod.reset(data);

        // ShowSQL
        if (data['sql']){
            console.log(api + ':' + data['sql'])
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
            resetDataCallback('list', response['data'], mod);
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

            // ShowSQL
            if (response['data']['sql']){
                console.log('search:' + response['data']['sql'])
            }

            //resetDataCallback('list', response['data'], mod);
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
            this.forms.create(mod, response.layout)
        }
    };

    //endregion


    //region :: API Create

    TShark.prototype.create_before = function (sender, settings) {

    };

    TShark.prototype.create_callback = function (mod, response) {

    };

    //endregion


    //region :: API Edit

    TShark.prototype.edit_before = function (sender, settings) {

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

    };

    /**
     * Callback de listagem de dados
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.exec_callback = function (mod, response) {

        if (response['data']) {
            resetDataCallback('exec', response['data'], mod);
        }

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
    TShark.prototype.update_callback = function (params) {
    };

    /**
     * Exibe mensagens vindas do server
     * @since 06/10/15
     */
    TShark.prototype.delete_callback = function (params) {
    };

    //endregion


})($);