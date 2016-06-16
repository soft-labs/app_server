/**
 * BusinessObject :: UserFollow
 *  Implementação de objeto de negócio:
 *
 *    Usuários que o meu profile segue.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 09 2016 18:08:05 GMT-0300 (BRT)
 * @constructor
 */
function UserFollowing(){

    //region :: Definições do Objeto

    // Id
    this.id = 'user_follow';

    // Map
    this.source = {
        table: 'user_follower',
        metadata: {
            key: 'users_key',
            fields: {
                follower_key: {
                    tipo: types.comp.key, label: 'Usuário:',
                    data: {
                        key: ['users_key'],
                        from: ['dreams', 'users', 'users'],
                        template: '{row.users_key} - {row.username}',
                        provider: 'profile'
                    }
                },
                users_key: {
                    tipo: types.comp.dropdown, label: 'Seguindo:',
                    data: {
                        key: ['users_key'],
                        from: ['dreams', 'users', 'users'],
                        template: '{row.users_key} - {row.username}',
                        provider: ''
                    }
                },
                _accept: {
                    tipo: types.comp.int, label: 'Aceito:'
                },
                _creation_date: {
                    tipo: types.comp.timestamp, label: 'Data Criação:'
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
                {titulo: "Usuário seguindo:"},
                {follower_key: 50, users_key: 50}
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
                0: {// Este user
                    from: ['dreams', 'users', 'users'],
                    fields: ['_none_']
                },
                1: {
                    from: ['dreams', 'users', 'user_follow'],
                    join: {source: 0, tipo: types.join.inner, on: ['follower_key', 'users_key'], where: ''},
                    force_fields: [ '_accept' ]
                },
                2: { // Followers
                    from: ['dreams', 'users', 'users'],
                    join: {source: 1, tipo: types.join.inner, on: 'users_key', where: ''},
                    force_fields: [
                        'users_key', '_public', 'username', 'firstname', 'lastname', 'img_profile'
                    ],
                    sql_fields: [
                        ' (SELECT COUNT(r.users_key)  ' +
                        '    FROM users_dreams_rel r' +
                        '    INNER JOIN dreams d ON (r.dreams_key = d.dreams_key)' +
                        '  WHERE d.users_key = tb2.users_key' +
                        '    AND r.users_key = tb0.users_key' +
                        '    AND r._accept = 1' +
                        '    AND d._active = 1' +
                        '    AND d._banned <> 1' +
                        ') as dreaming_with_me'
                    ]
                }
            },
            where: [
                ['AND', 0, '_token', types.where.get],
            ],
            order: [
                ['2', 'firstname', 'desc'],
                ['2', 'username', 'desc'],
            ],
            search: [
                {alias: 2, field: 'username',   param: types.search.like_full },
                {alias: 2, field: 'firstname',  param: types.search.like_full },
                {alias: 2, field: 'lastname',   param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'users', 'user_follow'],
                    key: ['users_key', 'follower_key'],
                    where: [

                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     */
    this.onGetRow = function (row){
        if (this.params['_mobile_']) {
            delete(row['_key_']);
            delete(row['_selected_']);
        }
    };

    /**
     * Evento chamado na operação POST :: Insert
     * Registra que EU sou (follower_key) estou seguindo OUTRO (user_key)
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onInsert = function *(prov, ctx){
        if (!this.params.row['follower_key']) {

            // Pega o usuário pelo token
            var data = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users'])
                , follower_key
                , _accept = 0
                ;

            if (data.rows.length) {
                follower_key = data.rows[0]['users_key'];
            }

            // Verifica se o perfil do cara que irei seguir é público
            data = yield this.select(ctx, 'default', {
                where: [
                    ['AND', 0, 'users_key', '=', this.params.row['users_key']]
                ]
            }, ['dreams', 'users', 'users']);

            if (data.rows.length) {
                _accept = data.rows[0]['_public'];
            }

            this.params.row['follower_key'] = follower_key;
            this.params.row['_accept'] = _accept;
        }
    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     */
    this.onAfterInsert = function *(ret, ctx){
        var profile     = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users'])
            , following = yield this.select(ctx, 'users', {
                where: [
                    ['AND', 0, 'users_key', '=', this.params.row['users_key']]
                ]
            }, ['dreams', 'users', 'users'])
            ;

        var msg = profile.rows[0]['firstname'] + (profile.rows[0]['lastname'] ? ' ' + profile.rows[0]['lastname'] : '');
        msg += following.rows[0]['_public'] == 1 ? " começou a" : " quer";
        msg += " te seguir";

        // Push de comentar o sonho
        var devices = this.initObj(["dreams", "users", "user_devices"], ctx);
        yield devices.sendPush(ctx, {
            to_users: [following.rows[0]['users_key']],
            expire: 1,
            android: {
                data: {
                    message: msg
                }
            },
            ios: {
                alert: msg
            }
        });
    };

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onDelete = function *(prov, ctx){
        prov.sources[0].key = 'users_key';
        this.params.row['users_key'] = this.params.row['users_key,follower_key'];
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
     * Evento chamado ao final da operação DELETE :: Delete
     * @param ret Objeto de retorno
     *
     this.onAfterDelete = function *(ret){

    };
     
     
     /* */

    //endregion


    //region :: Regras de Negócio

    this.followall = function *(ctx){
        this.params['_suggested'] = 1;
        var profile = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users'])
            , sugeridos = yield this.select(ctx, 'default', false, ['dreams', 'users', 'users'])
        ;

        for (var r = 0; r < sugeridos.rows.length; r++) {
            try {
                this.params.row = {
                    users_key: sugeridos.rows[r]['users_key'],
                    follower_key: profile.rows[0]['users_key'],
                    _accept: sugeridos.rows[r]['_public']
                };
                yield this.insert(ctx);
            } catch (e) {

            }
        }

        return {
            success: 1
        }
    };

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = UserFollowing;