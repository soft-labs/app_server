/**
 * BusinessObject :: RhCargosEmpSetoresRel
 *  Implementação de objeto de negócio: rh_cargos_emp_setores_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:16:46 GMT-0300 (BRT)
 * @constructor
 */
function RhCargosEmpSetoresRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'rh_cargos_emp_setores_rel';

    // Map
    this.source = {
        table: 'rh_cargos_emp_setores_rel',
        metadata: {
            key: ['rh_cargos_key', 'emp_setores_key'],
            label: ,
            fields: {
                rh_cargos_key: {
                    tipo: types.comp.key, label: 'Rh Cargos:',
                    data: { 
                        key: ['rh_cargos_key'], 
                        from: ['softlabs', 'rh', 'rh_cargos'], 
                        template: '{row.rh_cargos_key} - {row.rh_cargo}', 
                        provider: '' 
                    } 
                }, 
                emp_setores_key: {
                    tipo: types.comp.key, label: 'Emp Setores:',
                    data: { 
                        key: ['emp_setores_key'], 
                        from: ['softlabs', 'empresas', 'emp_setores'], 
                        template: '{row.emp_setores_key} - {row.emp_setore}', 
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
                {titulo: "Informações de rh_cargos_emp_setores_rel"},
                {rh_cargos_key: 25, emp_setores_key: 75}
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
                    from: ['softlabs', 'rh', 'rh_cargos_emp_setores_rel'],
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
                    from: ['softlabs', 'empresas', 'emp_setores'],
                        join: {source: 0, tipo: types.join.left, on: 'emp_setores_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'rh_cargos_key', types.where.check],
                ['AND', 0, 'emp_setores_key', types.where.check]
            ],
            order: [
                ['0', 'rh_cargos_key', 'desc'],
                ['0', 'emp_setores_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'rh', 'rh_cargos_emp_setores_rel'],
                    key: ['rh_cargos_key', 'emp_setores_key'],
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
module.exports = RhCargosEmpSetoresRel;