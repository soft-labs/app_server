/**
 * BusinessObject :: DreamSubcategorias
 *  Implementação de objeto de negócio: dream_subcategorias.
 *
 * Engine de aplicações - TShark.
 * @since Fri Jun 17 2016 15:44:50 GMT-0300 (BRT)
 * @constructor
 */
function DreamSubcategorias(){

    //region :: Definições do Objeto

    // Id
    this.id = 'dream_subcategorias';

    // Map
    this.source = {
        table: 'dream_subcategorias',
        metadata: {
            key: 'dream_subcategorias_key',
            label: 'subcategory',
            fields: {
                dream_subcategorias_key: {
                    tipo: types.comp.key, label: 'Sub Categoria:'
                },
                dream_categorias_key: {
                    tipo: types.comp.choose, label: 'Categoria:',
                    zdata: {
                        label: 'category',
                        from: ['dreams', 'dreams', 'dream_categorias'],
                    },
                    data: {
                        key: ['dream_categorias_key'],
                        from: ['dreams', 'dreams', 'dream_categorias'],
                        template: '{category}',
                        provider: ''
                    }
                },
                _active: {
                    tipo: types.comp.check, label: 'Ativo:'
                },
                num_order: {
                    tipo: types.comp.int, label: 'Ordem:'
                },
                subcategory: {
                    tipo: types.comp.text, label: 'Sub Categoria:'
                },
                img_subcategory: {
                    tipo: types.comp.text, label: 'Imagem Categoria:'
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
                {titulo: "Informações da Sub Categoria"},
                {_active: 15, num_order: 15, dream_categorias_key: 30, subcategory: 40},
                {img_subcategory: 100}
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
                    from: ['dreams', 'dreams', 'dream_subcategorias'],
                    fields: [
                        
                    ]
                },
                1: {
                    from: ['dreams', 'dreams', 'dream_categorias'],
                    join: {source: 0, tipo: types.join.left, on: 'dream_categorias_key', where: ''},
                    alias_fields: [
                        {field: 'num_order', as: 'categ_order'}
                    ]
                }
            },
            where: [
                ['AND', 0, 'dream_subcategorias_key', types.where.check],
                ['AND', 0, 'dream_categorias_key', types.where.check],
            ],
            order: [
                [1, 'num_order', 'asc'],
                [0, 'num_order', 'asc']
            ],
            search: [
                {alias: 0, field: 'subcategory',  param: types.search.like_full },
                {alias: 1, field: 'category',  param: types.search.like_full },
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dream_subcategorias'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     */
    this.onGetRow = function (row){
        if (this.params['_mobile_']) {
            delete(row['_key_']);
            delete(row['_selected_']);
            delete(row['_deleted_']);
        }
    };

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
module.exports = DreamSubcategorias;