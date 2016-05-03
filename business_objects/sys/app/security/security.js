/**
 * Implementação genérica de segurança.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:13:34 GMT-0300 (BRT)
 * @constructor
 */
function Security(){


    //region :: Definições do Objeto

    // Id
    this.id = 'security';

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
     * Implementa o login de um usuário
     * @param ctx
     * @returns {Type.data}
     */
    this.login = function *(ctx) {

        // Login via simple security
        if (this.state.config.security.mode == 'simple'){
            if (!this.state.config.security.users[this.params['username']]){
                return false;
            }
            
            if (this.state.config.security.users[this.params['username']] != this.params['password']){
                return false;
            }

        // Login via módulo de segurança
        } else {

        }

        var cookies     = require('../../../../tshark/cookie')
            , user_key  = cookies.setLoggedUser(ctx, ctx.state.config.app.join('/'))
        ;

        return user_key;
    };

    /**
     * Efetua o logout
     * @param ctx
     * @returns {boolean}
     */
    this.logout = function *(ctx){
        var cookies     = require('../../../../tshark/cookie')
            , user_key  = cookies.clearCoockie(ctx, ctx.state.config.app.join('/'))
        ;

        delete ctx.app.context.running[this.state.user_key];
        
        return true;
    };

    //endregion

}

/**
 * @type Types
 */
const types = require('../../../../tshark/types');


// Exporta
module.exports = Security;