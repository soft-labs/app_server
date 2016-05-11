/**
 * BusinessObject :: OrcValores
 *  Implementação de objeto de negócio: orc_valores.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:13:07 GMT-0300 (BRT)
 * @constructor
 */
function OrcValores(){

    //region :: Definições do Objeto

    // Id
    this.id = 'orc_valores';

    // Map
    this.source = {
        table: 'orc_valores',
        metadata: {
            key: ['orc_periodos_key', 'cont_centros_resultado_key', 'cont_plano_contas_key'],
            fields: {
                orc_periodos_key: {
                    tipo: types.comp.key, label: 'Orc Periodos:'
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.key, label: 'Cont Centros Resultado:'
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.key, label: 'Cont Plano Contas:'
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
                valor: {
                    tipo: types.comp.float, label: 'Valor:'
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
                {titulo: "Informações de orc_valores"},
                {orc_periodos_key: 25, cont_centros_resultado_key: 25, cont_plano_contas_key: 25, sec_alterado_por_key: 25}, 
                {dt_cad: 25, valor: 25, observacoes: 50}
            ],
            ctrls: {
                valor: {
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
                    from: ['softlabs', 'orcamentos', 'orc_valores'],
                    fields: [
                        'valor'
                    ]
                },
                1: { 
                    from: ['softlabs', 'security', 'sec_alterado_por'],
                        join: {source: 0, tipo: types.join.left, on: 'sec_alterado_por_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'orc_periodos_key', types.where.check],
                ['AND', 0, 'cont_centros_resultado_key', types.where.check],
                ['AND', 0, 'cont_plano_contas_key', types.where.check]
            ],
            order: [
                [0, 'valor', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'valor',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'orcamentos', 'orc_valores'],
                    key: ['orc_periodos_key', 'cont_centros_resultado_key', 'cont_plano_contas_key'],
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
module.exports = OrcValores;