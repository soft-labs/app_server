/**
 * BusinessObject :: ContDiarioContas
 *  Implementação de objeto de negócio: cont_diario_contas.
 *
 * Engine de aplicações - TShark.
 * @since Mon Jun 13 2016 08:55:41 GMT-0300 (BRT)
 * @constructor
 */
function ContDiarioContas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_diario_contas';

    // Map
    this.source = {
        table: 'cont_diario_contas',
        metadata: {
            key: 'cont_diario_contas_key',
            label: 'historico',
            fields: {
                cont_diario_contas_key: {
                    tipo: types.comp.key, label: 'Cont Diario Contas:'
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
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['dbms', 'contabil', 'cont_plano_contas'], 
                        template: '{cont_plano_contas_key} - {cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                movimentacoes_key: {
                    tipo: types.comp.choose, label: 'Movimentações:',
                    data: { 
                        key: ['movimentacoes_key'], 
                        from: ['dbms', 'movimentacoes', 'movimentacoes'], 
                        template: '{movimentacoes_key} - {movimentacoe}', 
                        provider: '' 
                    } 
                }, 
                fin_lancamentos_key: {
                    tipo: types.comp.choose, label: 'Fin Lancamentos:',
                    data: { 
                        key: ['fin_lancamentos_key'], 
                        from: ['dbms', 'financeiro', 'fin_lancamentos'], 
                        template: '{fin_lancamentos_key} - {fin_lancamento}', 
                        provider: '' 
                    } 
                }, 
                fin_baixas_key: {
                    tipo: types.comp.choose, label: 'Fin Baixas:',
                    data: { 
                        key: ['fin_baixas_key'], 
                        from: ['dbms', 'financeiro', 'fin_baixas'], 
                        template: '{fin_baixas_key} - {fin_baixa}', 
                        provider: '' 
                    } 
                }, 
                dt_diario: {
                    tipo: types.comp.datetime, label: 'Dt Diario:'
                }, 
                historico: {
                    tipo: types.comp.text, label: 'Historico:'
                }, 
                credito: {
                    tipo: types.comp.float, label: 'Credito:'
                }, 
                debito: {
                    tipo: types.comp.float, label: 'Debito:'
                }, 
                ref1: {
                    tipo: types.comp.text, label: 'Ref1:'
                }, 
                ref2: {
                    tipo: types.comp.text, label: 'Ref2:'
                }, 
                ref3: {
                    tipo: types.comp.text, label: 'Ref3:'
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
                {titulo: "Informações de cont_diario_contas"},
                {cont_diario_contas_key: 25, empresas_key: 25, cont_plano_contas_key: 25, movimentacoes_key: 25}, 
                {fin_lancamentos_key: 25, fin_baixas_key: 25, dt_diario: 25, historico: 25}, 
                {credito: 25, debito: 25, ref1: 25, ref2: 25}, 
                {ref3: 25, observacoes: 75}
            ],
            ctrls: {
                historico: {
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
                    from: ['dbms', 'contabil', 'cont_diario_contas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', 'contabil', 'cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', 'movimentacoes', 'movimentacoes'],
                    join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', 'financeiro', 'fin_lancamentos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lancamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['dbms', 'financeiro', 'fin_baixas'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_baixas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_diario_contas_key', types.where.check]
            ],
            order: [
                [0, 'historico', 'asc']
            ],
            search: [
                    {alias: 0, field: 'historico',  param: types.search.like_full },
                    {alias: 0, field: 'ref1',  param: types.search.like_full },
                    {alias: 0, field: 'ref2',  param: types.search.like_full },
                    {alias: 0, field: 'ref3',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_diario_contas'],
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
module.exports = ContDiarioContas;