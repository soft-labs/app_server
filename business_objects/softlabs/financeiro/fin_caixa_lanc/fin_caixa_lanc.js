/**
 * BusinessObject :: FinCaixaLanc
 *  Implementação de objeto de negócio: fin_caixa_lanc.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:43:34 GMT-0300 (BRT)
 * @constructor
 */
function FinCaixaLanc(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_caixa_lanc';

    // Map
    this.source = {
        table: 'fin_caixa_lanc',
        metadata: {
            key: 'fin_caixa_lanc_key',
            fields: {
                fin_caixa_lanc_key: {
                    tipo: types.comp.key, label: 'Fin Caixa Lanc:'
                }, 
                fin_caixa_key: {
                    tipo: types.comp.dropdown, label: 'Fin Caixa:',
                    data: { 
                        key: ['fin_caixa_key'], 
                        from: ['softlabs', 'financeiro', 'fin_caixa'], 
                        template: '{row.fin_caixa_key} - {row.fin_caix}', 
                        provider: '' 
                    } 
                }, 
                fin_especies_key: {
                    tipo: types.comp.dropdown, label: 'Fin Especies:',
                    data: { 
                        key: ['fin_especies_key'], 
                        from: ['softlabs', 'financeiro', 'fin_especies'], 
                        template: '{row.fin_especies_key} - {row.fin_especie}', 
                        provider: '' 
                    } 
                }, 
                fin_contas_key: {
                    tipo: types.comp.dropdown, label: 'Fin Contas:',
                    data: { 
                        key: ['fin_contas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas'], 
                        template: '{row.fin_contas_key} - {row.fin_conta}', 
                        provider: '' 
                    } 
                }, 
                entidades_key: {
                    tipo: types.comp.dropdown, label: 'Entidades:',
                    data: { 
                        key: ['entidades_key'], 
                        from: ['softlabs', 'financeiro', 'entidades'], 
                        template: '{row.entidades_key} - {row.entidade}', 
                        provider: '' 
                    } 
                }, 
                sec_usuarios_key: {
                    tipo: types.comp.dropdown, label: 'Sec Usuarios:',
                    data: { 
                        key: ['sec_usuarios_key'], 
                        from: ['softlabs', 'security', 'sec_usuarios'], 
                        template: '{row.sec_usuarios_key} - {row.sec_usuario}', 
                        provider: '' 
                    } 
                }, 
                data: {
                    tipo: types.comp.date, label: 'Data:'
                }, 
                hora: {
                    tipo: types.comp.time, label: 'Hora:'
                }, 
                historico: {
                    tipo: types.comp.text, label: 'Historico:'
                }, 
                credito: {
                    tipo: types.comp.float, label: 'Credito:'
                }, 
                debito: {
                    tipo: types.comp.float, label: 'Debito:'
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
                {titulo: "Informações de fin_caixa_lanc"},
                {fin_caixa_lanc_key: 25, fin_caixa_key: 25, fin_especies_key: 25, fin_contas_key: 25}, 
                {entidades_key: 25, sec_usuarios_key: 25, data: 25, hora: 25}, 
                {historico: 25, credito: 25, debito: 25, observacoes: 25}
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
                    from: ['softlabs', 'financeiro', 'fin_caixa_lanc'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'financeiro', 'fin_caixa'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_caixa_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'financeiro', 'fin_especies'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_especies_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'financeiro', 'entidades'],
                        join: {source: 0, tipo: types.join.left, on: 'entidades_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['softlabs', 'security', 'sec_usuarios'],
                        join: {source: 0, tipo: types.join.left, on: 'sec_usuarios_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_caixa_lanc_key', types.where.check]
            ],
            order: [
                ['0', 'fin_caixa_lanc_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_caixa_lanc'],
                    key: 'fin_caixa_lanc_key',
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
module.exports = FinCaixaLanc;