/**
 * BusinessObject :: Unidades
 *  Implementação de objeto de negócio: unidades.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:57:32 GMT-0300 (BRT)
 * @constructor
 */
function Unidades(){

    //region :: Definições do Objeto

    // Id
    this.id = 'unidades';

    // Map
    this.source = {
        table: 'unidades',
        metadata: {
            key: 'unidades_key',
            label: 'unidade',
            fields: {
                unidades_key: {
                    tipo: types.comp.key, label: 'Unidades:'
                }, 
                unid_grupos_key: {
                    tipo: types.comp.choose, label: 'Unid Grupos:',
                    data: { 
                        key: ['unid_grupos_key'], 
                        from: ['dbms', 'unidades', 'unid_grupos'], 
                        template: '{unid_grupos_key} - {unid_grupo}', 
                        provider: '' 
                    } 
                }, 
                parent_key: {
                    tipo: types.comp.choose, label: 'Parent:',
                    data: { 
                        key: ['parent_key'], 
                        from: ['dbms', 'unidades', 'parent'], 
                        template: '{parent_key} - {paren}', 
                        provider: '' 
                    } 
                }, 
                sigla: {
                    tipo: types.comp.text, label: 'Sigla:'
                }, 
                unidade: {
                    tipo: types.comp.text, label: 'Unidade:'
                }, 
                proporcao: {
                    tipo: types.comp.undefined, label: 'Proporção:'
                }, 
                padrao: {
                    tipo: types.comp.int, label: 'Padrão:'
                }, 
                referencia: {
                    tipo: types.comp.int, label: 'Referencia:'
                }, 
                familia: {
                    tipo: types.comp.int, label: 'Familia:'
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
                {titulo: "Informações de unidades"},
                {unidades_key: 25, unid_grupos_key: 25, parent_key: 25, sigla: 25}, 
                {unidade: 25, proporcao: 25, padrao: 25, referencia: 25}, 
                {familia: 25, observacoes: 75}
            ],
            ctrls: {
                unidade: {
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
                    from: ['dbms', 'unidades', 'unidades'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'unidades', 'unid_grupos'],
                    join: {source: 0, tipo: types.join.left, on: 'unid_grupos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'unidades', 'parent'],
                    join: {source: 0, tipo: types.join.left, on: 'parent_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'unidades_key', types.where.check]
            ],
            order: [
                [0, 'unidade', 'asc']
            ],
            search: [
                    {alias: 0, field: 'sigla',  param: types.search.like_full },
                    {alias: 0, field: 'unidade',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'unidades', 'unidades'],
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
module.exports = Unidades;