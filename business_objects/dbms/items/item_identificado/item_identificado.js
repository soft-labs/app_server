/**
 * BusinessObject :: ItemIdentificado
 *  Implementação de objeto de negócio: item_identificado.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:56:39 GMT-0300 (BRT)
 * @constructor
 */
function ItemIdentificado(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_identificado';

    // Map
    this.source = {
        table: 'item_identificado',
        metadata: {
            key: 'item_identificado_key',
            label: 'identificacao',
            fields: {
                item_identificado_key: {
                    tipo: types.comp.key, label: 'Item Identificado:'
                }, 
                items_key: {
                    tipo: types.comp.choose, label: 'Items:',
                    data: { 
                        key: ['items_key'], 
                        from: ['dbms', 'items', 'items'], 
                        template: '{items_key} - {item}', 
                        provider: '' 
                    } 
                }, 
                item_ident_tipos_key: {
                    tipo: types.comp.choose, label: 'Item Ident Tipos:',
                    data: { 
                        key: ['item_ident_tipos_key'], 
                        from: ['dbms', 'items', 'item_ident_tipos'], 
                        template: '{item_ident_tipos_key} - {item_ident_tipo}', 
                        provider: '' 
                    } 
                }, 
                item_lotes_key: {
                    tipo: types.comp.choose, label: 'Item Lotes:',
                    data: { 
                        key: ['item_lotes_key'], 
                        from: ['dbms', 'items', 'item_lotes'], 
                        template: '{item_lotes_key} - {item_lote}', 
                        provider: '' 
                    } 
                }, 
                identificacao: {
                    tipo: types.comp.text, label: 'Identificação:'
                }, 
                num_serie: {
                    tipo: types.comp.text, label: 'Num Serie:'
                }, 
                num_fabricante: {
                    tipo: types.comp.text, label: 'Num Fabricante:'
                }, 
                num_patrimonio: {
                    tipo: types.comp.text, label: 'Num Patrimonio:'
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
                {titulo: "Informações de item_identificado"},
                {item_identificado_key: 25, items_key: 25, item_ident_tipos_key: 25, item_lotes_key: 25}, 
                {identificacao: 25, num_serie: 25, num_fabricante: 25, num_patrimonio: 25}, 
                {observacoes: 100}
            ],
            ctrls: {
                identificacao: {
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
                    from: ['dbms', 'items', 'item_identificado'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'items', 'items'],
                    join: {source: 0, tipo: types.join.left, on: 'items_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'items', 'item_ident_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'item_ident_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'items', 'item_lotes'],
                    join: {source: 0, tipo: types.join.left, on: 'item_lotes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_identificado_key', types.where.check]
            ],
            order: [
                [0, 'identificacao', 'asc']
            ],
            search: [
                    {alias: 0, field: 'identificacao',  param: types.search.like_full },
                    {alias: 0, field: 'num_serie',  param: types.search.like_full },
                    {alias: 0, field: 'num_fabricante',  param: types.search.like_full },
                    {alias: 0, field: 'num_patrimonio',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'items', 'item_identificado'],
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
module.exports = ItemIdentificado;