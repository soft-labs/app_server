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
 * Definição de verbos da API
 *  GET     /owner/pack/mod/                 (dados)                list
 *  GET     /owner/pack/mod/[?query=params]  (dados)                search
 *  GET     /owner/pack/mod/{key}            (dados)                especifico
 *  GET     /owner/pack/mod/new              (dados & interface)    create
 *  GET     /owner/pack/mod/{key}/edit       (dados & interface)    edit
 *  POST    /owner/pack/mod/                 (dados)                insert
 *  PUT     /owner/pack/mod/{key}            (dados)                update
 *  DELETE  /owner/pack/mod/{key}            (dados)                delete
 *  POST    /owner/pack/mod/{*}              (dados || interface)   exec func
 *
 * Abaixo, mapeamento 'amigável' para uso em interfaces:
 *   Ex:
 *   <div client="app teste helloWorld" data-name="João">
 *   <div server="softlabs empresas emp_clientes list" data-teste="123" data-provider-id="meuprovider" data-provider-showSQL="1">
 *
 *    "softlabs empresas emp_clientes list"                        -- Listagem de todos os clientes
 *    "softlabs empresas emp_clientes search" data-query="bahia"   -- Listagem de clientes filtrados por 'bahia'
 *    "softlabs empresas emp_clientes get"    data-key="8978"      -- Dados do cliente key '8978'
 *    "softlabs empresas emp_clientes create"                      -- Form para criação de novo cliente
 *    "softlabs empresas emp_clientes edit"                        -- Form para edição de um cliente
 *    "softlabs empresas emp_clientes insert"                      -- Envia dados para inserção de novo cliente
 *    "softlabs empresas emp_clientes update" data-key="8978"      -- Envia dados para alteração de cliente
 *    "softlabs empresas emp_clientes delete" data-key="8978"      -- Remove o cliente key '8978'
 *    "softlabs empresas emp_clientes geraBoletos" data-[xyz]      -- Executa a função geraBoletos em emp_clientes
 *
 *  Atributos HTML para APIs server
 *              server=""
 *      server-onclick=""
 *   server-ondblclick=""
 *       server-onblur=""
 *     server-onchange=""
 *
 *  Atributos HTML para APIs client
 *              client=""
 *      client-onclick=""
 *   client-ondblclick=""
 *       client-onblur=""
 *     client-onchange=""
 *    client-onkeydown=""
 *      client-onenter=""
 */
TShark.prototype.api_map = {

    // Comando de layout    | Verbo       | URL
    list    :               ['GET',       '/'],
    search  :               ['GET',       '/'], //?query={query}'],
    get     :               ['GET',       '/{key}'],
    
    create  :               ['GET',       '/new'],
    edit    :               ['GET',       '/{key}/edit'],

    insert  :               ['POST',      '/'],
    update  :               ['PUT',       '/{key}'],

    save    :               ['POST',      '/'],
    exec    :               ['POST',      '/{func}'],
    
    post    :               ['POST',      '/'],
    put     :               ['PUT',       '/{key}'],
    delete  :               ['DELETE',    '/{key}'],


    // Comandos internos    | Verbo       | URL
    choose  :               ['GET',       '/']
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
        verbose: false, // (app['mode'] && app['mode'] == 'desenv'),

        /**
         * Ajusta a API dinamicamente.
         * Contexo 'this': elemento DOM originador da chamada
         */
        beforeSend: function (settings) {
            if (before(settings, $(this))) {
                return settings;
            } else {
                return false;
            }
        },

        /**
         * Ajusta a API dinamicamente.
         * Contexo 'this': elemento DOM originador da chamada
         */
        beforeXHR: function (xhr) {
            if (app['onBeforeXHR']) {
                app['onBeforeXHR'].call(app, xhr);
            }
            return xhr;
        },

        /**
         * Ajusta callback
         */
        onSuccess: function (response) {
            return callback(response);
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
     * API acionada em dblclicks
     */
    TShark.prototype.dblclick_api = $.extend(true, {
        on: 'dblclick'
    }, TShark.prototype.api);
    
    /**
     * API acionada em blur
     */
    TShark.prototype.blur_api = $.extend(true, {
        on: 'blur'
    }, TShark.prototype.api);
    
    /**
     * API acionada em onchange
     */
    TShark.prototype.change_api = $.extend(true, {
        on: 'change'
    }, TShark.prototype.api);

    /**
     * API acionada em onkeydown
     */
    TShark.prototype.keypress_api = $.extend(true, {
        on: 'keyup',
        throttle: 900
    }, TShark.prototype.api);
    
    
    
    /**
     * Executa chamadas de api direto via call.
     *  Ex: mod.call('list softlabs financeiro fin_bancos', {provider: 'provTeste'})
     * @param api {string} Caminho completo da api
     * @param data {{}} (Opcional) Dados extras 
     */
    TShark.prototype.call = function(api, data){
        data = data || {};
        
        data.action = api.trim();
        $('<button>')
            .api(tshark.api)
            .data(data)
            .api('query');
    };


    /**
     * Gateway para processamento de APIs antes do envio ao server.
     *  Sequencia:
     *    onBefore - interno        | assinatura: function *_before(mod, el, settings) { return bool }  | this == tshark
     *    onBefore - interno módulo | assinatura: function *_before(el, settings)  { return bool }      | this == mod
     *    onBefore - externo app    | assinatura: function onBefore*(el, settings) { return bool }      | this == app
     *    onBefore - externo módulo | assinatura: function onBefore*(el, settings) { return bool }      | this == mod
     * @param settings
     * @param el
     * @returns {*}
     * @private
     */
    function before(settings, el) {
        var d = $.extend({}, $(el).data() || {})
            , str = (d['action'] ? d.action : settings.action)
        ;
        if (!str){
            tshark.erro('API não definida para a operação.');
            return false;
        }

        // Ajusta API
        str = str.replace(/\s{2,}/g, ' ').trim();
        var api     = str.split(' ')
            , map   = api.pop()
            , path  = api.join('.')
            , Func  = map.capitalize()
            , api_url = ''
            , key   = ''
        ;

        if (!isNaN(map)){
            key = map;
            map = api.pop();
        }

        // Ajusta função
        if (!tshark.api_map[map] && isNaN(map)){
            $(el).data('func', map);
            map = 'exec';
        }

        if (!tshark.api_map[map] && isNaN(map)) {
            alertify.error("API não reconhecida: '" + map + "'");
            return false;
        }

        api_url = key ? '/' + key : tshark.api_map[map][1];

        // Só roda em modulo registrado
        if (tshark.isRegistered(path)) {

            // Executa onBefore
            var mod = tshark.getMod(path);

            // Interno
            if (tshark[map + '_before']) {
                if (!tshark[map + '_before'].call(mod, el, settings)) return false;
            }
            
            // Interno App
            if (app[map + '_before']) {
                if (!app[map + '_before'].call(mod, el, settings)) return false;
            }

            // Interno - modulo
            if (mod[map + '_before'] && !settings['_on_before_']) {
                map = mod[map + '_before'].call(mod, el, settings);
                if (!map) return false;
                Func = map.capitalize();
            }

            if (Func == 'Edit' || Func == 'Create'){

                // Externo - app
                if (app['onBeforeForm'] && !settings['_on_before_']) {
                    if (!app['onBeforeForm'].call(app, el, settings)) return false;
                }

                // Externo - modulo
                if (mod['onBeforeForm'] && !settings['_on_before_']) {
                    if (!mod['onBeforeForm'].call(mod, el, settings)) return false;
                }
                
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

            var router = app.router;
            if (d.hasOwnProperty('router')){
                router = d['router'];
                delete(d['router']);
            }

            // Ajusta dados
            delete(d['moduleApi']);
            delete(d['action']);
            settings.data = $.extend(settings.data, d);
            
            // Ajusta dados no módulo
            mod._send(settings);
            
            // Ajusta dados no tshark
            tshark._send(settings);

            // Ajusta settings
            settings.url    = router + '/' + api.join('/') + api_url;
            settings.method = method = tshark.api_map[map][0];
            settings.dataType = 'JSON';
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
    function callback(_response) {
        var response = $.extend(true, {}, _response)
            , func  = response['callback']
            , id    = response['path'] ? response['path'].join('.') : ''
            , mod   = id ? tshark.getMod(id) : ''
        ;

        // onResponse
        onCallback('on', 'response', mod, response);
        
        // Específicos
        if (mod && func) {

            // onCallback - forms
            if (func == 'edit' || func == 'create'){
                onCallback('on', 'form', mod, response);
            }

            // onCallback - data
            if (response['data']) {
                onCallback('on', 'data', mod, response);
            }

            // onCallback
            onCallback('on', func, mod, response);


            // onAfterCallback - gets
            if (func == 'list' || func == 'search' || func == 'get'){
                onAfterCallback('onAfter', 'get', mod, response);
            }

            // onAfterCallback - forms
            if (func == 'edit' || func == 'create'){
                onAfterCallback('onAfter', 'form', mod, response);
            }
            
            // onAfterCallback - save
            if (func == 'insert' || func == 'update'){
                onAfterCallback('onAfter', 'save', mod, response);
            }

            // onAfterCallback
            onAfterCallback('onAfter', func, mod, response);

        }


        // Bind das APIs
        tshark.initAPIs();

        // Liga Semantic
        tshark.initSemantic();

        // Bind global do var app com o .app
        //tshark._bindData();

    }

    /**
     * Processa eventos de callback no retorno do server.
     *  onCallback - módulo | assinatura: function(response, next)      | this == mod
     *  onCallback - app    | assinatura: function(mod, response, next) | this == app
     *  onCallback interno  | assinatura: function(mod, response)       | this == tshark
     * @param prefix
     * @param func
     * @param mod
     * @param response
     */
    function onCallback(prefix, func, mod, response){
        var Func = func.capitalize();

        // onCallback - módulo | assinatura function(response, defCallback) | this == mod
        if (mod && mod[prefix + Func]) {
            mod[prefix + Func].call(mod, response, function () {

                // Permite ao módulo chamar o onCallback no app - chain
                if (app[prefix + Func]) {
                    app[prefix + Func].call(app, mod, response, function () {

                        // Permite ao app chamar o onCallback padrão - chain
                        tshark[func + '_callback'].call(tshark, mod, response);

                    });

                // Permite ao módulo chamar o onCallback padrão
                } else if (tshark[func + '_callback']) {
                    tshark[func + '_callback'].call(tshark, mod, response);
                }

            });

        // onCallback - app | assinatura function(mod, response, defCallback) | this == app
        } else if (app[prefix + Func]) {
            app[prefix + Func].call(app, mod, response, function () {

                // Permite ao app chamar o onCallback padrão
                if (tshark[func + '_callback']) {
                    tshark[func + '_callback'].call(tshark, mod, response);
                }

            });

        // onCallback interno | assinatura function(mod, response) | this == tshark
        } else if (tshark[func + '_callback']) {
            tshark[func + '_callback'].call(tshark, mod, response);
        }

    }

    /**
     * Processa eventos after callback.
     *   onAfter no módulo  | assinatura: function(response, next)      | this == mod
     *   onAfter no app     | assinatura: function(mod, response)       | this == app
     * @param prefix
     * @param func
     * @param mod
     * @param response
     */
    function onAfterCallback(prefix, func, mod, response){
        var Func = func.capitalize();

        // after no módulo | assinatura function(response, appAfterCallback) | this == mod
        if (mod[prefix + Func]) {
            mod[prefix + Func].call(mod, response, function(){

                // Permite ao módulo chamar o onAfterCallback no app - chain
                if (app[prefix + Func]) {
                    app[prefix + Func].call(app, mod, response);
                }
            });

        // onAfter no app | assinatura function(mod, response) | this == app
        } else if (app[prefix + Func]) {
            app[prefix + Func].call(app, mod, response);
        }

    }


    //region :: Callbacks especiais

    /**
     * Callback de dados
     *  Chamado sempre que o response contiver 'data'
     * @param mod { TShark.modulo }
     * @param response
     * @since 15/03/16
     */
    TShark.prototype.data_callback = function (mod, response) {
        
    };

    //endregion
    

    //region :: API List

    /**
     * onBefore: Chamado antes de descer ao server
     *  - this é o módulo da operação.
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    TShark.prototype.list_before = function(sender, settings){

        // Seta template default
        settings.data['template'] = '_no_template_';

        // Libera
        return true;
    };

    /**
     * Callback de listagem de dados
     * 
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.list_callback = function (mod, response) {

        if (response['layout']) {
            mod.templates = response.layout;

            var place = response['list_place']
                ? response['list_place']
                : '.' + mod.path + '-list-area'
            ;
            tshark.putLayout(response.layout, place);
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
        var id    = $(sender).data('comp')
            , txt = (id && $(id)
                ? $(id).val()
                : $(sender).val()
            )
        ;

        settings.data = settings.data || {};
        settings.data.query = txt;

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
        
        if (response['layout']){
            var place = response['form_place']
                ? response['form_place']
                : '.' + mod.path + '-form-area'
            ;
            response['formId'] = tshark.createForm(mod, response.layout, place);

            if ($('.ui.modal.' + mod.path + '-form').length) {
                $('.ui.modal.' + mod.path + '-form')
                    .modal({
                        allowMultiple: true
                    })
                    .modal('show');
            }
        }

        if (response['data']){
            mod.data.key = response['data']['key'];
            mod.data.setRow(response.form.key, response['data'].rows[0]);
        }
    };

    //endregion


    //region :: API Create

    TShark.prototype.create_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.create_callback = function (mod, response) {

        //tshark.bind();
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

    TShark.prototype.exec_before = function(sender, settings){

        // Libera
        return true;
    };

    TShark.prototype.exec_callback = function (mod, response) {

        if (response['data']) {
            mod.data.reset(response['data']);
        }

    };

    //endregion


    //region :: API Insert

    TShark.prototype.insert_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.insert_callback = function (mod, response) {
        try{
            if (response['result'] && response['new']){
                mod.data.syncInserted(response['new']);
            }
        } catch (e){}
    };

    //endregion


    //region :: API Update

    TShark.prototype.update_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.update_callback = function (mod, response) {

    };

    //endregion
    
    
    //region :: API Delete

    TShark.prototype.delete_before = function (sender, settings) {

        // Libera
        return true;
    };

    TShark.prototype.delete_callback = function (mod, response) {

    };

    //endregion


    //region :: API Interna - Choose

    /**
     * onBefore: Chamado antes de descer ao server
     *  - this é o módulo da operação.
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    TShark.prototype.choose_before = function(sender, settings){

        // Seta template default
        settings.data['template'] = '_choose';

        var mod = tshark.getMod($(sender).data('from'));
        app.choose.target = mod.data;
        app.choose.element = $(sender);
        
        // Libera
        return true;
    };

    /**
     * Callback de listagem de dados
     * @param mod { TShark.modulo }
     * @param response
     * @since 06/10/15
     */
    TShark.prototype.choose_callback = function (mod, response) {

        if (response['data']) {
            if (app.choose.bound){
                app.choose.bound.unbind();
            }
            app.choose.data.reset(response['data']);
        }
        
        if (response['layout']) {
            app.choose.dialog = alertify.choose(response.layout);
            app.choose.bound = rivets.bind($('.choose-rows'), app);
        }

    };

    //endregion

})($);