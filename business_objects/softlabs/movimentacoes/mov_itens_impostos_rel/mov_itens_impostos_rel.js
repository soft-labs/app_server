/**
 * BusinessObject :: MovItensImpostosRel
 *  Implementação de objeto de negócio: mov_itens_impostos_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:47:04 GMT-0300 (BRT)
 * @constructor
 */
function MovItensImpostosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'mov_itens_impostos_rel';

    // Map
    this.source = {
        table: 'mov_itens_impostos_rel',
        metadata: {
            key: ['mov_itens_key', 'impostos_key'],
            fields: {
                mov_itens_key: {
                    tipo: types.comp.key, label: 'Mov Itens:',
                    data: { 
                        key: ['mov_itens_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_itens'], 
                        template: '{row.mov_itens_key} - {row.mov_iten}', 
                        provider: '' 
                    } 
                }, 
                impostos_key: {
                    tipo: types.comp.key, label: 'Impostos:',
                    data: { 
                        key: ['impostos_key'], 
                        from: ['softlabs', 'movimentacoes', 'impostos'], 
                        template: '{row.impostos_key} - {row.imposto}', 
                        provider: '' 
                    } 
                }, 
                aliquota: {
                    tipo: types.comp.float, label: 'Aliquota:'
                }, 
                base_tributada: {
                    tipo: types.comp.float, label: 'Base Tributada:'
                }, 
                base_isenta: {
                    tipo: types.comp.float, label: 'Base Isenta:'
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
                {titulo: "Informações de mov_itens_impostos_rel"},
                {mov_itens_key: 25, impostos_key: 25, aliquota: 25, base_tributada: 25}, 
                {base_isenta: 25, observacoes: 75}
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
                    from: ['softlabs', 'movimentacoes', 'mov_itens_impostos_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'movimentacoes', 'mov_itens'],
                        join: {source: 0, tipo: types.join.left, on: 'mov_itens_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'movimentacoes', 'impostos'],
                        join: {source: 0, tipo: types.join.left, on: 'impostos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'mov_itens_key', types.where.check],
                ['AND', 0, 'impostos_key', types.where.check]
            ],
            order: [
                ['0', 'mov_itens_key', 'desc'],
                ['0', 'impostos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'movimentacoes', 'mov_itens_impostos_rel'],
                    key: ['mov_itens_key', 'impostos_key'],
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
module.exports = MovItensImpostosRel;