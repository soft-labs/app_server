/**
 * Created by labs on 03/04/16.
 */
function Dataset (path, ref){

    /**
     * Path do módulo de referencia
     * @type {*|Array}
     */
    this.path = path || [];
    if (typeof this.path == 'string'){
        this.path = this.path.split('.');
    }

    /**
     * Módulo ou objeto de referencia
     * @type {*|TShark.modulo}
     */
    this.ref = ref || tshark.getMod(this.path);

    /**
     * Nome do campo de chave
     * @type {string}
     */
    this.key = '';

    /**
     * Indice de rows por chave
     * @type {{}}
     */
    this.index = {};

    /**
     * Rows do dataset
     * @type {Array}
     */
    this.rows = [];

    /**
     * Row definida em navegação
     */
    this.row = {};

    /**
     * Página atual no server
     * @type {number}
     */
    this.page = -1;

}


/**
 * Implementação da classe
 */
(function() {

    /**
     * Carrega dados diretamente da API list de path
     * @param data {{}} (opcional)
     * @param load_api {string} opcional: Se 1 ou 4 strings, tratado como exec, senão como list
     * @returns {*}
     */
    Dataset.prototype.load = function () {
        var load_api  = this.path.join("/") // + '/search'
            , data    = {}
            , method  = 'get'
            , re      = /\/exec\//
            , m
        ;

        if (arguments.length) {

            // Verifica se foi passado a API no primeiro parametro
            if (typeof arguments[0] == 'string'){
                var tmp = arguments[0].split(' ');
                load_api = (this.path ? this.path.join("/") : '') + '/' + tmp.join('/');
                if (tmp.length == 1 || tmp.length == 4){
                    method = 'post';
                }

            // ou dados
            } else {
                data = arguments[0];
            }

            if (arguments[1]){
                data = arguments[1];
            }
        }

        // Executa chamada
        this.__load('tshark/' + load_api, data, method);
    };

    /**
     * Executa uma carga de dados no server
     * @param url
     * @param data
     * @private
     */
    Dataset.prototype.__load = function (url, data, method) {
        var self = this;

        $.ajax(url,  {data: data || {}, method: method || 'get'})

            // Processa retorno
            .done(function (res) {
                if (self['onLoad']) {
                    self.onLoad(res);
                }

                self.reset(res.data);

                if (self['onAfterLoad']) {
                    self.onAfterLoad();
                }
            });
    };


    /**
     * Reseta o dataset
     * @param data
     */
    Dataset.prototype.reset = function (data) {
        this.key   = data['key']   || '';
        this.rows  = data['rows']  || [];
        this.page  = data['page']  || -1;
        this.index = data['index'] || false;
        this.row   = {};

        if (!this.index){
            this.index = {};
            for (var i = 0; i < this.rows.length; i++){
                this.index[i] = i;
            }
        }
    };

    /**
     * Limpa tudo
     */
    Dataset.prototype.clear = function () {
        this.rows = [];
        this.page = -1;
    };

    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    Dataset.prototype.goTo = function(key){
        this.row = this.getRow(key);
        return this.row;
    };

    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    Dataset.prototype.getRow = function(key){
        var ndx = this.index[key];
        return this.rows[ndx];
    };

    /**
     * Retorna um row com base em sua posição no array de rows
     * @param index indice no array de rows
     * @returns {*}
     */
    Dataset.prototype.getRowAt = function(index){
        return this.rows[index];
    };

    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    Dataset.prototype.delRow = function(key){
        this.remove(key);
    };
    Dataset.prototype.remove = function(key){
        var ndx = this.index[key];
        this.removeAt(ndx);
        delete(this.index[key]);
    };

    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    Dataset.prototype.delRowAt = function(index){
        this.removeAt(index);
    };
    Dataset.prototype.removeAt = function(index){
        this.rows.remove(index);
        this.reindex(index);
        this.row = this.rows[0];
    };

    /**
     * 
     * @param base
     */
    Dataset.prototype.reindex = function(base){
        for (var i = base; i < this.rows.length; i++){
            var k = this.rows[i]['_key_'];
            this.rows[i]['_index_'] = i;
            this.index[k] = this.rows[i]['_index_'];
        }
    };


    /**
     * Retorna um row com base em valor de chave
     * @param key valor da chave do row desejado
     * @returns {*}
     */
    Dataset.prototype.addRow = function(row){
        var key = row['_key_'];
        this.setRow(key, row);
    };

    /**
     * Atualiza ou cria um novo row, tendo a chave como referencia
     * @param key
     * @param row
     */
    Dataset.prototype.setRow = function(key, row){
        var ndx = this.index[key];
        if (ndx || ndx == 0) {
            $.extend(this.rows[ndx], row);
        } else{
            ndx = this.rows.length;
            key = (key == 'NEW_KEY'
                ? key + '_' + ndx
                : key
            );
            this.index[key] = ndx;
            this.rows.push(row);
        }
        this.row = this.rows[ndx];
    };

})($);
