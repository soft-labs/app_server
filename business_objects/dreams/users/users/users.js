/**
 * BusinessObject :: Users
 *  Implementação de objeto de negócio: users.
 *
 * Engine de aplicações - TShark.
 * @since Sat May 07 2016 11:03:40 GMT-0300 (BRT)
 * @constructor
 */
function Users(){

    //region :: Definições do Objeto

    // Id
    this.id = 'users';

    // Map
    this.source = {
        table: 'users',
        metadata: {
            key: 'users_key',
            fields: {
                users_key: {
                    tipo: types.comp.key, label: 'Id:'
                }, 
                _public: {
                    tipo: types.comp.check, label: 'Público:'
                }, 
                _active: {
                    tipo: types.comp.check, label: 'Ativo:'
                }, 
                _banned: {
                    tipo: types.comp.check, label: 'Banned:'
                }, 
                _pending_pwd: {
                    tipo: types.comp.check, label: 'Senha Válida:'
                }, 
                _creation_date: {
                    tipo: types.comp.timestamp, label: 'Data Criação:'
                }, 
                _deactivation_date: {
                    tipo: types.comp.datetime, label: 'Data de Desativação:'
                }, 
                username: {
                    tipo: types.comp.text, label: 'Username:'
                }, 
                password: {
                    tipo: types.comp.text, label: 'Password:'
                }, 
                email: {
                    tipo: types.comp.text, label: 'Email:'
                }, 
                facebook_id: {
                    tipo: types.comp.text, label: 'Facebook Id:'
                }, 
                instagram_id: {
                    tipo: types.comp.text, label: 'Instagram Id:'
                }, 
                twitter_id: {
                    tipo: types.comp.text, label: 'Twitter Id:'
                }, 
                firstname: {
                    tipo: types.comp.text, label: 'Nome:'
                }, 
                lastname: {
                    tipo: types.comp.text, label: 'Sobrenome:'
                }, 
                gender: {
                    tipo: types.comp.dropdown, label: 'Sexo:',
                    data: {
                        key: ['gender'],
                        template: '{row.gender} - {row.label}',
                        rows: [
                            {gender: 'M', label: 'Masculino'},
                            {gender: 'F', label: 'Feminino'},
                        ]
                    }
                }, 
                birthday: {
                    tipo: types.comp.date, label: 'Nascimento:'
                }, 
                img_profile: {
                    tipo: types.comp.text, label: 'Imagem Profile:'
                }, 
                img_background: {
                    tipo: types.comp.text, label: 'Imagem Background:'
                }
            },

            relationship: {
                following   : ['users'],
                followed    : ['users'],
                has_device  : ['user_devices'],
                has_account : ['user_contas'],
                dreamed     : ['dreams'],
                dreamed_too : ['dreams'],
                likes       : ['albuns', 'comments'],
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
                {titulo: "Usuário Dreams"},
                {users_key: 10, username: 25, password: 25, _pending_pwd: 10, _public: 10, _active: 10, _banned: 10},
                {firstname: 25, lastname: 25, gender: 15, email: 35},
                {birthday: 25, facebook_id: 25, instagram_id: 25, twitter_id: 25},
                {_creation_date: 40, _deactivation_date: 40},
                {img_profile: 50, img_background: 50}
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
                    from: ['dreams', 'users', 'users'],
                    fields: [
                        
                    ]
                }, 
            },
            where: [ 
                ['AND', 0, 'users_key', types.where.check]
            ],
            order: [
                ['0', 'users_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    key: 'users_key',
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
module.exports = Users;