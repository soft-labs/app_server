/**
 * BusinessObject :: ContImpostos
 *  Implementação de objeto de negócio: cont_impostos.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:55:41 GMT-0300 (BRT)
 * @constructor
 */
function ContImpostos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_impostos';

    // Map
    this.source = {
        table: 'cont_impostos',
        metadata: {
            key: 'cont_impostos_key',
            label: 'imposto',
            fields: {
                cont_impostos_key: {
                    tipo: types.comp.key, label: 'Cont Impostos:'
                }, 
                cont_ent_arrecadadoras_key: {
                    tipo: types.comp.choose, label: 'Cont Ent Arrecadadoras:',
                    data: { 
                        key: ['cont_ent_arrecadadoras_key'], 
                        from: ['dbms', 'contabil', 'cont_ent_arrecadadoras'], 
                        template: '{cont_ent_arrecadadoras_key} - {cont_ent_arrecadadora}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['dbms', 'contabil', 'cont_plano_contas'], 
                        template: '{cont_plano_contas_key} - {cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                dia_vencimento: {
                    tipo: types.comp.int, label: 'Dia Vencimento:'
                }, 
                imposto: {
                    tipo: types.comp.text, label: 'Imposto:'
                }, 
                aliquota: {
                    tipo: types.comp.float, label: 'Aliquota:'
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
                {titulo: "Informações de cont_impostos"},
                {cont_impostos_key: 25, cont_ent_arrecadadoras_key: 25, cont_plano_contas_key: 25, dia_vencimento: 25}, 
                {imposto: 25, aliquota: 25, observacoes: 50}
            ],
            ctrls: {
                imposto: {
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
                    from: ['dbms', 'contabil', 'cont_impostos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_ent_arrecadadoras'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_ent_arrecadadoras_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'contabil', 'cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_impostos_key', types.where.check]
            ],
            order: [
                [0, 'imposto', 'asc']
            ],
            search: [
                    {alias: 0, field: 'imposto',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_impostos'],
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
module.exports = ContImpostos;