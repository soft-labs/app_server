/**
 * BusinessObject :: MovItens
 *  Implementação de objeto de negócio: mov_itens.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:09:13 GMT-0300 (BRT)
 * @constructor
 */
function MovItens(){

    //region :: Definições do Objeto

    // Id
    this.id = 'mov_itens';

    // Map
    this.source = {
        table: 'mov_itens',
        metadata: {
            key: 'mov_itens_key',
            fields: {
                mov_itens_key: {
                    tipo: types.comp.key, label: 'Mov Itens:'
                }, 
                movimentacoes_key: {
                    tipo: types.comp.dropdown, label: 'Movimentações:',
                    data: { 
                        key: ['movimentacoes_key'], 
                        from: ['softlabs', 'movimentacoes', 'movimentacoes'], 
                        template: '{row.movimentacoes_key} - {row.movimentacoe}', 
                        provider: '' 
                    } 
                }, 
                items_key: {
                    tipo: types.comp.dropdown, label: 'Items:',
                    data: { 
                        key: ['items_key'], 
                        from: ['softlabs', 'items', 'items'], 
                        template: '{row.items_key} - {row.item}', 
                        provider: '' 
                    } 
                }, 
                mov_itens_status_key: {
                    tipo: types.comp.dropdown, label: 'Mov Itens Status:',
                    data: { 
                        key: ['mov_itens_status_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_itens_status'], 
                        template: '{row.mov_itens_status_key} - {row.mov_itens_statu}', 
                        provider: '' 
                    } 
                }, 
                mov_cfop_key: {
                    tipo: types.comp.dropdown, label: 'Mov Cfop:',
                    data: { 
                        key: ['mov_cfop_key'], 
                        from: ['softlabs', 'movimentacoes', 'mov_cfop'], 
                        template: '{row.mov_cfop_key} - {row.mov_cfo}', 
                        provider: '' 
                    } 
                }, 
                cont_centro_resultados_key: {
                    tipo: types.comp.dropdown, label: 'Cont Centro Resultados:',
                    data: { 
                        key: ['cont_centro_resultados_key'], 
                        from: ['softlabs', 'contabil', 'cont_centro_resultados'], 
                        template: '{row.cont_centro_resultados_key} - {row.cont_centro_resultado}', 
                        provider: '' 
                    } 
                }, 
                ncm: {
                    tipo: types.comp.text, label: 'Ncm:'
                }, 
                ean_gtin: {
                    tipo: types.comp.text, label: 'Ean Gtin:'
                }, 
                ean_gtin_tributavel: {
                    tipo: types.comp.int, label: 'Ean Gtin Tributavel:'
                }, 
                un_tributavel: {
                    tipo: types.comp.int, label: 'Un Tributavel:'
                }, 
                compoe_tot_mov: {
                    tipo: types.comp.int, label: 'Compõe Tot Mov:'
                }, 
                unidades_key: {
                    tipo: types.comp.dropdown, label: 'Unidades:',
                    data: { 
                        key: ['unidades_key'], 
                        from: ['softlabs', 'unidades', 'unidades'], 
                        template: '{row.unidades_key} - {row.unidade}', 
                        provider: '' 
                    } 
                }, 
                quantidade: {
                    tipo: types.comp.float, label: 'Quantidade:'
                }, 
                valor_unitario: {
                    tipo: types.comp.float, label: 'Valor Unitario:'
                }, 
                valor_total: {
                    tipo: types.comp.float, label: 'Valor Total:'
                }, 
                valor_frete: {
                    tipo: types.comp.float, label: 'Valor Frete:'
                }, 
                valor_seguro: {
                    tipo: types.comp.float, label: 'Valor Seguro:'
                }, 
                valor_desconto: {
                    tipo: types.comp.float, label: 'Valor Desconto:'
                }, 
                valor_out_desp: {
                    tipo: types.comp.float, label: 'Valor Out Desp:'
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
                {titulo: "Informações de mov_itens"},
                {mov_itens_key: 25, movimentacoes_key: 25, items_key: 25, mov_itens_status_key: 25}, 
                {mov_cfop_key: 25, cont_centro_resultados_key: 25, ncm: 25, ean_gtin: 25}, 
                {ean_gtin_tributavel: 25, un_tributavel: 25, compoe_tot_mov: 25, unidades_key: 25}, 
                {quantidade: 25, valor_unitario: 25, valor_total: 25, valor_frete: 25}, 
                {valor_seguro: 25, valor_desconto: 25, valor_out_desp: 25, observacoes: 25}
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
                    from: ['softlabs', 'movimentacoes', 'mov_itens'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'movimentacoes', 'movimentacoes'],
                        join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'items', 'items'],
                        join: {source: 0, tipo: types.join.left, on: 'items_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'movimentacoes', 'mov_itens_status'],
                        join: {source: 0, tipo: types.join.left, on: 'mov_itens_status_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'movimentacoes', 'mov_cfop'],
                        join: {source: 0, tipo: types.join.left, on: 'mov_cfop_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'contabil', 'cont_centro_resultados'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_centro_resultados_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['softlabs', 'unidades', 'unidades'],
                        join: {source: 0, tipo: types.join.left, on: 'unidades_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'mov_itens_key', types.where.check]
            ],
            order: [
                ['0', 'mov_itens_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'movimentacoes', 'mov_itens'],
                    key: 'mov_itens_key',
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
module.exports = MovItens;