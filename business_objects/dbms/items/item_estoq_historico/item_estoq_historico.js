/**
 * BusinessObject :: ItemEstoqHistorico
 *  Implementação de objeto de negócio: item_estoq_historico.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:56:39 GMT-0300 (BRT)
 * @constructor
 */
function ItemEstoqHistorico(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_estoq_historico';

    // Map
    this.source = {
        table: 'item_estoq_historico',
        metadata: {
            key: 'estoq_historico_key',
            label: 'tipo_e_s',
            fields: {
                estoq_historico_key: {
                    tipo: types.comp.key, label: 'Estoq Historico:'
                }, 
                item_compras_key: {
                    tipo: types.comp.choose, label: 'Item Compras:',
                    data: { 
                        key: ['item_compras_key'], 
                        from: ['dbms', 'items', 'item_compras'], 
                        template: '{item_compras_key} - {item_compra}', 
                        provider: '' 
                    } 
                }, 
                item_estocagem_key: {
                    tipo: types.comp.choose, label: 'Item Estocagem:',
                    data: { 
                        key: ['item_estocagem_key'], 
                        from: ['dbms', 'items', 'item_estocagem'], 
                        template: '{item_estocagem_key} - {item_estocage}', 
                        provider: '' 
                    } 
                }, 
                tipo_e_s: {
                    tipo: types.comp.text, label: 'Tipo E S:'
                }, 
                dt_historico: {
                    tipo: types.comp.date, label: 'Dt Historico:'
                }, 
                qtd_inicial: {
                    tipo: types.comp.float, label: 'Qtd Inicial:'
                }, 
                qtd_entrada: {
                    tipo: types.comp.float, label: 'Qtd Entrada:'
                }, 
                qtd_saida: {
                    tipo: types.comp.float, label: 'Qtd Saida:'
                }, 
                valor: {
                    tipo: types.comp.float, label: 'Valor:'
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
                {titulo: "Informações de item_estoq_historico"},
                {estoq_historico_key: 25, item_compras_key: 25, item_estocagem_key: 25, tipo_e_s: 25}, 
                {dt_historico: 25, qtd_inicial: 25, qtd_entrada: 25, qtd_saida: 25}, 
                {valor: 25, observacoes: 75}
            ],
            ctrls: {
                tipo_e_s: {
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
                    from: ['dbms', 'items', 'item_estoq_historico'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'items', 'item_compras'],
                    join: {source: 0, tipo: types.join.left, on: 'item_compras_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'items', 'item_estocagem'],
                    join: {source: 0, tipo: types.join.left, on: 'item_estocagem_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'estoq_historico_key', types.where.check]
            ],
            order: [
                [0, 'tipo_e_s', 'asc']
            ],
            search: [
                    {alias: 0, field: 'tipo_e_s',  param: types.search.like_full },
                    {alias: 0, field: 'dt_historico',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'items', 'item_estoq_historico'],
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
module.exports = ItemEstoqHistorico;