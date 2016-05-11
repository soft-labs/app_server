/**
 * BusinessObject :: Items
 *  Implementação de objeto de negócio: items.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:59 GMT-0300 (BRT)
 * @constructor
 */
function Items(){

    //region :: Definições do Objeto

    // Id
    this.id = 'items';

    // Map
    this.source = {
        table: 'items',
        metadata: {
            key: 'items_key',
            fields: {
                items_key: {
                    tipo: types.comp.key, label: 'Items:'
                }, 
                item_categorias_key: {
                    tipo: types.comp.dropdown, label: 'Item Categorias:',
                    data: { 
                        key: ['item_categorias_key'], 
                        from: ['softlabs', 'items', 'item_categorias'], 
                        template: '{row.item_categorias_key} - {row.item_categoria}', 
                        provider: '' 
                    } 
                }, 
                item_categ_sub_key: {
                    tipo: types.comp.dropdown, label: 'Item Categ Sub:',
                    data: { 
                        key: ['item_categ_sub_key'], 
                        from: ['softlabs', 'items', 'item_categ_sub'], 
                        template: '{row.item_categ_sub_key} - {row.item_categ_su}', 
                        provider: '' 
                    } 
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.dropdown, label: 'Cont Centros Resultado:',
                    data: { 
                        key: ['cont_centros_resultado_key'], 
                        from: ['softlabs', 'contabil', 'cont_centros_resultado'], 
                        template: '{row.cont_centros_resultado_key} - {row.cont_centros_resultad}', 
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Codigo:'
                }, 
                item: {
                    tipo: types.comp.text, label: 'Item:'
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
                {titulo: "Informações de items"},
                {items_key: 25, item_categorias_key: 25, item_categ_sub_key: 25, cont_centros_resultado_key: 25}, 
                {ativo: 25, codigo: 25, item: 25, observacoes: 25}
            ],
            ctrls: {
                item: {
                    extra_right: { class: '', tag: '' },
                    extra_left:  { class: '', tag: '' }
                }
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'items'],
                    fields: [
                        'item'
                    ]
                },
                1: { 
                    from: ['softlabs', 'items', 'item_categorias'],
                        join: {source: 0, tipo: types.join.left, on: 'item_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'items', 'item_categ_sub'],
                        join: {source: 0, tipo: types.join.left, on: 'item_categ_sub_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'contabil', 'cont_centros_resultado'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_centros_resultado_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'items_key', types.where.check]
            ],
            order: [
                [0, 'item', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'item',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'items'],
                    key: 'items_key',
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
module.exports = Items;