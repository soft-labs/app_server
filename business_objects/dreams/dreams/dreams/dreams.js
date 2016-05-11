/**
 * BusinessObject :: Dreams
 *  Implementação de objeto de negócio: dreams.
 *
 * Engine de aplicações - TShark.
 * @since Sat May 07 2016 13:33:04 GMT-0300 (BRT)
 * @constructor
 */
function Dreams(){

    //region :: Definições do Objeto

    // Id
    this.id = 'dreams';

    // Map
    this.source = {
        table: 'dreams',
        metadata: {
            key: 'dreams_key',
            fields: {
                dreams_key: {
                    tipo: types.comp.key, label: 'Dreams:'
                }, 
                users_key: {
                    tipo: types.comp.dropdown, label: 'Users:',
                    data: { 
                        key: ['users_key'], 
                        from: ['dreams', 'users', 'users'], 
                        template: '{row.users_key} - {row.username}',
                        provider: '' 
                    } 
                }, 
                owner_key: {
                    tipo: types.comp.dropdown, label: 'Owner:',
                    data: { 
                        key: ['owner_key'], 
                        from: ['dreams', 'users', 'owner'], 
                        template: '{row.owner_key} - {row.owne}', 
                        provider: '' 
                    } 
                }, 
                _privacy: {
                    tipo: types.comp.check, label: ' Privacy:'
                }, 
                _status: {
                    tipo: types.comp.check, label: ' Status:'
                }, 
                _active: {
                    tipo: types.comp.check, label: ' Active:'
                }, 
                _banned: {
                    tipo: types.comp.check, label: ' Banned:'
                }, 
                _creation_date: {
                    tipo: types.comp.datetime, label: ' Creation Date:'
                }, 
                _last_changed_date: {
                    tipo: types.comp.datetime, label: ' Last Changed Date:'
                }, 
                _exclusion_date: {
                    tipo: types.comp.datetime, label: ' Exclusion Date:'
                }, 
                _coming_true_date: {
                    tipo: types.comp.datetime, label: ' Coming True Date:'
                }, 
                _came_true_date: {
                    tipo: types.comp.datetime, label: ' Came True Date:'
                }, 
                description: {
                    tipo: types.comp.text, label: 'Description:'
                }, 
                img_cover: {
                    tipo: types.comp.text, label: 'Img Cover:'
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
                {titulo: "Geração de Sonho"},
                {dreams_key: 10, users_key: 20, description: 70},
                {img_cover: 100},
                {_creation_date: 25, _last_changed_date: 25, _privacy: 10, _status: 10, _active: 10, _banned: 10},
                {_exclusion_date: 30, _coming_true_date: 30, _came_true_date: 30},
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
                    from: ['dreams', 'dreams', 'dreams'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dreams', 'users', 'users_like_dreams_rel'],
                        join: {source: 0, tipo: types.join.left, on: ['users_key', 'dreams_key'], where: ''},
                    fields: [
                        
                    ]
                },
            },
            where: [ 
                ['AND', 0, 'dreams_key', types.where.check]
            ],
            order: [
                ['0', 'dreams_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    key: 'dreams_key',
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
module.exports = Dreams;