/**
 * BusinessObject :: ItemCompras
 *  Implementação de objeto de negócio: item_compras.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:25 GMT-0300 (BRT)
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
            label: 'codigo',
            fields: {
                item_compras_key: {
                    tipo: types.comp.key, label: 'Item Compras:'
                }, 
                items_key: {
                    tipo: types.comp.choose, label: 'Items:',
                    data: { 
                        key: ['items_key'], 
                        from: ['dbms', 'items', 'items'], 
                        template: '{items_key} - {item}', 
                        provider: '' 
                    } 
                }, 
                item_fabricantes_key: {
                    tipo: types.comp.choose, label: 'Item Fabricantes:',
                    data: { 
                        key: ['item_fabricantes_key'], 
                        from: ['dbms', 'items', 'item_fabricantes'], 
                        template: '{item_fabricantes_key} - {item_fabricante}', 
                        provider: '' 
                    } 
                }, 
                item_marcas_key: {
                    tipo: types.comp.choose, label: 'Item Marcas:',
                    data: { 
                        key: ['item_marcas_key'], 
                        from: ['dbms', 'items', 'item_marcas'], 
                        template: '{item_marcas_key} - {item_marca}', 
                        provider: '' 
                    } 
                }, 
                item_modelos_key: {
                    tipo: types.comp.choose, label: 'Item Modelos:',
                    data: { 
                        key: ['item_modelos_key'], 
                        from: ['dbms', 'items', 'item_modelos'], 
                        template: '{item_modelos_key} - {item_modelo}', 
                        provider: '' 
                    } 
                }, 
                item_embalagens_key: {
                    tipo: types.comp.choose, label: 'Item Embalagens:',
                    data: { 
                        key: ['item_embalagens_key'], 
                        from: ['dbms', 'items', 'item_embalagens'], 
                        template: '{item_embalagens_key} - {item_embalagen}', 
                        provider: '' 
                    } 
                }, 
                item_plano_reposicao_key: {
                    tipo: types.comp.choose, label: 'Item Plano Reposição:',
                    data: { 
                        key: ['item_plano_reposicao_key'], 
                        from: ['dbms', 'items', 'item_plano_reposicao'], 
                        template: '{item_plano_reposicao_key} - {item_plano_reposica}', 
                        provider: '' 
                    } 
                }, 
                unidades_key: {
                    tipo: types.comp.choose, label: 'Unidades:',
                    data: { 
                        key: ['unidades_key'], 
                        from: ['dbms', 'unidades', 'unidades'], 
                        template: '{unidades_key} - {unidade}', 
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
                size  : types.form.size.small,
                external: [

                ]
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
                codigo: {
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
                    from: ['dbms', 'items', 'item_compras'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'items', 'items'],
                    join: {source: 0, tipo: types.join.left, on: 'items_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'items', 'item_fabricantes'],
                    join: {source: 0, tipo: types.join.left, on: 'item_fabricantes_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'items', 'item_marcas'],
                    join: {source: 0, tipo: types.join.left, on: 'item_marcas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', 'items', 'item_modelos'],
                    join: {source: 0, tipo: types.join.left, on: 'item_modelos_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['dbms', 'items', 'item_embalagens'],
                    join: {source: 0, tipo: types.join.left, on: 'item_embalagens_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['dbms', 'items', 'item_plano_reposicao'],
                    join: {source: 0, tipo: types.join.left, on: 'item_plano_reposicao_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['dbms', 'unidades', 'unidades'],
                    join: {source: 0, tipo: types.join.left, on: 'unidades_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_compras_key', types.where.check]
            ],
            order: [
                [0, 'codigo', 'asc']
            ],
            search: [
                    {alias: 3, field: 'codigo',  param: types.search.like_full },
                    {alias: 3, field: 'item_compra',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'items', 'item_compras'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos


    //region :: onGet

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
    this.onAfterGet = function *(ret, ctx){

    };

    /* */
    //endregion

    
    //region :: onList
    
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
    this.onAfterList = function *(ret, ctx){

    };

     /* */
    //endregion

    
    //region :: onSearch
    
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
    this.onAfterSearch = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onSelect

    /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
     this.onSelect = function *(prov, ctx){

    };

     /* */
    //endregion


    //region :: onGetRow

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     *
     this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };

     /* */
    //endregion


    //region :: onGetForm

    /**
     * Evento chamado na recuperação de um formulário
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onGetForm = function *(form, ctx){

    };

     /**
     * Evento chamado na recuperação de dados de um formulário
     * @param ret Objeto de retorno
     *
    this.onGetFormData = function *(ret, get){

    };

     /* */
    //endregion


    //region :: onEdit
     
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
    this.onAfterEdit = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onCreate

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
    this.onAfterCreate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onInsert
     
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
    this.onAfterInsert = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onUpdate

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
    this.onAfterUpdate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onDelete

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
    this.onAfterDelete = function *(ret, ctx){

    };

     /* */
    //endregion


    /* */
    //endregion


    //region :: Regras de Negócio

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = ItemCompras;