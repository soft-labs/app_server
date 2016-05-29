/**
 * BusinessObject :: FinContas
 *  Implementação de objeto de negócio: fin_contas.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:09:45 GMT-0300 (BRT)
 * @constructor
 */
function FinContas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_contas';

    // Map
    this.source = {
        table: 'fin_contas',
        metadata: {
            key: 'fin_contas_key',
            label: 'conta',
            fields: {
                fin_contas_key: {
                    tipo: types.comp.key, label: 'Fin Contas:'
                }, 
                fin_contas_tipos_key: {
                    tipo: types.comp.choose, label: 'Fin Contas Tipos:',
                    data: { 
                        key: ['fin_contas_tipos_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas_tipos'], 
                        template: '{fin_contas_tipos_key} - {fin_contas_tipo}', 
                        provider: '' 
                    } 
                }, 
                fin_bancos_key: {
                    tipo: types.comp.choose, label: 'Fin Bancos:',
                    data: { 
                        key: ['fin_bancos_key'], 
                        from: ['softlabs', 'financeiro', 'fin_bancos'], 
                        template: '{fin_bancos_key} - {fin_banco}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{cont_plano_contas_key} - {cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                dia_corte: {
                    tipo: types.comp.int, label: 'Dia Corte:'
                }, 
                dia_vencimento: {
                    tipo: types.comp.int, label: 'Dia Vencimento:'
                }, 
                multa_cartao: {
                    tipo: types.comp.float, label: 'Multa Cartão:'
                }, 
                juros_cartao: {
                    tipo: types.comp.float, label: 'Juros Cartão:'
                }, 
                descricao: {
                    tipo: types.comp.text, label: 'Descrição:'
                }, 
                conta: {
                    tipo: types.comp.text, label: 'Conta:'
                }, 
                agencia: {
                    tipo: types.comp.text, label: 'Agencia:'
                }, 
                gerente: {
                    tipo: types.comp.text, label: 'Gerente:'
                }, 
                telefone: {
                    tipo: types.comp.text, label: 'Telefone:'
                }, 
                observacoes: {
                    tipo: types.comp.undefined, label: 'Observações:'
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
                {titulo: "Informações de fin_contas"},
                {fin_contas_key: 25, fin_contas_tipos_key: 25, fin_bancos_key: 25, cont_plano_contas_key: 25}, 
                {ativo: 25, dia_corte: 25, dia_vencimento: 25, multa_cartao: 25}, 
                {juros_cartao: 25, descricao: 25, conta: 25, agencia: 25}, 
                {gerente: 25, telefone: 25, observacoes: 50}
            ],
            ctrls: {
                conta: {
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
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'financeiro', 'fin_contas_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_contas_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'financeiro', 'fin_bancos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_bancos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_contas_key', types.where.check]
            ],
            order: [
                [0, 'conta', 'asc']
            ],
            search: [
                    {alias: 5, field: 'descricao',  param: types.search.like_full },
                    {alias: 5, field: 'conta',  param: types.search.like_full },
                    {alias: 5, field: 'agencia',  param: types.search.like_full },
                    {alias: 5, field: 'gerente',  param: types.search.like_full },
                    {alias: 5, field: 'telefone',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                    key: 'fin_contas_key',
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
module.exports = FinContas;