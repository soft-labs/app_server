/**
 * BusinessObject :: Movimentacoes
 *  Implementação de objeto de negócio: movimentacoes.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:54:12 GMT-0300 (BRT)
 * @constructor
 */
function Movimentacoes(){

    //region :: Definições do Objeto

    // Id
    this.id = 'movimentacoes';

    // Map
    this.source = {
        table: 'movimentacoes',
        metadata: {
            key: 'movimentacoes_key',
            label: 'competencia',
            fields: {
                movimentacoes_key: {
                    tipo: types.comp.key, label: 'Movimentações:'
                }, 
                mov_tipos_key: {
                    tipo: types.comp.choose, label: 'Mov Tipos:',
                    data: { 
                        key: ['mov_tipos_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_tipos'], 
                        template: '{mov_tipos_key} - {mov_tipo}', 
                        provider: '' 
                    } 
                }, 
                mov_origem_key: {
                    tipo: types.comp.choose, label: 'Mov Origem:',
                    data: { 
                        key: ['mov_origem_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_origem'], 
                        template: '{mov_origem_key} - {mov_orige}', 
                        provider: '' 
                    } 
                }, 
                mov_destino_key: {
                    tipo: types.comp.choose, label: 'Mov Destino:',
                    data: { 
                        key: ['mov_destino_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_destino'], 
                        template: '{mov_destino_key} - {mov_destin}', 
                        provider: '' 
                    } 
                }, 
                mov_status_key: {
                    tipo: types.comp.choose, label: 'Mov Status:',
                    data: { 
                        key: ['mov_status_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_status'], 
                        template: '{mov_status_key} - {mov_statu}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['dbms', 'empresas', 'empresas'], 
                        template: '{empresas_key} - {empresa}', 
                        provider: '' 
                    } 
                }, 
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['dbms', 'parceiros', 'parceiros'], 
                        template: '{parceiros_key} - {parceiro}', 
                        provider: '' 
                    } 
                }, 
                emp_clientes_key: {
                    tipo: types.comp.choose, label: 'Emp Clientes:',
                    data: { 
                        key: ['emp_clientes_key'], 
                        from: ['dbms', 'empresas', 'emp_clientes'], 
                        template: '{emp_clientes_key} - {emp_cliente}', 
                        provider: '' 
                    } 
                }, 
                emp_fornecedores_key: {
                    tipo: types.comp.choose, label: 'Emp Fornecedores:',
                    data: { 
                        key: ['emp_fornecedores_key'], 
                        from: ['dbms', 'empresas', 'emp_fornecedores'], 
                        template: '{emp_fornecedores_key} - {emp_fornecedore}', 
                        provider: '' 
                    } 
                }, 
                contratos_key: {
                    tipo: types.comp.choose, label: 'Contratos:',
                    data: { 
                        key: ['contratos_key'], 
                        from: ['dbms', 'contratos', 'contratos'], 
                        template: '{contratos_key} - {contrato}', 
                        provider: '' 
                    } 
                }, 
                emp_dep_origem_key: {
                    tipo: types.comp.choose, label: 'Emp Dep Origem:',
                    data: { 
                        key: ['emp_dep_origem_key'], 
                        from: ['dbms', 'empresas', 'emp_dep_origem'], 
                        template: '{emp_dep_origem_key} - {emp_dep_orige}', 
                        provider: '' 
                    } 
                }, 
                emp_dep_destino_key: {
                    tipo: types.comp.choose, label: 'Emp Dep Destino:',
                    data: { 
                        key: ['emp_dep_destino_key'], 
                        from: ['dbms', 'empresas', 'emp_dep_destino'], 
                        template: '{emp_dep_destino_key} - {emp_dep_destin}', 
                        provider: '' 
                    } 
                }, 
                competencia: {
                    tipo: types.comp.text, label: 'Competência:'
                }, 
                dt_lancamento: {
                    tipo: types.comp.datetime, label: 'Data de Lançamento:'
                }, 
                dt_documento: {
                    tipo: types.comp.date, label: 'Data do Documento:'
                }, 
                dt_vencimento: {
                    tipo: types.comp.date, label: 'Data de Vencimento:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Número:'
                }, 
                valor_bruto: {
                    tipo: types.comp.float, label: 'Valor Bruto:'
                }, 
                valor_frete: {
                    tipo: types.comp.float, label: 'Valor Frete:'
                }, 
                valor_seguro: {
                    tipo: types.comp.float, label: 'Valor Seguro:'
                }, 
                valor_desconto: {
                    tipo: types.comp.float, label: 'Valor Desconto:'
                }, 
                valor_imp_ii: {
                    tipo: types.comp.float, label: 'Valor Imp Ii:'
                }, 
                valor_imp_ipi: {
                    tipo: types.comp.float, label: 'Valor Imp Ipi:'
                }, 
                valor_imp_pis: {
                    tipo: types.comp.float, label: 'Valor Imp Pis:'
                }, 
                valor_imp_cofins: {
                    tipo: types.comp.float, label: 'Valor Imp Cofins:'
                }, 
                valor_imp_icms: {
                    tipo: types.comp.float, label: 'Valor Imp Icms:'
                }, 
                valor_imp_icmsst: {
                    tipo: types.comp.float, label: 'Valor Imp Icmsst:'
                }, 
                valor_out_desp: {
                    tipo: types.comp.float, label: 'Valor Out Desp:'
                }, 
                valor_liquido: {
                    tipo: types.comp.float, label: 'Valor Liquido:'
                }, 
                multa: {
                    tipo: types.comp.float, label: 'Multa:'
                }, 
                multa_em_moeda: {
                    tipo: types.comp.int, label: 'Multa Em Mõeda:'
                }, 
                juros: {
                    tipo: types.comp.float, label: 'Juros:'
                }, 
                doc_fiscal_tipo: {
                    tipo: types.comp.text, label: 'Doc Fiscal Tipo:'
                }, 
                doc_fiscal_data: {
                    tipo: types.comp.date, label: 'Doc Fiscal Data:'
                }, 
                doc_fiscal_caixa: {
                    tipo: types.comp.text, label: 'Doc Fiscal Caixa:'
                }, 
                doc_fiscal_num_equip: {
                    tipo: types.comp.text, label: 'Doc Fiscal Num Equip:'
                }, 
                doc_fiscal_numero: {
                    tipo: types.comp.text, label: 'Doc Fiscal Numero:'
                }, 
                doc_fiscal_serie: {
                    tipo: types.comp.text, label: 'Doc Fiscal Serie:'
                }, 
                doc_fiscal_subserie: {
                    tipo: types.comp.text, label: 'Doc Fiscal Subserie:'
                }, 
                doc_fiscal_modelo: {
                    tipo: types.comp.text, label: 'Doc Fiscal Modelo:'
                }, 
                doc_fiscal_chave: {
                    tipo: types.comp.text, label: 'Doc Fiscal Chave:'
                }, 
                doc_fiscal_extra: {
                    tipo: types.comp.text_big, label: 'Doc Fiscal Extra:'
                }, 
                doc_fiscal_file: {
                    tipo: types.comp.text_big, label: 'Doc Fiscal File:'
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
                {titulo: "Informações de movimentacoes"},

                {numero: 15, dt_documento: 20, dt_lancamento: 20, dt_vencimento: 20, competencia: 15},


                {valor_bruto: 25, valor_frete: 25, valor_seguro: 25},

                {mov_status_key: 25, empresas_key: 25, parceiros_key: 25, emp_clientes_key: 25},

                {movimentacoes_key: 25, mov_tipos_key: 25, mov_origem_key: 25, mov_destino_key: 25},
                {emp_fornecedores_key: 25, contratos_key: 25, emp_dep_origem_key: 25, emp_dep_destino_key: 25},
                {valor_desconto: 25, valor_imp_ii: 25, valor_imp_ipi: 25, valor_imp_pis: 25},
                {valor_imp_cofins: 25, valor_imp_icms: 25, valor_imp_icmsst: 25, valor_out_desp: 25}, 
                {valor_liquido: 25, multa: 25, multa_em_moeda: 25, juros: 25}, 
                
                {doc_fiscal_tipo: 25, doc_fiscal_data: 25, doc_fiscal_caixa: 25, doc_fiscal_num_equip: 25}, 
                {doc_fiscal_numero: 25, doc_fiscal_serie: 25, doc_fiscal_subserie: 25, doc_fiscal_modelo: 25}, 
                {doc_fiscal_chave: 25, doc_fiscal_extra: 25, doc_fiscal_file: 25, observacoes: 25}
            ],
            ctrls: {
                competencia: {
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
                    from: ['dbms', 'movimentacoes', 'movimentacoes'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'movimentacoes', 'mov_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: {
                    from: ['dbms', 'movimentacoes', 'mov_status'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_status_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: {
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: {
                    from: ['dbms', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: {
                    from: ['dbms', 'empresas', 'emp_clientes'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_clientes_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: {
                    from: ['dbms', 'empresas', 'emp_fornecedores'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_fornecedores_key', where: ''},
                    fields: [
                        
                    ]
                },
            },
            where: [ 
                ['AND', 0, 'movimentacoes_key', types.where.check]
            ],
            order: [
                [0, 'competencia', 'asc']
            ],
            search: [
                    {alias: 0, field: 'competencia',  param: types.search.like_full },
                    {alias: 0, field: 'dt_documento',  param: types.search.maior_igual },
                    {alias: 0, field: 'dt_vencimento',  param: types.search.maior_igual },
                    {alias: 0, field: 'numero',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_tipo',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_data',  param: types.search.maior_igual },
                    {alias: 0, field: 'doc_fiscal_caixa',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_num_equip',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_numero',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_serie',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_subserie',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_modelo',  param: types.search.like_full },
                    {alias: 0, field: 'doc_fiscal_chave',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'movimentacoes', 'movimentacoes'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    /**
     * Evento chamado na recuperação de um formulário
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onGetForm = function *(form, ctx){

        // Pega mov_tipo
        var mov_tipo = this.params['mov_tipo']
            , config = {
                show:{
                    parceiros_key   : ['parceiro_show'],
                    dt_lancamento   : ['dt_lancamento_show'],
                    dt_vencimento   : ['dt_vencimento_show', 'movimenta_financeiro'],
                    dt_documento    : ['dt_documento_show'],
                    competencia     : ['dt_competencia_show', 'movimenta_financeiro'],

                    emp_dep_origem_key  : ['movimenta_itens', 'itens_gera_saida', 'itens_deposito_saida_show'],
                    emp_dep_destino_key : ['movimenta_itens', 'itens_gera_entrada', 'itens_deposito_entrada_show'],

                    valor_bruto         : ['movimenta_financeiro'],
                    valor_liquido       : ['movimenta_financeiro'],
                    multa               : ['movimenta_financeiro', 'fin_multa_juros_show'],
                    multa_em_moeda      : ['movimenta_financeiro', 'fin_multa_juros_show'],
                    juros               : ['movimenta_financeiro', 'fin_multa_juros_show'],
                    valor_frete         : ['movimenta_financeiro', 'fin_desp_acessorias_show'],
                    valor_seguro        : ['movimenta_financeiro', 'fin_desp_acessorias_show'],
                    valor_out_desp      : ['movimenta_financeiro', 'fin_desp_acessorias_show'],
                    valor_desconto      : ['movimenta_financeiro', 'fin_desconto_show'],
                    valor_imp_ii        : ['movimenta_financeiro', 'fin_taxas_show'],
                    valor_imp_ipi       : ['movimenta_financeiro', 'fin_taxas_show'],
                    valor_imp_pis       : ['movimenta_financeiro', 'fin_taxas_show'],
                    valor_imp_cofins    : ['movimenta_financeiro', 'fin_taxas_show'],
                    valor_imp_icms      : ['movimenta_financeiro', 'fin_taxas_show'],
                    valor_imp_icmsst    : ['movimenta_financeiro', 'fin_taxas_show'],

                    fin_contas_key      : ['movimenta_financeiro', 'fin_contas_show'],
                    fin_contas_tipo_key : ['movimenta_financeiro', 'fin_contas_show'],

                    observacoes         : ['observacoes_show']
                },

                label: {
                    parceiros_key       : 'paceiro_label',
                    dt_lancamento       : 'dt_lancamento_label',
                    dt_vencimento       : 'dt_vencimento_label',
                    dt_documento        : 'dt_documento_label',

                    cont_historicos__key: 'cont_historico_label',

                    emp_dep_origem_key  : 'itens_deposito_saida_label',
                    emp_dep_destino_key : 'itens_deposito_entrada_label',

                    valor_bruto         : 'fin_valor_bruto_label',
                    valor_liquido       : 'fin_valor_liquido_label',
                    fin_contas_key      : 'fin_contas_label',

                    observacoes         : 'observacoes_label'
                },

                fixo: {
                    parceiros_key       : 'parceiro_fixo',
                    fin_contas_key      : 'fin_contas_fixo'
                }
            }
        ;

        if (!mov_tipo){

        }

        // Exibe ou não
        for (var f in config.show){
            form.ctrls[f] = form.ctrls[f] || {};
            config.show[f].forEach(check => {
                if (!parseInt(mov_tipo[check])){
                    form.ctrls[f]['_remove_'] = true;
                }
            });
        }

        // Labels
        for (var f in config.label) {
            if (mov_tipo[config.label[f]]) {
                form.ctrls[f]['label'] = mov_tipo[config.label[f]];
            }
        }
            
        
        /*{
            { fin_recorrencia_show: 25},
            {fin_parcelamentos_show: 25},
        }*/
        

        return true;

    };

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
module.exports = Movimentacoes;