/**
 * BusinessObject :: RhCargosHabilidadesRel
 *  Implementação de objeto de negócio: rh_cargos_habilidades_rel.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:10:30 GMT-0300 (BRT)
 * @constructor
 */
function RhCargosHabilidadesRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'rh_cargos_habilidades_rel';

    // Map
    this.source = {
        table: 'rh_cargos_habilidades_rel',
        metadata: {
            key: ['rh_cargos_key', 'rh_habilidades_key'],
            label: '',
            fields: {
                rh_cargos_key: {
                    tipo: types.comp.key, label: 'Rh Cargos:',
                    data: { 
                        key: ['rh_cargos_key'], 
                        from: ['softlabs', 'rh', 'rh_cargos'], 
                        template: '{rh_cargos_key} - {rh_cargo}', 
                        provider: '' 
                    } 
                }, 
                rh_habilidades_key: {
                    tipo: types.comp.key, label: 'Rh Habilidades:',
                    data: { 
                        key: ['rh_habilidades_key'], 
                        from: ['softlabs', 'rh', 'rh_habilidades'], 
                        template: '{rh_habilidades_key} - {rh_habilidade}', 
                        provider: '' 
                    } 
                }, 
                mandatoria: {
                    tipo: types.comp.int, label: 'Mandatoria:'
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
                {titulo: "Informações de rh_cargos_habilidades_rel"},
                {rh_cargos_key: 25, rh_habilidades_key: 25, mandatoria: 25, observacoes: 25}
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
                    from: ['softlabs', 'rh', 'rh_cargos_habilidades_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'rh', 'rh_cargos'],
                    join: {source: 0, tipo: types.join.left, on: 'rh_cargos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'rh', 'rh_habilidades'],
                    join: {source: 0, tipo: types.join.left, on: 'rh_habilidades_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'rh_cargos_key', types.where.check],
                ['AND', 0, 'rh_habilidades_key', types.where.check]
            ],
            order: [
                ['0', 'rh_cargos_key', 'desc'],
                ['0', 'rh_habilidades_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'rh', 'rh_cargos_habilidades_rel'],
                    key: ['rh_cargos_key', 'rh_habilidades_key'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos


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


    //region :: Regras de Negócio

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = RhCargosHabilidadesRel;