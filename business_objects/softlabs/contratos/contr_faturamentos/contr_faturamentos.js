/**
 * BusinessObject :: ContrFaturamentos
 *  Implementação de objeto de negócio: contr_faturamentos.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:14:28 GMT-0300 (BRT)
 * @constructor
 */
function ContrFaturamentos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contr_faturamentos';

    // Map
    this.source = {
        table: 'contr_faturamentos',
        metadata: {
            key: 'contr_faturamentos_key',
            label: contr_faturamentos_key,
            fields: {
                contr_faturamentos_key: {
                    tipo: types.comp.key, label: 'Contr Faturamentos:'
                }, 
                contr_fases_key: {
                    tipo: types.comp.dropdown, label: 'Contr Fases:',
                    data: { 
                        key: ['contr_fases_key'], 
                        from: ['softlabs', 'contratos', 'contr_fases'], 
                        template: '{row.contr_fases_key} - {row.contr_fase}', 
                        provider: '' 
                    } 
                }, 
                dt_vencimento: {
                    tipo: types.comp.datetime, label: 'Dt Vencimento:'
                }, 
                descricao: {
                    tipo: types.comp.text, label: 'Descrição:'
                }, 
                valor_base: {
                    tipo: types.comp.float, label: 'Valor Base:'
                }, 
                valor_excedente: {
                    tipo: types.comp.float, label: 'Valor Excedente:'
                }, 
                desconto: {
                    tipo: types.comp.float, label: 'Desconto:'
                }, 
                valor_final: {
                    tipo: types.comp.float, label: 'Valor Final:'
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
                {titulo: "Informações de contr_faturamentos"},
                {contr_faturamentos_key: 25, contr_fases_key: 25, dt_vencimento: 25, descricao: 25}, 
                {valor_base: 25, valor_excedente: 25, desconto: 25, valor_final: 25}, 
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
                    from: ['softlabs', 'contratos', 'contr_faturamentos'],
                    fields: [
                        contr_faturamentos_key
                    ]
                },
                1: { 
                    from: ['softlabs', 'contratos', 'contr_fases'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_fases_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contr_faturamentos_key', types.where.check]
            ],
            order: [
                ['0', 'contr_faturamentos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contratos', 'contr_faturamentos'],
                    key: 'contr_faturamentos_key',
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
module.exports = ContrFaturamentos;