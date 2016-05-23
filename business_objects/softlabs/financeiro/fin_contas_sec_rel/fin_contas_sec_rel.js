/**
 * BusinessObject :: FinContasSecRel
 *  Implementação de objeto de negócio: fin_contas_sec_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:15:29 GMT-0300 (BRT)
 * @constructor
 */
function FinContasSecRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_contas_sec_rel';

    // Map
    this.source = {
        table: 'fin_contas_sec_rel',
        metadata: {
            key: ['fin_contas_key', 'sec_usuarios_key'],
            label: ve_movimento,
            fields: {
                fin_contas_key: {
                    tipo: types.comp.key, label: 'Fin Contas:',
                    data: { 
                        key: ['fin_contas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas'], 
                        template: '{row.fin_contas_key} - {row.fin_conta}', 
                        provider: '' 
                    } 
                }, 
                sec_usuarios_key: {
                    tipo: types.comp.key, label: 'Sec Usuarios:',
                    data: { 
                        key: ['sec_usuarios_key'], 
                        from: ['softlabs', 'security', 'sec_usuarios'], 
                        template: '{row.sec_usuarios_key} - {row.sec_usuario}', 
                        provider: '' 
                    } 
                }, 
                ve_movimento: {
                    tipo: types.comp.int, label: 'Ve Movimento:'
                }, 
                lanca_debito: {
                    tipo: types.comp.int, label: 'Lanca Debito:'
                }, 
                lanca_credito: {
                    tipo: types.comp.int, label: 'Lanca Credito:'
                }, 
                baixa_debito: {
                    tipo: types.comp.int, label: 'Baixa Debito:'
                }, 
                baixa_credito: {
                    tipo: types.comp.int, label: 'Baixa Credito:'
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
                {titulo: "Informações de fin_contas_sec_rel"},
                {fin_contas_key: 25, sec_usuarios_key: 25, ve_movimento: 25, lanca_debito: 25}, 
                {lanca_credito: 25, baixa_debito: 25, baixa_credito: 50}
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
                    from: ['softlabs', 'financeiro', 'fin_contas_sec_rel'],
                    fields: [
                        ve_movimento
                    ]
                },
                1: { 
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'security', 'sec_usuarios'],
                        join: {source: 0, tipo: types.join.left, on: 'sec_usuarios_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_contas_key', types.where.check],
                ['AND', 0, 'sec_usuarios_key', types.where.check]
            ],
            order: [
                ['0', 'fin_contas_key', 'desc'],
                ['0', 'sec_usuarios_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_contas_sec_rel'],
                    key: ['fin_contas_key', 'sec_usuarios_key'],
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
module.exports = FinContasSecRel;