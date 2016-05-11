/**
 * BusinessObject :: FinCaixa
 *  Implementação de objeto de negócio: fin_caixa.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:40 GMT-0300 (BRT)
 * @constructor
 */
function FinCaixa(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_caixa';

    // Map
    this.source = {
        table: 'fin_caixa',
        metadata: {
            key: 'fin_caixa_key',
            fields: {
                fin_caixa_key: {
                    tipo: types.comp.key, label: 'Fin Caixa:'
                }, 
                aberto_por_key: {
                    tipo: types.comp.dropdown, label: 'Aberto Por:',
                    data: { 
                        key: ['aberto_por_key'], 
                        from: ['softlabs', '', 'aberto_por'], 
                        template: '{row.aberto_por_key} - {row.aberto_po}', 
                        provider: '' 
                    } 
                }, 
                fechado_por_key: {
                    tipo: types.comp.dropdown, label: 'Fechado Por:',
                    data: { 
                        key: ['fechado_por_key'], 
                        from: ['softlabs', '', 'fechado_por'], 
                        template: '{row.fechado_por_key} - {row.fechado_po}', 
                        provider: '' 
                    } 
                }, 
                numero_caixa: {
                    tipo: types.comp.int, label: 'Numero Caixa:'
                }, 
                dia_abertura: {
                    tipo: types.comp.date, label: 'Dia Abertura:'
                }, 
                hr_abertura: {
                    tipo: types.comp.time, label: 'Hr Abertura:'
                }, 
                dia_fechamento: {
                    tipo: types.comp.date, label: 'Dia Fechamento:'
                }, 
                hr_fechamento: {
                    tipo: types.comp.time, label: 'Hr Fechamento:'
                }, 
                valor_abertura: {
                    tipo: types.comp.float, label: 'Valor Abertura:'
                }, 
                receitas: {
                    tipo: types.comp.float, label: 'Receitas:'
                }, 
                despesas: {
                    tipo: types.comp.float, label: 'Despesas:'
                }, 
                saldo: {
                    tipo: types.comp.float, label: 'Saldo:'
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
                {titulo: "Informações de fin_caixa"},
                {fin_caixa_key: 25, aberto_por_key: 25, fechado_por_key: 25, numero_caixa: 25}, 
                {dia_abertura: 25, hr_abertura: 25, dia_fechamento: 25, hr_fechamento: 25}, 
                {valor_abertura: 25, receitas: 25, despesas: 25, saldo: 25}, 
                {observacoes: 100}
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
                    from: ['softlabs', 'financeiro', 'fin_caixa'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', '', 'aberto_por'],
                        join: {source: 0, tipo: types.join.left, on: 'aberto_por_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', '', 'fechado_por'],
                        join: {source: 0, tipo: types.join.left, on: 'fechado_por_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_caixa_key', types.where.check]
            ],
            order: [
                ['0', 'fin_caixa_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_caixa'],
                    key: 'fin_caixa_key',
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
module.exports = FinCaixa;