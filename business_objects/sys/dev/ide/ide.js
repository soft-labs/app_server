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
     * Gera uma listagem de business objects e retorna em
     * formato dataset
     * @param ctx Contexto de chamada
     * @returns {Promise}
     */
    this.listApps = function *(ctx){
        var rows = this.readDir(module.paths[0] + '/apps');
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
            , owner_map = require(dir + owner + '/index.js')
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
                , is_rel = (t_tbl[t_tbl.length-1] == 'rel')
                , joins = ''
                , jade = ''
                , arq = templ
                , key = []
                , keys = []
                , arr_fields = []
                , arr_labels = []
                , key_owner = ''
                , achou_lbl_field = false
                , lbl_field = ''
                , def_field = ''
                , first_no_key_field = ''
                , first_varchar_field = ''
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
                    , is_key    = _field.substr(-4) == '_key' && (!_primary || is_rel)
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
                    key.push(_field);
                    _type = 'primary';
                } 

                if (!achou_lbl_field){
                    var   _oes     = _field.substr(0, _field.length - 2) + 'oes'
                        , _aes     = _field.substr(0, _field.length - 2) + 'aes'
                        , _res     = _field.substr(0, _field.length - 2) + 'res'
                        , _ras     = _field.substr(0, _field.length - 2) + 'ras'
                        , _ros     = _field.substr(0, _field.length - 2) + 'ros'
                    ;

                    if (_field + 's' == t_tbl || _field + 'es' == t_tbl || _field == t_tbl ||
                        _oes == t_tbl || _aes == t_tbl || _res == t_tbl || _res == t_tbl || _ros == t_tbl
                    ){
                        lbl_field = _field;
                        achou_lbl_field = true;

                    } else {
                        var _tbl_       = mod['name'].split('_')
                            , _fld_     = _field.split('_')
                            , _last_    = _tbl_.pop()
                            , _inicio_  = _tbl_.shift()
                            , _resto_   = _tbl_.join('_')
                        ;

                        if (   _field                       == _last_ || _field        == _resto_
                            || _field + 's'                 == _last_ || _field + 's'  == _resto_
                            || _field + 'es'                == _last_ || _field + 'es' == _resto_
                            || _fld_[_fld_.length]          == _last_ || _fld_[_fld_.length]   == _resto_
                            || _fld_[_fld_.length] + 's'    == _last_ || _fld_[_fld_.length] + 's'  == _resto_
                            || _fld_[_fld_.length] + 'es'   == _last_ || _fld_[_fld_.length] + 'es' == _resto_

                            || _oes == _last_ || _aes == _last_ || _res == _last_ || _res == _last_ || _ros == _last_
                            || _oes == _resto_ || _aes == _resto_ || _res == _resto_ || _res == _resto_ || _ros == _resto_

                    )
                        {
                            lbl_field = _field;
                            achou_lbl_field = true;
                        }
                    }

                }


                // Fields
                fields += v +
'\n                ' + _field + ': {' +
"\n                    tipo: types.comp." + types.getByField(_type) + ", label: '" + capitalize(_field) + ":'";

                arr_fields.push(_field);
                arr_labels.push(capitalize(_field));

                if (is_key) {
                    if (owner_map.packs[_split[0]]){
                        key_owner = owner_map.packs[_split[0]];
                    } else {
                        for (var o in owner_map.packs){
                            if (_fld_no_key == owner_map.packs[o]){
                                key_owner = owner_map.packs[o];
                            }
                        }
                    }
                    fields += ',' +
"\n                    data: { " +
"\n                        key: ['" + _field + "'], " +
"\n                        from: ['" + owner + "', '" + key_owner + "', '" + _fld_no_key + "'], " +
"\n                        template: '{" + _field + "} - {" + _fld_no_key_s + "}', " +
"\n                        provider: '' " +
"\n                    } ";
                }
                fields +=
'\n                }';


                // Joins
                if (is_key){
                    joins += (j == 1 ? '' : ',') +
"\n                " + j + ": { " +
"\n                    from: ['" + owner + "', '" + key_owner + "', '" + _fld_no_key + "']," +
"\n                    join: {source: 0, tipo: types.join.left, on: '" + _field + "', where: ''}," +
"\n                    fields: [" +
"\n                        " +
"\n                    ]" +
"\n                }";
                    j++;
                }

                var sv = search ? ",\n" : "\n";
                switch (types.getByField(_type)){
                    case 'text':
                        first_varchar_field = first_varchar_field || _field;
                        search += sv + "                    {alias: 0, field: '" + _field + "',  param: types.search.like_full }";
                        break;

                    case 'date':
                        search += sv + "                    {alias: 0, field: '" + _field + "',  param: types.search.maior_igual }";
                        break;

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

            if (!lbl_field) {
                lbl_field = first_varchar_field;
            }
            if (lbl_field){
                def_field = "'" + lbl_field + "'";
                order = "[0, '" + lbl_field + "', 'asc']";
                ctrls = lbl_field + ': {' +
                    "\n                    extra_right: { class: '', tag: '' }," +
                    "\n                    extra_left:  { class: '', tag: '' }" +
                    "\n                }";
            }

            var str_key = (key.length == 1
                ? "'" + key[0] + "'"
                : "['" + key.join("', '") + "']"
            );
            arq = arq.replace(new RegExp('_MOD_', 'g'), camelCase(mod['name']));
            arq = arq.replace(new RegExp('_ID_', 'g'), mod['name']);
            arq = arq.replace(new RegExp('_DATA_', 'g'), hoje);
            arq = arq.replace(new RegExp('_KEY_', 'g'), str_key);
            arq = arq.replace(new RegExp('_LBL_FIELD_', 'g'), lbl_field);
            arq = arq.replace('_FIELDS_', fields);
            arq = arq.replace('_LINHAS_', linhas);
            arq = arq.replace('_CTRLS_', ctrls);
            arq = arq.replace(new RegExp('_SOURCE_', 'g'), "'" + owner + "', '" + pack + "', '" + mod['name'] + "'");
            arq = arq.replace('_JOINS_', joins);

            var where_key = '', order_key = '', v = '';
            key.forEach(k => {
                where_key += v + "['AND', 0, '" + k + "', types.where.check]";
                order_key += v + "['0', '" + k + "', 'desc']";
                v = ',\n                ';
            });
            arq = arq.replace('_WHERE_', where_key);
            arq = arq.replace('_ORDER_', order || order_key);
            arq = arq.replace('_SEARCH_', search);

            fs.writeFileSync(mod_dir + '/' + mod['name'] + '.js', arq);

            jade  = '//';
            jade += '\n    Template default para: ' + owner + '.' + pack + '.' + mod['name'];
            jade += '\n    Criado em ' + hoje + '\n';
            jade += "\n.ui.fluid.card(rv-each-row='" + owner + '.' + pack + '.' + mod['name'] + ".data.rows')";
            jade += '\n    .content';
            jade += '\n        .header {row.' + key[0] + '} - {row.' + (lbl_field ? lbl_field : first_no_key_field) + '}';
            jade += '\n        .meta Keys: ' + (keys.length ? keys.join(', ') : ' - sem dependências -');
            jade += '\n        .description\n';
            jade += '\n    .extra.content';
            jade += '\n        span.left.floated.button';
            jade += "\n            button.ui.orange.icon.mini.button(data-action='" + owner + ' ' + pack + ' ' + mod['name'] + " edit', rv-data-key='row." + key[0] + "')";
            jade += "\n                i.edit.icon";
            jade += "\n                | Editar\n";
            jade += '\n        span.right.floated.button';
            jade += "\n            button.ui.red.icon.mini.button(rv-data-action='" + owner + ' ' + pack + ' ' + mod['name'] + " delete', rv-data-key='row." + key[0] + "')";
            jade += "\n                i.delete.icon";
            jade += "\n                | Remover\n";
            fs.writeFileSync(mod_dir + '/' + '_cards.jade', jade);

            jade  = '//';
            jade += '\n    Template default para: ' + owner + '.' + pack + '.' + mod['name'];
            jade += '\n    Criado em ' + hoje + '\n';
            jade += '\ntable.ui.compact.striped.celled.table';
            jade += '\n    thead';
            arr_labels.forEach(lbl => {
                jade += '\n        th ' + lbl;
            });
            jade += '\n    tbody';
            jade += "\n        tr(rv-each-row='" + owner + '.' + pack + '.' + mod['name'] + ".data.rows')";
            arr_fields.forEach(lbl => {
                jade += '\n            td {row.' + lbl + '}';
            });
            fs.writeFileSync(mod_dir + '/' + '_list.jade', jade);


            jade  = '//';
            jade += '\n    Template choose para: ' + owner + '.' + pack + '.' + mod['name'];
            jade += '\n    Criado em ' + hoje + '\n';
            jade += '\ntable.ui.compact.striped.selectable.celled.table.choose-rows';
            jade += '\n    thead';
            arr_labels.forEach(lbl => {
                jade += '\n        th ' + lbl;
            });
            jade += '\n    tbody';
            jade += '\n        tr.cursor(';
            jade += "\n            rv-each-row='choose.data.rows'";
            jade += "\n            rv-on-click='choose.select'";
            jade += "\n            rv-data-key='row." + key[0] + "'";
            jade += '\n        )';
            arr_fields.forEach(lbl => {
                jade += '\n            td {row.' + lbl + '}';
            });
            fs.writeFileSync(mod_dir + '/' + '_choose.jade', jade);

        }

        return {
            result: 1
        };
    };

    
    
    this.createMod = function *(ctx){
        var hoje  = new Date().toString()
            , fs    = require('fs-extra')
            , dir1  = module.paths[0] + '/business_objects/'
            , dir2  = module.paths[0] + '/apps'
            , templ = fs.readFileSync(dir1 + '/sys/dev/ide/modulo.js', 'utf8')
        ;

        templ = templ.replace(new RegExp('_DATA_', 'g'), hoje);
        templ = templ.replace(new RegExp('_OWNER_', 'g'), this.params.pack['owner']);
        templ = templ.replace(new RegExp('_PACK_', 'g'), this.params.pack['pack']);
        templ = templ.replace(new RegExp('_MOD_', 'g'), this.params.pack['mod']);

        var paths = [
            this.params.app['app'],
            this.params.app['cli'],
            'modulos',
            this.params.pack['owner'],
            this.params.pack['pack']//,
           // this.params.pack['mod']
        ];

        paths.forEach(p => {
            dir2 += '/' + p;
            if (!fs.existsSync(dir2)) {
                fs.mkdirSync(dir2);
            }
        });

        fs.writeFileSync(dir2 + '/' + this.params.pack['mod'] + '.js', templ);

    };
    
    
    this.pack = function *(ctx){
        require('./pckr');
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