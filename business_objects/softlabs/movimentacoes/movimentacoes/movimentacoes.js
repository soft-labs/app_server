/**
 * BusinessObject :: Movimentacoes
 *  Implementação de objeto de negócio: movimentacoes.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:10:05 GMT-0300 (BRT)
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
                mov_origem_key: {
                    tipo: types.comp.choose, label: 'Mov Origem:',
                    data: { 
                        key: ['mov_origem_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_origem'], 
                        template: '{mov_origem_key} - {mov_orige}', 
                        provider: '' 
                    } 
                }, 
                mov_destino_key: {
                    tipo: types.comp.choose, label: 'Mov Destino:',
                    data: { 
                        key: ['mov_destino_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_destino'], 
                        template: '{mov_destino_key} - {mov_destin}', 
                        provider: '' 
                    } 
                }, 
                mov_tipos_key: {
                    tipo: types.comp.choose, label: 'Mov Tipos:',
                    data: { 
                        key: ['mov_tipos_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_tipos'], 
                        template: '{mov_tipos_key} - {mov_tipo}', 
                        provider: '' 
                    } 
                }, 
                mov_status_key: {
                    tipo: types.comp.choose, label: 'Mov Status:',
                    data: { 
                        key: ['mov_status_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_status'], 
                        template: '{mov_status_key} - {mov_statu}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{empresas_key} - {empresa}', 
                        provider: '' 
                    } 
                }, 
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'parceiros', 'parceiros'], 
                        template: '{parceiros_key} - {parceiro}', 
                        provider: '' 
                    } 
                }, 
                emp_clientes_key: {
                    tipo: types.comp.choose, label: 'Emp Clientes:',
                    data: { 
                        key: ['emp_clientes_key'], 
                        from: ['softlabs', 'empresas', 'emp_clientes'], 
                        template: '{emp_clientes_key} - {emp_cliente}', 
                        provider: '' 
                    } 
                }, 
                emp_fornecedores_key: {
                    tipo: types.comp.choose, label: 'Emp Fornecedores:',
                    data: { 
                        key: ['emp_fornecedores_key'], 
                        from: ['softlabs', 'empresas', 'emp_fornecedores'], 
                        template: '{emp_fornecedores_key} - {emp_fornecedore}', 
                        provider: '' 
                    } 
                }, 
                contratos_key: {
                    tipo: types.comp.choose, label: 'Contratos:',
                    data: { 
                        key: ['contratos_key'], 
                        from: ['softlabs', 'contratos', 'contratos'], 
                        template: '{contratos_key} - {contrato}', 
                        provider: '' 
                    } 
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.choose, label: 'Cont Centros Resultado:',
                    data: { 
                        key: ['cont_centros_resultado_key'], 
                        from: ['softlabs', 'contabil', 'cont_centros_resultado'], 
                        template: '{cont_centros_resultado_key} - {cont_centros_resultad}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{cont_plano_contas_key} - {cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                emp_dep_origem_key: {
                    tipo: types.comp.choose, label: 'Emp Dep Origem:',
                    data: { 
                        key: ['emp_dep_origem_key'], 
                        from: ['softlabs', 'empresas', 'emp_dep_origem'], 
                        template: '{emp_dep_origem_key} - {emp_dep_orige}', 
                        provider: '' 
                    } 
                }, 
                emp_dep_destino_key: {
                    tipo: types.comp.choose, label: 'Emp Dep Destino:',
                    data: { 
                        key: ['emp_dep_destino_key'], 
                        from: ['softlabs', 'empresas', 'emp_dep_destino'], 
                        template: '{emp_dep_destino_key} - {emp_dep_destin}', 
                        provider: '' 
                    } 
                }, 
                competencia: {
                    tipo: types.comp.text, label: 'Competencia:'
                }, 
                dt_lancamento: {
                    tipo: types.comp.datetime, label: 'Dt Lancamento:'
                }, 
                dt_documento: {
                    tipo: types.comp.date, label: 'Dt Documento:'
                }, 
                dt_vencimento: {
                    tipo: types.comp.date, label: 'Dt Vencimento:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Numero:'
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
                    tipo: types.comp.undefined, label: 'Doc Fiscal File:'
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
                {movimentacoes_key: 25, mov_origem_key: 25, mov_destino_key: 25, mov_tipos_key: 25}, 
                {mov_status_key: 25, empresas_key: 25, parceiros_key: 25, emp_clientes_key: 25}, 
                {emp_fornecedores_key: 25, contratos_key: 25, cont_centros_resultado_key: 25, cont_plano_contas_key: 25}, 
                {emp_dep_origem_key: 25, emp_dep_destino_key: 25, competencia: 25, dt_lancamento: 25}, 
                {dt_documento: 25, dt_vencimento: 25, numero: 25, valor_bruto: 25}, 
                {valor_frete: 25, valor_seguro: 25, valor_desconto: 25, valor_imp_ii: 25}, 
                {valor_imp_ipi: 25, valor_imp_pis: 25, valor_imp_cofins: 25, valor_imp_icms: 25}, 
                {valor_imp_icmsst: 25, valor_out_desp: 25, valor_liquido: 25, multa: 25}, 
                {multa_em_moeda: 25, juros: 25, doc_fiscal_tipo: 25, doc_fiscal_data: 25}, 
                {doc_fiscal_caixa: 25, doc_fiscal_num_equip: 25, doc_fiscal_numero: 25, doc_fiscal_serie: 25}, 
                {doc_fiscal_subserie: 25, doc_fiscal_modelo: 25, doc_fiscal_chave: 25, doc_fiscal_extra: 25}, 
                {doc_fiscal_file: 25, observacoes: 75}
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
                    from: ['softlabs', 'movimentacoes', 'movimentacoes'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'movimentacoes', 'mov_origem'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_origem_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'movimentacoes', 'mov_destino'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_destino_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'movimentacoes', 'mov_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'movimentacoes', 'mov_status'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_status_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['softlabs', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['softlabs', 'empresas', 'emp_clientes'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_clientes_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: { 
                    from: ['softlabs', 'empresas', 'emp_fornecedores'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_fornecedores_key', where: ''},
                    fields: [
                        
                    ]
                },
                9: { 
                    from: ['softlabs', 'contratos', 'contratos'],
                    join: {source: 0, tipo: types.join.left, on: 'contratos_key', where: ''},
                    fields: [
                        
                    ]
                },
                10: { 
                    from: ['softlabs', 'contabil', 'cont_centros_resultado'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_centros_resultado_key', where: ''},
                    fields: [
                        
                    ]
                },
                11: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                12: { 
                    from: ['softlabs', 'empresas', 'emp_dep_origem'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_dep_origem_key', where: ''},
                    fields: [
                        
                    ]
                },
                13: { 
                    from: ['softlabs', 'empresas', 'emp_dep_destino'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_dep_destino_key', where: ''},
                    fields: [
                        
                    ]
                } 
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
                    from: ['softlabs', 'movimentacoes', 'movimentacoes'],
                    key: 'movimentacoes_key',
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
module.exports = Movimentacoes;