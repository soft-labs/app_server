/**
 * BusinessObject :: AppAutorizadoresRel
 *  Implementação de objeto de negócio: app_autorizadores_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:44:24 GMT-0300 (BRT)
 * @constructor
 */
function AppAutorizadoresRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_autorizadores_rel';

    // Map
    this.source = {
        table: 'app_autorizadores_rel',
        metadata: {
            key: ['app_autorizacoes_key', 'app_autorizadores_key'],
            fields: {
                app_autorizacoes_key: {
                    tipo: types.comp.key, label: 'App Autorizações:',
                    data: { 
                        key: ['app_autorizacoes_key'], 
                        from: ['softlabs', 'app', 'app_autorizacoes'], 
                        template: '{row.app_autorizacoes_key} - {row.app_autorizacoe}', 
                        provider: '' 
                    } 
                }, 
                app_autorizadores_key: {
                    tipo: types.comp.key, label: 'App Autorizadores:',
                    data: { 
                        key: ['app_autorizadores_key'], 
                        from: ['softlabs', 'app', 'app_autorizadores'], 
                        template: '{row.app_autorizadores_key} - {row.app_autorizadore}', 
                        provider: '' 
                    } 
                }
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
                {titulo: "Informações de app_autorizadores_rel"},
                {app_autorizacoes_key: 25, app_autorizadores_key: 75}
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
                0: {
                    from: ['softlabs', 'app', 'app_autorizadores_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'app', 'app_autorizacoes'],
                        join: {source: 0, tipo: types.join.left, on: 'app_autorizacoes_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'app', 'app_autorizadores'],
                        join: {source: 0, tipo: types.join.left, on: 'app_autorizadores_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_autorizacoes_key', types.where.check],
                ['AND', 0, 'app_autorizadores_key', types.where.check]
            ],
            order: [
                ['0', 'app_autorizacoes_key', 'desc'],
                ['0', 'app_autorizadores_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'app', 'app_autorizadores_rel'],
                    key: ['app_autorizacoes_key', 'app_autorizadores_key'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos

    /**
     * Evento chamado no início de qualquer operação GET
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onGet = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final de qualquer operação GET
     * @param ret Objeto de retorno
     *
    this.onAfterGet = function *(ret){

    };

    /**
     * Evento chamado na operação GET :: LIST
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onList = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: LIST
     * @param ret Objeto de retorno
     *
    this.onAfterList = function *(ret){

    };

    /**
     * Evento chamado na operação GET :: SEARCH
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onSearch = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: SEARCH
     * @param ret Objeto de retorno
     *
    this.onAfterSearch = function *(ret){

    };

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     *
    this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };
     
    /**
     * Evento chamado na operação GET :: EDIT
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onEdit = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: EDIT
     * @param ret Objeto de retorno
     *
    this.onAfterEdit = function *(ret){

    };

    /**
     * Evento chamado na operação GET :: CREATE
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onCreate = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: CREATE
     * @param ret Objeto de retorno
     *
    this.onAfterCreate = function *(ret){

    };

    /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onSelect = function *(prov, ctx){

    };
     
    /**
     * Evento chamado na operação POST :: Insert
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onInsert = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     *
    this.onAfterInsert = function *(ret){

    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onUpdate = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     *
    this.onAfterUpdate = function *(ret){

    };

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onDelete = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação DELETE :: Delete
     * @param ret Objeto de retorno
     *
    this.onAfterDelete = function *(ret){

    };
     
     
    /* */

    //endregion


    //region :: Regras de Negócio

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = AppAutorizadoresRel;