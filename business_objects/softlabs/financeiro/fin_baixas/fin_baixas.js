/**
 * BusinessObject :: FinBaixas
 *  Implementação de objeto de negócio: fin_baixas.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:40 GMT-0300 (BRT)
 * @constructor
 */
function FinBaixas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_baixas';

    // Map
    this.source = {
        table: 'fin_baixas',
        metadata: {
            key: 'fin_baixas_key',
            fields: {
                fin_baixas_key: {
                    tipo: types.comp.key, label: 'Fin Baixas:'
                }, 
                fin_lancamentos_key: {
                    tipo: types.comp.dropdown, label: 'Fin Lancamentos:',
                    data: { 
                        key: ['fin_lancamentos_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lancamentos'], 
                        template: '{row.fin_lancamentos_key} - {row.fin_lancamento}', 
                        provider: '' 
                    } 
                }, 
                fin_contas_key: {
                    tipo: types.comp.dropdown, label: 'Fin Contas:',
                    data: { 
                        key: ['fin_contas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas'], 
                        template: '{row.fin_contas_key} - {row.fin_conta}', 
                        provider: '' 
                    } 
                }, 
                fin_especies_key: {
                    tipo: types.comp.dropdown, label: 'Fin Especies:',
                    data: { 
                        key: ['fin_especies_key'], 
                        from: ['softlabs', 'financeiro', 'fin_especies'], 
                        template: '{row.fin_especies_key} - {row.fin_especie}', 
                        provider: '' 
                    } 
                }, 
                cancelado: {
                    tipo: types.comp.int, label: 'Cancelado:'
                }, 
                dt_baixa: {
                    tipo: types.comp.datetime, label: 'Dt Baixa:'
                }, 
                historico: {
                    tipo: types.comp.text, label: 'Historico:'
                }, 
                ref_bancaria: {
                    tipo: types.comp.text, label: 'Ref Bancaria:'
                }, 
                valor: {
                    tipo: types.comp.float, label: 'Valor:'
                }, 
                vl_multa: {
                    tipo: types.comp.float, label: 'Vl Multa:'
                }, 
                vl_juros: {
                    tipo: types.comp.float, label: 'Vl Juros:'
                }, 
                chq_numero: {
                    tipo: types.comp.text, label: 'Chq Numero:'
                }, 
                chq_emitente: {
                    tipo: types.comp.text, label: 'Chq Emitente:'
                }, 
                chq_contato: {
                    tipo: types.comp.text, label: 'Chq Contato:'
                }, 
                chq_banco: {
                    tipo: types.comp.text, label: 'Chq Banco:'
                }, 
                chq_agencia: {
                    tipo: types.comp.text, label: 'Chq Agencia:'
                }, 
                chq_conta: {
                    tipo: types.comp.text, label: 'Chq Conta:'
                }, 
                chq_bom_para: {
                    tipo: types.comp.date, label: 'Chq Bom Para:'
                }, 
                cc_numero: {
                    tipo: types.comp.text, label: 'Cc Numero:'
                }, 
                cc_nsu: {
                    tipo: types.comp.text, label: 'Cc Nsu:'
                }, 
                cc_taxa: {
                    tipo: types.comp.float, label: 'Cc Taxa:'
                }, 
                bol_numero: {
                    tipo: types.comp.text, label: 'Bol Numero:'
                }, 
                bol_cod_barras: {
                    tipo: types.comp.text, label: 'Bol Cod Barras:'
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
                {titulo: "Informações de fin_baixas"},
                {fin_baixas_key: 25, fin_lancamentos_key: 25, fin_contas_key: 25, fin_especies_key: 25}, 
                {cancelado: 25, dt_baixa: 25, historico: 25, ref_bancaria: 25}, 
                {valor: 25, vl_multa: 25, vl_juros: 25, chq_numero: 25}, 
                {chq_emitente: 25, chq_contato: 25, chq_banco: 25, chq_agencia: 25}, 
                {chq_conta: 25, chq_bom_para: 25, cc_numero: 25, cc_nsu: 25}, 
                {cc_taxa: 25, bol_numero: 25, bol_cod_barras: 25, observacoes: 25}
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
                    from: ['softlabs', 'financeiro', 'fin_baixas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'financeiro', 'fin_lancamentos'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_lancamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'financeiro', 'fin_especies'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_especies_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_baixas_key', types.where.check]
            ],
            order: [
                ['0', 'fin_baixas_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_baixas'],
                    key: 'fin_baixas_key',
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
module.exports = FinBaixas;