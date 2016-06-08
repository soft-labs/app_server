/**
 * BusinessObject :: ParcJuridicos
 *  Implementação de objeto de negócio: parc_juridicos.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:53 GMT-0300 (BRT)
 * @constructor
 */
function ParcJuridicos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'parc_juridicos';

    // Map
    this.source = {
        table: 'parc_juridicos',
        metadata: {
            key: 'parceiros_key',
            label: 'razao_social',
            fields: {
                parceiros_key: {
                    tipo: types.comp.key, label: 'Parceiros:'
                }, 
                razao_social: {
                    tipo: types.comp.text, label: 'Razão Social:'
                }, 
                cnpj: {
                    tipo: types.comp.text, label: 'CNPJ:'
                }, 
                insc_estadual: {
                    tipo: types.comp.text, label: 'Inscrição Estadual:'
                }, 
                insc_municipal: {
                    tipo: types.comp.text, label: 'Inscrição Municipal:'
                }, 
                fone_empresa: {
                    tipo: types.comp.text, label: 'Fone Empresa:'
                }, 
                email_empresa: {
                    tipo: types.comp.text, label: 'Email Empresa:'
                }, 
                site_empresa: {
                    tipo: types.comp.text_big, label: 'Site Empresa:'
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
                {titulo: "Informações de parc_juridicos"},
                {parceiros_key: 25, razao_social: 25, cnpj: 25, insc_estadual: 25}, 
                {insc_municipal: 25, fone_empresa: 25, email_empresa: 25, site_empresa: 25}, 
                {observacoes: 100}
            ],
            ctrls: {
                razao_social: {
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
                    from: ['dbms', 'parceiros', 'parc_juridicos'],
                    fields: [
                        
                    ]
                }, 
            },
            where: [ 
                ['AND', 0, 'parceiros_key', types.where.check]
            ],
            order: [
                [0, 'razao_social', 'asc']
            ],
            search: [
                    {alias: 5, field: 'razao_social',  param: types.search.like_full },
                    {alias: 5, field: 'cnpj',  param: types.search.like_full },
                    {alias: 5, field: 'insc_estadual',  param: types.search.like_full },
                    {alias: 5, field: 'insc_municipal',  param: types.search.like_full },
                    {alias: 5, field: 'fone_empresa',  param: types.search.like_full },
                    {alias: 5, field: 'email_empresa',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'parceiros', 'parc_juridicos'],
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
module.exports = ParcJuridicos;