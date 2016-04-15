/**
 * TShark - Client 3.0
 *  Implementação de client baseado em Semantic UI.
 *
 * @copyright [== © 2015, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 06/10/2015
 */
function TShark(){
    this.clickevent = 'click';

    // Módulos
    this._tmp_ = {};
    this.modulos = {};
    this.modulos._add = function(id, mod){
        tshark._tmp_[id] = mod;
    };

    this.forms = new Forms();
    
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

        // Bind de APIs generico
        var d = $("<div>", {
            id: '_direct_api_helper_',
            class: "ui hidden"
        }).api(this.api);

        $('body')
            .append(d);

        this.bind();
    };

    /**
     * Ativa o semantic em ref
     * @since 06/10/15
     */
    TShark.prototype.bind = function (ref) {
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

        // Bind de APIs
        $(ref).find('[data-action]').not('.api-binded')
            .api(this.api)
            .addClass('api-binded');

        
        // Bind Semantic
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

        $(ref).find('.ui.checkbox').not('.binded')
            .checkbox()
            .addClass('binded')
        ;

        $(ref).find('.ui.accordion').not('.binded')
            .accordion()
            .addClass('binded')
        ;

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
    };

    /**
     * Remove links de api
     * @since 06/10/15
     */
    TShark.prototype.unbind = function (ref) {
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
     * @param id { 'owner.pack.mod' }
     * @returns { TShark.modulo }
     */
    TShark.prototype.getMod = function (id) {
        if (typeof id != 'string'){
            id = id.join('.');
        }
        return this.modulos[id];
    };

    /**
     * Verifica se um módulo está registrado.
     * @param id
     * @returns {boolean}
     */
    TShark.prototype.isRegistered = function (id) {
        return (this.modulos[id] ? true : false);
    };

    /**
     * Registra um módulo
     * @param id { 'owner.pack.mod' }
     * @param callFunc { function() } Função que será executada após a carga do módulo
     * @since 21/02/16
     */
    TShark.prototype.register = function (id, callFunc) {

        // Ajusta path
        var mod = this.modulos[id];

        // Recupera módulo e instancía
        if (!mod || !mod['data']) {

            // Recupera modulo
            var path  = id.split('.')
                , mod = path.pop()
                , arq = "modulos/" + path.join('/') + '/' + mod + '/' + mod + ".js";
            $.getScript(arq)

                // Achou
                .done(function (data, textStatus) {

                    // Cria instância e merge com recebido
                    tshark.initMod(id);

                    // Chama função callback
                    if (callFunc) {
                        callFunc.apply();
                    }
                })

                // Falhou
                .fail(function (jqxhr, settings, exception) {
                    //alertify.error("API não reconhecida: '" + map + "'");
                })
            ;
        }
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
        var obj = base;
        if (typeof path == 'string'){
            path = path.split('.');
        }
        path.forEach((p) => {
            obj = obj[p];
        });
        return obj;
    };
    
    //endregion
    
})($);
