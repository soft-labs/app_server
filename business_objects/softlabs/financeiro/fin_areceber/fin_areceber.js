/**
 * BusinessObject :: FinAReceber
 *  Implementação de objeto de negócio: fin_lancamentos.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 22 2016 11:24:24 GMT-0300 (BRT)
 * @constructor
 */
function FinAReceber(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_areceber';

    // Map
    this.source = {
        table: 'fin_lancamentos',
        metadata: {
            key: 'fin_lancamentos_key',
            label: 'numero',
            fields: {
                fin_lancamentos_key: {
                    tipo: types.comp.key, label: 'Fin Lancamentos:'
                }, 
                fin_lanc_origem_key: {
                    tipo: types.comp.choose, label: 'Fin Lanc Origem:',
                    data: { 
                        key: ['fin_lanc_origem_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lanc_origem'], 
                        template: '{row.fin_lanc_origem_key} - {row.fin_lanc_orige}', 
                        provider: '' 
                    } 
                }, 
                fin_lanc_destino_key: {
                    tipo: types.comp.choose, label: 'Fin Lanc Destino:',
                    data: { 
                        key: ['fin_lanc_destino_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lanc_destino'], 
                        template: '{row.fin_lanc_destino_key} - {row.fin_lanc_destin}', 
                        provider: '' 
                    } 
                }, 
                fin_lanc_tipos_key: {
                    tipo: types.comp.dropdown, label: 'Fin Lanc Tipos:',
                    data: { 
                        key: ['fin_lanc_tipos_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lanc_tipos'], 
                        template: '{row.fin_lanc_tipos_key} - {row.fin_lanc_tipo}', 
                        provider: '' 
                    } 
                }, 
                fin_lanc_status_key: {
                    tipo: types.comp.dropdown, label: 'Fin Lanc Status:',
                    data: { 
                        key: ['fin_lanc_status_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lanc_status'], 
                        template: '{row.fin_lanc_status_key} - {row.fin_lanc_statu}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{row.empresas_key} - {row.empresa}', 
                        provider: '' 
                    } 
                }, 
                fin_contas_key: {
                    tipo: types.comp.choose, label: 'Fin Contas:',
                    data: { 
                        key: ['fin_contas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas'], 
                        template: '{row.fin_contas_key} - {row.fin_conta}', 
                        provider: '' 
                    } 
                }, 
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Cliente:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'empresas', 'emp_clientes'],
                        template: '{parceiros_key} - {parceiro}',
                        provider: '' 
                    } 
                }, 
                contratos_key: {
                    tipo: types.comp.choose, label: 'Contratos:',
                    data: { 
                        key: ['contratos_key'], 
                        from: ['softlabs', 'contratos', 'contratos'], 
                        template: '{row.contratos_key} - {row.contrato}', 
                        provider: '' 
                    } 
                }, 
                movimentacoes_key: {
                    tipo: types.comp.choose, label: 'Movimentações:',
                    data: { 
                        key: ['movimentacoes_key'], 
                        from: ['softlabs', 'movimentacoes', 'movimentacoes'], 
                        template: '{row.movimentacoes_key} - {row.movimentacoe}', 
                        provider: '' 
                    } 
                }, 
                cancelado: {
                    tipo: types.comp.int, label: 'Cancelado:'
                }, 
                competencia: {
                    tipo: types.comp.text, label: 'Competencia:'
                }, 
                dt_lancamento: {
                    tipo: types.comp.date, default: 'now', label: 'Data Lançamento:'
                }, 
                dt_documento: {
                    tipo: types.comp.date, default: 'now', label: 'Data Documento:'
                }, 
                dt_vencimento: {
                    tipo: types.comp.date, default: 'now', label: 'Data Vencimento:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Numero:'
                }, 
                qtd_parcelas: {
                    tipo: types.comp.int, label: 'Qtd Parcelas:'
                }, 
                num_parcela: {
                    tipo: types.comp.int, label: 'Num Parcela:'
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
                    tipo: types.comp.float, label: 'Valor Desconto:'
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
                    tipo: types.comp.int, label: 'Multa Em Mõeda:'
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
                titulo: "Lançamento Financeiro",
                icon  : '',
                bounds: { width: 800, height: 450 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Lançamento Financeiro"},
                {space: 25, dt_documento: 22, dt_vencimento: 22, dt_lancamento: 22, numero: 20},
                {parceiros_key: 75, valor_bruto: 25},

                /*{fin_lancamentos_key: 25, fin_lanc_origem_key: 25, fin_lanc_destino_key: 25, fin_lanc_tipos_key: 25},
                {fin_lanc_status_key: 25, empresas_key: 25, fin_contas_key: 25},
                {contratos_key: 25, movimentacoes_key: 25, cancelado: 25, competencia: 25}, 
                {qtd_parcelas: 25, num_parcela: 25, descricao: 25, complemento: 25},
                {valor_desconto: 25, valor_baixa_previsto: 25, valor_baixa: 25},
                {juros: 25, multa: 25, multa_em_moeda: 25, baixa_autorizada: 25}, 
                {baixa_data: 25, baixa_bancaria: 25, baixa_multa: 25, baixa_juros: 25}, 
                {baixa_desconto: 25, cancelamento_data: 25, cancelamento_motivo: 25, estorno_data: 25}, 
                {estorno_motivo: 25, observacoes: 75}*/
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
                    from: ['softlabs', 'financeiro', 'fin_areceber'],
                    fields: [
                        '*'
                    ]
                },
                1:{
                    from: ['softlabs', 'financeiro', 'fin_lanc_tipos'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_lanc_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: {
                    from: ['softlabs', 'financeiro', 'fin_lanc_status'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_lanc_status_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: {
                    from: ['softlabs', 'empresas', 'empresas'],
                        join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: {
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: {
                    from: ['softlabs', 'parceiros', 'parceiros'],
                        join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: {
                    from: ['softlabs', 'contratos', 'contratos'],
                        join: {source: 0, tipo: types.join.left, on: 'contratos_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: {
                    from: ['softlabs', 'movimentacoes', 'movimentacoes'],
                        join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [
                ['AND', 0, 'fin_lanc_tipos_key', '=', '1'],
                ['AND', 0, 'fin_lancamentos_key', types.where.check]
            ],
            order: [
                ['0', 'fin_lancamentos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_areceber'],
                    key: 'fin_lancamentos_key',
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
     */
    this.onInsert = function *(prov, ctx){
        this.params.row['fin_lanc_tipos_key'] = 1;
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
module.exports = FinAReceber;