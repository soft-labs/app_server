/**
 * BusinessObject :: ContrItemLocacao
 *  Implementação de objeto de negócio: contr_item_locacao.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:14:28 GMT-0300 (BRT)
 * @constructor
 */
function ContrItemLocacao(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contr_item_locacao';

    // Map
    this.source = {
        table: 'contr_item_locacao',
        metadata: {
            key: ['contr_item_locacao_key', 'contr_item_locacaocol'],
            label: contr_item_locacao_key,
            fields: {
                contr_item_locacao_key: {
                    tipo: types.comp.key, label: 'Contr Item Locação:'
                }, 
                item_identificado_key: {
                    tipo: types.comp.dropdown, label: 'Item Identificado:',
                    data: { 
                        key: ['item_identificado_key'], 
                        from: ['softlabs', 'items', 'item_identificado'], 
                        template: '{row.item_identificado_key} - {row.item_identificad}', 
                        provider: '' 
                    } 
                }, 
                contr_items_key: {
                    tipo: types.comp.dropdown, label: 'Contr Items:',
                    data: { 
                        key: ['contr_items_key'], 
                        from: ['softlabs', 'contratos', 'contr_items'], 
                        template: '{row.contr_items_key} - {row.contr_item}', 
                        provider: '' 
                    } 
                }, 
                dt_inicio: {
                    tipo: types.comp.datetime, label: 'Dt Inicio:'
                }, 
                dt_encerramento: {
                    tipo: types.comp.datetime, label: 'Dt Encerramento:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }, 
                contr_item_locacaocol: {
                    tipo: types.comp.key, label: 'Contr Item Locaçãocol:'
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
                {titulo: "Informações de contr_item_locacao"},
                {contr_item_locacao_key: 25, item_identificado_key: 25, contr_items_key: 25, dt_inicio: 25}, 
                {dt_encerramento: 25, observacoes: 25, contr_item_locacaocol: 50}
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
                    from: ['softlabs', 'contratos', 'contr_item_locacao'],
                    fields: [
                        contr_item_locacao_key
                    ]
                },
                1: { 
                    from: ['softlabs', 'items', 'item_identificado'],
                        join: {source: 0, tipo: types.join.left, on: 'item_identificado_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contratos', 'contr_items'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_items_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contr_item_locacao_key', types.where.check],
                ['AND', 0, 'contr_item_locacaocol', types.where.check]
            ],
            order: [
                ['0', 'contr_item_locacao_key', 'desc'],
                ['0', 'contr_item_locacaocol', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contratos', 'contr_item_locacao'],
                    key: ['contr_item_locacao_key', 'contr_item_locacaocol'],
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
module.exports = ContrItemLocacao;