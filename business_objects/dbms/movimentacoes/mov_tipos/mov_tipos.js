/**
 * BusinessObject :: MovTipos
 *  Implementação de objeto de negócio: mov_tipos.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:54:12 GMT-0300 (BRT)
 * @constructor
 */
function MovTipos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'mov_tipos';

    // Map
    this.source = {
        table: 'mov_tipos',
        metadata: {
            key: 'mov_tipos_key',
            label: 'codigo',
            fields: {

                //region :: Campos Principais

                mov_tipos_key: {
                    tipo: types.comp.key, label: 'Mov Tipos:'
                }, 
                mov_tipos_categorias_key: {
                    tipo: types.comp.choose, label: 'Categoria:',
                    data: { 
                        key: ['mov_tipos_categorias_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_tipos_categorias'], 
                        template: '{mov_tipos_categorias_key} - {tipos_categoria}',
                        provider: '' 
                    } 
                },
                ativo: {
                    tipo: types.comp.check, label: 'Ativo:', default:1
                },
                mov_customizada: {
                    tipo: types.comp.check, label: 'Movimentação Customizada:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Código:'
                }, 
                mov_tipo: {
                    tipo: types.comp.text, label: 'Tipo de Movimentação:'
                },

                //endregion

                // region :: Aba Geral

                mov_info: {
                    tipo: types.comp.text, label: 'Informações:'
                }, 
                mov_icon: {
                    tipo: types.comp.text, label: 'Ícone:'
                }, 
                mov_help: {
                    tipo: types.comp.text_big, label: 'Informações de Ajuda ao Usuário:'
                },

                //endregion

                //region :: Aba Parceiros

                parceiro_tipo: {
                    tipo: types.comp.text, label: 'Tipo de Parceiro:'
                }, 
                paceiro_label: {
                    tipo: types.comp.text, label: 'Label Parceiro:'
                }, 
                parceiro_show: {
                    tipo: types.comp.check, label: 'Mostrar Parceiro:'
                }, 
                parceiro_fixo: {
                    tipo: types.comp.check, label: 'Parceiro Fixo:'
                },

                //endregion

                //region :: Aba Data

                dt_lancamento_show: {
                    tipo: types.comp.check, label: 'Mostrar Data de Lançamento:'
                }, 
                dt_lancamento_label: {
                    tipo: types.comp.text, label: 'Data de Lançamento Label:'
                }, 
                dt_documento_show: {
                    tipo: types.comp.check, label: 'Mostrar Data do Documento:'
                }, 
                dt_documento_label: {
                    tipo: types.comp.text, label: 'Data do Documento Label:'
                }, 
                dt_vencimento_show: {
                    tipo: types.comp.check, label: 'Mostrar Data de Vencimento:'
                }, 
                dt_vencimento_label: {
                    tipo: types.comp.text, label: 'Data de Vencimento Label:'
                }, 
                dt_competencia_show: {
                    tipo: types.comp.check, label: 'Mostrar Data de Competência:'
                },

                //endregion

                //region :: Aba Itens

                movimenta_itens: {
                    tipo: types.comp.check, label: 'Movimenta Itens:'
                }, 
                itens_valor_show: {
                    tipo: types.comp.check, label: 'Mostrar Valor do Item:'
                }, 
                itens_gera_entrada: {
                    tipo: types.comp.check, label: 'Itens Geram Entrada:'
                }, 
                itens_deposito_entrada_show: {
                    tipo: types.comp.check, label: 'Mostrar Deposito de Entrada:'
                }, 
                itens_deposito_entrada_label: {
                    tipo: types.comp.text, label: 'Deposito de Entrada Label:'
                }, 
                itens_deposito_entrada_key: {
                    tipo: types.comp.choose, label: 'Itens Deposito Entrada:',
                    data: { 
                        key: ['itens_deposito_entrada_key'], 
                        from: ['dbms', 'movimentacoes', 'itens_deposito_entrada'], 
                        template: '{itens_deposito_entrada_key} - {itens_deposito_entrad}', 
                        provider: '' 
                    } 
                }, 
                itens_entrada_producao: {
                    tipo: types.comp.check, label: 'Itens Entrada Produção:'
                }, 
                itens_gera_saida: {
                    tipo: types.comp.check, label: 'Itens Geram Saída:'
                }, 
                itens_deposito_saida_show: {
                    tipo: types.comp.check, label: 'Mostrar Deposito de Saída:'
                }, 
                itens_deposito_saida_label: {
                    tipo: types.comp.text, label: 'Deposito de Saída Label:'
                }, 
                itens_deposito_saida_key: {
                    tipo: types.comp.choose, label: 'Itens Deposito Saida:',
                    data: { 
                        key: ['itens_deposito_saida_key'], 
                        from: ['dbms', 'movimentacoes', 'itens_deposito_saida'], 
                        template: '{itens_deposito_saida_key} - {itens_deposito_said}', 
                        provider: '' 
                    } 
                }, 
                itens_saida_producao: {
                    tipo: types.comp.check, label: 'Itens Saída Produção:'
                }, 
                movimenta_financeiro: {
                    tipo: types.comp.check, label: 'Movimenta Financeiro:'
                }, 
                fin_gera_receita: {
                    tipo: types.comp.check, label: 'Gera Receita:'
                }, 
                fin_gera_despesa: {
                    tipo: types.comp.check, label: 'Gera Despesa:'
                }, 
                fin_recorrencia_show: {
                    tipo: types.comp.check, label: 'Mostrar Recorrencia:'
                }, 
                fin_parcelamentos_show: {
                    tipo: types.comp.check, label: 'Mostrar Parcelamentos:'
                }, 
                fin_desp_acessorias_show: {
                    tipo: types.comp.check, label: 'Mostrar Despesa Acessoria:'
                }, 
                fin_multa_juros_show: {
                    tipo: types.comp.check, label: 'Mostrar Multa Juros:'
                }, 
                fin_desconto_show: {
                    tipo: types.comp.check, label: 'Mostrar Desconto:'
                }, 
                fin_taxas_show: {
                    tipo: types.comp.check, label: 'Mostrar Taxas :'
                }, 
                fin_valor_bruto_label: {
                    tipo: types.comp.text, label: 'Valor Bruto Label:'
                }, 
                fin_valor_liquido_label: {
                    tipo: types.comp.text, label: 'Valor Líquido Label:'
                }, 
                fin_conta_provisionamento_show: {
                    tipo: types.comp.check, label: 'Mostrar Conta de Provisionamento:'
                }, 
                fin_conta_provisionamento_tipo_key: {
                    tipo: types.comp.choose, label: 'Tipo de Conta de Provisionamento:',
                    data: { 
                        key: ['fin_conta_provisionamento_tipo_key'], 
                        from: ['dbms', 'financeiro', 'fin_conta_provisionamento_tipo'], 
                        template: '{fin_conta_provisionamento_tipo_key} - {fin_conta_provisionamento_tip}', 
                        provider: '' 
                    } 
                }, 
                fin_conta_provisionamento_label: {
                    tipo: types.comp.text, label: 'Conta de Provisionamento Label:'
                }, 
                fin_conta_provisionamento_key: {
                    tipo: types.comp.choose, label: 'Conta de Provisionamento:',
                    data: { 
                        key: ['fin_conta_provisionamento_key'], 
                        from: ['dbms', 'financeiro', 'fin_conta_provisionamento'], 
                        template: '{fin_conta_provisionamento_key} - {fin_conta_provisionament}', 
                        provider: '' 
                    } 
                }, 
                fin_conta_provisionamento_fixa: {
                    tipo: types.comp.check, label: 'Conta de Provisionamento Fixa:'
                },

                // endregion

                // region :: Outros

                importar_mesmo_parceiro: {
                    tipo: types.comp.check, label: 'Importar somente para mesmo Parceiro:'
                }, 
                importar_mov_tipos_key: {
                    tipo: types.comp.choose, label: 'Importar outras Movimentações:',
                    data: {
                        key: ['importar_mov_tipos_key'],
                        from: ['dbms', 'financeiro', 'importar_mov_tipos'],
                        template: '{importar_mov_tipos_key} - {importar_mov_tipo}',
                        provider: ''
                    }
                },
                cont_historico_label: {
                    tipo: types.comp.text, label: 'Cont Historico Label:'
                },
                observacoes_show: {
                    tipo: types.comp.check, label: 'Mostrar Observações:'
                }, 
                observacoes_label: {
                    tipo: types.comp.text, label: 'Observações Label:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }

                //endregion
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
                {titulo: "Configuração do Tipo de Movimentação"},
                {ativo:10,mov_tipo: 50,codigo: 10,mov_tipos_categorias_key: 30},
                {tabs:100},
            ],
            tabs: {
                tabs:
                [
                    {
                        label: 'Geral',
                        linhas: [
                            {titulo: "Configurações gerais da movimentação"},
                            {mov_info: 80, mov_icon: 20},
                            {mov_help: 100}
                        ]
                    },
                    {
                        label: 'Parceiro',
                        linhas: [
                            {titulo: "Configuração do parceiro na movimentação"},
                            {parceiro_show: 20},
                            {parceiro_fixo: 20,parceiro_tipo: 42,paceiro_label: 42},
                        ],
                    },
                    {
                        label: 'Datas',
                        linhas: [
                            {titulo: "Configurações das datas da movimentação"},
                            {dt_lancamento_show: 25, dt_vencimento_show: 25,dt_documento_show: 25, dt_competencia_show: 25,},
                            {dt_lancamento_label: 25,dt_vencimento_label: 25, dt_documento_label: 25 },
                        ]
                    },
                    {
                        label: 'Itens',
                        linhas: [
                            {titulo: "Configurações dos itens da movimentação"},
                            {movimenta_itens: 25},
                            {itens_valor_show: 25},
                            {itens_gera_entrada: 25,itens_gera_saida: 25},
                            {itens_deposito_entrada_show: 25, itens_deposito_saida_show: 25,},
                            {itens_deposito_entrada_label: 25, itens_deposito_entrada_key: 25, itens_entrada_producao: 25, },
                            {itens_deposito_saida_label: 25, itens_deposito_saida_key: 25, itens_saida_producao: 25},
                        ]
                    },
                    {
                        label: 'Financeiro',
                        linhas: [
                            {titulo: "Configurações financeiras da movimentação"},
                            {movimenta_financeiro: 25, fin_gera_receita: 25, fin_gera_despesa: 25, fin_recorrencia_show: 25},
                            {fin_parcelamentos_show: 25, fin_desp_acessorias_show: 25, fin_multa_juros_show: 25, fin_desconto_show: 25},
                            {fin_taxas_show: 25, fin_valor_bruto_label: 25, fin_valor_liquido_label: 25, fin_conta_provisionamento_show: 25},
                            {fin_conta_provisionamento_tipo_key: 25, fin_conta_provisionamento_label: 25, fin_conta_provisionamento_key: 25, fin_conta_provisionamento_fixa: 25},
                        ]
                    },
                    {
                        label: 'Outros',
                        linhas: [
                            {titulo: "Outras configurações"},
                            {cont_historico_label: 20, importar_mesmo_parceiro: 20, importar_mov_tipos_key: 20, observacoes_show: 20, observacoes_label: 20},
                            {observacoes: 100}
                        ]
                    },
                ]
            },
            ctrls: {

                // region :: Aba de Parceiros

                paceiro_label: {
                    disabled: {
                        field: 'parceiro_show', cond: 'isFalse'
                    }
                },
                parceiro_tipo: {
                    disabled: {
                        field: 'parceiro_show', cond: 'isFalse'
                    }
                },
                parceiro_fixo: {
                    disabled: {
                        field: 'parceiro_show', cond: 'isFalse'
                    }
                },

                //endregion

                // region :: Aba de Datas

                dt_lancamento_label: {
                    disabled: {
                        field: 'dt_lancamento_show', cond: 'isFalse'
                    }
                },
                dt_vencimento_label: {
                    disabled: {
                        field: 'dt_vencimento_show', cond: 'isFalse'
                    }
                },
                dt_documento_label: {
                    disabled: {
                        field: 'dt_documento_show', cond: 'isFalse'
                    }
                },
                //endregion

                // region :: Aba de Itens
                /*
                {titulo: "Configurações dos itens da movimentação"},
                {movimenta_itens: 25, itens_valor_show: 25, itens_gera_entrada: 25, itens_deposito_entrada_show: 25},
                {itens_deposito_entrada_label: 25, itens_deposito_entrada_key: 25, itens_entrada_producao: 25, itens_gera_saida: 25},
                {itens_deposito_saida_show: 25, itens_deposito_saida_label: 25, itens_deposito_saida_key: 25, itens_saida_producao: 25},
                */

                // endregion

            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['dbms', 'movimentacoes', 'mov_tipos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'movimentacoes', 'mov_tipos_categorias'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_tipos_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                /*2: {
                    from: ['dbms', 'items', 'itens_deposito_entrada'],
                    join: {source: 0, tipo: types.join.left, on: 'itens_deposito_entrada_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'movimentacoes', 'itens_deposito_saida'],
                    join: {source: 0, tipo: types.join.left, on: 'itens_deposito_saida_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', 'financeiro', 'fin_conta_provisionamento_tipo'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_conta_provisionamento_tipo_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['dbms', 'financeiro', 'fin_conta_provisionamento'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_conta_provisionamento_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['dbms', 'financeiro', 'importar_mov_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'importar_mov_tipos_key', where: ''},
                    fields: [
                        
                    ]
                } */
            },
            where: [ 
                ['AND', 0, 'mov_tipos_key', types.where.check],
                ['AND', 0, 'mov_tipos_categorias_key', types.where.in],
            ],
            order: [
                [1, 'tipos_categoria', 'asc'],
                [0, 'codigo', 'asc']
            ],
            search: [
                    {alias: 0, field: 'codigo',  param: types.search.like_full },
                    {alias: 0, field: 'mov_tipo',  param: types.search.like_full },
                    {alias: 0, field: 'mov_info',  param: types.search.like_full },
                    {alias: 0, field: 'mov_icon',  param: types.search.like_full },
                    {alias: 0, field: 'parceiro_tipo',  param: types.search.like_full },
                    {alias: 0, field: 'paceiro_label',  param: types.search.like_full },
                    {alias: 0, field: 'cont_historico_label',  param: types.search.like_full },
                    {alias: 0, field: 'dt_lancamento_label',  param: types.search.like_full },
                    {alias: 0, field: 'dt_documento_label',  param: types.search.like_full },
                    {alias: 0, field: 'dt_vencimento_label',  param: types.search.like_full },
                    {alias: 0, field: 'itens_deposito_entrada_label',  param: types.search.like_full },
                    {alias: 0, field: 'itens_deposito_saida_label',  param: types.search.like_full },
                    {alias: 0, field: 'fin_valor_bruto_label',  param: types.search.like_full },
                    {alias: 0, field: 'fin_valor_liquido_label',  param: types.search.like_full },
                    {alias: 0, field: 'fin_conta_provisionamento_label',  param: types.search.like_full },
                    {alias: 0, field: 'observacoes_label',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'movimentacoes', 'mov_tipos'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    //endregion


    //region :: Regras de Negócio

    //endregion
    

    //region :: Eventos Disponívels


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


}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = MovTipos;