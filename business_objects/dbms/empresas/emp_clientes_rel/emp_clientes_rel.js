/**
 * BusinessObject :: EmpClientesRel
 *  Implementação de objeto de negócio: emp_clientes_rel.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:48 GMT-0300 (BRT)
 * @constructor
 */
function EmpClientesRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'emp_clientes_rel';

    // Map
    this.source = {
        table: 'emp_clientes_rel',
        metadata: {
            key: ['empresas_key', 'emp_clientes_key'],
            label: '',
            fields: {
                empresas_key: {
                    tipo: types.comp.key, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['dbms', 'empresas', 'empresas'], 
                        template: '{empresas_key} - {empresa}', 
                        provider: '' 
                    } 
                }, 
                emp_clientes_key: {
                    tipo: types.comp.key, label: 'Emp Clientes:',
                    data: { 
                        key: ['emp_clientes_key'], 
                        from: ['dbms', 'empresas', 'emp_clientes'], 
                        template: '{emp_clientes_key} - {emp_cliente}', 
                        provider: '' 
                    } 
                },
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Plano de Contas:',
                    data: {
                        key: ['cont_plano_contas_key'],
                        from: ['dbms', 'contabil', 'cont_plano_contas'],
                        template: '{cont_plano_contas_key} - {cont_plano_conta}',
                        provider: ''
                    }
                },
                cont_centro_resultados_key: {
                    tipo: types.comp.choose, label: 'Centro de Resultados:',
                    data: {
                        key: ['cont_centro_resultados_key'],
                        from: ['dbms', 'contabil', 'cont_centro_resultados'],
                        template: '{cont_centro_resultados_key} - {cont_centro_resultado}',
                        provider: ''
                    }
                },
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                dt_inicio: {
                    tipo: types.comp.datetime, label: 'Dt Inicio:'
                }, 
                ult_compra: {
                    tipo: types.comp.datetime, label: 'Ult Compra:'
                }, 
                limite_credito: {
                    tipo: types.comp.float, label: 'Limite Credito:'
                }, 
                limite_compromisso: {
                    tipo: types.comp.float, label: 'Limite Compromisso:'
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
                {titulo: "Informações de emp_clientes_rel"},
                {empresas_key: 25, emp_clientes_key: 25, ativo: 25, dt_inicio: 25}, 
                {ult_compra: 25, limite_credito: 25, limite_compromisso: 25, observacoes: 25}
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
                    from: ['dbms', 'empresas', 'emp_clientes_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'empresas', 'emp_clientes'],
                    join: {source: 0, tipo: types.join.left, on: 'emp_clientes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'empresas_key', types.where.check],
                ['AND', 0, 'emp_clientes_key', types.where.check]
            ],
            order: [
                ['0', 'empresas_key', 'desc'],
                ['0', 'emp_clientes_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'empresas', 'emp_clientes_rel'],
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
module.exports = EmpClientesRel;