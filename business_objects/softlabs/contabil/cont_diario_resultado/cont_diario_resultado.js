/**
 * BusinessObject :: ContDiarioResultado
 *  Implementação de objeto de negócio: cont_diario_resultado.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:11:58 GMT-0300 (BRT)
 * @constructor
 */
function ContDiarioResultado(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_diario_resultado';

    // Map
    this.source = {
        table: 'cont_diario_resultado',
        metadata: {
            key: 'cont_diario_resultado_key',
            fields: {
                cont_diario_resultado_key: {
                    tipo: types.comp.key, label: 'Cont Diario Resultado:'
                }, 
                cont_centro_resultados_key: {
                    tipo: types.comp.dropdown, label: 'Cont Centro Resultados:',
                    data: { 
                        key: ['cont_centro_resultados_key'], 
                        from: ['softlabs', 'contabil', 'cont_centro_resultados'], 
                        template: '{row.cont_centro_resultados_key} - {row.cont_centro_resultado}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.dropdown, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{row.empresas_key} - {row.empresa}', 
                        provider: '' 
                    } 
                }, 
                movimentacoes_key: {
                    tipo: types.comp.dropdown, label: 'Movimentações:',
                    data: { 
                        key: ['movimentacoes_key'], 
                        from: ['softlabs', 'movimentacoes', 'movimentacoes'], 
                        template: '{row.movimentacoes_key} - {row.movimentacoe}', 
                        provider: '' 
                    } 
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
                fin_baixas_key: {
                    tipo: types.comp.dropdown, label: 'Fin Baixas:',
                    data: { 
                        key: ['fin_baixas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_baixas'], 
                        template: '{row.fin_baixas_key} - {row.fin_baixa}', 
                        provider: '' 
                    } 
                }, 
                dt_diario: {
                    tipo: types.comp.datetime, label: 'Dt Diario:'
                }, 
                historico: {
                    tipo: types.comp.text, label: 'Historico:'
                }, 
                credito: {
                    tipo: types.comp.float, label: 'Credito:'
                }, 
                debito: {
                    tipo: types.comp.float, label: 'Debito:'
                }, 
                ref1: {
                    tipo: types.comp.text, label: 'Ref1:'
                }, 
                ref2: {
                    tipo: types.comp.text, label: 'Ref2:'
                }, 
                ref3: {
                    tipo: types.comp.text, label: 'Ref3:'
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
                {titulo: "Informações de cont_diario_resultado"},
                {cont_diario_resultado_key: 25, cont_centro_resultados_key: 25, empresas_key: 25, movimentacoes_key: 25}, 
                {fin_lancamentos_key: 25, fin_baixas_key: 25, dt_diario: 25, historico: 25}, 
                {credito: 25, debito: 25, ref1: 25, ref2: 25}, 
                {ref3: 25, observacoes: 75}
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
                    from: ['softlabs', 'contabil', 'cont_diario_resultado'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'contabil', 'cont_centro_resultados'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_centro_resultados_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'empresas', 'empresas'],
                        join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'movimentacoes', 'movimentacoes'],
                        join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'financeiro', 'fin_lancamentos'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_lancamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'financeiro', 'fin_baixas'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_baixas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_diario_resultado_key', types.where.check]
            ],
            order: [
                ['0', 'cont_diario_resultado_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contabil', 'cont_diario_resultado'],
                    key: 'cont_diario_resultado_key',
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
module.exports = ContDiarioResultado;