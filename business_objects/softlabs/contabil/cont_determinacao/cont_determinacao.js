/**
 * BusinessObject :: ContDeterminacao
 *  Implementação de objeto de negócio: cont_determinacao.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:11:58 GMT-0300 (BRT)
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
            fields: {
                cont_determinacao_key: {
                    tipo: types.comp.key, label: 'Cont Determinação:'
                }, 
                conta_receitas_key: {
                    tipo: types.comp.dropdown, label: 'Conta Receitas:',
                    data: { 
                        key: ['conta_receitas_key'], 
                        from: ['softlabs', '', 'conta_receitas'], 
                        template: '{row.conta_receitas_key} - {row.conta_receita}', 
                        provider: '' 
                    } 
                }, 
                conta_despesas_key: {
                    tipo: types.comp.dropdown, label: 'Conta Despesas:',
                    data: { 
                        key: ['conta_despesas_key'], 
                        from: ['softlabs', '', 'conta_despesas'], 
                        template: '{row.conta_despesas_key} - {row.conta_despesa}', 
                        provider: '' 
                    } 
                }, 
                conta_diferencas_key: {
                    tipo: types.comp.dropdown, label: 'Conta Diferencas:',
                    data: { 
                        key: ['conta_diferencas_key'], 
                        from: ['softlabs', '', 'conta_diferencas'], 
                        template: '{row.conta_diferencas_key} - {row.conta_diferenca}', 
                        provider: '' 
                    } 
                }, 
                cont_credito_compras_key: {
                    tipo: types.comp.dropdown, label: 'Cont Credito Compras:',
                    data: { 
                        key: ['cont_credito_compras_key'], 
                        from: ['softlabs', 'contabil', 'cont_credito_compras'], 
                        template: '{row.cont_credito_compras_key} - {row.cont_credito_compra}', 
                        provider: '' 
                    } 
                }, 
                conta_credito_venda_key: {
                    tipo: types.comp.dropdown, label: 'Conta Credito Venda:',
                    data: { 
                        key: ['conta_credito_venda_key'], 
                        from: ['softlabs', 'contabil', 'conta_credito_venda'], 
                        template: '{row.conta_credito_venda_key} - {row.conta_credito_vend}', 
                        provider: '' 
                    } 
                }, 
                conta_venda_gratis_key: {
                    tipo: types.comp.dropdown, label: 'Conta Venda Gratis:',
                    data: { 
                        key: ['conta_venda_gratis_key'], 
                        from: ['softlabs', 'contabil', 'conta_venda_gratis'], 
                        template: '{row.conta_venda_gratis_key} - {row.conta_venda_grati}', 
                        provider: '' 
                    } 
                }, 
                conta_compra_gratis_key: {
                    tipo: types.comp.dropdown, label: 'Conta Compra Gratis:',
                    data: { 
                        key: ['conta_compra_gratis_key'], 
                        from: ['softlabs', 'contabil', 'conta_compra_gratis'], 
                        template: '{row.conta_compra_gratis_key} - {row.conta_compra_grati}', 
                        provider: '' 
                    } 
                }, 
                conta_cmv_key: {
                    tipo: types.comp.dropdown, label: 'Conta Cmv:',
                    data: { 
                        key: ['conta_cmv_key'], 
                        from: ['softlabs', 'contabil', 'conta_cmv'], 
                        template: '{row.conta_cmv_key} - {row.conta_cm}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_key: {
                    tipo: types.comp.dropdown, label: 'Conta Estoque:',
                    data: { 
                        key: ['conta_estoque_key'], 
                        from: ['softlabs', 'contabil', 'conta_estoque'], 
                        template: '{row.conta_estoque_key} - {row.conta_estoqu}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_transito_key: {
                    tipo: types.comp.dropdown, label: 'Conta Estoque Transito:',
                    data: { 
                        key: ['conta_estoque_transito_key'], 
                        from: ['softlabs', 'contabil', 'conta_estoque_transito'], 
                        template: '{row.conta_estoque_transito_key} - {row.conta_estoque_transit}', 
                        provider: '' 
                    } 
                }, 
                conta_estoque_perdas_key: {
                    tipo: types.comp.dropdown, label: 'Conta Estoque Perdas:',
                    data: { 
                        key: ['conta_estoque_perdas_key'], 
                        from: ['softlabs', 'contabil', 'conta_estoque_perdas'], 
                        template: '{row.conta_estoque_perdas_key} - {row.conta_estoque_perda}', 
                        provider: '' 
                    } 
                }, 
                emp_depositos_key: {
                    tipo: types.comp.dropdown, label: 'Emp Depositos:',
                    data: { 
                        key: ['emp_depositos_key'], 
                        from: ['softlabs', 'empresas', 'emp_depositos'], 
                        template: '{row.emp_depositos_key} - {row.emp_deposito}', 
                        provider: '' 
                    } 
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
                items_key: {
                    tipo: types.comp.dropdown, label: 'Items:',
                    data: { 
                        key: ['items_key'], 
                        from: ['softlabs', 'items', 'items'], 
                        template: '{row.items_key} - {row.item}', 
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
                size  : types.form.size.small
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
                    from: ['softlabs', 'contabil', 'cont_determinacao'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', '', 'conta_receitas'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_receitas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', '', 'conta_despesas'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_despesas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', '', 'conta_diferencas'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_diferencas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'contabil', 'cont_credito_compras'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_credito_compras_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'contabil', 'conta_credito_venda'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_credito_venda_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['softlabs', 'contabil', 'conta_venda_gratis'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_venda_gratis_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['softlabs', 'contabil', 'conta_compra_gratis'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_compra_gratis_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: { 
                    from: ['softlabs', 'contabil', 'conta_cmv'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_cmv_key', where: ''},
                    fields: [
                        
                    ]
                },
                9: { 
                    from: ['softlabs', 'contabil', 'conta_estoque'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_estoque_key', where: ''},
                    fields: [
                        
                    ]
                },
                10: { 
                    from: ['softlabs', 'contabil', 'conta_estoque_transito'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_estoque_transito_key', where: ''},
                    fields: [
                        
                    ]
                },
                11: { 
                    from: ['softlabs', 'contabil', 'conta_estoque_perdas'],
                        join: {source: 0, tipo: types.join.left, on: 'conta_estoque_perdas_key', where: ''},
                    fields: [
                        
                    ]
                },
                12: { 
                    from: ['softlabs', 'empresas', 'emp_depositos'],
                        join: {source: 0, tipo: types.join.left, on: 'emp_depositos_key', where: ''},
                    fields: [
                        
                    ]
                },
                13: { 
                    from: ['softlabs', 'items', 'item_categorias'],
                        join: {source: 0, tipo: types.join.left, on: 'item_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                14: { 
                    from: ['softlabs', 'items', 'item_categ_sub'],
                        join: {source: 0, tipo: types.join.left, on: 'item_categ_sub_key', where: ''},
                    fields: [
                        
                    ]
                },
                15: { 
                    from: ['softlabs', 'items', 'items'],
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
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contabil', 'cont_determinacao'],
                    key: 'cont_determinacao_key',
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
module.exports = ContDeterminacao;