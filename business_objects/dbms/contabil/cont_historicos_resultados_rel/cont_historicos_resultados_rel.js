/**
 * BusinessObject :: ContHistoricosResultadosRel
 *  Implementação de objeto de negócio: cont_historicos_resultados_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:55:41 GMT-0300 (BRT)
 * @constructor
 */
function ContHistoricosResultadosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_historicos_resultados_rel';

    // Map
    this.source = {
        table: 'cont_historicos_resultados_rel',
        metadata: {
            key: ['cont_historicos_key', 'cont_centro_resultados_key'],
            label: '',
            fields: {
                cont_historicos_key: {
                    tipo: types.comp.key, label: 'Cont Historicos:',
                    data: { 
                        key: ['cont_historicos_key'], 
                        from: ['dbms', 'contabil', 'cont_historicos'], 
                        template: '{cont_historicos_key} - {cont_historico}', 
                        provider: '' 
                    } 
                }, 
                cont_centro_resultados_key: {
                    tipo: types.comp.key, label: 'Cont Centro Resultados:',
                    data: { 
                        key: ['cont_centro_resultados_key'], 
                        from: ['dbms', 'contabil', 'cont_centro_resultados'], 
                        template: '{cont_centro_resultados_key} - {cont_centro_resultado}', 
                        provider: '' 
                    } 
                }, 
                percentual: {
                    tipo: types.comp.float, label: 'Percentual:'
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
                {titulo: "Informações de cont_historicos_resultados_rel"},
                {cont_historicos_key: 25, cont_centro_resultados_key: 25, percentual: 50}
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
                    from: ['dbms', 'contabil', 'cont_historicos_resultados_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_historicos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'contabil', 'cont_centro_resultados'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_centro_resultados_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_historicos_key', types.where.check],
                ['AND', 0, 'cont_centro_resultados_key', types.where.check]
            ],
            order: [
                ['0', 'cont_historicos_key', 'desc'],
                ['0', 'cont_centro_resultados_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_historicos_resultados_rel'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    //endregion


    //region :: Regras de Negócio

    //endregion
    

    //region :: Eventos Disponívels


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


}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = ContHistoricosResultadosRel;