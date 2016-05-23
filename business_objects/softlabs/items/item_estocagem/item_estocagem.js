/**
 * BusinessObject :: ItemEstocagem
 *  Implementação de objeto de negócio: item_estocagem.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:15:42 GMT-0300 (BRT)
 * @constructor
 */
function ItemEstocagem(){

    //region :: Definições do Objeto

    // Id
    this.id = 'item_estocagem';

    // Map
    this.source = {
        table: 'item_estocagem',
        metadata: {
            key: 'item_estocagem_key',
            label: item_estocagem_key,
            fields: {
                item_estocagem_key: {
                    tipo: types.comp.key, label: 'Item Estocagem:'
                }, 
                item_compras_key: {
                    tipo: types.comp.dropdown, label: 'Item Compras:',
                    data: { 
                        key: ['item_compras_key'], 
                        from: ['softlabs', 'items', 'item_compras'], 
                        template: '{row.item_compras_key} - {row.item_compra}', 
                        provider: '' 
                    } 
                }, 
                emp_depositos_key: {
                    tipo: types.comp.dropdown, label: 'Emp Depositos:',
                    data: { 
                        key: ['emp_depositos_key'], 
                        from: ['softlabs', 'empresas', 'emp_depositos'], 
                        template: '{row.emp_depositos_key} - {row.emp_deposito}', 
                        provider: '' 
                    } 
                }, 
                ult_mov_itens_key: {
                    tipo: types.comp.dropdown, label: 'Ult Mov Itens:',
                    data: { 
                        key: ['ult_mov_itens_key'], 
                        from: ['softlabs', 'empresas', 'ult_mov_itens'], 
                        template: '{row.ult_mov_itens_key} - {row.ult_mov_iten}', 
                        provider: '' 
                    } 
                }, 
                localizacao: {
                    tipo: types.comp.text, label: 'Localização:'
                }, 
                qtd_estoque: {
                    tipo: types.comp.float, label: 'Qtd Estoque:'
                }, 
                disponibilidade: {
                    tipo: types.comp.float, label: 'Disponibilidade:'
                }, 
                dt_ultima_entrada: {
                    tipo: types.comp.date, label: 'Dt Ultima Entrada:'
                }, 
                dt_ultima_saida: {
                    tipo: types.comp.date, label: 'Dt Ultima Saida:'
                }, 
                preco_ultima_compra: {
                    tipo: types.comp.float, label: 'Preco Ultima Compra:'
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
                {titulo: "Informações de item_estocagem"},
                {item_estocagem_key: 25, item_compras_key: 25, emp_depositos_key: 25, ult_mov_itens_key: 25}, 
                {localizacao: 25, qtd_estoque: 25, disponibilidade: 25, dt_ultima_entrada: 25}, 
                {dt_ultima_saida: 25, preco_ultima_compra: 25, observacoes: 50}
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
                    from: ['softlabs', 'items', 'item_estocagem'],
                    fields: [
                        item_estocagem_key
                    ]
                },
                1: { 
                    from: ['softlabs', 'items', 'item_compras'],
                        join: {source: 0, tipo: types.join.left, on: 'item_compras_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'empresas', 'emp_depositos'],
                        join: {source: 0, tipo: types.join.left, on: 'emp_depositos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'empresas', 'ult_mov_itens'],
                        join: {source: 0, tipo: types.join.left, on: 'ult_mov_itens_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'item_estocagem_key', types.where.check]
            ],
            order: [
                ['0', 'item_estocagem_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'items', 'item_estocagem'],
                    key: 'item_estocagem_key',
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
module.exports = ItemEstocagem;