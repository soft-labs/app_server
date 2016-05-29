/**
 * BusinessObject :: Contratos
 *  Implementação de objeto de negócio: contratos.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:09:00 GMT-0300 (BRT)
 * @constructor
 */
function Contratos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contratos';

    // Map
    this.source = {
        table: 'contratos',
        metadata: {
            key: 'contratos_key',
            label: 'descricao',
            fields: {
                contratos_key: {
                    tipo: types.comp.key, label: 'Contratos:'
                }, 
                contr_tipos_key: {
                    tipo: types.comp.choose, label: 'Contr Tipos:',
                    data: { 
                        key: ['contr_tipos_key'], 
                        from: ['softlabs', 'contratos', 'contr_tipos'], 
                        template: '{contr_tipos_key} - {contr_tipo}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{empresas_key} - {empresa}', 
                        provider: '' 
                    } 
                }, 
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'parceiros', 'parceiros'], 
                        template: '{parceiros_key} - {parceiro}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{cont_plano_contas_key} - {cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.choose, label: 'Cont Centros Resultado:',
                    data: { 
                        key: ['cont_centros_resultado_key'], 
                        from: ['softlabs', 'contabil', 'cont_centros_resultado'], 
                        template: '{cont_centros_resultado_key} - {cont_centros_resultad}', 
                        provider: '' 
                    } 
                }, 
                dt_inicio: {
                    tipo: types.comp.datetime, label: 'Dt Inicio:'
                }, 
                dt_encerramento: {
                    tipo: types.comp.datetime, label: 'Dt Encerramento:'
                }, 
                descricao: {
                    tipo: types.comp.text, label: 'Descrição:'
                }, 
                valor_original: {
                    tipo: types.comp.float, label: 'Valor Original:'
                }, 
                valor_atual: {
                    tipo: types.comp.float, label: 'Valor Atual:'
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
                {titulo: "Informações de contratos"},
                {contratos_key: 25, contr_tipos_key: 25, empresas_key: 25, parceiros_key: 25}, 
                {cont_plano_contas_key: 25, cont_centros_resultado_key: 25, dt_inicio: 25, dt_encerramento: 25}, 
                {descricao: 25, valor_original: 25, valor_atual: 25, observacoes: 25}
            ],
            ctrls: {
                descricao: {
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
                    from: ['softlabs', 'contratos', 'contratos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'contratos', 'contr_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'contr_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'contabil', 'cont_centros_resultado'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_centros_resultado_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contratos_key', types.where.check]
            ],
            order: [
                [0, 'descricao', 'asc']
            ],
            search: [
                    {alias: 0, field: 'descricao',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contratos', 'contratos'],
                    key: 'contratos_key',
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
module.exports = Contratos;