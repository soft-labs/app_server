/**
 * BusinessObject :: ContEntArrecadadoras
 *  Implementação de objeto de negócio: cont_ent_arrecadadoras.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:14:17 GMT-0300 (BRT)
 * @constructor
 */
function ContEntArrecadadoras(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_ent_arrecadadoras';

    // Map
    this.source = {
        table: 'cont_ent_arrecadadoras',
        metadata: {
            key: 'cont_ent_arrecadadoras_key',
            label: cont_ent_arrecadadoras_key,
            fields: {
                cont_ent_arrecadadoras_key: {
                    tipo: types.comp.key, label: 'Cont Ent Arrecadadoras:'
                }, 
                parceiros_key: {
                    tipo: types.comp.dropdown, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'parceiros', 'parceiros'], 
                        template: '{row.parceiros_key} - {row.parceiro}', 
                        provider: '' 
                    } 
                }, 
                cont_esfera_governo_key: {
                    tipo: types.comp.dropdown, label: 'Cont Esfera Governo:',
                    data: { 
                        key: ['cont_esfera_governo_key'], 
                        from: ['softlabs', 'contabil', 'cont_esfera_governo'], 
                        template: '{row.cont_esfera_governo_key} - {row.cont_esfera_govern}', 
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
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
                {titulo: "Informações de cont_ent_arrecadadoras"},
                {cont_ent_arrecadadoras_key: 25, parceiros_key: 25, cont_esfera_governo_key: 25, ativo: 25}, 
                {observacoes: 100}
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
                    from: ['softlabs', 'contabil', 'cont_ent_arrecadadoras'],
                    fields: [
                        cont_ent_arrecadadoras_key
                    ]
                },
                1: { 
                    from: ['softlabs', 'parceiros', 'parceiros'],
                        join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contabil', 'cont_esfera_governo'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_esfera_governo_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_ent_arrecadadoras_key', types.where.check]
            ],
            order: [
                ['0', 'cont_ent_arrecadadoras_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contabil', 'cont_ent_arrecadadoras'],
                    key: 'cont_ent_arrecadadoras_key',
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
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onSelect = function *(prov, ctx){

    };
     
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
    this.onAfterInsert = function *(ret){

    };

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
    this.onAfterUpdate = function *(ret){

    };

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
module.exports = ContEntArrecadadoras;