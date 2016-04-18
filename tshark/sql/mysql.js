/**
 * Conector ao MySQL baseado em seriate.
 * @see <a href="https://github.com/LeanKit-Labs/seriate">Seriate</a>
 * @author labs
 * @since 10/03/2016
 * @param connParams Parâmetros de conexão
 * @constructor
 */
function *MySql(connParams){

    /**
     * Driver de acesso a bancos SQL
     * @type {SQL}
     */
    this.driver = new driver(this);

    // Inicializa
    this.driver.init(connParams);

    // Conexão
    this.pool = mysql.createPool(connParams.conn);

    return this;
}

//region :: Includes

var driver  = require('./_sql')
    , mysql = require('koa-mysql')
    , log   = require('../_log')
;

//endregion


//region :: Parsing

/**
 * Recebe um sqlParams e monta um SELECT statement
 * @param sqlParams { sqlParams }
 * @param obj { BizObject }
 */
MySql.prototype.parseSQL = function(sqlParams, obj){
    var sql = '', v = '';

    if (sqlParams.limit.max){
        sql += ' WITH Ordered AS ( \n';
        sql += '      SELECT  TOP(999999999) row_number() OVER (ORDER BY ' +
            (sqlParams.order.length ? sqlParams.order : sqlParams.key.field) +
            ') as _resultNum_, COUNT(*) OVER () _totalrows_, \n';

    } else {
        sql += ' SELECT ';
    }
    var fields = '';
    for (var fld in sqlParams.fields){
        if (fld == '__as__'){
            sqlParams.fields[fld].forEach((f) => {
                fields += v + f;
                v = ' ,';
            });
        } else {
            fields += v + sqlParams.fields[fld] + '.' + fld;
        }
        v = ' ,';
    }
    sql += fields || '*';
    sqlParams.force_lower = !fields;

    sql += '\n    FROM ' + sqlParams.table + ' ' + sqlParams.alias + ' (nolock)';
    sql += '\n' + sqlParams.joins.join('\n');
    sql += '\n  WHERE 1=1 ';

    // Processa where
    sql += this.parseWhere(obj.params);

    // Processa search
    if (sqlParams['search'] && obj.params['query']){
        sql += this.parseSearch(obj.params['query']);
    }

    if (sqlParams.group.length){
        sql += '\n  GROUP BY ' + sqlParams.group.join(', ');
    }
    if (sqlParams.having.length){
        sql += '\n  HAVING ' + sqlParams.havend.join(', ');
    }
    if (sqlParams.order.length){
        sql += '\n  ORDER BY ' + sqlParams.order.join('\n');
    }

    if (sqlParams.limit.max){
        var start = (parseInt(sqlParams.limit.page) * parseInt(sqlParams.limit.max)) +1
            , end = (start + parseInt(sqlParams.limit.max)) -1
            ;
        sql += ')' +
            ' SELECT  * ' +
            '   FROM Ordered ' +
            '  WHERE _resultNum_ >= ' + (start ? start : 0) +
            ' AND _resultNum_ <= ' + (end   ? end   : sqlParams.limit.max);
    }
    return sql;
};


/**
 * Processa um provider e o transforma em sqlParams
 * @param provider {{
 *      sources: {
 *          0: {
 *              from: ['', '']
 *              join: {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''},
 *              fields: []
 *          }
 *      },
 *      where: [
 *          ['AND', 0, 'field', '=', 'value']
 *      ],
 *      order: [],
 *      group: [],
 *      having: [],
 *      limit: 100,
 *      showSQL: false
 * }}
 * @param obj { BizObject }
 */
MySql.prototype.parseProvider = function(provider, obj){
    this.driver._parseProvider(provider, obj);
};


/**
 * Ajusta fields em sqlParams
 * @param prov
 * @param ctx_fields
 * @param meta_fields
 * @param alias
 */
MySql.prototype.parseFields = function(prov, ctx_fields, meta_fields, alias){
    return this.driver._parseFields(prov, ctx_fields, meta_fields, alias);
};


/**
 * Identifica os joins
 * @param join { {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''} }
 * @param table
 * @param alias
 * @param nolock
 */
MySql.prototype.parseJoin = function(join, table, alias, nolock) {
    return this.driver._parseJoin(join, table, alias, ' ');
};


/**
 * Processa req.query e alimenta where
 * @param req { req }
 * @returns { string }
 */
MySql.prototype.parseWhere = function(req){
    return this.driver._parseWhere(req);
};


/**
 * Processa req.query e alimenta search
 * @param req { req }
 * @returns { string }
 */
MySql.prototype.parseSearch = function(req){
    return this.driver._parseSearch(req);
};

//endregion


//region :: Execução

/**
 * Executa um SELECT com base em sqlParams
 * @param provider
 * @param obj { BizObject }
 */
MySql.prototype.select = function *(provider, obj){
    return yield this.driver._select(provider, obj);
};

/**
 * Roda um SQL direto na base
 * @param sql {string}
 * @param obj {BizObject}
 * @param meta
 * @returns {Promise}
 */
MySql.prototype.query = function *(sql, obj, meta){
    return yield this.driver._select(sql, obj, meta);
};

/**
 * Executa o statement
 * @param sql
 * @returns {*}
 * @private
 */
MySql.prototype._exec = function *(sql){
    try {
        return yield this.pool.query(sql);

    } catch (e){
        log.erro(e, sql);
    }
};

/**
 * Processa o resultado do select ajustando o pacote de retorno.
 * @param results
 * @param sql
 */
MySql.prototype.processResults = function *(results, obj, sql, meta){
    return yield this.driver._processResults(results, obj, sql, meta);
};

//endregion


// Exporta
module.exports = MySql;