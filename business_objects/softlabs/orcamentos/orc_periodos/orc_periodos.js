/**
 * BusinessObject :: OrcPeriodos
 *  Implementação de objeto de negócio: orc_periodos.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:47:12 GMT-0300 (BRT)
 * @constructor
 */
function OrcPeriodos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'orc_periodos';

    // Map
    this.source = {
        table: 'orc_periodos',
        metadata: {
            key: 'orc_periodos_key',
            fields: {
                orc_periodos_key: {
                    tipo: types.comp.key, label: 'Orc Periodos:'
                }, 
                orcamentos_key: {
                    tipo: types.comp.dropdown, label: 'Orcamentos:',
                    data: { 
                        key: ['orcamentos_key'], 
                        from: ['softlabs', 'orcamentos', 'orcamentos'], 
                        template: '{row.orcamentos_key} - {row.orcamento}', 
                        provider: '' 
                    } 
                }, 
                sec_alterado_por_key: {
                    tipo: types.comp.dropdown, label: 'Sec Alterado Por:',
                    data: { 
                        key: ['sec_alterado_por_key'], 
                        from: ['softlabs', 'security', 'sec_alterado_por'], 
                        template: '{row.sec_alterado_por_key} - {row.sec_alterado_po}', 
                        provider: '' 
                    } 
                }, 
                dt_cad: {
                    tipo: types.comp.date, label: 'Dt Cad:'
                }, 
                dt_inicio: {
                    tipo: types.comp.date, label: 'Dt Inicio:'
                }, 
                dt_final: {
                    tipo: types.comp.date, label: 'Dt Final:'
                }, 
                periodo: {
                    tipo: types.comp.text, label: 'Periodo:'
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
                {titulo: "Informações de orc_periodos"},
                {orc_periodos_key: 25, orcamentos_key: 25, sec_alterado_por_key: 25, dt_cad: 25}, 
                {dt_inicio: 25, dt_final: 25, periodo: 25, observacoes: 25}
            ],
            ctrls: {
                periodo: {
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
                    from: ['softlabs', 'orcamentos', 'orc_periodos'],
                    fields: [
                        'periodo'
                    ]
                },
                1: { 
                    from: ['softlabs', 'orcamentos', 'orcamentos'],
                        join: {source: 0, tipo: types.join.left, on: 'orcamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'security', 'sec_alterado_por'],
                        join: {source: 0, tipo: types.join.left, on: 'sec_alterado_por_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'orc_periodos_key', types.where.check]
            ],
            order: [
                [0, 'periodo', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'periodo',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'orcamentos', 'orc_periodos'],
                    key: 'orc_periodos_key',
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
module.exports = OrcPeriodos;