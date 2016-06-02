/**
 * BusinessObject :: FinLancamentos
 *  Implementação de objeto de negócio: fin_lancamentos.
 *
 * Engine de aplicações - TShark.
 * @since Tue May 31 2016 14:34:19 GMT-0300 (BRT)
 * @constructor
 */
// Types
const types = require('../../../../tshark/types');

function FinLancamentos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_lancamentos';

    // Map
    this.source = {
        table: 'fin_lancamentos',
        metadata: {
            key: 'fin_lancamentos_key',
            label: 'competencia',
            fields: {
                fin_lancamentos_key: {
                    tipo: types.comp.key, label: 'Núm Interno:'
                }, 
                fin_lanc_origem_key: {
                    tipo: types.comp.choose, label: 'Lançamento de Origem:',
                    data: {
                        key: ['fin_lanc_origem_key'],
                        from: ['dbms', 'financeiro', 'fin_lanc_origem'],
                        template: '{fin_lanc_origem_key} - {fin_lanc_orige}',
                        provider: ''
                    }
                },
                fin_lanc_destino_key: {
                    tipo: types.comp.choose, label: 'Lançamento de Destino:',
                    data: {
                        key: ['fin_lanc_destino_key'],
                        from: ['dbms', 'financeiro', 'fin_lanc_destino'],
                        template: '{fin_lanc_destino_key} - {fin_lanc_destin}',
                        provider: ''
                    }
                },
                fin_lanc_tipos_key: {
                    tipo: types.comp.choose, label: 'Tipo de Lançamento:',
                    data: {
                        key: ['fin_lanc_tipos_key'],
                        from: ['dbms', 'financeiro', 'fin_lanc_tipos'],
                        template: '{fin_lanc_tipos_key} - {fin_lanc_tipo}',
                        provider: ''
                    }
                },
                fin_lanc_status_key: {
                    tipo: types.comp.choose, label: 'Situação:',
                    data: {
                        key: ['fin_lanc_status_key'],
                        from: ['dbms', 'financeiro', 'fin_lanc_status'],
                        template: '{fin_lanc_status_key} - {fin_lanc_statu}',
                        provider: ''
                    }
                },
                cont_historicos_key: {
                    tipo: types.comp.choose, label: 'Histórico:',
                    data: {
                        key: ['cont_historicos_key'],
                        from: ['dbms', 'contabil', 'cont_historicos'],
                        template: '{cont_historicos_key} - {historico}',
                        provider: ''
                    }
                },
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresa:',
                    data: {
                        key: ['empresas_key'],
                        from: ['dbms', 'empresas', 'empresas'],
                        template: '{empresas_key} - {empresa}',
                        provider: ''
                    }
                },
                fin_contas_key: {
                    tipo: types.comp.choose, label: 'Conta Provisionada:',
                    data: {
                        key: ['fin_contas_key'],
                        from: ['dbms', 'financeiro', 'fin_contas'],
                        template: '{fin_contas_key} - {fin_conta}',
                        provider: ''
                    }
                },
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiro:',
                    data: {
                        key: ['parceiros_key'],
                        from: ['dbms', 'parceiros', 'parceiros'],
                        template: '{parceiros_key} - {parceiro}',
                        provider: ''
                    }
                },
                contratos_key: {
                    tipo: types.comp.choose, label: 'Contrato Referente:',
                    data: {
                        key: ['contratos_key'],
                        from: ['dbms', 'contratos', 'contratos'],
                        template: '{contratos_key} - {contrato}',
                        provider: ''
                    }
                },
                movimentacoes_key: {
                    tipo: types.comp.choose, label: 'Movimentação Origem:',
                    data: { 
                        key: ['movimentacoes_key'], 
                        from: ['dbms', 'movimentacoes', 'movimentacoes'], 
                        template: '{movimentacoes_key} - {movimentacoe}', 
                        provider: '' 
                    } 
                }, 
                cancelado: {
                    tipo: types.comp.int, label: 'Cancelado:'
                }, 
                competencia: {
                    tipo: types.comp.text, label: 'Competência:'
                }, 
                dt_lancamento: {
                    tipo: types.comp.datetime, default: 'NOW', label: 'Lançamento:'
                }, 
                dt_documento: {
                    tipo: types.comp.date, default: 'NOW', label: 'Data do Documento:'
                }, 
                dt_vencimento: {
                    tipo: types.comp.date, label: 'Vencimento:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Número:'
                }, 
                qtd_parcelas: {
                    tipo: types.comp.int, label: 'Parcelas:'
                }, 
                num_parcela: {
                    tipo: types.comp.int, label: 'Núm. da Parcela:'
                }, 
                descricao: {
                    tipo: types.comp.text, label: 'Descrição:'
                }, 
                complemento: {
                    tipo: types.comp.text, label: 'Complemento:'
                }, 
                valor_bruto: {
                    tipo: types.comp.float, label: 'Valor:'
                }, 
                valor_desconto: {
                    tipo: types.comp.float, label: 'Valor de Desconto:'
                }, 
                valor_baixa_previsto: {
                    tipo: types.comp.float, label: 'Valor Baixa Previsto:'
                }, 
                valor_baixa: {
                    tipo: types.comp.float, label: 'Valor Baixa:'
                }, 
                juros: {
                    tipo: types.comp.float, label: 'Juros:'
                }, 
                multa: {
                    tipo: types.comp.float, label: 'Multa:'
                }, 
                multa_em_moeda: {
                    tipo: types.comp.int, label: 'Multa Em Moeda:'
                }, 
                baixa_autorizada: {
                    tipo: types.comp.int, label: 'Baixa Autorizada:'
                }, 
                baixa_data: {
                    tipo: types.comp.date, label: 'Baixa Data:'
                }, 
                baixa_bancaria: {
                    tipo: types.comp.date, label: 'Baixa Bancaria:'
                }, 
                baixa_multa: {
                    tipo: types.comp.float, label: 'Baixa Multa:'
                }, 
                baixa_juros: {
                    tipo: types.comp.float, label: 'Baixa Juros:'
                }, 
                baixa_desconto: {
                    tipo: types.comp.float, label: 'Baixa Desconto:'
                }, 
                cancelamento_data: {
                    tipo: types.comp.date, label: 'Cancelamento Data:'
                }, 
                cancelamento_motivo: {
                    tipo: types.comp.text_big, label: 'Cancelamento Motivo:'
                }, 
                estorno_data: {
                    tipo: types.comp.date, label: 'Estorno Data:'
                }, 
                estorno_motivo: {
                    tipo: types.comp.text_big, label: 'Estorno Motivo:'
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
                {titulo: "Informações de fin_lancamentos"},
                {fin_lancamentos_key: 25, fin_lanc_origem_key: 25, fin_lanc_destino_key: 25, fin_lanc_tipos_key: 25}, 
                {fin_lanc_status_key: 25, cont_historicos_key: 25, empresas_key: 25, fin_contas_key: 25}, 
                {parceiros_key: 25, contratos_key: 25, movimentacoes_key: 25, cancelado: 25}, 
                {competencia: 25, dt_lancamento: 25, dt_documento: 25, dt_vencimento: 25}, 
                {numero: 25, qtd_parcelas: 25, num_parcela: 25, descricao: 25}, 
                {complemento: 25, valor_bruto: 25, valor_desconto: 25, valor_baixa_previsto: 25}, 
                {valor_baixa: 25, juros: 25, multa: 25, multa_em_moeda: 25}, 
                {baixa_autorizada: 25, baixa_data: 25, baixa_bancaria: 25, baixa_multa: 25}, 
                {baixa_juros: 25, baixa_desconto: 25, cancelamento_data: 25, cancelamento_motivo: 25}, 
                {estorno_data: 25, estorno_motivo: 25, observacoes: 50}
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
                    from: ['dbms', 'financeiro', 'fin_lancamentos'],
                    fields: [
                        
                    ]
                },
                1: {
                    from: ['dbms', 'financeiro', 'fin_lanc_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lanc_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: {
                    from: ['dbms', 'financeiro', 'fin_lanc_status'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lanc_status_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: {
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_historicos_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: {
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: {
                    from: ['dbms', 'financeiro', 'fin_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: {
                    from: ['dbms', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: {
                    from: ['dbms', 'contratos', 'contratos'],
                    join: {source: 0, tipo: types.join.left, on: 'contratos_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: {
                    from: ['dbms', 'movimentacoes', 'movimentacoes'],
                    join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_lancamentos_key', types.where.check]
            ],
            order: [
                [0, 'competencia', 'asc']
            ],
            search: [
                    {alias: 0, field: 'competencia',  param: types.search.like_full },
                    {alias: 0, field: 'dt_documento',  param: types.search.maior_igual },
                    {alias: 0, field: 'dt_vencimento',  param: types.search.maior_igual },
                    {alias: 0, field: 'numero',  param: types.search.like_full },
                    {alias: 0, field: 'descricao',  param: types.search.like_full },
                    {alias: 0, field: 'complemento',  param: types.search.like_full },
                    {alias: 0, field: 'baixa_data',  param: types.search.maior_igual },
                    {alias: 0, field: 'baixa_bancaria',  param: types.search.maior_igual },
                    {alias: 0, field: 'cancelamento_data',  param: types.search.maior_igual },
                    {alias: 0, field: 'estorno_data',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'financeiro', 'fin_lancamentos'],
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
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     */
    this.onSelect = function *(prov, ctx){
        if (this.params['periodo']){
            prov.where.push(
                ["AND", 0, "dt_vencimento", ">=", "'" + this.params['periodo'].de + "'"]
            );
            prov.where.push(
                ["AND", 0, "dt_vencimento", "<=", "'" + this.params['periodo'].ate + "'"]
            );
            prov['showSQL'] = 0;
        }
    };

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

// Exporta
module.exports = FinLancamentos;