/**
 * Padronização de tipos
 * @author labs
 * @since 19/03/16.
 */
function Types(){

}

//region :: Forms

/**
 * Tipos para configuração de form
 */
Types.prototype.form = {
    get size() {
        return {
            small: 'small',        // defalt
            large: 'large'
        }
    },

    get lines() {
        return {
            distribution: {
                percent: 'percent',        // defalt
                equal: 'equal width'
            },
            labels: {
                inline: 'inline',
                ontop: 'ontop'           // defalt
            }
        }
    },

    get state() {
        return {
            ok: 'ok',             // defalt
            loading: 'loading',
            disabled: 'disabled',
            success: 'success',
            error: 'error',
            warning: 'warning'
        }
    }
};

Types.prototype.ctrls = {
    get state(){
        return {
            required    : 'required',
            disabled    : 'disabled',
            readonly    : 'readonly',
            loading     : 'loading',
            error       : 'error'
        }
    },

    get size() {
        return {
            mini: 'mini',
            small: 'small',        // defalt
            large: 'large',
            big: 'big',
            huge: 'huge',
            massive: 'massive'
        }
    },

    get labels() {
        return {
            inline: 'inline',
            ontop: 'ontop'           // defalt
        }
    }
};

/**
 * Tipos de componentes
 */
Types.prototype.comp = {

    get key() {
        return {type: 'int', comp: 'inpInt', default: 'NEW_KEY', disabled: true};
    },

    get int() {
        return {type: 'int', comp: 'inpInt', default: 0};
    },


    get text() {
        return {type: 'string', comp: 'inpText', default: ''};
    },

    get text_small() {
        return {type: 'text', comp: 'inpMemoShort', default: ''};
    },

    get text_big() {
        return {type: 'text', comp: 'inpMemo', default: ''};
    },

    get text_huge() {
        return {type: 'text', comp: 'inpMemoLong', default: ''};
    },


    get float() {
        return {type: 'float', comp: 'inpFloat', default: '0,00'};
    },

    get money() {
        return {type: 'float', comp: 'inpMoney', default: '0,00'};
    },

    get percent() {
        return {type: 'float', comp: 'inpPercent', default: '0,00'};
    },


    get check() {
        return {type: 'bool', comp: 'inpCheckBox', default: 0};
    },

    get slider() {
        return {type: 'bool', comp: 'inpSlider', default: 0};
    },

    get toggle() {
        return {type: 'bool', comp: 'inpToggle', default: 0};
    },

    get radio() {
        return {type: 'string', comp: 'inpRadio', default: ''};
    },


    get dropdown() {
        return {type: 'string', comp: 'inpDropdown', default: '', multi: false};
    },

    get list() {
        return {type: 'string', comp: 'inpList', default: '', multi: false};
    },


    get choose() {
        return {type: 'string', comp: 'inpChoose', default: '', multi: false};
    },


    get chooselist() {
        return {type: 'string', comp: 'inpChoose', default: '', multi: false};
    },


    get date() {
        return {type: 'date', comp: 'inpDate', default: ''};
    },

    get time() {
        return {type: 'time', comp: 'inpTime', default: ''};
    },

    get datetime() {
        return {type: 'datetime', comp: 'inpDateTime', default: ''};
    },

    get timestamp() {
        return {type: 'datetime', comp: 'inpDateTime', default: 'NOW'};
    }

};


Types.prototype.getByField = function(type){
    var t = type.replace(/[^a-zA-Z]/g, '').toLowerCase();
    switch (t){
        case "primary":
            return 'key';

        case "key":
            return 'choose';
        
        case "char": 
        case "varchar":
        case "nchar":
        case "nvarchar":
            return 'text';

        case "text":
        case "ntext":
            return 'text_big';

        case "int":
        case "smallint":
        case "tinyint":
            return 'int';

        case "float":
        case "decimal":
            return 'float';
        
        case "date":
            return 'date';
            
        case "time":
            return 'time';
        
        case "datetime":
        case "timestamp":
            return 'datetime';
    }
};

//endregion


//region :: Providers

/**
 * Tipos de join
 */
Types.prototype.join = {
    inner   : 'inner',
    left    : 'left'
};

/**
 * Tipos de where
 */
Types.prototype.where = {

    /**
     * Check irá verificar se o valor do campo está disponível, e se não,
     * a clausula where será IGNORADA
     * @type { string }
     */
    check   : 'check',

    /**
     * Get irá verificar se o valor do campo está disponível, e se não,
     * será gerada uma clausula where que retora FALSE ( AND 1 = 2 )
     * @type { string }
     */
    get     : 'get',

    /**
     * In irá verificar se existem valores para o field, e irá criar 
     * uma clausula where IN ('')
     */
    in      : 'in',

    /**
     * Not_In irá verificar se existem valores para o field, e irá criar 
     * uma clausula where NOT IN ('')
     */
    not_in      : 'not_in',
};

/**
 * Tipos de search
 */
Types.prototype.search = {
    igual       :   '=',
    diferente   :   '<>',
    like        :   'LIKE',
    like_full   :   'LIKE FULL',
    like_inicio :   'LIKE INICIO',
    like_fim    :   'LIKE FIM',
    in          :   'IN',
    menor       :   '<',
    maior       :   '>',
    menor_igual :   '>=',
    maior_igual :   '<='
};

//endregion


/**
 * Retorna pacote padrão de dataset.
 * @returns { { data: {index: {}, rows: Array, page: number} }}
 */
Types.prototype.dataset = function (){
    return Object.assign({}, {
        data: {
            index: {},
            rows: [],
            page: 0
        }
    });
};


// Exporta
module.exports = new Types();