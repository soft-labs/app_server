/**
 * BusinessObject :: OrcItens
 *  Implementação de objeto de negócio: orc_itens.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:13:07 GMT-0300 (BRT)
 * @constructor
 */
function OrcItens(){

    //region :: Definições do Objeto

    // Id
    this.id = 'orc_itens';

    // Map
    this.source = {
        table: 'orc_itens',
        metadata: {
            key: 'orc_itens_key',
            fields: {
                orc_itens_key: {
                    tipo: types.comp.key, label: 'Orc Itens:'
                }, 
                orcamentos_key: {
                    tipo: types.comp.dropdown, label: 'Orcamentos:',
                    data: { 
                        key: ['orcamentos_key'], 
                        from: ['softlabs', 'orcamentos', 'orcamentos'], 
                        template: '{row.orcamentos_key} - {row.orcamento}', 
                        provider: '' 
                    } 
                }, 
                cont_centros_resultado_key: {
                    tipo: types.comp.dropdown, label: 'Cont Centros Resultado:',
                    data: { 
                        key: ['cont_centros_resultado_key'], 
                        from: ['softlabs', 'contabil', 'cont_centros_resultado'], 
                        template: '{row.cont_centros_resultado_key} - {row.cont_centros_resultad}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.dropdown, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{row.cont_plano_contas_key} - {row.cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                dt_inicio: {
                    tipo: types.comp.date, label: 'Dt Inicio:'
                }, 
                dt_final: {
                    tipo: types.comp.date, label: 'Dt Final:'
                }, 
                receita: {
                    tipo: types.comp.int, label: 'Receita:'
                }, 
                valor: {
                    tipo: types.comp.float, label: 'Valor:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }, 
                tipo_valor: {
                    tipo: types.comp.int, label: 'Tipo Valor:'
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
                {titulo: "Informações de orc_itens"},
                {orc_itens_key: 25, orcamentos_key: 25, cont_centros_resultado_key: 25, cont_plano_contas_key: 25}, 
                {dt_inicio: 25, dt_final: 25, receita: 25, valor: 25}, 
                {observacoes: 25, tipo_valor: 75}
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
                    from: ['softlabs', 'orcamentos', 'orc_itens'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'orcamentos', 'orcamentos'],
                        join: {source: 0, tipo: types.join.left, on: 'orcamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contabil', 'cont_centros_resultado'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_centros_resultado_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'orc_itens_key', types.where.check]
            ],
            order: [
                ['0', 'orc_itens_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'orcamentos', 'orc_itens'],
                    key: 'orc_itens_key',
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
module.exports = OrcItens;