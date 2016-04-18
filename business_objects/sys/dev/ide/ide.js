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
                rows: this.readDir(module.paths[0] + '/business_objects')
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
            , dts  = yield this.engine.getConnection(ctx, connId)
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

        return {
            data: yield dts.query(sql, this, meta)
        };
    };

    
    

    this.createPackage = function *(ctx){
        var connId  = this.params['connID']
            , fs    = require('fs-extra')
            , dir   = module.paths[0] + '/business_objects/'
            , dts   = yield this.engine.getConnection(ctx, connId)
            , hoje  = new Date().toString()
            , sql   = ''
            , source = {
                table: '',
                metadata: {
                    key: '',
                    fields: { }
                }
            }
            , templ = fs.readFileSync(dir + '/sys/dev/ide/template.js', 'utf8')
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
        for (var m = 0; m< this.params.modulos.length; m++){
            var mod = this.params.modulos[m]
                , arq = templ
                , key = ''
                , fields = ''
                , v = ''
            ;
            
            // Cria o diretório do módulo
            var mod_dir = dir + '/' + mod['name'];
            if (!fs.existsSync(mod_dir)) {
                fs.mkdirSync(mod_dir);
            }

            source.table = mod['name'];
            source.metadata.key = '';
            source.metadata.fields = {};

            // Fields
            var res = yield dts.query(sql + mod['name'], this);
            res.rows.forEach((row) => {
                if (row['Key'] == 'PRI'){
                    key = row['Field'];
                    row['Type'] = 'key';
                }
                
                fields += v +
'\n                ' + row['Field'] + ': {' +
"\n                    tipo: types.comp." + types.getByField(row['Type']) + ", label: '" + capitalize(row['Field']) + ":'" +
'\n                }';
                v = ',';
            });

            arq = arq.replace(new RegExp('_MOD_', 'g'), camelCase(mod['name']));
            arq = arq.replace(new RegExp('_ID_', 'g'), mod['name']);
            arq = arq.replace('_KEY_', key);
            arq = arq.replace('_FIELDS_', fields);
            arq = arq.replace('_DATA_', hoje);

            fs.writeFileSync(mod_dir + '/' + mod['name'] + '.js', arq);

        }

    };

    //endregion


}

function camelCase(str, sep){
    var tmp = str.split(sep || '_')
        , res = ''
    ;

    tmp.forEach((w) => {
        res += w.charAt(0).toUpperCase() + w.slice(1);
    });
    return res;
}

function capitalize(str, sep){
    var tmp = str.split(sep || '_')
        , res = ''
        , s  = ''
    ;

    if (tmp[tmp.length-1] == 'key'){
        tmp.pop();
    }
    
    tmp.forEach((w) => {
        res += s +  w.charAt(0).toUpperCase() + w.slice(1);
        s = ' ';
    });

    res = res.replace(new RegExp('cao', 'g'), 'ção');
    res = res.replace(new RegExp('coe', 'g'), 'çõe');
    res = res.replace(new RegExp('ae', 'g'),  'ãe');
    res = res.replace(new RegExp('ao', 'g'),  'ão');
    res = res.replace(new RegExp('oe', 'g'),  'õe');

    return res;
}


// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = Ide;