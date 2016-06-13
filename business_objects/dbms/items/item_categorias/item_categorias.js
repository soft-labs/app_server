/**
 * BusinessObject :: ItemCategorias
 *  Implementação de objeto de negócio: item_categorias.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:56:39 GMT-0300 (BRT)
 * @constructor
 */
function ItemCategorias(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_categorias';

    // Map
    this.source = {
        table: 'item_categorias',
        metadata: {
            key: 'item_categorias_key',
            label: 'categoria',
            fields: {
                item_categorias_key: {
                    tipo: types.comp.key, label: 'Item Categorias:'
                }, 
                gera_cmv: {
                    tipo: types.comp.int, label: 'Gera Cmv:'
                }, 
                categoria: {
                    tipo: types.comp.text, label: 'Categoria:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.choose, label: 'Cont Centros Resultado:',
                    data: { 
                        key: ['cont_centros_resultado_key'], 
                        from: ['dbms', 'contabil', 'cont_centros_resultado'], 
                        template: '{cont_centros_resultado_key} - {cont_centros_resultad}', 
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
                size  : types.form.size.small,
                external: [

                ]
            },
            linhas: [
                {titulo: "Informações de item_categorias"},
                {item_categorias_key: 25, gera_cmv: 25, categoria: 25, observacoes: 25}, 
                {cont_centros_resultado_key: 100}
            ],
            ctrls: {
                categoria: {
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
                    from: ['dbms', 'items', 'item_categorias'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_centros_resultado'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_centros_resultado_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_categorias_key', types.where.check]
            ],
            order: [
                [0, 'categoria', 'asc']
            ],
            search: [
                    {alias: 0, field: 'categoria',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'items', 'item_categorias'],
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
module.exports = ItemCategorias;