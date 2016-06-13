/**
 *  TShark - Client 3.0
 *
 *   Implementa camada client dataset para armazenamento de dados
 * dos módulos.
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 03/01/16.
 */
var tshark = tshark || new TShark();

/**
 * Implementação da classe.
 */
function Dataset (path, ref){

    /**
     * Path do módulo de referencia
     * @type {*|Array}
     */
    this.path = path || [];
    if (typeof this.path == 'string'){
        this.path = (this.path.indexOf('.') ?  this.path.split('.') : this.path.split('.'));
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
     * Implementa mecanismo de informação de rows
     * selecionados.
     */
    this.selected = {
        keys: [],
        rv: {
            has_any: false,
            has_one: false,
            has_many: false
        },
        get has_any(){
            this.rv.has_any = this.keys.length > 0;
            return this.rv.has_any;
        },
        get has_one(){
            this.rv.has_one = this.keys.length == 1;
            return this.rv.has_one;
        },
        get has_many(){
            this.rv.has_many = this.keys.length > 1;
            return this.rv.has_many;
        }
    };

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
     * Agrupamento de dados por groupBy (pivot)
     * @type {Array}
     */
    this.group = [];
    
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

    // Tipo
    Dataset.prototype._type_ = 'Dataset';
    
    
    //region :: Funções de dataset

    /**
     * Carrega dados diretamente da API list de path
     * @param data {{}} (opcional)
     * @param load_api {string} (opcional) Se 1 ou 4 strings, tratado como exec, senão como list
     * @param callback {function} (opcional) função para execução ao final do load
     * @returns {*}
     */
    Dataset.prototype.load = function () {
        var load_api  = this.path.join("/") // + '/search'
            , data    = {}
            , method  = 'get'
            , re      = /\/exec\//
            , func
            , m
        ;

        if (arguments.length) {
            for (var a = 0; a < arguments.length; a++) {
                var arg = arguments[a];
                if (typeof arg == 'string') {
                    var tmp = (arg.indexOf('.') ? arg.split('.') : arg.split(' ')); // arg.split(' ');
                    load_api = (tmp.length == 3
                        ? tmp.join('/')
                        : (this.path ? this.path.join("/") : '') + '/' + tmp.join('/')
                    );
                    if (tmp.length == 1 || tmp.length == 4) {
                        method = 'post';
                    }

                } else if (typeof arg == 'function'){
                    func = arg;
                } else {
                    data = arg;
                }
            }
        }

        // Executa chamada
        this.__load('tshark/' + load_api, data, func, method);
    };

    /**
     * Executa uma carga de dados no server
     * @param url
     * @param data
     * @param func
     * @param method
     * @private
     */
    Dataset.prototype.__load = function (url, data, func, method) {
        var self = this;

        $.ajax(url,  {data: data || {}, method: method || 'get'})

            // Processa retorno
            .done(function (res) {
                
                // Se o dataset tem evento onLoad
                if (self['onLoad']) {
                    self.onLoad(res);
                }

                // Reseta os dados
                self.reset(res.data);

                // Se foi passado uma func de callback
                if (func){
                    func.apply(self);

                // ou se tem onAfterLoad    
                } else  if (self['onAfterLoad']) {
                    self.onAfterLoad();
                }

                // Ajusta binds
                tshark.initAPIs();
                tshark.initSemantic();

                // ShowSQL
                if (res.data['sql']){
                    console.log(res.data['sql'])
                }
                
            });
    };


    /**
     * Reseta o dataset
     * @param data
     */
    Dataset.prototype.reset = function (data) {
        var _data = $.extend(true, {}, data);
        this.key   = _data['key']   || '';
        this.rows  = [];
        this.rows  = _data['rows']  || [];
        this.page  = _data['page']  || -1;
        this.index = _data['index'] || false;
        this.row   = {};

        if (!this.index){
            this.index = {};
            for (var i = 0; i < this.rows.length; i++){
                this.index[i] = i;
            }
        }

        // LEVAR ISSO PRO SERVER !!!!
        for (var i = 0; i < this.rows.length; i++){
            this.rows[i]['_dataset_'] = this.path;
        }


        // ShowSQL
        if (_data['sql']){
            console.log(_data['sql'])
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
        if (!row){
            return tshark.erro('Row não definida em "setRow" - key: ' + key);
        }
        
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

    /**
     * Faz o sync de um row inserido no server com um row existente
     * no dataset
     * @param new_row
     */
    Dataset.prototype.syncInserted = function(new_row){
        var d, r;
        for (var i in this.index){
            if (this.index[i] == new_row['_index_']){
                d = i;
                r = this.index[i];
            }
        }
        if (d){
            delete(this.index[d]);
            this.rows[r]['_key_'] = new_row['val'];
            this.rows[r][new_row['key']] = new_row['val'];
            this.index[new_row['val']] = r;
        }
    };

    //endregion


    //region :: Funções de API

    Dataset.prototype.insert = function (){

    }

    //endregion

})($);

