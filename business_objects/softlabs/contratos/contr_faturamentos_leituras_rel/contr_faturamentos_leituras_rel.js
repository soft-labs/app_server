/**
 * BusinessObject :: ContrFaturamentosLeiturasRel
 *  Implementação de objeto de negócio: contr_faturamentos_leituras_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:14:28 GMT-0300 (BRT)
 * @constructor
 */
function ContrFaturamentosLeiturasRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contr_faturamentos_leituras_rel';

    // Map
    this.source = {
        table: 'contr_faturamentos_leituras_rel',
        metadata: {
            key: ['contr_item_leituras_key', 'contr_faturamentos_key'],
            label: ,
            fields: {
                contr_item_leituras_key: {
                    tipo: types.comp.key, label: 'Contr Item Leituras:',
                    data: { 
                        key: ['contr_item_leituras_key'], 
                        from: ['softlabs', 'contratos', 'contr_item_leituras'], 
                        template: '{row.contr_item_leituras_key} - {row.contr_item_leitura}', 
                        provider: '' 
                    } 
                }, 
                contr_faturamentos_key: {
                    tipo: types.comp.key, label: 'Contr Faturamentos:',
                    data: { 
                        key: ['contr_faturamentos_key'], 
                        from: ['softlabs', 'contratos', 'contr_faturamentos'], 
                        template: '{row.contr_faturamentos_key} - {row.contr_faturamento}', 
                        provider: '' 
                    } 
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
                {titulo: "Informações de contr_faturamentos_leituras_rel"},
                {contr_item_leituras_key: 25, contr_faturamentos_key: 75}
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
                    from: ['softlabs', 'contratos', 'contr_faturamentos_leituras_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'contratos', 'contr_item_leituras'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_item_leituras_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contratos', 'contr_faturamentos'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_faturamentos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contr_item_leituras_key', types.where.check],
                ['AND', 0, 'contr_faturamentos_key', types.where.check]
            ],
            order: [
                ['0', 'contr_item_leituras_key', 'desc'],
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
                    from: ['softlabs', 'contratos', 'contr_faturamentos_leituras_rel'],
                    key: ['contr_item_leituras_key', 'contr_faturamentos_key'],
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
module.exports = ContrFaturamentosLeiturasRel;