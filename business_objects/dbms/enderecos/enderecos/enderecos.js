/**
 * BusinessObject :: Enderecos
 *  Implementação de objeto de negócio: enderecos.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:57 GMT-0300 (BRT)
 * @constructor
 */
function Enderecos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'enderecos';

    // Map
    this.source = {
        table: 'enderecos',
        metadata: {
            key: 'enderecos_key',
            label: 'endereco',
            fields: {
                enderecos_key: {
                    tipo: types.comp.key, label: 'Código:'
                }, 
                /*end_bairros_key: {
                    tipo: types.comp.choose, label: 'Bairro:',
                    data: { 
                        key: ['end_bairros_key'], 
                        from: ['dbms', 'enderecos', 'end_bairros'], 
                        template: '{end_bairros_key} - {bairrobairro}',
                        provider: '' 
                    } 
                },*/
                end_bairros_key: {
                    tipo: types.comp.int, label: 'Bairro:',
                },
                end_cidades_key: {
                    tipo: types.comp.choose, label: 'Cidade:',
                    data: { 
                        key: ['end_cidades_key'], 
                        from: ['dbms', 'enderecos', 'end_cidades'], 
                        template: '{end_cidades_key} - {cidade}',
                        provider: '' 
                    } 
                }, 
                end_estados_key: {
                    tipo: types.comp.choose, label: 'Estado:',
                    data: { 
                        key: ['end_estados_key'], 
                        from: ['dbms', 'enderecos', 'end_estados'], 
                        template: '{end_estados_key} - {estado}',
                        provider: '' 
                    } 
                }, 
                end_paises_key: {
                    tipo: types.comp.choose, label: 'País:',
                    data: { 
                        key: ['end_paises_key'], 
                        from: ['dbms', 'enderecos', 'end_paises'], 
                        template: '{end_paises_key} - {end_paise}', 
                        provider: '' 
                    } 
                }, 
                cep: {
                    tipo: types.comp.text, label: 'CEP:'
                }, 
                endereco: {
                    tipo: types.comp.text, label: 'Logradouro:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Número:'
                }, 
                complemento: {
                    tipo: types.comp.text, label: 'Complemento:'
                }, 
                bairro: {
                    tipo: types.comp.text, label: 'Bairro:'
                }, 
                localidade: {
                    tipo: types.comp.text, label: 'Localidade:'
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
                bounds: { width: 800, height: 500 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small,
                external: [

                ]
            },
            linhas: [
                {titulo: "Dados do Endereço"},
                {enderecos_key: 10, cep: 10, end_estados_key: 40, end_cidades_key: 40},
                {end_bairros_key: 40, end_paises_key: 10, endereco: 50},
                {numero: 10,complemento: 20, bairro: 50,localidade: 20,},
                {observacoes: 100}
            ],
            ctrls: {
                endereco: {
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
                    from: ['dbms', 'enderecos', 'enderecos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'enderecos', 'end_bairros'],
                    join: {source: 0, tipo: types.join.left, on: 'end_bairros_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'enderecos', 'end_cidades'],
                    join: {source: 0, tipo: types.join.left, on: 'end_cidades_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'enderecos', 'end_estados'],
                    join: {source: 0, tipo: types.join.left, on: 'end_estados_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', 'enderecos', 'end_paises'],
                    join: {source: 0, tipo: types.join.left, on: 'end_paises_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'enderecos_key', types.where.check]
            ],
            order: [
                [0, 'endereco', 'asc']
            ],
            search: [
                    {alias: 0, field: 'cep',  param: types.search.like_full },
                    {alias: 0, field: 'endereco',  param: types.search.like_full },
                    {alias: 0, field: 'numero',  param: types.search.like_full },
                    {alias: 0, field: 'complemento',  param: types.search.like_full },
                    {alias: 0, field: 'bairro',  param: types.search.like_full },
                    {alias: 0, field: 'localidade',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'enderecos', 'enderecos'],
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
module.exports = Enderecos;