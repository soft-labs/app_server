/**
 * Wrapper para Objetos de Negócio.
 * Implementa entradas de APIS e funções globais para
 * objetos de negócio.
 * @author labs
 * @since 23/02/16.
 * @constructor
 */
function BizObject(){

}


//region :: Includes

const _         = require('underscore')
    , extend    = require('extend')
    , util      = require('util')
    , log       = require('./_log')
;

//endregion


// region :: Métodos internos

/**
 * Proxy para initObj em tshark
 * @param path
 * @param context
 * @returns {BizObject}
 */
BizObject.prototype.initObj = function (path, context) {
    return this.engine.initObj(path, context);
};

/**
 * Retorna um objeto de resposta padrão
 * @param api
 * @returns {{status: number, success: boolean, layout: {}, data: Array}}
 */
BizObject.prototype.getReturnObj = function (){
    return extend({
        status: 200,
        success: true,
        path: this.path.asArray,
        //layout: { },
        data: []
    }, this.params);
};

/**
 * Retorna um form
 * @param provider
 * @returns {*}
 */
BizObject.prototype.getForm = function *(provider, ctx){
    var form = false;

    try {
        var formId = (
            this.params['form'] && this.params['form']['id']
                ? this.params['form']['id']
                : 'update'
        );
        form = extend(true, {}, this.forms[formId]);
        
        //region :: Ajusta config

        if (form) {
            form['_config'] = form['_config'] || {};
            form._config['bounds'] = form._config['bounds'] || {width: 800, height: 450};
            form._config['labels'] = form._config['labels'] || types.form.lines.labels.ontop;
            form._config['comps'] = form._config['comps'] || types.form.lines.distribution.percent;
            form._config['state'] = form._config['state'] || types.form.state.loading;
            form._config['size'] = form._config['size'] || types.form.size.small;
            form._config['external'] = form._config['external'] || [];

            if (this.params['autosave']) {
                form._config['autosave'] = true;
            }
        }

        //endregion

        // Evento onGetForm
        if (this['onGetForm']) {
            yield this.onGetForm(form, ctx);
        }

        if (!form) {
            return false;
        }

        // region :: Ajusta Ctrls

        var meta = extend(true, {}, this.source.metadata);

        // Ctrls externos
        form._config.external.forEach(ext => {
            var mod = this.engine.initObj(ext, ctx);
            if (mod) {
                meta = extend(true, meta, mod.source.metadata);
            }
        });

        var self = this;
        form['ctrls'] = form['ctrls'] || {};

        // Processamento de linhas
        var processLinha = function(linha){
            for (var ctrl in linha) {

                // Pega o comp no meta e ajusta tipo
                var comp = (meta.fields[ctrl]
                        ? extend(meta.fields[ctrl], meta.fields[ctrl]['tipo'])
                        : {}
                );

                // Componentes especiais
                if (ctrl == 'space') {
                    comp = {
                        type: 'space', comp: 'space'
                    };
                }

                // tabs
                if (form['tabs'] && form.tabs[ctrl]){
                    form.tabs[ctrl].forEach(tab => {
                        tab.linhas.forEach(l => {
                            processLinha(l);
                        })
                    });
                    comp = false;
                }

                if (comp) {

                    // Se o comp tá sobreescrito em ctrls
                    if (form.ctrls[ctrl]) {
                        extend(true, comp, form.ctrls[ctrl]);
                        if (form.ctrls[ctrl]['tipo']) {
                            extend(true, comp, form.ctrls[ctrl]['tipo'] || {});
                        }
                    }

                    // Exclui
                    if (comp['_remove_']){
                        delete(linha[ctrl]);
                        
                    // Entrega
                    } else {
                        delete(comp['tipo']);
                        form.ctrls[ctrl] = comp;
                    }
                }
            }
        };

        form.linhas.forEach(function (linha) {
            processLinha(linha);
        });

        //endregion


    } catch (e){
        log.erro(e);
    }

    return form;
};

// endregion


//region :: APIs

/**
 * Implementa API GET em módulos
 *    - get  | url: owner/pack/mod                       | Lista todos os registros do mod
 *    - get  | url: owner/pack/mod?query='teste um dois' | Filtra os registros do mod por query
 *    - get  | url: owner/pack/mod/123                   | Retorna o registro id=123
 */
BizObject.prototype.get = function *(ctx){
    var self = this;

    // Objeto de retorno:
    var ret = this.getReturnObj();

    try {

        // Template:
        var templID= this.params['template'] || '_list';

        // Evento onGet
        if (this['onGet']) {
            yield this.onGet(ret, ctx);
        }

        // Evento on[func]
        var func = ctx.state.api.call;
        if (func != 'get') {
            func = func.charAt(0).toUpperCase() + func.slice(1);
            if (this['on' + func]) {
                yield this['on' + func](ret, ctx);
            }
        } else {
            if (this['source'] && this.source['metadata'] && this.source.metadata['key']) {
                this.params[this.source.metadata.key] = ctx.state.api.path[3];
            }
        }

        // Template
        if (ret.template != '_no_template_') {
            var templ = yield this.engine.render(this.path.asString + '/' + templID, ctx, 'modulos');
            if (!this.params['_no_template_']) {
                ret.layout = templ;
                ret.template = templID;
            }
        }

        // Fields em template
        this.params._fields = this.engine.parseFields(templ);

        // Recupera provider
        var provId = 'default';
        if (this.params['provider']) {
            if (typeof this.params['provider'] == 'string'){
                provId = this.params['provider'];
            } else if (this.params['provider']['id']) {
                provId = this.params['provider']['id'];
            }
        }

        // Recupera dados
        ret.data = yield this.select(ctx, provId);

        // Evento onAfterGet
        if (this['onAfterGet']) {
            yield this.onAfterGet(ret, ctx);
        }

        // Evento onAfter[func]
        if (this['onAfter' + func]) {
            yield this['onAfter' + func](ret, ctx);
        }

    } catch (e){
        log.erro(e);
    }
    
    // Retorna
    return ret;
    
};

/**
 * Implementa API de forms para objetos de negócio
 *    - get  | url: owner/pack/mod/_new                  | Retorna um form para pré inserção
 *    - get  | url: owner/pack/mod/123/edit              | Retorna um form para edição do registro id=123
 */
BizObject.prototype.form = function *(ctx){
    var self = this;

    // Objeto de retorno:
    var ret = this.getReturnObj('form');
    try {
        ret.form = this.params['form'] || {};
        ret.form.key = this.params['key'];
        ret.form.field = ret.form['field'] || this.source.metadata.key;

        // Ajusta o key do form
        this.params[ret.form.field] = ret.form.key;

        // Pega o provider
        var provId = (this.params['provider'] && this.params['provider']['id']
            ? this.params['provider']['id']
            : 'default'
        );
        var provider = yield this.getProvider(provId);

        // Recupera o form
        ret.layout = yield this.getForm(provider, ctx);

        if (!ret.layout) {
            return log.erro("Form não encontrado: " + this.path.asString);
        }

        // Evento onEdit / onCreate
        var Func = this.state.api.call;
        Func = Func.charAt(0).toUpperCase() + Func.slice(1);
        if (this['on' + Func]) {
            yield this['on' + Func](ret, ctx);
        }

        // Fields em form
        this.params._fields = [];
        ret.layout.linhas.forEach((linha) => {
            for (var f in linha) {
                this.params._fields.push(f);
            }
        });

        // Evento onGet
        if (this['onGetFormData']) {
            yield this.onGetFormData(provider, ret, ctx);
        }

        // Recupera dados
        ret.data = yield this.select(ctx, provId);

        // Evento onAfterGet
        if (this['onAfter' + Func]) {
            yield this['onAfter' + Func](ret, ctx);
        }
    } catch (e){
        log.erro(e);
    }

    // Retorna
    return ret;
};

/**
 * Implementa API PUT em módulos
 *    - update  | url: owner/pack/mod/123                | Atualiza um registro no mod
 */
BizObject.prototype.update = function *(ctx){
    try {
        var key = this.source.metadata['key'];
        if (!this.params.row[key] && this.params['key']) {
            this.params.row[key] = this.params['key'];
        }
    } catch (e){
        log.erro(e);
    }
    return yield this.change('update', ctx);
};

/**
 * Implementa API POST em módulos
 *    - insert  | url: owner/pack/mod                    | Insere um novo registro no mod
 */
BizObject.prototype.insert = function *(ctx){
    var res = yield this.change('insert', ctx);

    if (res['result']){
        var key = this.source.metadata['key']
            , r = {}
        ;

        r['key'] = key;
        r['val'] = res['result'];
        r['_index_'] = this.params.row['_index_'];
        res['new'] = r;
    }

    return res;
};

/**
 * Implementa API DELETE em módulos
 *    - delete  | url: owner/pack/mod/123                 | Remove um registro no mod
 */
BizObject.prototype.delete = function *(ctx){

    // Ajusta row
    this.params.row = this.params['row'] || {};
    this.params.row[this.source.metadata.key] = this.params.row[this.source.metadata.key] || this.params.key;

    // Executa
    return yield this.change('delete', ctx);
};

//endregion


//region :: Dados

/**
 * Retorna um provider
 * @returns { {Promise} }
 */
BizObject.prototype.getProvider = function (provId, from, ctx){
    var provider = false;
    try {
        // Ajusta o dono
        var mod = this;

        if (typeof provId == 'string') {
            if (from) {
                mod = this.engine.initObj(from, ctx);
            }

            // Pega o provider
            provider = mod.providers[provId];
            if (!provider) {
                return log.erro('Provider ' + provId + 'não encontrado');
            }

            provider.id = provId;
            for (var s in provider.sources) {
                var src = provider.sources[s]
                    , s_own = mod.path.owner
                    , s_pck = mod.path.pack
                    , s_tbl
                    ;

                switch (src.from.length) {
                    case 1:
                        s_tbl = src.from[0];
                        break;

                    case 2:
                        s_pck = src.from[0];
                        s_tbl = src.from[1];
                        break;

                    case 3:
                        s_own = src.from[0];
                        s_pck = src.from[1];
                        s_tbl = src.from[2];
                        break;

                    default:
                        log.erro('Source em formato invalido no provider');
                }

                // Recupera
                var path = s_own + '/' + s_pck + '/' + s_tbl;
                if (mod.path.asString == path){
                    provider.sources[s]['src'] = mod.source;

                } else {
                    try {
                        var obj = require('business_objects/'
                            + path + '/'
                            + s_tbl + '.js'
                        );
                        var m = new obj();
                        provider.sources[s]['src'] = m.source;
                    } catch (e) {
                        log.erro(e,
                            'getProvider: ' + mod.path.asString + ' - ' + provId + '\n' +
                            'business_objects/'
                            + s_own + '/'
                            + s_pck + '/'
                            + s_tbl + '/'
                            + s_tbl + '.js'
                        );
                    }
                }
            }
        } else {
            provider = provId;
        }

        if (this.params['provider'] && util.isObject(this.params['provider'])) {
            provider = extend(true, provider, this.params['provider']);
        }

    } catch (e){
        log.erro(e);
    }

    return provider;
};

/**
 * Implementa uma operação de recuperação de dados
 * @param ctx
 * @param provider
 * @param params
 * @param from
 * @returns {*}
 */
BizObject.prototype.select = function *(ctx, provider, params, from){
    var dts = yield this.engine.getConnection(ctx);
    if (dts) {

        // Pega o provider
        var prov = (typeof provider == 'string'
            ? yield this.getProvider(provider, from, ctx)
            : provider
        );

        // Customiza
        extend(true, prov, params || {});

        if (this['onSelect']){
            yield this['onSelect'](prov, ctx);
        }

        // Executa
        return yield dts.select(prov, this);
    }
};

/**
 * Implementa uma operação de alteração de dados
 * @param op
 * @param ctx
 * @returns {{result: boolean}}
 */
BizObject.prototype.change = function *(op, ctx){
    var dts = yield this.engine.getConnection(ctx)
        , res = {
            success: false
        }
    ;

    if (dts) {
        try {

            // Recupera provider
            var provId = (this.params['provider'] && this.params['provider']['id']
                ? this.params['provider']['id']
                : 'update'
            );

            // Pega o provider
            var prov = yield this.getProvider(provId)
                , evento = op.charAt(0).toUpperCase() + op.slice(1)
            ;

            yield dts.startTransaction();

            // Para cada source
            for (var s in prov.sources){
                var source = prov.sources[s]
                    , mod = this
                ;

                // Mod externo
                if (source.from.toString() != this.path.asArray.toString()){
                    mod = this.engine.initObj(source.from, ctx);
                }

                if (mod['on' + evento]) {
                    yield mod['on' + evento](prov, ctx);
                }

                // Executa
                switch (op) {
                    case 'insert' :

                        // Atualiza keys inseridos
                        if (res['insert']){
                            mod.params.row = extend(mod.params.row, res.insert);
                        }

                        // Insere
                        res.success = yield dts.insert(source, mod);

                        // Propaga
                        if (res.success)
                        {
                            if (res.success != '_empty_values_') {
                                var key = source.src.metadata.key;
                                res['insert'] = res['insert'] || {};
                                res.insert[key] = res.success;
                                ctx.request.body.row[key] = res.success;
                            }
                        } 
                        break;

                    case 'update' :
                        res.success = yield dts.update(source, mod);
                        break;

                    case 'delete' :
                        res.success = yield dts.delete(source, mod);
                        break;
                }

                // Rollback em caso de falha
                if (!res.success){
                    yield dts.rollback();
                    return {success: false};
                }
                
                if (mod['onAfter' + evento]) {
                    yield mod['onAfter' + evento](res, ctx);
                }
            }

            yield dts.commit();

        } catch (e) {
            log.erro(e);
        }
    }

    // Retorna
    return res;
};


//endregion


//region :: Utils

BizObject.prototype.readDir = function(path, res){
    var fs          = require('fs-extra')
        , dir       = fs.readdirSync(path)
        , result    = res || []
        , fpath     = require('path')
    ;

    dir.forEach((d) => {
        if (d[0] != '.') {
            var p = {id: d, ext: '', sub: []}
                , new_path = path + '/' + d
                , is_dir = false
                , stat = fpath.parse(new_path)
                ;

            try {
                is_dir = fs.statSync(new_path).isDirectory();
            }
            catch (e) {
                is_dir = false;
            }

            if (is_dir) {
                this.readDir(new_path, p.sub);
            }
            p.ext = stat.ext;
            result.push(p);
        }
    });
    
    return result;
};


//endregion


// Exporta
module.exports = BizObject;