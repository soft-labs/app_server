/**
 * BusinessObject :: ItemIdentificado
 *  Implementação de objeto de negócio: item_identificado.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:59 GMT-0300 (BRT)
 * @constructor
 */
function ItemIdentificado(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_identificado';

    // Map
    this.source = {
        table: 'item_identificado',
        metadata: {
            key: 'item_identificado_key',
            fields: {
                item_identificado_key: {
                    tipo: types.comp.key, label: 'Item Identificado:'
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
                item_ident_tipos_key: {
                    tipo: types.comp.dropdown, label: 'Item Ident Tipos:',
                    data: { 
                        key: ['item_ident_tipos_key'], 
                        from: ['softlabs', 'items', 'item_ident_tipos'], 
                        template: '{row.item_ident_tipos_key} - {row.item_ident_tipo}', 
                        provider: '' 
                    } 
                }, 
                item_lotes_key: {
                    tipo: types.comp.dropdown, label: 'Item Lotes:',
                    data: { 
                        key: ['item_lotes_key'], 
                        from: ['softlabs', 'items', 'item_lotes'], 
                        template: '{row.item_lotes_key} - {row.item_lote}', 
                        provider: '' 
                    } 
                }, 
                identificacao: {
                    tipo: types.comp.text, label: 'Identificação:'
                }, 
                num_serie: {
                    tipo: types.comp.text, label: 'Num Serie:'
                }, 
                num_fabricante: {
                    tipo: types.comp.text, label: 'Num Fabricante:'
                }, 
                num_patrimonio: {
                    tipo: types.comp.text, label: 'Num Patrimonio:'
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
                {titulo: "Informações de item_identificado"},
                {item_identificado_key: 25, items_key: 25, item_ident_tipos_key: 25, item_lotes_key: 25}, 
                {identificacao: 25, num_serie: 25, num_fabricante: 25, num_patrimonio: 25}, 
                {observacoes: 100}
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
                    from: ['softlabs', 'items', 'item_identificado'],
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
                    from: ['softlabs', 'items', 'item_ident_tipos'],
                        join: {source: 0, tipo: types.join.left, on: 'item_ident_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'items', 'item_lotes'],
                        join: {source: 0, tipo: types.join.left, on: 'item_lotes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_identificado_key', types.where.check]
            ],
            order: [
                ['0', 'item_identificado_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'item_identificado'],
                    key: 'item_identificado_key',
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
module.exports = ItemIdentificado;