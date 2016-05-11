/**
 * BusinessObject :: ItemCompras
 *  Implementação de objeto de negócio: item_compras.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:59 GMT-0300 (BRT)
 * @constructor
 */
function ItemCompras(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_compras';

    // Map
    this.source = {
        table: 'item_compras',
        metadata: {
            key: 'item_compras_key',
            fields: {
                item_compras_key: {
                    tipo: types.comp.key, label: 'Item Compras:'
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
                item_fabricantes_key: {
                    tipo: types.comp.dropdown, label: 'Item Fabricantes:',
                    data: { 
                        key: ['item_fabricantes_key'], 
                        from: ['softlabs', 'items', 'item_fabricantes'], 
                        template: '{row.item_fabricantes_key} - {row.item_fabricante}', 
                        provider: '' 
                    } 
                }, 
                item_marcas_key: {
                    tipo: types.comp.dropdown, label: 'Item Marcas:',
                    data: { 
                        key: ['item_marcas_key'], 
                        from: ['softlabs', 'items', 'item_marcas'], 
                        template: '{row.item_marcas_key} - {row.item_marca}', 
                        provider: '' 
                    } 
                }, 
                item_modelos_key: {
                    tipo: types.comp.dropdown, label: 'Item Modelos:',
                    data: { 
                        key: ['item_modelos_key'], 
                        from: ['softlabs', 'items', 'item_modelos'], 
                        template: '{row.item_modelos_key} - {row.item_modelo}', 
                        provider: '' 
                    } 
                }, 
                item_embalagens_key: {
                    tipo: types.comp.dropdown, label: 'Item Embalagens:',
                    data: { 
                        key: ['item_embalagens_key'], 
                        from: ['softlabs', 'items', 'item_embalagens'], 
                        template: '{row.item_embalagens_key} - {row.item_embalagen}', 
                        provider: '' 
                    } 
                }, 
                item_plano_reposicao_key: {
                    tipo: types.comp.dropdown, label: 'Item Plano Reposição:',
                    data: { 
                        key: ['item_plano_reposicao_key'], 
                        from: ['softlabs', 'items', 'item_plano_reposicao'], 
                        template: '{row.item_plano_reposicao_key} - {row.item_plano_reposica}', 
                        provider: '' 
                    } 
                }, 
                unidades_key: {
                    tipo: types.comp.dropdown, label: 'Unidades:',
                    data: { 
                        key: ['unidades_key'], 
                        from: ['softlabs', 'unidades', 'unidades'], 
                        template: '{row.unidades_key} - {row.unidade}', 
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Codigo:'
                }, 
                item_compra: {
                    tipo: types.comp.text, label: 'Item Compra:'
                }, 
                quantidade: {
                    tipo: types.comp.float, label: 'Quantidade:'
                }, 
                qtd_embalagem: {
                    tipo: types.comp.float, label: 'Qtd Embalagem:'
                }, 
                ult_compra_data: {
                    tipo: types.comp.datetime, label: 'Ult Compra Data:'
                }, 
                ult_compra_qtd: {
                    tipo: types.comp.float, label: 'Ult Compra Qtd:'
                }, 
                ult_compra_preco: {
                    tipo: types.comp.float, label: 'Ult Compra Preco:'
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
                {titulo: "Informações de item_compras"},
                {item_compras_key: 25, items_key: 25, item_fabricantes_key: 25, item_marcas_key: 25}, 
                {item_modelos_key: 25, item_embalagens_key: 25, item_plano_reposicao_key: 25, unidades_key: 25}, 
                {ativo: 25, codigo: 25, item_compra: 25, quantidade: 25}, 
                {qtd_embalagem: 25, ult_compra_data: 25, ult_compra_qtd: 25, ult_compra_preco: 25}, 
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
                    from: ['softlabs', 'items', 'item_compras'],
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
                    from: ['softlabs', 'items', 'item_fabricantes'],
                        join: {source: 0, tipo: types.join.left, on: 'item_fabricantes_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'items', 'item_marcas'],
                        join: {source: 0, tipo: types.join.left, on: 'item_marcas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'items', 'item_modelos'],
                        join: {source: 0, tipo: types.join.left, on: 'item_modelos_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'items', 'item_embalagens'],
                        join: {source: 0, tipo: types.join.left, on: 'item_embalagens_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['softlabs', 'items', 'item_plano_reposicao'],
                        join: {source: 0, tipo: types.join.left, on: 'item_plano_reposicao_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['softlabs', 'unidades', 'unidades'],
                        join: {source: 0, tipo: types.join.left, on: 'unidades_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_compras_key', types.where.check]
            ],
            order: [
                ['0', 'item_compras_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'item_compras'],
                    key: 'item_compras_key',
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
module.exports = ItemCompras;