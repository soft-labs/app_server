/**
 * BusinessObject :: AppAutRequisicoes
 *  Implementação de objeto de negócio: app_aut_requisicoes.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:44:24 GMT-0300 (BRT)
 * @constructor
 */
function AppAutRequisicoes(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_aut_requisicoes';

    // Map
    this.source = {
        table: 'app_aut_requisicoes',
        metadata: {
            key: 'app_aut_requisicoes_key',
            fields: {
                app_aut_requisicoes_key: {
                    tipo: types.comp.key, label: 'App Aut Requisições:'
                }, 
                app_aut_regras_key: {
                    tipo: types.comp.dropdown, label: 'App Aut Regras:',
                    data: { 
                        key: ['app_aut_regras_key'], 
                        from: ['softlabs', 'app', 'app_aut_regras'], 
                        template: '{row.app_aut_regras_key} - {row.app_aut_regra}', 
                        provider: '' 
                    } 
                }, 
                app_autorizadores_key: {
                    tipo: types.comp.dropdown, label: 'App Autorizadores:',
                    data: { 
                        key: ['app_autorizadores_key'], 
                        from: ['softlabs', 'app', 'app_autorizadores'], 
                        template: '{row.app_autorizadores_key} - {row.app_autorizadore}', 
                        provider: '' 
                    } 
                }, 
                dt_requisicao: {
                    tipo: types.comp.datetime, label: 'Dt Requisição:'
                }, 
                dt_resolucao: {
                    tipo: types.comp.datetime, label: 'Dt Resolução:'
                }, 
                liberado: {
                    tipo: types.comp.int, label: 'Liberado:'
                }, 
                observacoes: {
                    tipo: types.comp.text, label: 'Observações:'
                }, 
                sec_usuarios_key: {
                    tipo: types.comp.dropdown, label: 'Sec Usuarios:',
                    data: { 
                        key: ['sec_usuarios_key'], 
                        from: ['softlabs', 'security', 'sec_usuarios'], 
                        template: '{row.sec_usuarios_key} - {row.sec_usuario}', 
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
                {titulo: "Informações de app_aut_requisicoes"},
                {app_aut_requisicoes_key: 25, app_aut_regras_key: 25, app_autorizadores_key: 25, dt_requisicao: 25}, 
                {dt_resolucao: 25, liberado: 25, observacoes: 25, sec_usuarios_key: 25}
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
                    from: ['softlabs', 'app', 'app_aut_requisicoes'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'app', 'app_aut_regras'],
                        join: {source: 0, tipo: types.join.left, on: 'app_aut_regras_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'app', 'app_autorizadores'],
                        join: {source: 0, tipo: types.join.left, on: 'app_autorizadores_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'security', 'sec_usuarios'],
                        join: {source: 0, tipo: types.join.left, on: 'sec_usuarios_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_aut_requisicoes_key', types.where.check]
            ],
            order: [
                ['0', 'app_aut_requisicoes_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'app', 'app_aut_requisicoes'],
                    key: 'app_aut_requisicoes_key',
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
module.exports = AppAutRequisicoes;