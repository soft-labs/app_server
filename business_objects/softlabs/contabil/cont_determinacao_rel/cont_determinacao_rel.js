/**
 * BusinessObject :: ContDeterminacaoRel
 *  Implementação de objeto de negócio: cont_determinacao_rel.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:11:58 GMT-0300 (BRT)
 * @constructor
 */
function ContDeterminacaoRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_determinacao_rel';

    // Map
    this.source = {
        table: 'cont_determinacao_rel',
        metadata: {
            key: ['contabil_key', 'cont_determinacao_key'],
            fields: {
                contabil_key: {
                    tipo: types.comp.key, label: 'Contabil:',
                    data: { 
                        key: ['contabil_key'], 
                        from: ['softlabs', 'contabil', 'contabil'], 
                        template: '{row.contabil_key} - {row.contabi}', 
                        provider: '' 
                    } 
                }, 
                cont_determinacao_key: {
                    tipo: types.comp.key, label: 'Cont Determinação:',
                    data: { 
                        key: ['cont_determinacao_key'], 
                        from: ['softlabs', 'contabil', 'cont_determinacao'], 
                        template: '{row.cont_determinacao_key} - {row.cont_determinaca}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.dropdown, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{row.empresas_key} - {row.empresa}', 
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
                {titulo: "Informações de cont_determinacao_rel"},
                {contabil_key: 25, cont_determinacao_key: 25, empresas_key: 50}
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
                    from: ['softlabs', 'contabil', 'cont_determinacao_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'contabil', 'contabil'],
                        join: {source: 0, tipo: types.join.left, on: 'contabil_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'contabil', 'cont_determinacao'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_determinacao_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'empresas', 'empresas'],
                        join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'contabil_key', types.where.check],
                ['AND', 0, 'cont_determinacao_key', types.where.check]
            ],
            order: [
                ['0', 'contabil_key', 'desc'],
                ['0', 'cont_determinacao_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contabil', 'cont_determinacao_rel'],
                    key: ['contabil_key', 'cont_determinacao_key'],
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
module.exports = ContDeterminacaoRel;