/**
 * Conector ao SQLServer baseado em seriate.
 * @see <a href="https://github.com/LeanKit-Labs/seriate">Seriate</a>
 * @author labs
 * @since 10/03/2016
 * @param connParams Parâmetros de conexão
 * @constructor
 */
function SQLServer(connParams){
    return new Promise((resolve, reject) => {

        /**
         * Driver de acesso a bancos SQL
         * @type {SQL}
         */
        this.driver = new driver(this);
        
        // Inicializa
        this.driver.init(connParams);

        // Conexão
        Seriate.setDefaultConfig({
            server: connParams.conn['host'],
            user: connParams.conn['user'],
            password: connParams.conn['pwd'],
            database: connParams.conn['database'],
            pool: {
                max: 10,
                min: 4,
                idleTimeoutMillis: 30000
            }
        });

        resolve(this);
    });
}

//region :: Includes

var driver      = require('./_sql')
    , Seriate   = require('seriate')
    , log       = require('../_log')
;

//endregion


//region :: Parsing

/**
 * Recebe um sqlParams e monta um SELECT statement
 * @param db { SQL }
 * @param obj { BizObject }
 */
function parseSQL(db, sqlParams, obj){
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
    sql += db.parseWhere(obj.params);

    // Processa search
    if (sqlParams['search'] && obj.params['query']){
        sql += db.parseSearch(obj.params['query']);
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
}



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
SQLServer.prototype.parseProvider = function(provider, obj){
    this.driver._parseProvider(provider, obj);
};


/**
 * Ajusta fields em sqlParams
 * @param prov
 * @param ctx_fields
 * @param meta_fields
 * @param alias
 */
SQLServer.prototype.parseFields = function(prov, ctx_fields, meta_fields, alias){
    return this.driver._parseFields(prov, ctx_fields, meta_fields, alias);
};


/**
 * Identifica os joins
 * @param join { {source: 0, tipo: 'inner', on: 'map_filiais_key', where: ''} }
 * @param table
 * @param alias
 * @param nolock
 */
SQLServer.prototype.parseJoin = function(join, table, alias, nolock) {
    return this.driver._parseJoin(join, table, alias, ' (nolock) ');
};


/**
 * Processa req.query e alimenta where
 * @param req { req }
 * @returns { string }
 */
SQLServer.prototype.parseWhere = function(req){
    return this.driver._parseWhere(req);
};


/**
 * Processa req.query e alimenta search
 * @param req { req }
 * @returns { string }
 */
SQLServer.prototype.parseSearch = function(req){
    return this.driver._parseSearch(req);
};

//endregion


/**
 * Executa um SELECT com base em sqlParams
 * @param provider
 * @param obj { BizObject }
 */
SQLServer.prototype.select = function *(provider, obj){

    // Parent
    var data = this.driver._select(provider, obj)
        , db = this
    ;

    // Select para insert
    if (data){
        return this.processResults(results, sql);
    
    // Normal    
    } else {
        var sql = parseSQL(this, this.driver.sqlParams, obj);
        return yield this.query(sql, obj);
    }
};

/**
 * Roda um SQL direto na base
 * @param sql {string}
 * @param obj {BizObject}
 * @returns {Promise}
 */
SQLServer.prototype.query = function *(sql, obj, meta){
    var db = this;
    return new Promise((resolve, reject) => {
        try{
            Seriate.execute({
                    query: sql
                })
                .then(
                    
                    // Processa
                    function (results) {
                        resolve(db.processResults(results, obj, sql, meta));
                    },

                    // Erro
                    function (err) {
                        log.erro(err, sql);
                        reject(err);
                    }
                    
                );
            
        } catch (e){
            log.erro(err, sql);
            reject(err);
        }
    });
};

/**
 * Processa o resultado do select ajustando o pacote de retorno.
 * @param results
 * @param sql
 */
SQLServer.prototype.processResults = function(results, obj, sql, meta){
    return this.driver._processResults(results, obj, sql, meta);
};




// Exporta
module.exports = SQLServer;