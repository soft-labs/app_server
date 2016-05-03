/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Menu(){


    //region :: Definições do Objeto

    // Id
    this.id = 'menu';

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


    //region :: Funções

    /**
     * Overwrite de list para retornar o menu da aplicação
     * importando menu.js em flowPath.up
     * @param ctx
     * @returns {Type.data}
     */
    this.get = function *(ctx) {
        var fs       = require('fs-extra')
            , reload = require('require-reload')(require)
            , d      = false
        ;

        ctx.state.config.flowPaths.up.forEach((path) => {
            var arq = path + 'menu.js';
            if (!d && fs.existsSync(arq)) {
                d = types.dataset();
                d.data = reload(arq);
            }
        });

        return d;
    };
    

    //endregion

}

/**
 * @type Types
 */
const types = require('../../../../tshark/types');


// Exporta
module.exports = Menu;