/**
 * BusinessObject :: ParcEndEletronicosRel
 *  Implementação de objeto de negócio: parc_end_eletronicos_rel.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:13:15 GMT-0300 (BRT)
 * @constructor
 */
function ParcEndEletronicosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'parc_end_eletronicos_rel';

    // Map
    this.source = {
        table: 'parc_end_eletronicos_rel',
        metadata: {
            key: ['parceiros_key', 'end_eletronicos_key'],
            fields: {
                parceiros_key: {
                    tipo: types.comp.key, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'parceiros', 'parceiros'], 
                        template: '{row.parceiros_key} - {row.parceiro}', 
                        provider: '' 
                    } 
                }, 
                end_eletronicos_key: {
                    tipo: types.comp.key, label: 'End Eletronicos:',
                    data: { 
                        key: ['end_eletronicos_key'], 
                        from: ['softlabs', 'enderecos', 'end_eletronicos'], 
                        template: '{row.end_eletronicos_key} - {row.end_eletronico}', 
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
                {titulo: "Informações de parc_end_eletronicos_rel"},
                {parceiros_key: 25, end_eletronicos_key: 75}
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
                    from: ['softlabs', 'parceiros', 'parc_end_eletronicos_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'parceiros', 'parceiros'],
                        join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'enderecos', 'end_eletronicos'],
                        join: {source: 0, tipo: types.join.left, on: 'end_eletronicos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'parceiros_key', types.where.check],
                ['AND', 0, 'end_eletronicos_key', types.where.check]
            ],
            order: [
                ['0', 'parceiros_key', 'desc'],
                ['0', 'end_eletronicos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'parceiros', 'parc_end_eletronicos_rel'],
                    key: ['parceiros_key', 'end_eletronicos_key'],
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
module.exports = ParcEndEletronicosRel;