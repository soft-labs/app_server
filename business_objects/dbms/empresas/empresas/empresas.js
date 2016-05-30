/**
 * BusinessObject :: Empresas
 *  Implementação de objeto de negócio: empresas.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:48 GMT-0300 (BRT)
 * @constructor
 */
function Empresas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'empresas';

    // Map
    this.source = {
        table: 'empresas',
        metadata: {
            key: 'empresas_key',
            label: 'empresa',
            fields: {
                empresas_key: {
                    tipo: types.comp.key, label: 'Empresas:'
                }, 
                cont_centro_resultados_key: {
                    tipo: types.comp.choose, label: 'Cont Centro Resultados:',
                    data: { 
                        key: ['cont_centro_resultados_key'], 
                        from: ['dbms', 'contabil', 'cont_centro_resultados'], 
                        template: '{cont_centro_resultados_key} - {cont_centro_resultado}', 
                        provider: '' 
                    } 
                }, 
                matriz: {
                    tipo: types.comp.int, label: 'Matriz:'
                }, 
                empresa: {
                    tipo: types.comp.text, label: 'Empresa:'
                }, 
                razao_social: {
                    tipo: types.comp.text, label: 'Razão Social:'
                }, 
                cnpj: {
                    tipo: types.comp.text, label: 'Cnpj:'
                }, 
                insc_estadual: {
                    tipo: types.comp.text, label: 'Insc Estadual:'
                }, 
                insc_municipal: {
                    tipo: types.comp.text, label: 'Insc Municipal:'
                }, 
                natureza_pj: {
                    tipo: types.comp.text, label: 'Natureza Pj:'
                }, 
                fone1: {
                    tipo: types.comp.text, label: 'Fone1:'
                }, 
                fone2: {
                    tipo: types.comp.text, label: 'Fone2:'
                }, 
                email: {
                    tipo: types.comp.text, label: 'Email:'
                }, 
                site: {
                    tipo: types.comp.text_big, label: 'Site:'
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
                {titulo: "Informações de empresas"},
                {empresas_key: 25, cont_centro_resultados_key: 25, matriz: 25, empresa: 25}, 
                {razao_social: 25, cnpj: 25, insc_estadual: 25, insc_municipal: 25}, 
                {natureza_pj: 25, fone1: 25, fone2: 25, email: 25}, 
                {site: 25, observacoes: 75}
            ],
            ctrls: {
                empresa: {
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
                    from: ['dbms', 'empresas', 'empresas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_centro_resultados'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_centro_resultados_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'empresas_key', types.where.check]
            ],
            order: [
                [0, 'empresa', 'asc']
            ],
            search: [
                    {alias: 0, field: 'empresa',  param: types.search.like_full },
                    {alias: 0, field: 'razao_social',  param: types.search.like_full },
                    {alias: 0, field: 'cnpj',  param: types.search.like_full },
                    {alias: 0, field: 'insc_estadual',  param: types.search.like_full },
                    {alias: 0, field: 'insc_municipal',  param: types.search.like_full },
                    {alias: 0, field: 'natureza_pj',  param: types.search.like_full },
                    {alias: 0, field: 'fone1',  param: types.search.like_full },
                    {alias: 0, field: 'fone2',  param: types.search.like_full },
                    {alias: 0, field: 'email',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'empresas', 'empresas'],
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
module.exports = Empresas;