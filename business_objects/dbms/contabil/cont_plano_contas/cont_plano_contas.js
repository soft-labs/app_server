/**
 * BusinessObject :: ContPlanoContas
 *  Implementação de objeto de negócio: cont_plano_contas.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:35 GMT-0300 (BRT)
 * @constructor
 */
function ContPlanoContas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_plano_contas';

    // Map
    this.source = {
        table: 'cont_plano_contas',
        metadata: {
            key: 'cont_plano_contas_key',
            label: 'plano_conta',
            fields: {
                cont_plano_contas_key: {
                    tipo: types.comp.key, label: 'Cont Plano Contas:'
                }, 
                cont_categorias_key: {
                    tipo: types.comp.choose, label: 'Categoria da Conta:',
                    data: { 
                        key: ['cont_categorias_key'], 
                        from: ['dbms', 'contabil', 'cont_categorias'], 
                        template: '{cont_categorias_key} - {cont_categoria}', 
                        provider: '' 
                    } 
                }, 
                parent_key: {
                    tipo: types.comp.choose, label: 'Parent:',
                    data: { 
                        key: ['parent_key'], 
                        from: ['dbms', 'contabil', 'parent'], 
                        template: '{parent_key} - {paren}', 
                        provider: '' 
                    } 
                }, 
                _integracao: {
                    tipo: types.comp.text, label: ' Integração:'
                }, 
                ativo: {
                    tipo: types.comp.check, label: 'Ativo:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Código:'
                }, 
                plano_conta: {
                    tipo: types.comp.text, label: 'Plano de Conta:'
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
                {titulo: "Informações da Conta Gerencial"},
                {ativo: 10, cont_categorias_key: 30, codigo: 20, parent_key: 40},
                {_integracao: 30, plano_conta: 20},
                { observacoes: 100}
            ],
            ctrls: {
                plano_conta: {
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
                    from: ['dbms', 'contabil', 'cont_plano_contas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_categorias'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_categorias_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'contabil', 'parent'],
                    join: {source: 0, tipo: types.join.left, on: 'parent_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_plano_contas_key', types.where.check]
            ],
            order: [
                [0, 'plano_conta', 'asc']
            ],
            search: [
                    {alias: 11, field: '_integracao',  param: types.search.like_full },
                    {alias: 11, field: 'codigo',  param: types.search.like_full },
                    {alias: 11, field: 'plano_conta',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_plano_contas'],
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
module.exports = ContPlanoContas;