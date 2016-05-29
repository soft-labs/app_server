/**
 * BusinessObject :: AppAutRegras
 *  Implementação de objeto de negócio: app_aut_regras.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:08:50 GMT-0300 (BRT)
 * @constructor
 */
function AppAutRegras(){

    //region :: Definições do Objeto

    // Id
    this.id = 'app_aut_regras';

    // Map
    this.source = {
        table: 'app_aut_regras',
        metadata: {
            key: 'app_aut_regras_key',
            label: 'regra',
            fields: {
                app_aut_regras_key: {
                    tipo: types.comp.key, label: 'App Aut Regras:'
                }, 
                app_autorizacoes_key: {
                    tipo: types.comp.choose, label: 'App Autorizações:',
                    data: { 
                        key: ['app_autorizacoes_key'], 
                        from: ['softlabs', 'app', 'app_autorizacoes'], 
                        template: '{app_autorizacoes_key} - {app_autorizacoe}', 
                        provider: '' 
                    } 
                }, 
                regra: {
                    tipo: types.comp.text, label: 'Regra:'
                }, 
                min_autorizacoes: {
                    tipo: types.comp.int, label: 'Min Autorizações:'
                }, 
                evento: {
                    tipo: types.comp.text, label: 'Evento:'
                }, 
                codigo: {
                    tipo: types.comp.text_big, label: 'Codigo:'
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
                {titulo: "Informações de app_aut_regras"},
                {app_aut_regras_key: 25, app_autorizacoes_key: 25, regra: 25, min_autorizacoes: 25}, 
                {evento: 25, codigo: 25, observacoes: 50}
            ],
            ctrls: {
                regra: {
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
                    from: ['softlabs', 'app', 'app_aut_regras'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'app', 'app_autorizacoes'],
                    join: {source: 0, tipo: types.join.left, on: 'app_autorizacoes_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'app_aut_regras_key', types.where.check]
            ],
            order: [
                [0, 'regra', 'asc']
            ],
            search: [
                    {alias: 5, field: 'regra',  param: types.search.like_full },
                    {alias: 5, field: 'evento',  param: types.search.like_full },
                    {alias: 5, field: 'observacoes',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'app', 'app_aut_regras'],
                    key: 'app_aut_regras_key',
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
module.exports = AppAutRegras;