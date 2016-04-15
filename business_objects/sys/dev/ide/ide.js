/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Ide(){


    //region :: Definições do Objeto

    // Id
    this.id = 'ide';

    // Map
    this.source = {
        table: '',
        metadata: {
            key: '',
            fields: {
            }
        }
    };

    //endregion


    //region :: Forms

    this.forms = {

        // Form de update
        update:{
            _config: {
                bounds: { width: 800, height: 450 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small
            },
            linhas: [

            ],
            ctrls: {

            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['dev', 'ide']
                }
            },
            where: [ ],
            search: [ ],
            showSQL: 0
        }

    };

    //endregion


    //region :: Regras de Negócio

    /**
     * Retorna as conexões configuradas para a ide
     * @param ctx
     * @returns {Promise}
     */
    this.getConexoes = function *(ctx) {
        var rows = [{_index_: '', id: ''}];
        for(var c in ctx.state.config.conexoes){
            var con = ctx.state.config.conexoes[c];
            con.id = c;
            rows.push(con);
        }

        return {
            data: {
                rows: rows
            }
        };
    };
    
    /**
     * Gera uma listagem de business objects e retorna em 
     * formato dataset
     * @param ctx Contexto de chamada
     * @returns {Promise}
     */
    this.listModulos = function *(ctx){
        return {
            data: {
                rows: this.readDir(module.paths[0] + '/tshark/business_objects')
            }
        };
    };

    /**
     * Lista todas as tabelas do banco
      * @param ctx
     * @returns {Promise}
     */
    this.getTables = function *(ctx){
        var connId = this.params['connID']
            , dts  = yield this.engine.getConnection(connId)
            , sql  = ''
            , meta = {
                key: 'name',
                fields: {
                    name: {
                        tipo: types.comp.text, label: 'Tabela:'
                    }
                }
            }
        ;

        switch (dts.driver.connParams.tipo) {
            case 'mysql':
                sql = 'SELECT table_name as name ' +
                    '  FROM information_schema.tables ' +
                    " WHERE table_schema= '" + dts.driver.connParams.conn.database + "'" +
                    ' ORDER BY name ';
                break;

            default:
                sql = 'SELECT name FROM sys.Tables order by name';
        }

        return yield dts.query(sql, this, meta);
    };

    
    

    this.createPackage = function *(ctx){
        var connId  = this.params['connID']
            , fs    = require('fs-extra')
            , dir   = module.paths[0] + '/tshark/business_objects/'
            , dts   = yield this.engine.getConnection(connId)
            , sql   = ''
            , source = {
                table: '',
                metadata: {
                    key: '',
                    fields: { }
                }
            }
            , templ = {}
        ;

        // Cria owner
        dir += this.params['owner'];
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        // Cria pack
        dir += '/' + this.params['id'];
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }


        switch (dts.driver.connParams.tipo) {
            case 'mysql':
                sql = "SHOW COLUMNS FROM ";
                break;

            default:
                sql = "SELECT COLUMN_NAME as Field, DATA_TYPE as Type, CHARACTER_MAXIMUM_LENGTH as len, IS_NULLABLE " +
                      "  FROM INFORMATION_SCHEMA.Columns WHERE TABLE_NAME = ";
        }

        // Cria modulo
        this.params.modulos.forEach((mod) => {
          /*  dir += '/' + mod['name'];
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            var res = yield dts.query(sql + mod['name'], this);
            /*source.table = mod['name'];
            source.metadata.key = '';
            source.metadata.fields = {};

            res.data.rows.forEach((row) => {
                source.metadata.fields[row['Field']] = {
                    tipo: types.getByField(row['Type']), label: row['Field']
                };
            });
*/
            templ = source;

        });

    };

    //endregion


}



// Types
const types = require(module.paths[0] + '/tshark/types');

// Exporta
module.exports = Ide;