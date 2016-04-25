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
        var rows = this.readDir(module.paths[0] + '/business_objects');
        return {
            data: {
                rows: rows
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


    /**
     * Gerador de módulos
     * @param ctx
     */
    this.createPackage = function *(ctx){
        var connId  = this.params['connID']
            , fs    = require('fs-extra')
            , dir   = module.paths[0] + '/business_objects/'
            , dts   = yield this.engine.getConnection(ctx, connId)
            , hoje  = new Date().toString()
            , sql   = ''
            , templ = fs.readFileSync(dir + '/sys/dev/ide/template.js', 'utf8')
            , owner = this.params['owner']
            , pack  = this.params['id']
        ;

        // Cria owner
        dir += owner;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        // Cria pack
        dir += '/' + pack;
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
                , from = "'" + owner + "', '" + pack + "', '" + mod['name'] + "'"
                , t_tbl = mod['name'].split('_')
                , joins = ''
                , jade = ''
                , arq = templ
                , key = ''
                , keys = []
                , lbl_field = ''
                , def_field = ''
                , first_no_key_field = ''
                , fields = ''
                , linhas = ''
                , ctrls = ''
                , search = ''
                , order = ''
                , v = ''
                , vl = ''
                , j = 1
                , w = 100
            ;

            t_tbl.shift();
            t_tbl = t_tbl.length ? t_tbl.join('_') : mod['name'];
            
            // Cria o diretório do módulo
            var mod_dir = dir + '/' + mod['name'];
            if (!fs.existsSync(mod_dir)) {
                fs.mkdirSync(mod_dir);
            }

            // Fields
            var res = yield dts.query(sql + mod['name'], this);
            res.rows.forEach((row) => {
                var _field      = row['Field']
                    , _type     = row['Type']
                    , _primary  = row['Key'] == 'PRI'
                    , is_key    = !_primary && _field.substr(-4) == '_key'
                    , _fld_no_key = ''
                    , _fld_no_key_s = ''
                    , _split    = []
                ;
                
                if (is_key){
                    _type = 'key';
                    _fld_no_key = _field.substring(0, _field.length - 4);
                    _fld_no_key_s = _field.substring(0, _field.length - 5);
                    _split    = _fld_no_key.split('_');
                    keys.push(_field);
                } else {
                    if (!first_no_key_field){
                        first_no_key_field = _field;
                    }
                }
                
                if (_primary){
                    key = _field;
                    _type = 'primary';
                } 

                if (_field + 's' == t_tbl){
                    lbl_field = _field;
                    def_field = "'" + lbl_field + "'";
                    search = "{alias: 0, field: '" + lbl_field + "',  param: types.search.like_full }";
                    order = "[0, '" + lbl_field + "', 'asc']";
                    ctrls = _field + ': {' +
"\n                    extra_right: { class: '', tag: '' }," +
"\n                    extra_left:  { class: '', tag: '' }" +
"\n                }";
                }

                // Fields
                fields += v +
'\n                ' + _field + ': {' +
"\n                    tipo: types.comp." + types.getByField(_type) + ", label: '" + capitalize(_field) + ":'";

                if (is_key) {
                    fields += ',' +
"\n                    data: { " +
"\n                        key: ['" + _field + "'], " +
"\n                        from: ['" + owner + "', '" + (_split.length > 1 ? pack : _fld_no_key) + "', '" + _fld_no_key + "'], " +
"\n                        template: '{row." + _field + "} - {row." + _fld_no_key_s + "}', " +
"\n                        provider: '' " +
"\n                    } ";
                }
                fields +=
'\n                }';


                // Joins
                if (is_key){
                    joins += (j == 1 ? '' : ',') +
"\n                " + j + ": { " +
"\n                    from: ['" + owner + "', '" + pack + "', '" + _fld_no_key + "']," +
"\n                        join: {source: 0, tipo: types.join.left, on: '" + _field + "', where: ''}," +
"\n                    fields: [" +
"\n                        " +
"\n                    ]" +
"\n                }";
                    j++;
                }


                // Linhas
                if (w == 100) {
                    linhas += vl +
"\n                {";
                    vl = '';
                }

                linhas += vl + _field + ': 25';

                w -= 25;
                if (w == 0){
                    w = 100;
                    linhas += "}";
                }

                v = vl = ', ';
            });

            if (w > 0 && w < 100){
                var n = (linhas.substr(-2).trim()*1) + w;
                linhas = linhas.substring(0, linhas.length -2) + n + '}';
            }

            arq = arq.replace(new RegExp('_MOD_', 'g'), camelCase(mod['name']));
            arq = arq.replace(new RegExp('_ID_', 'g'), mod['name']);
            arq = arq.replace('_DATA_', hoje);
            arq = arq.replace('_KEY_', key);
            arq = arq.replace('_DEF_FIELD_', def_field);
            arq = arq.replace('_FIELDS_', fields);
            arq = arq.replace('_LINHAS_', linhas);
            arq = arq.replace('_CTRLS_', ctrls);
            arq = arq.replace('_SOURCE_', "'" + owner + "', '" + pack + "', '" + mod['name'] + "'");
            arq = arq.replace('_JOINS_', joins);
            arq = arq.replace('_WHERE_', "['AND', 0, '" + key + "', types.where.check]");
            arq = arq.replace('_ORDER_', order || "['0', '" + key + "', 'desc']");
            arq = arq.replace('_SEARCH_', search);

            fs.writeFileSync(mod_dir + '/' + mod['name'] + '.js', arq);

            jade  = '//';
            jade += '\n    Template default para: ' + owner + '.' + pack + '.' + mod['name'];
            jade += '\n    Criado em ' + hoje + '\n';
            jade += "\n.ui.fluid.card(rv-each-row='data.rows')";
            jade += '\n    .content';
            jade += '\n        .header {row.' + key + '} - {row.' + (lbl_field ? lbl_field : first_no_key_field) + '}';
            jade += '\n        .meta Keys: ' + (keys.length ? keys.join(', ') : ' - sem dependências -');
            jade += '\n        .description\n';
            jade += '\n    .extra.content';
            jade += '\n        span.left.floated.button';
            jade += "\n            button.ui.orange.icon.mini.button(rv-data-action='api.edit', rv-data-key='row." + key + "')";
            jade += "\n                i.edit.icon";
            jade += "\n                | Editar\n";
            jade += '\n        span.right.floated.button';
            jade += "\n            button.ui.red.icon.mini.button(rv-data-action='api.delete', rv-data-key='row." + key + "')";
            jade += "\n                i.delete.icon";
            jade += "\n                | Remover\n";

            fs.writeFileSync(mod_dir + '/' + 'list.jade', jade);
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