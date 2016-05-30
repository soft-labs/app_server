/**
 * BusinessObject :: RhFuncHabilidadesRel
 *  Implementação de objeto de negócio: rh_func_habilidades_rel.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:59:15 GMT-0300 (BRT)
 * @constructor
 */
function RhFuncHabilidadesRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'rh_func_habilidades_rel';

    // Map
    this.source = {
        table: 'rh_func_habilidades_rel',
        metadata: {
            key: ['rh_funcionarios_key', 'rh_habilidades_key'],
            label: '',
            fields: {
                rh_funcionarios_key: {
                    tipo: types.comp.key, label: 'Rh Funcionarios:',
                    data: { 
                        key: ['rh_funcionarios_key'], 
                        from: ['dbms', 'rh', 'rh_funcionarios'], 
                        template: '{rh_funcionarios_key} - {rh_funcionario}', 
                        provider: '' 
                    } 
                }, 
                rh_habilidades_key: {
                    tipo: types.comp.key, label: 'Rh Habilidades:',
                    data: { 
                        key: ['rh_habilidades_key'], 
                        from: ['dbms', 'rh', 'rh_habilidades'], 
                        template: '{rh_habilidades_key} - {rh_habilidade}', 
                        provider: '' 
                    } 
                }, 
                dt_adquirida: {
                    tipo: types.comp.date, label: 'Dt Adquirida:'
                }, 
                dt_planejada: {
                    tipo: types.comp.date, label: 'Dt Planejada:'
                }, 
                nivel: {
                    tipo: types.comp.int, label: 'Nivel:'
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
                {titulo: "Informações de rh_func_habilidades_rel"},
                {rh_funcionarios_key: 25, rh_habilidades_key: 25, dt_adquirida: 25, dt_planejada: 25}, 
                {nivel: 25, observacoes: 75}
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
                    from: ['dbms', 'rh', 'rh_func_habilidades_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'rh', 'rh_funcionarios'],
                    join: {source: 0, tipo: types.join.left, on: 'rh_funcionarios_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'rh', 'rh_habilidades'],
                    join: {source: 0, tipo: types.join.left, on: 'rh_habilidades_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'rh_funcionarios_key', types.where.check],
                ['AND', 0, 'rh_habilidades_key', types.where.check]
            ],
            order: [
                ['0', 'rh_funcionarios_key', 'desc'],
                ['0', 'rh_habilidades_key', 'desc']
            ],
            search: [
                    {alias: 6, field: 'dt_adquirida',  param: types.search.maior_igual },
                    {alias: 6, field: 'dt_planejada',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'rh', 'rh_func_habilidades_rel'],
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
module.exports = RhFuncHabilidadesRel;