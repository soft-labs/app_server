/**
 * BusinessObject :: ParcEnderecosRel
 *  Implementação de objeto de negócio: parc_enderecos_rel.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:53 GMT-0300 (BRT)
 * @constructor
 */
function ParcEnderecosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'parc_enderecos_rel';

    // Map
    this.source = {
        table: 'parc_enderecos_rel',
        metadata: {
            key: ['parceiros_key', 'enderecos_key'],
            label: '',
            fields: {
                parceiros_key: {
                    tipo: types.comp.key, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['dbms', 'parceiros', 'parceiros'], 
                        template: '{parceiros_key} - {parceiro}', 
                        provider: '' 
                    } 
                }, 
                enderecos_key: {
                    tipo: types.comp.key, label: 'Enderecos:',
                    data: { 
                        key: ['enderecos_key'], 
                        from: ['dbms', 'enderecos', 'enderecos'], 
                        template: '{enderecos_key} - {endereco}', 
                        provider: '' 
                    } 
                }, 
                end_tipos_key: {
                    tipo: types.comp.choose, label: 'End Tipos:',
                    data: { 
                        key: ['end_tipos_key'], 
                        from: ['dbms', 'enderecos', 'end_tipos'], 
                        template: '{end_tipos_key} - {end_tipo}', 
                        provider: '' 
                    } 
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
                {titulo: "Informações de parc_enderecos_rel"},
                {parceiros_key: 25, enderecos_key: 25, end_tipos_key: 50}
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
                    from: ['dbms', 'parceiros', 'parc_enderecos_rel'],
                    fields: [
                        
                    ]
                },
                1: {
                    from: ['dbms', 'enderecos', 'enderecos'],
                    join: {source: 0, tipo: types.join.left, on: 'enderecos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: {
                    from: ['dbms', 'enderecos', 'end_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'end_tipos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [
                ['AND', 0, 'parceiros_key', types.where.get],
                ['AND', 0, 'enderecos_key', types.where.check]
            ],
            order: [
                ['0', 'enderecos_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'parceiros', 'parc_enderecos_rel'],
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
module.exports = ParcEnderecosRel;