/**
 * TShark - Client 3.0
 *  Implementação de client baseado em Semantic UI.
 *
 * @copyright [== © 2015, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 06/10/2015
 */
function TShark(opts){
    opts = opts || {};
    this.clickevent = opts['clickevent'] || 'click';

    // Módulos
    this._tmp_ = {};
    this.modulos = {};
    this.modulos._add = function(id, mod){
        tshark._tmp_[id] = mod;
    };

    /**
     * Armazena os rivet binds que forem associados
     */
    this.appBound = false;

    /**
     * Estrutura para envio de dados
     */
    this._sending_ = {};
    
}

// Globals
var CONSOLE_ON = true;

/**
 * Implementação da classe
 */
(function() {

    //region :: Inicialização

    /**
     * Inicializa o TShark client realizando os binds iniciais
     * @since 06/10/15
     */
    TShark.prototype.init = function (options) {
        options = options || {};

        // Registra módulos no init
        if(options['register']){
            this.register(options['register']);
        }
        
        // Bind global do var app com o .app
        this._bindData();

        // Bind das APIs
        this.initAPIs();
        
        // Liga Semantic
        this.initSemantic();

    };


    /**
     * Executa o bind de dados do objeto app
     * com a estrutura '.app' no layout
     * @private
     */
    TShark.prototype._bindData = function(){
        this.appBound = rivets.bind($('.app'), app);
    };
    
    /**
     * Ativa APIs em ref
     * @param ref
     */
    TShark.prototype.initAPIs = function (ref) {
        ref = '.app';
        
        //region :: Bind de APIs Server

        $('[server]').not('.api-binded')
            .api(this.api)
            .addClass('api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server'));
            })
        ;

        // Bind de APIs em click
        $('[server-onclick]').not('.api-binded')
            .api(this.api)
            .addClass('cursor api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server-onclick'));
            })
        ;

        // Bind de APIs em dblclick
        $('[server-ondblclick]').not('.api-binded')
            .api(this.dblclick_api)
            .addClass('cursor api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server-ondblclick'));
            })
        ;

        // Bind de APIs em blur
        $('[server-onblur]').not('.api-binded')
            .api(this.blur_api)
            .addClass('api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server-onblur'));
            })
        ;

        // Bind de APIs em change
        $('[server-onchange]').not('.api-binded')
            .api(this.change_api)
            .addClass('api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server-onchange'));
            })
        ;

        // Bind de APIs em keydown
        $('[server-onkeypress]').not('.api-binded')
            .api(this.keypress_api)
            .addClass('api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('server-onkeypress'));
            })
        ;
        
        $('[data-action]').not('.api-binded')
            .api(this.api)
            .addClass('api-binded');

        $('[action]').not('.api-binded')
            .api(this.api)
            .addClass('api-binded')
            .each(function(){
                $(this).data('action', $(this).attr('action'));
            });

        //endregion


        //region :: Bind de APIs Client

        var funcClient = function(key, ev){
            var api = $(this).attr(key)
                , data = ev.currentTarget ? JSON.parse(JSON.stringify(ev.currentTarget.dataset)) : $(this).data()
            ;

            var obj = tshark.getObjPath(app, api);
            if (!obj){
                obj = tshark.getObjPath(window, api);
            }
            if (obj) {
                obj.call($(this), ev, data);
            }
        };

        $('[client]').not('.api-client-binded')
            .addClass('cursor api-client-binded')
            .on('click', function(ev) {
                return funcClient.call($(this), 'client', ev);
            })
        ;

        $('[client-ondblclick]').not('.api-client-binded')
            .addClass('cursor api-client-binded')
            .on('dblclick', function(ev) {
                return funcClient.call($(this), 'client-ondblclick', ev);
            })
        ;

        $('[client-onblur]').not('.api-client-binded')
            .addClass('api-client-binded')
            .on('blur', function(ev) {
                return funcClient.call($(this), 'client-onblur', ev);
            })
        ;

        $('[client-onchange]').not('.api-client-binded')
            .addClass('api-client-binded')
            .on('change', function(ev) {
                return funcClient.call($(this), 'client-onchange', ev);
            })
        ;

        $('[client-onkeypress]').not('.api-client-binded')
            .addClass('api-client-binded')
            .on('keyup', function(ev){
                return funcClient.call($(this), 'client-onkeypress', ev);
            })
        ;

        $('[client-onenter]').not('.api-client-binded')
            .addClass('api-client-binded')
            .on('keyup', function(ev){
                if (ev.keyCode != 13) return;
                return funcClient.call($(this), 'client-onenter', ev);
            })
        ;

        //endregion

    };
    
    /**
     * Ativa o semantic em ref
     * @since 06/10/15
     */
    TShark.prototype.initSemantic = function (ref) {
        if (!ref) {
            ref = 'body';

        } else {
            if (typeof ref == 'string') {
                ref = (ref ? ref + ' ' : '');
                if (ref && (ref[0] != '#' && ref[0] != '.')) {
                    ref = "#" + ref;
                }

                ref = $(ref);
            }
        }

        // Dropdown não form
        $(ref).find('.ui.dropdown').not('.binded')
            .dropdown({
                onChange: function(value, text, $choice){

                    var dts = $(this).data('set');
                    if (dts){
                        dts = tshark.getObjPath(window, dts);
                        if (dts){
                            dts.goTo(value);
                        }
                    }

                    var _onChange = $(this).attr('on-change');
                    if (_onChange){
                        var obj = false;
                        if (typeof window[_onChange] == 'function'){
                            obj = window;

                        } else if (dts){
                            if (typeof dts[_onChange] == 'function'){
                                obj = dts;

                            } else if (dts.ref && typeof dts.ref[_onChange] == 'function'){
                                obj = dts.ref;
                            }
                        }

                        if (obj){
                            obj[_onChange].call(this, value, text, $choice)
                        }

                    }
                }
            })
            .addClass('binded')
        ;

        // Tabs
        $(ref).find('.tabular.menu .item').not('.binded')
            .tab()
            .addClass('binded')
        ;

        // Menu
        $(ref).find('.ui.menu.item').not('.binded')
            .state()
            .addClass('binded')
        ;

        // Checkbox
        $(ref).find('.checkbox').not('.binded')
            .checkbox()
            .addClass('binded')
        ;

        /* PRODUZ ERRO - checkbox() CRIADO NO ELEMENTO HTML ERRADO
        $(ref).find('[type=checkbox]').not('.binded')
            .checkbox()
            .addClass('binded')
        ;*/

        // Acordion multiplos open
        $(ref).find('.ui.accordion.multiple').not('.binded')
            .accordion({
                exclusive: false
            })
            .addClass('binded')
        ;

        // Acordion open exclusivo
        $(ref).find('.ui.accordion').not('.binded')
            .accordion()
            .addClass('binded')
        ;

        // Datepicker
        var dateObj = {
            container: '.app',
            format: 'dd/mm/yyyy',
            format_submit: 'yyyy-mm-dd',
            onSet: function(thingSet) {
                this.$node.trigger('input');
            }
        };

        $(ref).find('.date').not('.binded')
            .pickadate(dateObj)
            .addClass('binded')
        ;

        $(ref).find('.datetime').not('.binded')
            .pickadate(dateObj)
            .addClass('binded')
        ;

        $(ref).find('.time').not('.binded')
            .pickatime({
                container: '.app'
            })
            .addClass('binded')
        ;

        // Popup
        $(ref).find('[data-help]').not('.binded')
            .each(function(){
                $(this).attr('data-content', $(this).data('help'));
            })
            .popup()
            .addClass('binded')
        ;
        $(ref).find('[data-content]').not('.binded')
            .popup()
            .addClass('binded')
        ;

        $(ref).find('.ui.sticky').not('.binded')
            .sticky({
                offset: 90,
                bottomOffset: 5
            })
            .addClass('binded')
        ;

        $(ref).find('.special.cards .image').not('.binded')
            .addClass('binded')
            .dimmer({
                on: 'hover'
            })
        ;

        $(ref).find('.pop-trigger').not('.binded')
            .addClass('binded')
            .each(function(){
                $(this).popup({
                    popup: $(this).data('popup')
                })
            })
        ;

        $(ref).find('.inline.long.pop').not('.binded')
            .addClass('binded')
            .each(function() {
                $(this).popup($.extend({
                    inline: true,
                    delay: {hide: 1200}
                }, $(this).data() || {}))
            })
        ;

        $(ref).find('.pop').not('.binded')
            .addClass('binded')
            .each(function() {
                $(this).popup($(this).data() || {})
            })
        ;

        $(ref).find('.tooltip').not('.binded')
            .addClass('binded')
            .tooltipster({
                theme: 'tooltipster-light'
            })
        ;
    };

    /**
     * Remove links de api
     * @since 06/10/15
     */
    TShark.prototype.resetIntf = function (ref) {
        if (!ref) {
            ref = 'body';

        } else {
            if (typeof ref == 'string') {
                ref = (ref ? ref + ' ' : '');
                if (ref && (ref[0] != '#' && ref[0] != '.')) {
                    ref = "#" + ref;
                }
                ref = $(ref);
            }
        }

        $(ref).find('.binded')
            .removeClass('binded numpader-binded')
        ;
    };

    //endregion


    //region :: Módulos

    /**
     * Normaliza uma API para ser sempre array
     * @param api
     * @returns {[]}
     */
    function normalizeAPI(api) {

        // Garante array para API
        switch (typeof api) {
            case 'string':
                api = api.split('.');
                break;

            case 'object':
                api = [api[0], api[1], api[2]];
                break;
        }

        return api;
    }

    /**
     * Recupera um módulo, pelo seu id
     * @param path { string } Path 'owner.pack.mod'
     * @returns { TShark.modulo }
     */
    TShark.prototype.getMod = function (path) {
        if (typeof path != 'string'){
            path = path.join('.');
        } else {
            if (path.indexOf('.') == -1){
                path = path.split(' ').join('.');
            }
        }
        return this.modulos[path];
    };

    /**
     * Verifica se um módulo está registrado.
     * @param path {string}
     * @returns {boolean}
     */
    TShark.prototype.isRegistered = function (path) {
        return (this.modulos[path] ? true : false);
    };

    /**
     * Registra um módulo
     * @param paths { string || string[] } Path ou array de paths de objetos de negócio
     * @param callFunc { function() } Função que será executada após a carga do módulo
     * @since 21/02/16
     */
    TShark.prototype.register = function (paths, callFunc) {
        if (typeof paths == 'string'){
            paths = [paths];
        }

        paths.forEach(id => {
            if (id.indexOf('.') == -1){
                id = id.split(' ').join('.');
            }
            
            // Ajusta path
            var obj = this.modulos[id];

            // Recupera módulo e instancía
            if (!obj || !obj['data']) {

                // Recupera modulo
                var path  = id.split('.')
                    , mod = path.pop()
                    , arq = "modulos/" + path.join('/') + '/' + mod + ".js"
                ;
                $.getScript(arq)

                    // Achou
                    .done(function (data, textStatus) {

                        // Cria instância e merge com recebido
                        tshark.initMod(id);

                        // Chama função callback
                        if (callFunc) {
                            callFunc.call(tshark.modulos[id]);
                        }
                    })

                    // Falhou
                    .fail(function (jqxhr, settings, exception) {

                        //alertify.error("API não reconhecida: '" + map + "'");
                    })
                ;
            }

        });
    };

    /**
     * Instancia e extende um novo módulo
     * @param ref { TShark.modulo }
     */
    TShark.prototype.initMod = function (ref) {
        var path = '';

        if (typeof ref == 'string') {
            path = ref;
            ref = tshark._tmp_[ref];
            delete(tshark._tmp_[ref]);
        }

        // Extends definido no módulo
        var extra_extend = (ref && ref.extends && window[ref.extends] ? window[ref.extends] : {});

        // Cria com hierarquia
        var mod = $.extend(

            // Módulo TShark
            new tshark.modulo(path),

            // Objeto definido no módulo, se houver
            extra_extend,

            // BizObject
            ref || {}
        );

        // Registra no tshark
        tshark.modulos[path] = mod;

        // Registra no browser
        var obj = window
            , tmp = path.split('.')
        ;
        tmp.forEach((p, i) => {
            if (!obj[p]){
                obj[p] = (i == tmp.length-1
                    ? tshark.modulos[path]
                    : {}
                );
            }
            obj = obj[p];
        });

        // Registra no app
        obj = app;
        tmp.forEach((p, i) => {
            if (!obj[p]){
                obj[p] = (i == tmp.length-1
                        ? tshark.modulos[path]
                        : {}
                );
            }
            obj = obj[p];
        });

        // Inicializa
        if (mod['init']) {
            mod.init();
        }

        // Retorna
        return mod;
    };


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
        if (criou && final_obj) {
            obj = final_obj;
        }
        return criou;
    };


    /**
     * Retorna um subobjeto em base percorrendo path
     * @param base
     * @param path
     * @returns {*}
     */
    TShark.prototype.getObjPath = (base, path) => {
        try {
            if (!path && typeof base == 'string') {
                path = base;
                base = app;
            }

            var obj = base;
            if (typeof path == 'string') {
                path = path.indexOf('.') > -1 ? path.split('.') : path.split(' ');
            }
            path.forEach((p) => {
                obj = obj[p];
            });
            return obj;

        } catch (e) {
            return false;
        }
    };
    
    //endregion


    //region :: Envio de dados ao server


    /**
     * Armazena dados para serem enviados ao server no próximo call
     * de API
     */
    TShark.prototype.send = function (key, data) {
        this._sending_ = this._sending_ || {};
        if (data){
            this._sending_[key] = data;
        } else {
            this._sending_ = $.extend(true, this._sending_, key);
        }
    };

    /**
     * Alimenta o pacote de envio e reseta o _sending_
     * @param settings
     * @private
     */
    TShark.prototype._send = function (settings) {
        settings.data = $.extend(settings.data, this._sending_);
        this._sending_ = {};
    };

    //endregion


    //region :: Mensagens

    function notify(tipo, msg, extra, onOk){
        alertify.notify( msg, tipo, 5, onOk );
        if (extra){
            alertify.notify( extra, tipo );
        }
    }

    function log(msg, extra){
        if (console) {
            console.log(msg, extra);
            if (extra) {
                console.log(msg, extra);
            }
        }
    }

    function popAlert(title, msg, extra, onOk){
        alertify.alert(title, msg + (extra ? '<p>&nbsp;</p><p>' + extra : ''), onOk);
    }


    //region :: Suave

    /**
     * Gera um log em console
     * @param msg
     * @param extra
     */
    TShark.prototype.log = function(msg, extra){
        log(msg, extra);
    };

    /**
     * Exibe mensagem de erro na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.erro = function(msg, extra, onOk){
        notify('error', msg, extra, onOk);
        log(msg, extra);
        return false;
    };

    /**
     * Exibe mensagem de sucesso na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.sucesso = function(msg, extra, onOk){
        notify('success', msg, extra, onOk);
        return true;
    };

    /**
     * Exibe um alerta na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.alerta = function(msg, extra, onOk){
        notify('warning', msg, extra, onOk);
    };

    /**
     * Exibe uma mensagem na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.msg = function(msg, extra, onOk){
        notify('', msg, extra, onOk);
    };

    //endregion


    //region :: Popups

    /**
     * Exibe popup de erro na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.popErro = function(msg, extra, onOk){
        popAlert('Erro!', msg, extra, onOk);
        return false;
    };

    /**
     * Exibe popup de sucesso na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.popSucesso = function(msg, extra, onOk){
        popAlert('Sucesso!', msg, extra, onOk);
        return true;
    };

    /**
     * Exibe um popup na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.popAlerta = function(msg, extra, onOk){
        popAlert('Alerta!', msg, extra, onOk);
    };

    /**
     * Exibe um popup na tela
     * @param msg
     * @param extra
     * @param onOk
     */
    TShark.prototype.popMsg = function(msg, extra, onOk){
        popAlert('Atenção!', msg, extra, onOk);
    };

    /**
     * Pede confirmação do usuário
     * @param msg Mensagem ao usuário
     * @param onOk { function } Callback em caso de sim
     * @param onCancel { function } Callback em caso de não
     */
    TShark.prototype.confirm = function(msg, onOk, onCancel){
        alertify
            .confirm('Atenção!', msg, onOk, onCancel)
            .set('labels', {cancel: 'Cancelar'})
        ;
    };

    /**
     * Pede ao usuário que informe um valor.
     * @param msg Mensagem ao usuário
     * @param defValue Valor default
     * @param onOk { function } Callback em caso de sim
     * @param onCancel { function } Callback em caso de não
     */
    TShark.prototype.prompt = function(msg, defValue, onOk, onCancel){
        alertify
            .prompt('Informe:', msg, defValue, onOk, onCancel)
            .set('labels', {cancel: 'Cancelar'})
        ;
    };


    //endregion



    //endregion

})($);
