/**
 * BusinessObject :: AppLogs
 *  Implementação de objeto de negócio: app_logs.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:54:31 GMT-0300 (BRT)
 * @constructor
 */
function AppLogs(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_logs';

    // Map
    this.source = {
        table: 'app_logs',
        metadata: {
            key: 'app_logs_key',
            label: 'log',
            fields: {
                app_logs_key: {
                    tipo: types.comp.key, label: 'App Logs:'
                }, 
                app_logs_tipos_key: {
                    tipo: types.comp.choose, label: 'App Logs Tipos:',
                    data: { 
                        key: ['app_logs_tipos_key'], 
                        from: ['dbms', 'app', 'app_logs_tipos'], 
                        template: '{app_logs_tipos_key} - {app_logs_tipo}', 
                        provider: '' 
                    } 
                }, 
                sec_usuarios_key: {
                    tipo: types.comp.choose, label: 'Sec Usuarios:',
                    data: { 
                        key: ['sec_usuarios_key'], 
                        from: ['dbms', 'security', 'sec_usuarios'], 
                        template: '{sec_usuarios_key} - {sec_usuario}', 
                        provider: '' 
                    } 
                }, 
                empresas_key: {
                    tipo: types.comp.choose, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['dbms', 'empresas', 'empresas'], 
                        template: '{empresas_key} - {empresa}', 
                        provider: '' 
                    } 
                }, 
                dt_log: {
                    tipo: types.comp.datetime, label: 'Dt Log:'
                }, 
                log: {
                    tipo: types.comp.text, label: 'Log:'
                }, 
                modulo: {
                    tipo: types.comp.text, label: 'Modulo:'
                }, 
                cliente: {
                    tipo: types.comp.text, label: 'Cliente:'
                }, 
                ip: {
                    tipo: types.comp.text, label: 'Ip:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
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
                size  : types.form.size.small,
                external: [

                ]
            },
            linhas: [
                {titulo: "Informações de app_logs"},
                {app_logs_key: 25, app_logs_tipos_key: 25, sec_usuarios_key: 25, empresas_key: 25}, 
                {dt_log: 25, log: 25, modulo: 25, cliente: 25}, 
                {ip: 25, observacoes: 75}
            ],
            ctrls: {
                log: {
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
                    from: ['dbms', 'apps', 'app_logs'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'app', 'app_logs_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'app_logs_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'security', 'sec_usuarios'],
                    join: {source: 0, tipo: types.join.left, on: 'sec_usuarios_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_logs_key', types.where.check]
            ],
            order: [
                [0, 'log', 'asc']
            ],
            search: [
                    {alias: 0, field: 'log',  param: types.search.like_full },
                    {alias: 0, field: 'modulo',  param: types.search.like_full },
                    {alias: 0, field: 'cliente',  param: types.search.like_full },
                    {alias: 0, field: 'ip',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'apps', 'app_logs'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos Aplicados

    //endregion


    //region :: Regras de Negócio

    //endregion
    

    //region :: Eventos Disponívels


    //region :: onGet

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
    this.onAfterGet = function *(ret, ctx){

    };

    /* */
    //endregion

    
    //region :: onList
    
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
    this.onAfterList = function *(ret, ctx){

    };

     /* */
    //endregion

    
    //region :: onSearch
    
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
    this.onAfterSearch = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onSelect

    /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
     this.onSelect = function *(prov, ctx){

    };

     /* */
    //endregion


    //region :: onGetRow

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     *
     this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };

     /* */
    //endregion


    //region :: onGetForm

    /**
     * Evento chamado na recuperação de um formulário
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onGetForm = function *(form, ctx){

    };

     /**
     * Evento chamado na recuperação de dados de um formulário
     * @param ret Objeto de retorno
     *
    this.onGetFormData = function *(ret, get){

    };

     /* */
    //endregion


    //region :: onEdit
     
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
    this.onAfterEdit = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onCreate

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
    this.onAfterCreate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onInsert
     
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
    this.onAfterInsert = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onUpdate

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
    this.onAfterUpdate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onDelete

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
    this.onAfterDelete = function *(ret, ctx){

    };

     /* */
    //endregion


    /* */
    //endregion


}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = AppLogs;