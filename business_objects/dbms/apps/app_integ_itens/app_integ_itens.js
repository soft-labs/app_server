/**
 * BusinessObject :: AppIntegItens
 *  Implementação de objeto de negócio: app_integ_itens.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:02 GMT-0300 (BRT)
 * @constructor
 */
function AppIntegItens(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_integ_itens';

    // Map
    this.source = {
        table: 'app_integ_itens',
        metadata: {
            key: 'app_integ_itens_key',
            label: 'modulo',
            fields: {
                app_integ_itens_key: {
                    tipo: types.comp.key, label: 'App Integ Itens:'
                }, 
                app_integracoes_key: {
                    tipo: types.comp.choose, label: 'App Integrações:',
                    data: { 
                        key: ['app_integracoes_key'], 
                        from: ['dbms', 'app', 'app_integracoes'], 
                        template: '{app_integracoes_key} - {app_integracoe}', 
                        provider: '' 
                    } 
                }, 
                enviando: {
                    tipo: types.comp.int, label: 'Enviando:'
                }, 
                modulo: {
                    tipo: types.comp.text, label: 'Modulo:'
                }, 
                tabela: {
                    tipo: types.comp.text, label: 'Tabela:'
                }, 
                key_field: {
                    tipo: types.comp.text, label: 'Key Field:'
                }, 
                key_value: {
                    tipo: types.comp.text, label: 'Key Value:'
                }, 
                dt_transacao: {
                    tipo: types.comp.datetime, label: 'Dt Transação:'
                }, 
                ref_externa: {
                    tipo: types.comp.text, label: 'Ref Externa:'
                }, 
                observacoes: {
                    tipo: types.comp.text, label: 'Observações:'
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
                {titulo: "Informações de app_integ_itens"},
                {app_integ_itens_key: 25, app_integracoes_key: 25, enviando: 25, modulo: 25}, 
                {tabela: 25, key_field: 25, key_value: 25, dt_transacao: 25}, 
                {ref_externa: 25, observacoes: 75}
            ],
            ctrls: {
                modulo: {
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
                    from: ['dbms', 'apps', 'app_integ_itens'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'app', 'app_integracoes'],
                    join: {source: 0, tipo: types.join.left, on: 'app_integracoes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_integ_itens_key', types.where.check]
            ],
            order: [
                [0, 'modulo', 'asc']
            ],
            search: [
                    {alias: 11, field: 'modulo',  param: types.search.like_full },
                    {alias: 11, field: 'tabela',  param: types.search.like_full },
                    {alias: 11, field: 'key_field',  param: types.search.like_full },
                    {alias: 11, field: 'key_value',  param: types.search.like_full },
                    {alias: 11, field: 'ref_externa',  param: types.search.like_full },
                    {alias: 11, field: 'observacoes',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'apps', 'app_integ_itens'],
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos


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


    //region :: Regras de Negócio

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = AppIntegItens;