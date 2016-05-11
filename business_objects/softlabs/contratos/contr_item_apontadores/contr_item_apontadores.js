/**
 * BusinessObject :: ContrItemApontadores
 *  Implementação de objeto de negócio: contr_item_apontadores.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:13 GMT-0300 (BRT)
 * @constructor
 */
function ContrItemApontadores(){

    //region :: Definições do Objeto

    // Id
    this.id = 'contr_item_apontadores';

    // Map
    this.source = {
        table: 'contr_item_apontadores',
        metadata: {
            key: 'contr_item_apontadores_key',
            fields: {
                contr_item_apontadores_key: {
                    tipo: types.comp.key, label: 'Contr Item Apontadores:'
                }, 
                item_locacao_key: {
                    tipo: types.comp.dropdown, label: 'Item Locação:',
                    data: { 
                        key: ['item_locacao_key'], 
                        from: ['softlabs', 'items', 'item_locacao'], 
                        template: '{row.item_locacao_key} - {row.item_locaca}', 
                        provider: '' 
                    } 
                }, 
                contr_franquias_key: {
                    tipo: types.comp.dropdown, label: 'Contr Franquias:',
                    data: { 
                        key: ['contr_franquias_key'], 
                        from: ['softlabs', 'contratos', 'contr_franquias'], 
                        template: '{row.contr_franquias_key} - {row.contr_franquia}', 
                        provider: '' 
                    } 
                }, 
                apontador: {
                    tipo: types.comp.text, label: 'Apontador:'
                }, 
                franquia: {
                    tipo: types.comp.float, label: 'Franquia:'
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
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Informações de contr_item_apontadores"},
                {contr_item_apontadores_key: 25, item_locacao_key: 25, contr_franquias_key: 25, apontador: 25}, 
                {franquia: 25, observacoes: 75}
            ],
            ctrls: {
                apontador: {
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
                    from: ['softlabs', 'contratos', 'contr_item_apontadores'],
                    fields: [
                        'apontador'
                    ]
                },
                1: { 
                    from: ['softlabs', 'items', 'item_locacao'],
                        join: {source: 0, tipo: types.join.left, on: 'item_locacao_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contratos', 'contr_franquias'],
                        join: {source: 0, tipo: types.join.left, on: 'contr_franquias_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contr_item_apontadores_key', types.where.check]
            ],
            order: [
                [0, 'apontador', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'apontador',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contratos', 'contr_item_apontadores'],
                    key: 'contr_item_apontadores_key',
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
     * Evento chamado na operação POST :: Insert
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onInsert = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     *
     this.onAfterInsert = function *(ret){

    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onUpdate = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     *
     this.onAfterUpdate = function *(ret){

    };

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onDelete = function *(ret, ctx){

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
module.exports = ContrItemApontadores;