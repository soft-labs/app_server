/**
 * BusinessObject :: UserContas
 *  Implementação de objeto de negócio: user_contas.
 *
 * Engine de aplicações - TShark.
 * @since Sat May 07 2016 13:33:28 GMT-0300 (BRT)
 * @constructor
 */
function UserContas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'user_contas';

    // Map
    this.source = {
        table: 'user_contas',
        metadata: {
            key: 'user_contas_key',
            fields: {
                user_contas_key: {
                    tipo: types.comp.key, label: 'User Contas:'
                }, 
                users_key: {
                    tipo: types.comp.dropdown, label: 'Users:',
                    data: { 
                        key: ['users_key'], 
                        from: ['dreams', 'users', 'users'], 
                        template: '{row.users_key} - {row.user}', 
                        provider: '' 
                    } 
                }, 
                _tipo: {
                    tipo: types.comp.int, label: ' Tipo:'
                }, 
                conta: {
                    tipo: types.comp.text, label: 'Conta:'
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
                {titulo: "Informações de user_contas"},
                {user_contas_key: 25, users_key: 25, _tipo: 25, conta: 25}
            ],
            ctrls: {
                conta: {
                    extra_right: { class: '', tag: '' },
                    extra_left:  { class: '', tag: '' }
                }
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['dreams', 'users', 'user_contas'],
                    fields: [
                        'conta'
                    ]
                },
                1: { 
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'user_contas_key', types.where.check]
            ],
            order: [
                [0, 'conta', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'conta',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'users', 'user_contas'],
                    key: 'user_contas_key',
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
module.exports = UserContas;