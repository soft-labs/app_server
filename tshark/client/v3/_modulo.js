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


    // Monta helper para usar APIs default em design com rv
    this.api = {};
    var api = this.path.replace(/\./g, ' ');
    for (var a in tshark.api_map){
        this.api[a] = a + ' ' + api;
    }

    // Helper de APIs 'extras'
    this.api.save = 'save ' + ' ' + api;
    this.api.last_form_id = '';

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
            , func   = ''
        ;
        if (tmp.length > 1){
            api = tmp.shift();

            switch (api){
                case 'get' : data.key  = tmp.join(' '); break;
                case 'form': data.key  = tmp.join(' '); break;
                case 'exec': func = ' '+ tmp.join(' '); break;
                default: data.extra = tmp;
            }
        }

        data.action = this.api[api] + func;
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

    //endregion


    //region :: Interceptação de eventos de API

    /**
     * A API save é uma api de mentirinha. Aqui no módulo, descobre-se qual a real 
     * natureza da operação, e retorna-se uma alteração da chamada de API.
     * @param sender
     * @param settings
     * @returns {boolean}
     */
    TShark.prototype.modulo.prototype.save_before = function (sender, settings) {
        if (!this.data.key){
            console.error(this.path + ': save_before -> data.key não definido');
            return false
        }
        if (!this.data.row){
            console.error(this.path + ': save_before -> data.row não definido');
            return false
        }

        settings.data.row = this.data.row;
        
        if (this.data.row[this.data.key] == 'NEW_KEY'){
            return 'insert';
        } else {
            $(sender).data('key', this.data.row[this.data.key]);
            settings.data.key = this.data.row[this.data.key];
            return 'update';
        }
    };

    //endregion

    
    
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

    
    /** ???
     * Reseta os dados e os binds
     * @param new_data
     *
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
    */
})($);
