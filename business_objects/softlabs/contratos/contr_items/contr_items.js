/**
 * BusinessObject :: ContrItems
 *  Implementação de objeto de negócio: contr_items.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:13 GMT-0300 (BRT)
 * @constructor
 */
function ContrItems(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contr_items';

    // Map
    this.source = {
        table: 'contr_items',
        metadata: {
            key: 'contr_items_key',
            fields: {
                contr_items_key: {
                    tipo: types.comp.key, label: 'Contr Items:'
                }, 
                items_key: {
                    tipo: types.comp.dropdown, label: 'Items:',
                    data: { 
                        key: ['items_key'], 
                        from: ['softlabs', 'items', 'items'], 
                        template: '{row.items_key} - {row.item}', 
                        provider: '' 
                    } 
                }, 
                contr_fases_key: {
                    tipo: types.comp.dropdown, label: 'Contr Fases:',
                    data: { 
                        key: ['contr_fases_key'], 
                        from: ['softlabs', 'contratos', 'contr_fases'], 
                        template: '{row.contr_fases_key} - {row.contr_fase}', 
                        provider: '' 
                    } 
                }, 
                quantidade: {
                    tipo: types.comp.float, label: 'Quantidade:'
                }, 
                valor_unit: {
                    tipo: types.comp.float, label: 'Valor Unit:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
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
                {titulo: "Informações de contr_items"},
                {contr_items_key: 25, items_key: 25, contr_fases_key: 25, quantidade: 25}, 
                {valor_unit: 25, observacoes: 75}
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
                    from: ['softlabs', 'contratos', 'contr_items'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'items', 'items'],
                        join: {source: 0, tipo: types.join.left, on: 'items_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contratos', 'contr_fases'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_fases_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contr_items_key', types.where.check]
            ],
            order: [
                ['0', 'contr_items_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contratos', 'contr_items'],
                    key: 'contr_items_key',
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
     * Evento chamado na operação POST :: Insert
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onInsert = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     *
     this.onAfterInsert = function *(ret){

    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onUpdate = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     *
     this.onAfterUpdate = function *(ret){

    };

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onDelete = function *(ret, ctx){

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
module.exports = ContrItems;