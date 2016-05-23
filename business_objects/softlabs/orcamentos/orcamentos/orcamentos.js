/**
 * BusinessObject :: Orcamentos
 *  Implementação de objeto de negócio: orcamentos.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:16:12 GMT-0300 (BRT)
 * @constructor
 */
function Orcamentos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'orcamentos';

    // Map
    this.source = {
        table: 'orcamentos',
        metadata: {
            key: 'orcamentos_key',
            label: orcamentos_key,
            fields: {
                orcamentos_key: {
                    tipo: types.comp.key, label: 'Orcamentos:'
                }, 
                ent_coligadas_key: {
                    tipo: types.comp.dropdown, label: 'Ent Coligadas:',
                    data: { 
                        key: ['ent_coligadas_key'], 
                        from: ['softlabs', '', 'ent_coligadas'], 
                        template: '{row.ent_coligadas_key} - {row.ent_coligada}', 
                        provider: '' 
                    } 
                }, 
                descricao: {
                    tipo: types.comp.text, label: 'Descrição:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }, 
                coligadas_key: {
                    tipo: types.comp.dropdown, label: 'Coligadas:',
                    data: { 
                        key: ['coligadas_key'], 
                        from: ['softlabs', '', 'coligadas'], 
                        template: '{row.coligadas_key} - {row.coligada}', 
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
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Informações de orcamentos"},
                {orcamentos_key: 25, ent_coligadas_key: 25, descricao: 25, observacoes: 25}, 
                {coligadas_key: 100}
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
                    from: ['softlabs', 'orcamentos', 'orcamentos'],
                    fields: [
                        orcamentos_key
                    ]
                },
                1: { 
                    from: ['softlabs', '', 'ent_coligadas'],
                        join: {source: 0, tipo: types.join.left, on: 'ent_coligadas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', '', 'coligadas'],
                        join: {source: 0, tipo: types.join.left, on: 'coligadas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'orcamentos_key', types.where.check]
            ],
            order: [
                ['0', 'orcamentos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'orcamentos', 'orcamentos'],
                    key: 'orcamentos_key',
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
module.exports = Orcamentos;