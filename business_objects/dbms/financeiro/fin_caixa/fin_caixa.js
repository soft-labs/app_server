/**
 * BusinessObject :: FinCaixa
 *  Implementação de objeto de negócio: fin_caixa.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:09 GMT-0300 (BRT)
 * @constructor
 */
function FinCaixa(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_caixa';

    // Map
    this.source = {
        table: 'fin_caixa',
        metadata: {
            key: 'fin_caixa_key',
            label: '',
            fields: {
                fin_caixa_key: {
                    tipo: types.comp.key, label: 'Fin Caixa:'
                }, 
                aberto_por_key: {
                    tipo: types.comp.choose, label: 'Aberto Por:',
                    data: { 
                        key: ['aberto_por_key'], 
                        from: ['dbms', '', 'aberto_por'], 
                        template: '{aberto_por_key} - {aberto_po}', 
                        provider: '' 
                    } 
                }, 
                fechado_por_key: {
                    tipo: types.comp.choose, label: 'Fechado Por:',
                    data: { 
                        key: ['fechado_por_key'], 
                        from: ['dbms', '', 'fechado_por'], 
                        template: '{fechado_por_key} - {fechado_po}', 
                        provider: '' 
                    } 
                }, 
                numero_caixa: {
                    tipo: types.comp.int, label: 'Numero Caixa:'
                }, 
                dia_abertura: {
                    tipo: types.comp.date, label: 'Dia Abertura:'
                }, 
                hr_abertura: {
                    tipo: types.comp.time, label: 'Hr Abertura:'
                }, 
                dia_fechamento: {
                    tipo: types.comp.date, label: 'Dia Fechamento:'
                }, 
                hr_fechamento: {
                    tipo: types.comp.time, label: 'Hr Fechamento:'
                }, 
                valor_abertura: {
                    tipo: types.comp.float, label: 'Valor Abertura:'
                }, 
                receitas: {
                    tipo: types.comp.float, label: 'Receitas:'
                }, 
                despesas: {
                    tipo: types.comp.float, label: 'Despesas:'
                }, 
                saldo: {
                    tipo: types.comp.float, label: 'Saldo:'
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
                {titulo: "Informações de fin_caixa"},
                {fin_caixa_key: 25, aberto_por_key: 25, fechado_por_key: 25, numero_caixa: 25}, 
                {dia_abertura: 25, hr_abertura: 25, dia_fechamento: 25, hr_fechamento: 25}, 
                {valor_abertura: 25, receitas: 25, despesas: 25, saldo: 25}, 
                {observacoes: 100}
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
                    from: ['dbms', 'financeiro', 'fin_caixa'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', '', 'aberto_por'],
                    join: {source: 0, tipo: types.join.left, on: 'aberto_por_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', '', 'fechado_por'],
                    join: {source: 0, tipo: types.join.left, on: 'fechado_por_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_caixa_key', types.where.check]
            ],
            order: [
                ['0', 'fin_caixa_key', 'desc']
            ],
            search: [
                    {alias: 2, field: 'dia_abertura',  param: types.search.maior_igual },
                    {alias: 2, field: 'dia_fechamento',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'financeiro', 'fin_caixa'],
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
module.exports = FinCaixa;