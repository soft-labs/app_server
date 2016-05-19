/**
 * BusinessObject :: ItemVendas
 *  Implementação de objeto de negócio: item_vendas.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:46:43 GMT-0300 (BRT)
 * @constructor
 */
function ItemVendas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_vendas';

    // Map
    this.source = {
        table: 'item_vendas',
        metadata: {
            key: 'item_vendas_key',
            fields: {
                item_vendas_key: {
                    tipo: types.comp.key, label: 'Item Vendas:'
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
                prod_tabelas_key: {
                    tipo: types.comp.dropdown, label: 'Prod Tabelas:',
                    data: { 
                        key: ['prod_tabelas_key'], 
                        from: ['softlabs', 'items', 'prod_tabelas'], 
                        template: '{row.prod_tabelas_key} - {row.prod_tabela}', 
                        provider: '' 
                    } 
                }, 
                prod_venda_categorias_key: {
                    tipo: types.comp.dropdown, label: 'Prod Venda Categorias:',
                    data: { 
                        key: ['prod_venda_categorias_key'], 
                        from: ['softlabs', 'items', 'prod_venda_categorias'], 
                        template: '{row.prod_venda_categorias_key} - {row.prod_venda_categoria}', 
                        provider: '' 
                    } 
                }, 
                prod_item_producao_key: {
                    tipo: types.comp.dropdown, label: 'Prod Item Produção:',
                    data: { 
                        key: ['prod_item_producao_key'], 
                        from: ['softlabs', 'items', 'prod_item_producao'], 
                        template: '{row.prod_item_producao_key} - {row.prod_item_produca}', 
                        provider: '' 
                    } 
                }, 
                fichas_tecnicas_key: {
                    tipo: types.comp.dropdown, label: 'Fichas Tecnicas:',
                    data: { 
                        key: ['fichas_tecnicas_key'], 
                        from: ['softlabs', 'items', 'fichas_tecnicas'], 
                        template: '{row.fichas_tecnicas_key} - {row.fichas_tecnica}', 
                        provider: '' 
                    } 
                }, 
                prod_baixa_tipos_key: {
                    tipo: types.comp.dropdown, label: 'Prod Baixa Tipos:',
                    data: { 
                        key: ['prod_baixa_tipos_key'], 
                        from: ['softlabs', 'items', 'prod_baixa_tipos'], 
                        template: '{row.prod_baixa_tipos_key} - {row.prod_baixa_tipo}', 
                        provider: '' 
                    } 
                }, 
                prod_embalagens_key: {
                    tipo: types.comp.dropdown, label: 'Prod Embalagens:',
                    data: { 
                        key: ['prod_embalagens_key'], 
                        from: ['softlabs', 'items', 'prod_embalagens'], 
                        template: '{row.prod_embalagens_key} - {row.prod_embalagen}', 
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
                estoques_key: {
                    tipo: types.comp.dropdown, label: 'Estoques:',
                    data: { 
                        key: ['estoques_key'], 
                        from: ['softlabs', 'unidades', 'estoques'], 
                        template: '{row.estoques_key} - {row.estoque}', 
                        provider: '' 
                    } 
                }, 
                estoq_locais_key: {
                    tipo: types.comp.dropdown, label: 'Estoq Locais:',
                    data: { 
                        key: ['estoq_locais_key'], 
                        from: ['softlabs', 'unidades', 'estoq_locais'], 
                        template: '{row.estoq_locais_key} - {row.estoq_locai}', 
                        provider: '' 
                    } 
                }, 
                prod_icms_key: {
                    tipo: types.comp.dropdown, label: 'Prod Icms:',
                    data: { 
                        key: ['prod_icms_key'], 
                        from: ['softlabs', 'unidades', 'prod_icms'], 
                        template: '{row.prod_icms_key} - {row.prod_icm}', 
                        provider: '' 
                    } 
                }, 
                prod_cod_origem_key: {
                    tipo: types.comp.dropdown, label: 'Prod Cod Origem:',
                    data: { 
                        key: ['prod_cod_origem_key'], 
                        from: ['softlabs', 'unidades', 'prod_cod_origem'], 
                        template: '{row.prod_cod_origem_key} - {row.prod_cod_orige}', 
                        provider: '' 
                    } 
                }, 
                prod_cod_tributacao_key: {
                    tipo: types.comp.dropdown, label: 'Prod Cod Tributação:',
                    data: { 
                        key: ['prod_cod_tributacao_key'], 
                        from: ['softlabs', 'unidades', 'prod_cod_tributacao'], 
                        template: '{row.prod_cod_tributacao_key} - {row.prod_cod_tributaca}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.dropdown, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{row.cont_plano_contas_key} - {row.cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                regra_baixa_estoque: {
                    tipo: types.comp.int, label: 'Regra Baixa Estoque:'
                }, 
                item_venda: {
                    tipo: types.comp.text, label: 'Item Venda:'
                }, 
                quantidade: {
                    tipo: types.comp.float, label: 'Quantidade:'
                }, 
                cod_barras: {
                    tipo: types.comp.text, label: 'Cod Barras:'
                }, 
                margem_custo: {
                    tipo: types.comp.float, label: 'Margem Custo:'
                }, 
                preco_custo: {
                    tipo: types.comp.float, label: 'Preco Custo:'
                }, 
                preco_venda: {
                    tipo: types.comp.float, label: 'Preco Venda:'
                }, 
                desconto_maximo: {
                    tipo: types.comp.float, label: 'Desconto Maximo:'
                }, 
                foto_peq: {
                    tipo: types.comp.text, label: 'Foto Peq:'
                }, 
                foto_grande: {
                    tipo: types.comp.text, label: 'Foto Grande:'
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
                {titulo: "Informações de item_vendas"},
                {item_vendas_key: 25, items_key: 25, prod_tabelas_key: 25, prod_venda_categorias_key: 25}, 
                {prod_item_producao_key: 25, fichas_tecnicas_key: 25, prod_baixa_tipos_key: 25, prod_embalagens_key: 25}, 
                {unidades_key: 25, estoques_key: 25, estoq_locais_key: 25, prod_icms_key: 25}, 
                {prod_cod_origem_key: 25, prod_cod_tributacao_key: 25, cont_plano_contas_key: 25, regra_baixa_estoque: 25}, 
                {item_venda: 25, quantidade: 25, cod_barras: 25, margem_custo: 25}, 
                {preco_custo: 25, preco_venda: 25, desconto_maximo: 25, foto_peq: 25}, 
                {foto_grande: 25, observacoes: 75}
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
                    from: ['softlabs', 'items', 'item_vendas'],
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
                    from: ['softlabs', 'items', 'prod_tabelas'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_tabelas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'items', 'prod_venda_categorias'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_venda_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'items', 'prod_item_producao'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_item_producao_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'items', 'fichas_tecnicas'],
                        join: {source: 0, tipo: types.join.left, on: 'fichas_tecnicas_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['softlabs', 'items', 'prod_baixa_tipos'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_baixa_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['softlabs', 'items', 'prod_embalagens'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_embalagens_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: { 
                    from: ['softlabs', 'unidades', 'unidades'],
                        join: {source: 0, tipo: types.join.left, on: 'unidades_key', where: ''},
                    fields: [
                        
                    ]
                },
                9: { 
                    from: ['softlabs', 'unidades', 'estoques'],
                        join: {source: 0, tipo: types.join.left, on: 'estoques_key', where: ''},
                    fields: [
                        
                    ]
                },
                10: { 
                    from: ['softlabs', 'unidades', 'estoq_locais'],
                        join: {source: 0, tipo: types.join.left, on: 'estoq_locais_key', where: ''},
                    fields: [
                        
                    ]
                },
                11: { 
                    from: ['softlabs', 'unidades', 'prod_icms'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_icms_key', where: ''},
                    fields: [
                        
                    ]
                },
                12: { 
                    from: ['softlabs', 'unidades', 'prod_cod_origem'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_cod_origem_key', where: ''},
                    fields: [
                        
                    ]
                },
                13: { 
                    from: ['softlabs', 'unidades', 'prod_cod_tributacao'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_cod_tributacao_key', where: ''},
                    fields: [
                        
                    ]
                },
                14: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_vendas_key', types.where.check]
            ],
            order: [
                ['0', 'item_vendas_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'item_vendas'],
                    key: 'item_vendas_key',
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
module.exports = ItemVendas;