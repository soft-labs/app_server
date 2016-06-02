/**
 * BusinessObject :: FinLancamentos à Pagar
 *  Implementação de objeto de negócio: fin_lancamentos.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:09 GMT-0300 (BRT)
 * @constructor
 */
function FinAReceber(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_areceber';

    // Extends
    this.extends = ['dbms', 'financeiro', 'fin_lancamentos'];

    // Map
    this.source = {
        table: 'fin_lancamentos',
        metadata: {
            key: 'fin_lancamentos_key',
            label: 'competencia',
            fields: {
                fin_lanc_tipos_key: {
                    tipo: types.comp.int, default: 1, label: 'Tipo:'
                },
                cont_historicos_key: {
                    data: {
                        provider: 'receitas'
                    }
                },
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Cliente:',
                    data: {
                        key: ['parceiros_key'],
                        from: ['dbms', 'empresas', 'emp_clientes'],
                        template: '{parceiro}',
                        provider: ''
                    }
                },
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
                {titulo: "Informe os dados do lançamento:"},
                {cont_historicos_key: 60, valor_bruto: 20, dt_vencimento: 20},
                {numero: 20, fin_contas_key: 60, dt_documento: 20},
                {parceiros_key: 60, complemento: 40},
            ],
            ctrls: {
                valor_bruto     : { label: "Valor à pagar: "},
                numero          : { label: "Número do Documento: "},
                fin_lanc_tipos_key : {
                    default: 1
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
                    from: ['dbms', 'financeiro', 'fin_areceber'],
                    fields: [

                    ]
                },
                1: {
                    from: ['dbms', 'financeiro', 'fin_lanc_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lanc_tipos_key', where: ''},
                    fields: [

                    ]
                },
                2: {
                    from: ['dbms', 'financeiro', 'fin_lanc_status'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lanc_status_key', where: ''},
                    fields: [

                    ]
                },
                3: {
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_historicos_key', where: ''},
                    fields: [

                    ]
                },
                4: {
                    from: ['dbms', 'empresas', 'empresas'],
                    join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [

                    ]
                },
                5: {
                    from: ['dbms', 'financeiro', 'fin_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [

                    ]
                },
                6: {
                    from: ['dbms', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [

                    ]
                },
                7: {
                    from: ['dbms', 'contratos', 'contratos'],
                    join: {source: 0, tipo: types.join.left, on: 'contratos_key', where: ''},
                    fields: [

                    ]
                },
                8: {
                    from: ['dbms', 'movimentacoes', 'movimentacoes'],
                    join: {source: 0, tipo: types.join.left, on: 'movimentacoes_key', where: ''},
                    fields: [

                    ]
                },
                9: {
                    from: ['dbms', 'financeiro', 'fin_bancos'],
                    join: {source: 5, tipo: types.join.left, on: 'fin_bancos_key', where: ''},
                    fields: [

                    ]
                },
            },
            where: [
                ['AND', 0, 'fin_lanc_tipos_key', "=", "2"],
                ['AND', 0, 'fin_lancamentos_key', types.where.check]
            ],
            order: [
                [0, 'competencia', 'asc']
            ],
            search: [
                {alias: 1, field: 'competencia',        param: types.search.like_full },
                {alias: 1, field: 'dt_documento',       param: types.search.maior_igual },
                {alias: 1, field: 'dt_vencimento',      param: types.search.maior_igual },
                {alias: 1, field: 'numero',             param: types.search.like_full },
                {alias: 3, field: 'historico',          param: types.search.like_full },
                {alias: 1, field: 'complemento',        param: types.search.like_full },
                {alias: 1, field: 'baixa_data',         param: types.search.maior_igual },
                {alias: 1, field: 'baixa_bancaria',     param: types.search.maior_igual },
                {alias: 1, field: 'cancelamento_data',  param: types.search.maior_igual },
                {alias: 1, field: 'estorno_data',       param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'financeiro', 'fin_lancamentos'],
                    where: [

                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos

    /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     */
    this.onSelect = function *(prov, ctx){
        yield this.parent.onSelect(prov, ctx);
    };

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
module.exports = FinAReceber;