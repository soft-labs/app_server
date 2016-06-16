/**
 * BusinessObject :: UserDevices
 *  Implementação de objeto de negócio: user_devices.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 09 2016 14:40:50 GMT-0300 (BRT)
 * @constructor
 */
function UserDevices(){
    
    // Conexão para push IOS
    var  apn = require('apn');

    /**
     * Inicialização
     */
    this.init = function(ctx) {
        this.apnConn = new apn.Connection({
            cert: this.context.clientes.dreams.mobile.pushserver.ios.cert,
            key : this.context.clientes.dreams.mobile.pushserver.ios.key,
            passphrase: this.context.clientes.dreams.mobile.pushserver.ios.pass
        });
    };
    
    //region :: Definições do Objeto

    // Id
    this.id = 'user_devices';

    // Map
    this.source = {
        table: 'user_devices',
        metadata: {
            key: 'user_devices_key',
            fields: {
                user_devices_key: {
                    tipo: types.comp.key, label: 'User Devices:'
                }, 
                users_key: {
                    tipo: types.comp.dropdown, label: 'Users:',
                    data: { 
                        key: ['users_key'], 
                        from: ['dreams', 'denuncy', 'users'], 
                        template: '{row.users_key} - {row.user}', 
                        provider: '' 
                    } 
                }, 
                ios: {
                    tipo: types.comp.check, label: 'IOS:'
                },
                token: {
                    tipo: types.comp.text, label: 'Token:'
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
                {titulo: "Informações de user_devices"},
                {user_devices_key: 20, users_key: 20, ios: 20, token: 40}
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
                    from: ['dreams', 'users', 'user_devices'],
                    fields: [
                        '*'
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
                ['AND', 0, 'user_devices_key', types.where.check]
            ],
            order: [
                ['0', 'user_devices_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dreams', 'users', 'user_devices'],
                    key: 'user_devices_key',
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

    
    /**
     * Envia notificações ao usuário
     */
    this.sendPush = function *(ctx, pack){
        try {

            // IOS
            if (pack['ios']) {
                var data = yield this.select(ctx, 'default', {
                    where: [
                        ["AND", 0, "users_key", "IN", "(" + pack['to_users'].join(',') + ")"],
                        ["AND", 0, "ios", "=", "1"]
                    ]
                });

                var note = new apn.Notification();
                note.expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hora
                note.badge = pack['ios']['badge'] || 1;
                note.sound = pack['ios']['sound'] || "ping.aiff";
                note.alert = pack['ios']['alert'];
                note.payload = {'messageFrom': 'Dreams'};

                data.rows.forEach(row => {
                    var device = new apn.Device(row['token']);
                    console.log(note.alert);
                    this.apnConn.pushNotification(note, device);
                })
            }

        } catch (e){
            console.log(e.message);
        }
    };

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = UserDevices;