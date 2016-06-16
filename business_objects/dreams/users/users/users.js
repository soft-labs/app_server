/**
 * BusinessObject :: Users
 *  Implementação de objeto de negócio: users.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 09 2016 14:40:50 GMT-0300 (BRT)
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
                    tipo: types.comp.check, label: 'Público:', default: 0
                },
                _active: {
                    tipo: types.comp.check, label: 'Ativo:', default: 1
                },
                _banned: {
                    tipo: types.comp.check, label: 'Banned:', default: 0
                },
                _pending_pwd: {
                    tipo: types.comp.check, label: 'Senha Válida:', default: 0
                },
                _creation_date: {
                    tipo: types.comp.timestamp, label: 'Data Criação:'
                },
                _deactivation_date: {
                    tipo: types.comp.datetime, label: 'Data de Desativação:'
                },
                _suggested: {
                    tipo: types.comp.check, label: 'Sugerido:'
                },
                _token: {
                    tipo: types.comp.text, label: 'Token:'
                },
                _locale: {
                    tipo: types.comp.text, label: 'Locale:'
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
                            {gender: 'F', label: 'Feminino'}
                        ]
                    }
                },
                birthday: {
                    tipo: types.comp.date, label: 'Nascimento:'
                },
                img_profile: {
                    tipo: types.comp.text_huge, label: 'Imagem Profile:'
                },
                img_background: {
                    tipo: types.comp.text_huge, label: 'Imagem Background:'
                },
                img_background_dreams_gallery: {
                    tipo: types.comp.text_huge, label: 'Imagem Galeria:'
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
                {titulo: "Usuário Dreams"},
                {users_key: 10, username: 25, password: 25, _pending_pwd: 10, _public: 10, _active: 10, _banned: 10},
                {firstname: 25, lastname: 25, gender: 15, email: 35},
                {birthday: 25, facebook_id: 25, instagram_id: 25, twitter_id: 25},
                {_creation_date: 40, _deactivation_date: 40},
                {img_profile: 50, img_background: 50},
                {device: 100},
            ],
            ctrls: {
                device: {
                    tipo: types.comp.text, label: 'Device:'
                }
            }
        }

    };

    //endregion


    //region :: Providers

    var _sql_fields_profile = [
        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 1) as to_come_true',
        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 2) as coming_true',
        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 3) as came_true',

        ' (SELECT COUNT(follower_key) FROM user_follower WHERE follower_key = tb0.users_key AND _accept = 1) as following',
        ' (SELECT COUNT(follower_key) FROM user_follower WHERE follower_key = tb0.users_key AND _accept = 0) as pending_following',
        ' (SELECT COUNT(users_key)    FROM user_follower WHERE users_key = tb0.users_key    AND _accept = 1) as followers',
        ' (SELECT COUNT(users_key)    FROM user_follower WHERE users_key = tb0.users_key    AND _accept = 0) as pending_followers',

        ' (SELECT COUNT(users_key)  FROM users_dreams_rel WHERE users_key = tb0.users_key)       as dreaming_too',
        ' (SELECT COUNT(r.users_key)  ' +
        '    FROM users_dreams_rel r' +
        '    INNER JOIN dreams d ON (r.dreams_key = d.dreams_key)' +
        '  WHERE d.users_key = tb0.users_key ' +
        '    AND _active = 1' +
        '    AND _banned <> 1' +
        ') as dreaming_with_me'
    ];

    this.default = {
        fields: {
            profile: [
                'users_key', '_public', '_pending_pwd', '_token',
                'username', 'password', 'email', 'facebook_id', 'instagram_id', 'twitter_id',
                'firstname', 'lastname', 'gender', 'birthday',
                'img_profile', 'img_background', 'img_background_dreams_gallery'
            ],
            dreamers: [
                'users_key', '_public', 'username', 'firstname', 'lastname', 'img_profile'
            ],
            sql_fields_profile: _sql_fields_profile,
            sql_fields: _sql_fields_profile.concat([

                ' (COALESCE(' +
                '    (SELECT _accept ' +
                '         FROM user_follower f ' +
                '        INNER JOIN users u ON (f.users_key = u.users_key)' +
                "        WHERE f.follower_key = tb0.users_key " +
                "          AND u._token = '_WHERE_CHECK_[_token]'" +
                '    ), -1) + 1)  as follower_status_rel',

                ' (COALESCE(' +
                '     (SELECT _accept' +
                '        FROM user_follower f ' +
                '       INNER JOIN users u ON (f.follower_key = u.users_key)' +
                "       WHERE f.users_key = tb0.users_key " +
                "         AND u._token = '_WHERE_CHECK_[_token]'" +
                '    ), -1) +1)  as following_status_rel'

            ])
        },
        search: [
            {alias: 0, field: 'username',   param: types.search.like_full },
            {alias: 0, field: 'firstname',  param: types.search.like_full },
            {alias: 0, field: 'lastname',   param: types.search.like_full },
            {alias: 0, field: 'facebook_id',  param: types.search.like_full },
            {alias: 0, field: 'instagram_id', param: types.search.like_full },
            {alias: 0, field: 'twitter_id',   param: types.search.like_full }
        ],
        order: [
            ['0', 'firstname', 'asc'],
            ['0', 'username', 'asc']
        ]
    };

    this.providers = {

        default  : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    fields: []
                }
            },
            where: [ 
                ['AND', 0, 'users_key', types.where.check]
            ],
            order: this.default.order,
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        mobile   : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: this.default.fields.profile
                }
            },
            where: [
                ['AND', 0, 'users_key',  types.where.check],
                ['AND', 0, '_suggested', types.where.check]
            ],
            order: [
                ['0', 'users_key', 'desc']
            ],
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        login    : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: this.default.fields.profile
                }
            },
            where: [
                ['AND', 0, '_active', '=', 1],
                ['AND', 0, '_banned', '<>', 1]
            ],
            order: this.default.order,
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        users    : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: [
                        'users_key', '_public', '_active', '_banned', '_pending_pwd',
                        '_creation_date', '_deactivation_date', 'username', 'password',
                        'email', 'facebook_id', 'instagram_id', 'twitter_id',
                        'firstname', 'lastname', 'gender', 'birthday',
                        'img_profile', 'img_background', 'img_background_dreams_gallery'
                    ]
                }
            },
            where: [
                ['AND', 0, 'users_key', types.where.check],
                ['AND', 0, '_active', '=', 1],
                ['AND', 0, '_banned', '<>', 1]
            ],
            order: [
                ['0', 'users_key', 'desc']
            ],
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        profile  : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: this.default.fields.profile,
                    sql_fields: this.default.fields.sql_fields_profile
                }
            },
            where: [
                ['AND', 0, '_token', types.where.get]
            ],
            order: this.default.order,
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        dreamers : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: this.default.fields.dreamers,
                    sql_fields: this.default.fields.sql_fields
                }
            },
            where: [
                ['AND', 0, '_token',    types.where.not],
                ['AND', 0, 'users_key', types.where.check],
                ['AND', 0, '_active', '=', 1],
                ['AND', 0, '_banned', '<>', 1]
            ],
            order: this.default.order,
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },

        users_suggested : {
            sources: {
                0: {
                    from: ['dreams', 'users', 'users'],
                    force_fields: this.default.fields.dreamers,
                    sql_fields: this.default.fields.sql_fields
                }
            },
            where: [
                ['AND', 0, '_token',    types.where.not],
                ['AND', 0, 'users_key', types.where.check],
                ['AND', 0, '_suggested', '=', 1],
                ['AND', 0, '_active', '=', 1],
                ['AND', 0, '_banned', '<>', 1]
            ],
            order: this.default.order,
            search: this.default.search,
            limit: 250,
            showSQL: 0
        },


        /**
         * Criar nova api
         *   OK users_suggested
         *      'users_key', '_public', 'username', 'firstname', 'lastname', 'img_profile'
         *      nova flag 'status_rel'
         *        0 => Se não há relacionamento com o usuário sugerido
         *        1 => Se não há relacionamento com o usuário pendente
         *        2 => Se ja há relacionamento com o usuário sugerido
         *
         *   OK - dreamers
         *      params pesuisa igual users
         *      acrescenta flags de status_rek
         *      acrescenta contadores come_true
         *      acrescenta seguindo / seguidor
         *
         *   OK - profile = acima
         *
         *
         *
         *  Ajustar path de salvar img
         *
         *  OK - Acrescentar ids de redes sociais em consulta global
         *  
         *  Acrescentar array de users_key ao criar sonho para gerar dreamers de uma so vez
         *
         */

        update   : {
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


    //region :: Eventos Aplicados

    /**
     * Ajusta where em login
     * @param prov
     * @param ctx
     */
    this.onSelect = function *(prov, ctx){
        if (prov['id'] == 'login') {

            if (this.params['facebook_id']){
                prov.where.push(['AND', 0, 'facebook_id', '=', "'" + this.params['facebook_id'] + "'"]);

            } else if (this.params['instagram_id']){
                prov.where.push(['AND', 0, 'instagram_id', '=', "'" + this.params['instagram_id'] + "'"]);

            } else if (this.params['twitter_id']){
                prov.where.push(['AND', 0, 'twitter_id', '=', "'" + this.params['twitter_id'] + "'"]);

            } else if (this.params['email']){
                prov.where.push(['AND', 0, 'email', '=', "'" + this.params['email'] + "'"]);
                prov.where.push(['AND', 0, 'password', '=', "'" + this.params['password'] + "'"]);

            } else if (this.params['username']){
                prov.where.push(['AND', 0, 'username', '=', "'" + this.params['username'] + "'"]);
                prov.where.push(['AND', 0, 'password', '=', "'" + this.params['password'] + "'"]);

            } else {
                prov.where.push(" AND 1 = 2");
            }

        }
    };


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
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onInsert = function *(ret, ctx){
        var crypto = require('crypto')
            , hash = crypto.createHash('sha256')
        ;

        // Imagens
        this.params.img_background = this.params.row['img_background'];
        this.params.img_profile = this.params.row['img_profile'];

        this.params.row['img_background'] = this.params.row['img_profile'] = '';

        hash.update(this.params.row['username'] + this.params.row['password']);
        this.params.row['_token'] = hash.digest('hex');
    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     */
    this.onAfterInsert = function *(ret, ctx){
        this.params['_token'] = ret['_token'] = this.params.row['_token'];
        this.params['users_key'] = this.params.row['users_key'] = ret['result'];

        // Salva imagens
        var ok = yield this.saveUserImages();
        if (ok){
            yield this.update(ctx);
        }

        if (this.params.row['device']){
            var dev = this.engine.initObj(['dreams', "users", "user_devices"], ctx);
            dev.params.row = {
                users_key: this.params['users_key'],
                token: this.params.row['device']
            };
            var ok = yield dev.insert();
        }

        var data = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users']);
        ret['data'] = {
            page: data['page'],
            rows: data['rows']
        };
    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onUpdate = function *(ret, ctx){
        yield this.saveUserImages();
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

    };*/

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

    /**
     * Troca de senha de usuário
     * @param ctx
     * @returns {*}
     */
    this.forgotPwd = function *(ctx){
        var ret = {
            success: 1,
            msg: "Email enviado para fila de envio com sucesso."
        };
        try {
            if (!this.params['email']) {
                return {
                    success: 0,
                    msg: 'Não foi informado o email para recuperação da senha'
                };
            }

            // Acha usuário com base no email
            var data = yield this.select(ctx, 'default', {
                where: [
                    ["AND", 0, "email", "=", "'" + this.params['email'] + "'"]
                ]
            }, ['dreams', 'users', 'users']);

            if (!data['rows'] || !data.rows.length){
                return {
                    success: 0,
                    msg: 'Email não encontrado'
                };
            }
            var
                user = data.rows[0]
                , user_key = user['user_key']
                , locale = user['_locale']
            ;

            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                pwd = ""
                ;
            for (var i = 0, n = charset.length; i < length; ++i) {
                pwd += charset.charAt(Math.floor(Math.random() * n));
            }

            // Altera senha
            this.params.row = {};
            this.params.row['users_key'] = user_key;
            this.params.row['password'] = pwd;
            yield this.update(ctx);

            // envia email
            try {
                var email = require("emailjs/email")
                    , jade = require("jade")
                ;
                ctx['pwd'] = pwd;
                var server = email.server.connect(
                        this.engine.app.context.config.email
                    )
                    , conteudo = yield this.engine.render('/emails/pwd/' + locale, ctx)
                ;

                server.send({
                    text: conteudo, // jade.renderFile('./views/emails/pwd/' + locale + '.jade', {pwd: pwd}),
                    from: "Dreams <" + this.engine.app.context.config.email.dreams + ">",
                    to: user['firstname'] + (user['lastname'] ? user['lastname'] : '')
                    + " <" + user['email'] + ">",
                    subject: "Dreams - Recuperação de senhas",
                    attachment:
                    [
                        {data:jade.renderFile('views/emails/pwd/' + locale + '.jade', {pwd: pwd}), alternative:true},
                       // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
                    ]
                }, function (err, message) {
                    console.log(err || message);
                });

            } catch (e) {
                console.log(e.message);
            }

        } catch (e){
            console.log(e.message);
        }

        // Retorna user
        return ret;
    };

    /**
     * Salva imagens dos usuário recebidas em base64
     */
    this.saveUserImages = function *(){
        var ok = false
            , img_profile    = this.params['img_profile']    || this.params.row['img_profile']
            , img_background = this.params['img_background'] || this.params.row['img_background']
        ;

        // Imagem de profile
        if (img_profile && (img_profile.length > 1000) && this.params.row['users_key']){
            var img = this.engine.saveBase64Image(
                "dreams/_imgs/users/p_" + this.params.row['users_key'],
                img_profile
            );
            this.params.row['img_profile'] = img.substr(7);
            ok = true;
        }

        // Imagem de profile
        if (img_background && (img_background.length > 1000) && this.params.row['users_key']){
            var img = this.engine.saveBase64Image(
                "dreams/_imgs/users/b_" + this.params.row['users_key'],
                img_background
            );
            this.params.row['img_background'] = img.substr(7);
            ok = true;
        }

        return ok;
    };

    //endregion
    
}


// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = Users;