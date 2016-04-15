/**
 * TShark - Client 3.0
 *  Implementação de client dataset.
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 20/02/2016
 */
TShark.prototype.modulo = function(path){

    /**
     * Armazena this para ser usado em funções internas
     * @type {TShark}
     */
    var self = this;

    /**
     * Permite extender uma classe
     */
    this.extends = '';

    /**
     * Path domodulo
     * @type {*|string}
     */
    this.path = path || '';

    /**
     * Função de init, implementada em overwrite em modulos filhos
     */
    this.init = function(){

    };


    // Monta helper para usar APIs em design com rv
    this.api = {};
    var api = this.path.replace(/\./g, ' ');
    for (var a in tshark.api_map){
        this.api[a] = a + ' ' + api;
    }

    /**
     * Info do módulo
     * @type {{titulo: string, info: string, help: string, icon: string}}
     */
    this.info = {
        titulo: '',
        info: '',
        help: '',
        icon: ''
    };

    /**
     * Dataset do modulo
     * @type {{key: string, index: {}, rows: Array, page: number}}
     */
    this.data = new Dataset(this.path, this);

    /**
     * Armazena os rivet binds que forem associados ao modulo
     */
    this.binds = {};

    /**
     * Templates do módulo
     * @type {{templ_name:''}}
     */
    this.templates = {};

    /**
     * Form para edição
     */
    this.form = {
        bounds: {},
        comps: {},
        obj: false
    };
};


/**
 * Implementação da classe
 */
(function() {


    //region :: Chamadas de API diretas

    /**
     * Executa chamadas de api direto via call.
     *  Ex: mod.call('list', {provider: 'provTeste'})
     * @param api
     * @param data
     */
    TShark.prototype.modulo.prototype.call  = function(api, data){
        data = data || {};
        var tmp      = api.split(' ')
            , action = ''
        ;
        if (tmp.length > 1){
            api = tmp.shift();

            switch (api){
                case 'get' : data.id   = tmp.join(' '); break;
                case 'form': data.key  = tmp.join(' '); break;
                case 'exec': data.func = tmp.join(' '); break;
                default: data.extra = tmp;
            }
        }

        data.action = this.api[api];
        $('#_direct_api_helper_')
            .data(data)
            .api('query');
    };


    /**
     * Carrega dados diretamente de um modulo node
     */
    TShark.prototype.modulo.prototype.load = function (load_api) {
        load_api = load_api || this.path.split('.');
        if (typeof load_api == 'string') {
            load_api = load_api.split(' ');
        }

        // Executa chamada
        var self = this;
        $.ajax(load_api.join("/"), {})

            // Processa retorno
            .done(function (data) {
                if (self['onLoad']) {
                    self.onLoad(data);
                }

                self.data.reset(data);
                
                if (self['onAfterLoad']) {
                    self.onAfterLoad();
                }
            });
    };

/*
    TShark.prototype.modulo.prototype.list      = function (data){
        this._callApi('list', data);
    };

    TShark.prototype.modulo.prototype.get       = function (data){
        this._callApi('get', data);
    };

    TShark.prototype.modulo.prototype.search    = function (data){
        this._callApi('search', data);
    };

    TShark.prototype.modulo.prototype.form      = function (data){
        this._callApi('form', data);
    };

    TShark.prototype.modulo.prototype.insert    = function (data){
        this._callApi('insert');
    };

    TShark.prototype.modulo.prototype.update    = function (data){
        this._callApi('update');
    };

    TShark.prototype.modulo.prototype.delete    = function (data){
        this._callApi('delete');
    };

    TShark.prototype.modulo.prototype.exec      = function (data){
        this._callApi('exec');
    };
*/
    //endregion


    //region :: Binds

    /**
     * Executa um bind
     * @param ref
     */
    TShark.prototype.modulo.prototype.bind = function(ref) {
        this.binds[ref] = rivets.bind($(ref), this);
    };

    /**
     * Remove um bind
     * @param ref
     * @param keep
     */
    TShark.prototype.modulo.prototype.unbind = function(ref, keep) {
        try {
            this.binds[ref].unbind();
            if (!keep){
                delete(this.binds[ref]);
            }
        } catch (e){
            console.log(e);
        }
    };

    /**
     * Reseta os dados e os binds 
     * @param new_data
     */
    TShark.prototype.modulo.prototype.reset = function(new_data){

        // Unbind
        for (var bound in this.binds){
            try {
                this.unbind(bound, true);
            } catch (e){
                console.log(e);
            }
        }

        // Reseta:
        this.data.reset(new_data);

        // Re bind
        for (var bound in this.binds){
            try {
                this.bind(bound);
            } catch (e){
                console.log(e);
            }
        }
    };

    //endregion
    

})($);
