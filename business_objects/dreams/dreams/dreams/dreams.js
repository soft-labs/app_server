/**
 * BusinessObject :: Dreams
 *  Implementação de objeto de negócio: dreams.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 09 2016 14:41:08 GMT-0300 (BRT)
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
                    tipo: types.comp.choose, label: 'Usuário:',
                    data: { 
                        key: ['users_key'], 
                        from: ['dreams', 'users', 'users'],
                        template: '{username}',
                        provider: '' 
                    } 
                }, 
                owner_key: {
                    tipo: types.comp.choose, label: 'Owner:',
                    data: { 
                        key: ['owner_key'], 
                        from: ['dreams', 'users', 'users'],
                        template: '{username}',
                        provider: '' 
                    } 
                }, 
                _privacy: {
                    tipo: types.comp.dropdown, label: 'Privacidade:',
                    data: {
                        label: 'label',
                        rows: [
                            {_privacy: 'P', label: 'Publico'},
                            {_privacy: 'S', label: 'Secreto'},
                            {_privacy: 'F', label: 'Seguidores'},
                            {_privacy: 'C', label: 'Coletivo'}
                        ]
                    }
                }, 
                _status: {
                    tipo: types.comp.dropdown, label: 'Status:',
                    data: {
                        label: 'label',
                        rows: [
                            {_status: '1', label: 'To Come true'},
                            {_status: '2', label: 'Coming True'},
                            {_status: '3', label: 'Came True'}
                        ]
                    }
                }, 
                _active: {
                    tipo: types.comp.check, label: 'Ativo:'
                }, 
                _banned: {
                    tipo: types.comp.check, label: 'Banned:'
                },
                _sponsor: {
                    tipo: types.comp.check, label: 'Sugerido:'
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
                    tipo: types.comp.date, label: ' Coming True Date:'
                },
                _came_true_date: {
                    tipo: types.comp.date, label: ' Came True Date:'
                },
                _to_come_true_date: {
                    tipo: types.comp.date, label: ' To Come True Date:'
                },
                description: {
                    tipo: types.comp.text, label: 'Descrição do Sonho:'
                }, 
                img_cover: {
                    tipo: types.comp.text, label: 'Imagem Cover:'
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
                {titulo: "Informações do Sonho"},
                {_active: 10, _banned: 10, _sponsor: 10, _status: 20, _privacy: 20, owner_key: 40},
                {description: 60, users_key: 40},
                {_creation_date: 30, _coming_true_date: 30, _came_true_date: 30},
                {img_cover: 100}
            ],
            ctrls: {
                
            }
        }

    };

    //endregion


    //region :: Providers

    /**
     * Fields default
     * @type {string[]}
     */
    this.def_fields = [
        'dreams_key', 'users_key', 'owner_key',
        '_creation_date', '_status', 'description', 'img_cover'
    ];

    /**
     * Provedores de dados
     */
    this.providers = {

        // Padrão
        default: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    fields: []
                },
                1: { 
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        
                    ]
                }
            },
            where: [ 
                ['AND', 0, 'dreams_key', types.where.check]
            ],
            order: [
                ['0', 'dreams_key', 'desc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },
        
        // Padrão
        mobile: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: { 
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        
                    ]
                }
            },
            where: [ 
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_active',     '=', '1'],
                ['AND', 0, '_banned',    '<>', '1'],
                ['AND', 0, '_sponsor', '<>', '1']
            ],
            order: [
                ['0', 'dreams_key', 'desc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        // Feed
        feedall: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [

                    ]
                }
            },
            where: [
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_active',     '=', '1'],
                ['AND', 0, '_banned',    '<>', '1'],
                ['AND', 0, '_sponsor', '<>', '1'],
                ['AND', 0, '_privacy', 'IN', "('P', 'C')"]
            ],
            order: [
                ['0', 'dreams_key', 'desc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        feedfollowing: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                        join: {source: 0, tipo: types.join.inner, on: 'users_key', where: ''},
                    fields: [

                    ]
                },
                2: {
                    from: ['dreams', 'users', 'user_followers'],
                        join: {source: 1, tipo: types.join.inner, on: 'users_key', where: ''},
                    fields: [

                    ]
                },
                3: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 2, tipo: types.join.inner, on: ['users_key', 'follower_key'], where: ''},
                    fields: [

                    ]
                }
            },
            where: [
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 3, '_token', types.where.get],
                ['AND', 2, '_accept', '=', '1'],
                ['AND', 0, '_active',     '=', '1'],
                ['AND', 0, '_banned',    '<>', '1'],
                ['AND', 0, '_sponsor', '<>', '1'],
                "AND (tb0._privacy IN ('P', 'C', 'F')" +
                " OR (tb0._privacy = 'S' " +
                "     AND tb3.users_key IN (" +
                "           SELECT users_key " +
                "             FROM users_dreams_rel" +
                "             WHERE dreams_key = tb0.dreams_key" +
                "               AND _accept = 1" +
                "         )" +
                "     )" +
                ")"
            ],
            order: [
                ['0', 'dreams_key', 'desc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos coletivos
        coletivos: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                }
            },
            where: [
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_privacy', '=', "'C'"],
                ['AND', 0, '_active',  '=',  '1'],
                ['AND', 0, '_banned',  '<>', '1'],
                ['AND', 0, '_sponsor', '<>', '1']
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos do token
        mydreams: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: ['_none_'],
                    sql_fields: [
                        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 1) as to_come_true',
                        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 2) as coming_true',
                        ' (SELECT COUNT(dreams_key) FROM dreams WHERE users_key = tb0.users_key AND _status = 3) as came_true'
                    ]
                }
            },
            where: [
                ['AND', 1, '_token', types.where.get],
                ['AND', 0, 'dreams_key', types.where.check]
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Quem compartilha sonhos do token
        dreamtoo: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    fields: ['_none_']
                },
                1: {
                    from: ['dreams', 'users', 'users_dreams_rel'],
                    join: {source: 0, tipo: types.join.inner, on: 'dreams_key', where: ''},
                    fields: ['_none_']
                },
                2: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 1, tipo: types.join.inner, on: 'users_key', where: ''},
                    force_fields: [
                        'users_key', '_public', 'username', 'firstname', 'lastname', 'img_profile'
                    ]
                }
            },
            where: [
                ['AND', 0, 'dreams_key', types.where.get]
            ],
            order: [
                ['2', 'username', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos do token - Com data para realizar
        tocometrue: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        '_none_'
                    ]
                }
            },
            where: [
                ['AND', 1, '_token', types.where.get],
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_status', '=', '1'],
                ['AND', 0, '_active', '=', '1'],
                ['AND', 0, '_banned', '<>', '1']
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos do token - Com data de realizando
        comingtrue: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        '_none_'
                    ]
                }
            },
            where: [
                ['AND', 1, '_token', types.where.get],
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_status', '=', '2'],
                ['AND', 0, '_active',     '=', '1'],
                ['AND', 0, '_banned',    '<>', '1']
                
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos do token - Realizados
        cametrue: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
                1: {
                    from: ['dreams', 'users', 'users'],
                    join: {source: 0, tipo: types.join.left, on: 'users_key', where: ''},
                    fields: [
                        '_none_'
                    ]
                }
            },
            where: [
                ['AND', 1, '_token', types.where.get],
                ['AND', 0, 'dreams_key', types.where.check],
                ['AND', 0, '_status', '=', '3'],
                ['AND', 0, '_active',     '=', '1'],
                ['AND', 0, '_banned',    '<>', '1']
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },

        // Sonhos do token - Sugeridos
        suggested: {
            sources: {
                0: {
                    from: ['dreams', 'dreams', 'dreams'],
                    force_fields: this.def_fields
                },
            },
            where: [
                ['AND', 0, '_active', '=', '1'],
                ['AND', 0, '_banned', '<>', '1'],
                ['AND', 0, '_sponsor', '=', '1']
            ],
            order: [
                ['0', 'dreams_key', 'asc']
            ],
            search: [
                {alias: 0, field: 'description',  param: types.search.like_full }

            ],
            limit: 250,
            showSQL: 0
        },


        // Update global
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


    //region :: Eventos Aplicados

    /**
     * Evento chamado ao final da operação GET :: LIST
     * @param ret Objeto de retorno
     */
    this.onAfterList = function *(ret){


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
            delete(row['_deleted_']);
        }
    };

    /**
     * Evento chamado na operação POST :: Insert
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onInsert = function *(prov, ctx){
        var data = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users']);
        if (data.rows.length) {
            this.params.row['users_key'] = data.rows[0]['users_key'];
        }

        this.params.img_cover = this.params.row['img_cover'];
        this.params.row['img_cover'] = '';

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     */
    this.onAfterInsert = function *(ret, ctx){
        if (this.params['dreamers']){
            if (typeof this.params.dreamers == 'string'){
                this.params.dreamers = this.params.dreamers.split(',');
            }
            var rel = this.initObj(['dreams', 'users', 'users_dreams_rel'], ctx);
            for (var u = 0; u < this.params.dreamers.length; u++){
                rel.params.row.users_key = this.params.dreamers[u];
                yield rel.insert(ctx);
            }
        }


        var ok = yield this.saveDreamImage();
        if (ok){
            yield this.update(ctx);
        }
    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     */
    this.onUpdate = function *(ret, ctx){
        yield this.saveDreamImage();
    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     */
    this.onAfterUpdate = function *(ret, ctx){
        if (this.params.row['_status']) {
            var profile = yield this.select(ctx, 'profile', false, ['dreams', 'users', 'users'])
                , dreamers = yield this.select(ctx, 'dreamer', false, ['dreams', 'users', 'users_dreams_rel'])
                ;

            if (profile['rows'] && profile.rows.length) {

                // Mensagem
                var msg = profile.rows[0]['firstname'] + (profile.rows[0]['lastname'] ? ' ' + profile.rows[0]['lastname'] : '');
                switch (this.params.row['_status']) {
                    case "1":
                        msg += " quer realizar";
                        break;

                    case "2":
                        msg += " está realizando";
                        break;

                    case "3":
                        msg += " realizou";
                        break;
                }
                msg += " um sonho com você";

                // Dreamers
                var users = [];
                dreamers.rows.forEach(row => {
                    users.push(row['users_key']);
                });

                // Push
                yield this.engine.sendPush(ctx, {
                    to_users: [users],
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
            }
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
     * Salva imagens dos sonhos recebidas em base64
     */
    this.saveDreamImage = function *(){
        var ok = false
            , img_cover = this.params['img_cover'] || this.params.row['img_cover']
        ;

        if (img_cover && this.params.row['dreams_key']){
            var img = this.engine.saveBase64Image(
                "apps/dreams/_common/_imgs/dreams/c_" + this.params.row['dreams_key'],
                img_cover
            );
            this.params.row['img_cover'] = img.substr(7);
        }
    };
    
    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = Dreams;