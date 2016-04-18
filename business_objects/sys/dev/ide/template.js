/**
 * BusinessObject :: _MOD_
 *  Implementação de objeto de negócio: _ID_.
 *
 * Engine de aplicações - TShark.
 * @since _DATA_
 * @constructor
 */
function _MOD_(){

    //region :: Definições do Objeto

    // Id
    this.id = '_ID_';

    // Map
    this.source = {
        table: '_ID_',
        metadata: {
            key: '_KEY_',
            fields: {_FIELDS_
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

}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = _MOD_;