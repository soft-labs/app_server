/**
 * Engine de aplicações - TShark.
 *  Roteamentos e entradas de APIs para componentes com ponto
 *  de entrada 'comps'
 * @author labs
 * @since 01/01/2016
 * @constructor
 */
const router  = require('koa-router')()
    , log     = require('tshark/_log.js')
    , extend    = require('extend')
    , fs        = require('fs-extra')
    , util      = require('util')
    , cookies   = require('tshark/cookie.js')
;


/**
 * Entrada de API :: GET
 *   Oferece suporte para apis:
 *    - get  | url: owner/pack/mod                       | Lista todos os registros do mod
 *    - get  | url: owner/pack/mod?query='teste um dois' | Filtra os registros do mod por query
 *    - get  | url: owner/pack/mod/123                   | Retorna o registro id=123
 *    - get  | url: owner/pack/mod/new                   | Retorna um form para pré inserção
 *    - get  | url: owner/pack/mod/123/edit              | Retorna um form para edição do registro id=123
 * @since 21/02/16
 */
router.get(/\/comps\/dropdown\/(\w+)\/(\w+)\/(\w+)/, function *(next) {
    try {

        /**
         * Instancia o módulo
         * @type BizObject
         */
        var mod = this.app.engine.initObj(this.state.api.path, this)
            , opts = {
                success: true,
                results: []
            }
            , label = mod.source.metadata['label']
            ;

        mod.params['query'] = decodeURIComponent(this.state.api.path[3]);

        // Recupera dados
        var data = yield mod.select(this, mod.params.provider || 'default', {
            sources: {
                0: {
                    fields: [label, mod.params.label.replace(/\W/g, '')]
                }
            },
            search: [
                {alias: 0, field: label, param: types.search.like_full}
            ],
            showSQL: false
        });

        data.rows.forEach(r => {
            opts.results.push({
                name: r[label],
                value: r[mod.source.metadata['key']]
            })
        });
        this.body = opts;

    } catch (e){
        log.erro(e);
    }

    /**
     * Finaliza
     */
    //yield next;
});


module.exports = router;
