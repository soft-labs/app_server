/**
 * BusinessObject :: MovItensImpostosRel
 *  Implementação de objeto de negócio: mov_itens_impostos_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:54:12 GMT-0300 (BRT)
 * @constructor
 */
function MovItensImpostosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'mov_itens_impostos_rel';

    // Map
    this.source = {
        table: 'mov_itens_impostos_rel',
        metadata: {
            key: ['mov_itens_key', 'impostos_key'],
            label: '',
            fields: {
                mov_itens_key: {
                    tipo: types.comp.key, label: 'Mov Itens:',
                    data: { 
                        key: ['mov_itens_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_itens'], 
                        template: '{mov_itens_key} - {mov_iten}', 
                        provider: '' 
                    } 
                }, 
                impostos_key: {
                    tipo: types.comp.key, label: 'Impostos:',
                    data: { 
                        key: ['impostos_key'], 
                        from: ['dbms', 'movimentacoes', 'impostos'], 
                        template: '{impostos_key} - {imposto}', 
                        provider: '' 
                    } 
                }, 
                aliquota: {
                    tipo: types.comp.float, label: 'Aliquota:'
                }, 
                base_tributada: {
                    tipo: types.comp.float, label: 'Base Tributada:'
                }, 
                base_isenta: {
                    tipo: types.comp.float, label: 'Base Isenta:'
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
                {titulo: "Informações de mov_itens_impostos_rel"},
                {mov_itens_key: 25, impostos_key: 25, aliquota: 25, base_tributada: 25}, 
                {base_isenta: 25, observacoes: 75}
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
                    from: ['dbms', 'movimentacoes', 'mov_itens_impostos_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'movimentacoes', 'mov_itens'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_itens_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'movimentacoes', 'impostos'],
                    join: {source: 0, tipo: types.join.left, on: 'impostos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'mov_itens_key', types.where.check],
                ['AND', 0, 'impostos_key', types.where.check]
            ],
            order: [
                ['0', 'mov_itens_key', 'desc'],
                ['0', 'impostos_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'movimentacoes', 'mov_itens_impostos_rel'],
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
module.exports = MovItensImpostosRel;