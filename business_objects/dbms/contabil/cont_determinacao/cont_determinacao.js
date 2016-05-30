/**
 * BusinessObject :: ContDeterminacao
 *  Implementação de objeto de negócio: cont_determinacao.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:35 GMT-0300 (BRT)
 * @constructor
 */
function ContDeterminacao(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_determinacao';

    // Map
    this.source = {
        table: 'cont_determinacao',
        metadata: {
            key: 'cont_determinacao_key',
            label: '',
            fields: {
                cont_determinacao_key: {
                    tipo: types.comp.key, label: 'Cont Determinação:'
                }, 
                conta_receitas_key: {
                    tipo: types.comp.choose, label: 'Conta Receitas:',
                    data: { 
                        key: ['conta_receitas_key'], 
                        from: ['dbms', '', 'conta_receitas'], 
                        template: '{conta_receitas_key} - {conta_receita}', 
                        provider: '' 
                    } 
                }, 
                conta_despesas_key: {
                    tipo: types.comp.choose, label: 'Conta Despesas:',
                    data: { 
                        key: ['conta_despesas_key'], 
                        from: ['dbms', '', 'conta_despesas'], 
                        template: '{conta_despesas_key} - {conta_despesa}', 
                        provider: '' 
                    } 
                }, 
                conta_diferencas_key: {
                    tipo: types.comp.choose, label: 'Conta Diferencas:',
                    data: { 
                        key: ['conta_diferencas_key'], 
                        from: ['dbms', '', 'conta_diferencas'], 
                        template: '{conta_diferencas_key} - {conta_diferenca}', 
                        provider: '' 
                    } 
                }, 
                cont_credito_compras_key: {
                    tipo: types.comp.choose, label: 'Cont Credito Compras:',
                    data: { 
                        key: ['cont_credito_compras_key'], 
                        from: ['dbms', 'contabil', 'cont_credito_compras'], 
                        template: '{cont_credito_compras_key} - {cont_credito_compra}', 
                        provider: '' 
                    } 
                }, 
                conta_credito_venda_key: {
                    tipo: types.comp.choose, label: 'Conta Credito Venda:',
                    data: { 
                        key: ['conta_credito_venda_key'], 
                        from: ['dbms', 'contabil', 'conta_credito_venda'], 
                        template: '{conta_credito_venda_key} - {conta_credito_vend}', 
                        provider: '' 
                    } 
                }, 
                conta_venda_gratis_key: {
                    tipo: types.comp.choose, label: 'Conta Venda Gratis:',
                    data: { 
                        key: ['conta_venda_gratis_key'], 
                        from: ['dbms', 'contabil', 'conta_venda_gratis'], 
                        template: '{conta_venda_gratis_key} - {conta_venda_grati}', 
                        provider: '' 
                    } 
                }, 
                conta_compra_gratis_key: {
                    tipo: types.comp.choose, label: 'Conta Compra Gratis:',
                    data: { 
                        key: ['conta_compra_gratis_key'], 
                        from: ['dbms', 'contabil', 'conta_compra_gratis'], 
                        template: '{conta_compra_gratis_key} - {conta_compra_grati}', 
                        provider: '' 
                    } 
                }, 
                conta_cmv_key: {
                    tipo: types.comp.choose, label: 'Conta Cmv:',
                    data: { 
                        key: ['conta_cmv_key'], 
                        from: ['dbms', 'contabil', 'conta_cmv'], 
                        template: '{conta_cmv_key} - {conta_cm}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_key: {
                    tipo: types.comp.choose, label: 'Conta Estoque:',
                    data: { 
                        key: ['conta_estoque_key'], 
                        from: ['dbms', 'contabil', 'conta_estoque'], 
                        template: '{conta_estoque_key} - {conta_estoqu}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_transito_key: {
                    tipo: types.comp.choose, label: 'Conta Estoque Transito:',
                    data: { 
                        key: ['conta_estoque_transito_key'], 
                        from: ['dbms', 'contabil', 'conta_estoque_transito'], 
                        template: '{conta_estoque_transito_key} - {conta_estoque_transit}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_perdas_key: {
                    tipo: types.comp.choose, label: 'Conta Estoque Perdas:',
                    data: { 
                        key: ['conta_estoque_perdas_key'], 
                        from: ['dbms', 'contabil', 'conta_estoque_perdas'], 
                        template: '{conta_estoque_perdas_key} - {conta_estoque_perda}', 
                        provider: '' 
                    } 
                }, 
                emp_depositos_key: {
                    tipo: types.comp.choose, label: 'Emp Depositos:',
                    data: { 
                        key: ['emp_depositos_key'], 
                        from: ['dbms', 'empresas', 'emp_depositos'], 
                        template: '{emp_depositos_key} - {emp_deposito}', 
                        provider: '' 
                    } 
                }, 
                item_categorias_key: {
                    tipo: types.comp.choose, label: 'Item Categorias:',
                    data: { 
                        key: ['item_categorias_key'], 
                        from: ['dbms', 'items', 'item_categorias'], 
                        template: '{item_categorias_key} - {item_categoria}', 
                        provider: '' 
                    } 
                }, 
                item_categ_sub_key: {
                    tipo: types.comp.choose, label: 'Item Categ Sub:',
                    data: { 
                        key: ['item_categ_sub_key'], 
                        from: ['dbms', 'items', 'item_categ_sub'], 
                        template: '{item_categ_sub_key} - {item_categ_su}', 
                        provider: '' 
                    } 
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
                dt_inicio: {
                    tipo: types.comp.date, label: 'Dt Inicio:'
                }, 
                dt_final: {
                    tipo: types.comp.date, label: 'Dt Final:'
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
                {titulo: "Informações de cont_determinacao"},
                {cont_determinacao_key: 25, conta_receitas_key: 25, conta_despesas_key: 25, conta_diferencas_key: 25}, 
                {cont_credito_compras_key: 25, conta_credito_venda_key: 25, conta_venda_gratis_key: 25, conta_compra_gratis_key: 25}, 
                {conta_cmv_key: 25, conta_estoque_key: 25, conta_estoque_transito_key: 25, conta_estoque_perdas_key: 25}, 
                {emp_depositos_key: 25, item_categorias_key: 25, item_categ_sub_key: 25, items_key: 25}, 
                {dt_inicio: 25, dt_final: 25, observacoes: 50}
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
                    from: ['dbms', 'contabil', 'cont_determinacao'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', '', 'conta_receitas'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_receitas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', '', 'conta_despesas'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_despesas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', '', 'conta_diferencas'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_diferencas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', 'contabil', 'cont_credito_compras'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_credito_compras_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['dbms', 'contabil', 'conta_credito_venda'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_credito_venda_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['dbms', 'contabil', 'conta_venda_gratis'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_venda_gratis_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['dbms', 'contabil', 'conta_compra_gratis'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_compra_gratis_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: { 
                    from: ['dbms', 'contabil', 'conta_cmv'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_cmv_key', where: ''},
                    fields: [
                        
                    ]
                },
                9: { 
                    from: ['dbms', 'contabil', 'conta_estoque'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_estoque_key', where: ''},
                    fields: [
                        
                    ]
                },
                10: { 
                    from: ['dbms', 'contabil', 'conta_estoque_transito'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_estoque_transito_key', where: ''},
                    fields: [
                        
                    ]
                },
                11: { 
                    from: ['dbms', 'contabil', 'conta_estoque_perdas'],
                    join: {source: 0, tipo: types.join.left, on: 'conta_estoque_perdas_key', where: ''},
                    fields: [
                        
                    ]
                },
                12: { 
                    from: ['dbms', 'empresas', 'emp_depositos'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_depositos_key', where: ''},
                    fields: [
                        
                    ]
                },
                13: { 
                    from: ['dbms', 'items', 'item_categorias'],
                    join: {source: 0, tipo: types.join.left, on: 'item_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                14: { 
                    from: ['dbms', 'items', 'item_categ_sub'],
                    join: {source: 0, tipo: types.join.left, on: 'item_categ_sub_key', where: ''},
                    fields: [
                        
                    ]
                },
                15: { 
                    from: ['dbms', 'items', 'items'],
                    join: {source: 0, tipo: types.join.left, on: 'items_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_determinacao_key', types.where.check]
            ],
            order: [
                ['0', 'cont_determinacao_key', 'desc']
            ],
            search: [
                    {alias: 2, field: 'dt_inicio',  param: types.search.maior_igual },
                    {alias: 2, field: 'dt_final',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_determinacao'],
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
module.exports = ContDeterminacao;