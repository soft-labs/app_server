/**
 * BusinessObject :: AppIntegItens
 *  Implementação de objeto de negócio: app_integ_itens.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:13:21 GMT-0300 (BRT)
 * @constructor
 */
function AppIntegItens(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_integ_itens';

    // Map
    this.source = {
        table: 'app_integ_itens',
        metadata: {
            key: 'app_integ_itens_key',
            label: app_integ_itens_key,
            fields: {
                app_integ_itens_key: {
                    tipo: types.comp.key, label: 'App Integ Itens:'
                }, 
                app_integracoes_key: {
                    tipo: types.comp.dropdown, label: 'App Integrações:',
                    data: { 
                        key: ['app_integracoes_key'], 
                        from: ['softlabs', 'app', 'app_integracoes'], 
                        template: '{row.app_integracoes_key} - {row.app_integracoe}', 
                        provider: '' 
                    } 
                }, 
                enviando: {
                    tipo: types.comp.int, label: 'Enviando:'
                }, 
                modulo: {
                    tipo: types.comp.text, label: 'Modulo:'
                }, 
                tabela: {
                    tipo: types.comp.text, label: 'Tabela:'
                }, 
                key_field: {
                    tipo: types.comp.text, label: 'Key Field:'
                }, 
                key_value: {
                    tipo: types.comp.text, label: 'Key Value:'
                }, 
                dt_transacao: {
                    tipo: types.comp.datetime, label: 'Dt Transação:'
                }, 
                ref_externa: {
                    tipo: types.comp.text, label: 'Ref Externa:'
                }, 
                observacoes: {
                    tipo: types.comp.text, label: 'Observações:'
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
                {titulo: "Informações de app_integ_itens"},
                {app_integ_itens_key: 25, app_integracoes_key: 25, enviando: 25, modulo: 25}, 
                {tabela: 25, key_field: 25, key_value: 25, dt_transacao: 25}, 
                {ref_externa: 25, observacoes: 75}
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
                    from: ['softlabs', 'app', 'app_integ_itens'],
                    fields: [
                        app_integ_itens_key
                    ]
                },
                1: { 
                    from: ['softlabs', 'app', 'app_integracoes'],
                        join: {source: 0, tipo: types.join.left, on: 'app_integracoes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_integ_itens_key', types.where.check]
            ],
            order: [
                ['0', 'app_integ_itens_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'app', 'app_integ_itens'],
                    key: 'app_integ_itens_key',
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
module.exports = AppIntegItens;