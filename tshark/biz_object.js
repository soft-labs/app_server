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
    , log       = require('./_log');

//endregion


// region :: Métodos internos

/**
 * Retorna um objeto de resposta padrão
 * @param api
 * @returns {{status: number, success: boolean, layout: {}, data: Array}}
 */
BizObject.prototype.getReturnObj = function (){
    return {
        status: 200,
        success: true,
        path: this.path.asArray,
        layout: { },
        data: []
    };
};


/**
 * Retorna um provider
 * @returns { {Promise} }
 */
BizObject.prototype.getProvider = function (provId, from){

    // Ajusta o dono
    var mod = this;

    if (typeof provId == 'string') {
        if (from) {
            mod = require('business_objects/'
                + from[0] + '/'
                + from[1] + '/'
                + from[2] + '/'
                + from[3] + '.js'
            );
        }

        // Pega o provider
        var provider = mod.providers[provId];
        if (!provider) {
            log.erro('Provider ' + provId + 'não encontrado');
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
            try {
                var obj = require('business_objects/'
                    + s_own + '/'
                    + s_pck + '/'
                    + s_tbl + '/'
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
    } else {
        provider = provId;
    }

    return provider;
};


/**
 * Retorna um form
 * @param provider
 * @returns {*}
 */
BizObject.prototype.getForm = function (provider){
    var formId = (
        this.params['form'] && this.params['form']['id']
            ? this.params['form']['id']
            : 'update'
    );
    var form = this.forms[formId];
    if (!form) { return false; }


    //region :: Ajusta config

    form['_config']        = form['_config']        || {};
    form._config['bounds'] = form._config['bounds'] || { width: 800, height: 450 };
    form._config['labels'] = form._config['labels'] || types.form.lines.labels.ontop;
    form._config['comps']  = form._config['comps']  || types.form.lines.distribution.percent;
    form._config['state']  = form._config['state']  || types.form.state.loading;
    form._config['size']   = form._config['size']   || types.form.size.small;

    //endregion


    // region :: Ajusta Ctrls

    var meta = {};
    if (provider){
        for(var s in provider.sources){
            var src     = provider.sources[s]['src']
                //, mod   = this.getObjViaFrom(req, src.from)
            ;
            extend(true, meta, src.metadata);
        }
    } else {
        extend(true, meta, this.source.metadata);
    }

    var self = this;
    form['ctrls'] = form['ctrls'] || {};
    form.linhas.forEach(function(linha){
        for(var ctrl in linha){

            // Pega o comp no meta e ajusta tipo
            var comp = (meta.fields[ctrl]
                ? extend(meta.fields[ctrl], meta.fields[ctrl]['tipo'])
                : {}
            );

            // Se o comp tá sobreescrito em ctrls
            if (form.ctrls[ctrl]){
                extend(true, comp, form.ctrls[ctrl]);
                if(form.ctrls[ctrl]['tipo']) {
                    extend(true, comp, form.ctrls[ctrl]['tipo'] || {});
                }
            }

            // Comp com dataset
            /*if (comp['data']){
                var mod = self.getObjViaFrom(req, comp['data']['from']);

                // Recupera provider
                var prov = mod.getProvider({
                    query: {
                        provider: {id: comp['data']['provider']}
                    }
                });

                // Recupera dados
                if (prov) {
                    var ds = mod.getDataSource(req);
                    var r = ds.load(prov, req);
                    comp.data['rows'] = r;
                }
            }*/

            // Entrega
            delete(comp['tipo']);
            form.ctrls[ctrl] = comp;
        }

    });

    // endregion

    return form;
};

// endregion


// region :: APIs


/**
 * Implementa API GET em módulos
 * @returns {{ Promise }}
 */
BizObject.prototype.get = function *(ctx){
    var self = this;

    // Objeto de retorno:
    var ret = this.getReturnObj();

    // Template:
    ret.template = this.params['template'] || 'list';

    // Evento onGet
    if (this['onGet']){
        yield this.onGet(ret, ctx);
    }
    
    // Evento on[func]
    var func = ctx.state.api.call;
    func = func.charAt(0).toUpperCase() + func.slice(1);
    if (this['on' + func]){
        yield this['on' + func](ret, ctx);
    }
    
    // Template
    var templ = yield this.engine.render(this.path.asString + '/' + ret.template, ctx, 'modulos');
    if (!this.params['_no_template_']) {
        ret.layout[ret.template] = templ;
    }

    // Fields em template
    this.params._fields = this.engine.parseFields(templ);
        
    // Recupera provider
    var provId = (this.params['provider'] && this.params['provider']['id']
        ? this.params['provider']['id']
        : 'default'
    );

    // Recupera dados
    ret.data = yield this.select(ctx, provId);

    // Evento onAfterGet
    if (this['onAfterGet']){
        yield this.onAfterGet(ret, ctx);
    }

    // Evento onAfter[func]
    if (this['onAfter' + func]){
        yield this['onAfter' + func](ret, ctx);
    }
    
    // Retorna
    return ret;
    
};


/**
 * Implementa API de forms para objetos de negócio
 * @returns {{ Promise }}
 */
BizObject.prototype.form = function *(ctx){
    var self = this;

    // Objeto de retorno:
    var ret      = this.getReturnObj('form');
    ret.form     = this.params['form'] || {};
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
    ret.layout = this.getForm(provider);

    // Evento onGet
    if (this['onGetForm']){
        yield this.onGetForm(ret, ctx);
    }

    if (!ret.layout) {
        return log.erro("Form não encontrado: " + this.path.asString);
    }

    // Fields em form
    this.params._fields = [];
    ret.layout.linhas.forEach((linha) => {
        for (var f in linha) {
            this.params._fields.push(f);
        }
    });

    // Evento onGet
    if (this['onGetFormData']){
        yield this.onGetFormData(provider, ret, ctx);
    }

    // Recupera dados
    ret.data = yield this.select(ctx, provId);

    // Evento onAfterGet
    if (this['onAfterGetForm']){
        yield this.onAfterGetForm(ret, ctx);
    }

    // Retorna
    return ret;
};


// endregion


//region :: CRUD

BizObject.prototype.select = function *(ctx, provider, params, from){
    var dts = yield this.engine.getConnection(ctx);
    if (dts) {

        // Pega o provider
        var prov = (typeof provider == 'string'
            ? yield this.getProvider(provider, from)
            : provider
        );

        // Customiza
        extend(true, prov, params || {});

        // Executa
        return yield dts.select(prov, this);
    }
};


BizObject.prototype.insert = function(provider, params){

};

BizObject.prototype.update = function(provider, params){

};

BizObject.prototype.delete = function(provider, params){

};

BizObject.prototype.exec = function(provider, params){

};

//endregion


//region :: Utils

BizObject.prototype.readDir = function(path, res){
    var fs          = require('fs-extra')
        , dir       = fs.readdirSync(path)
        , result    = res || []
    ;

    dir.forEach((d) => {
        var p           = { id: d, sub: []}
            , new_path  = path + '/' + d
            , is_dir    = false
        ;

        try {
            is_dir = fs.statSync(new_path).isDirectory();
        }
        catch (e) {
            is_dir = false;
        }

        if (is_dir){
            this.readDir(new_path, p.sub);
        }
        
        result.push(p);
    });
    
    return result;
};


//endregion


// Exporta
module.exports = BizObject;