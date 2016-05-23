/**
 * BusinessObject :: FinContas
 *  Implementação de objeto de negócio: fin_contas.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 16 2016 10:43:34 GMT-0300 (BRT)
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
                    default: 1,
                    tipo: types.comp.dropdown, label: 'Tipo de Conta:',
                    data: {
                        key: ['fin_contas_tipos_key'],
                        from: ['softlabs', 'financeiro', 'fin_contas_tipos'],
                        label: 'tipo_conta',
                        provider: ''
                    }
                },
                fin_bancos_key: {
                    default: 1,
                    tipo: types.comp.choose, label: 'Banco:',
                    data: {
                        key: ['fin_bancos_key'],
                        from: ['softlabs', 'financeiro', 'fin_bancos'],
                        template: '{fin_bancos_key} - {banco}',
                        provider: ''
                    }
                },
                cont_plano_contas_key: {
                    default: 1,
                    tipo: types.comp.choose, label: 'Conta Gerencial:',
                    data: {
                        key: ['cont_plano_contas_key'],
                        from: ['softlabs', 'contabil', 'cont_plano_contas'],
                        template: '{cont_plano_conta}',
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
                size  : types.form.size.small
            },
            linhas: [
                {titulo: ""},
                {fin_bancos_key: 30, conta: 20, agencia: 20, fin_contas_tipos_key: 30},
                {gerente: 60, telefone: 40},
                {observacoes: 100},

                //{fin_contas_key: 25, cont_plano_contas_key: 25},
                //{ativo: 25, dia_corte: 25, dia_vencimento: 25, multa_cartao: 25, juros_cartao: 25, },

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
                        '*'
                    ]
                },
                1: {
                    from: ['softlabs', 'financeiro', 'fin_contas_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_contas_tipos_key', where: ''},
                    fields: [
                        '*'
                    ]
                },
                2: {
                    from: ['softlabs', 'financeiro', 'fin_bancos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_bancos_key', where: ''},
                    fields: [
                        '*'
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
                {alias: 0, field: 'conta',  param: types.search.like_full }
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
     this.onAfterGet = function *(ret){

    };

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
     this.onAfterList = function *(ret){

    };

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
     this.onAfterSearch = function *(ret){

    };

     /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     *
     this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };

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
     this.onAfterEdit = function *(ret){

    };

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
     this.onAfterCreate = function *(ret){

    };

     /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
     this.onSelect = function *(prov, ctx){

    };

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
     this.onAfterInsert = function *(ret){

    };

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
     this.onAfterUpdate = function *(ret){

    };

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
     this.onAfterDelete = function *(ret){

    };


     /* */

    //endregion


    //region :: Regras de Negócio

    //endregion

}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = FinContas;