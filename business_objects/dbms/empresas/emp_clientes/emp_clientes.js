/**
 * BusinessObject :: EmpClientes
 *  Implementação de objeto de negócio: emp_clientes.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:57:48 GMT-0300 (BRT)
 * @constructor
 */
function EmpClientes(){

    //region :: Definições do Objeto

    // Id
    this.id = 'emp_clientes';

    // Map
    this.source = {
        table: 'emp_clientes',
        metadata: {
            key: 'emp_clientes_key',
            label: '',
            fields: {

                // region :: Tabela Emp_Clientes

                emp_clientes_key: {
                    tipo: types.comp.key, label: 'Cliente:'
                },
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiros:',
                    data: {
                        key: ['parceiros_key'],
                        from: ['dbms', 'parceiros', 'parceiros'],
                        template: '{parceiros_key} - {parceiro}',
                        provider: ''
                    }
                },
                ativo: {
                    tipo: types.comp.check, label: 'Ativo'
                },
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                },

                //endregion
/*
                // region :: Tabela de Parceiros

                parceiro: {
                    tipo: types.comp.text, label: 'Parceiro:'
                },
                end_paises_key: {
                    tipo: types.comp.choose, label: 'País:',
                    data: {
                        key: ['end_paises_key'],
                        from: ['dbms', 'enderecos', 'end_paises'],
                        template: '{end_paises_key} - {pais}',
                        provider: ''
                    }
                },
                parc_contas_key: {
                    tipo: types.comp.choose, label: 'Contas:',
                    data: {
                        key: ['parc_contas_key'],
                        from: ['dbms', 'parceiros', 'parc_contas'],
                        template: '{parc_contas_key} - {parc_conta}',
                        provider: ''
                    }
                },
                cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Plano de Contas:',
                    data: {
                        key: ['cont_plano_contas_key'],
                        from: ['dbms', 'contabil', 'cont_plano_contas'],
                        template: '{cont_plano_contas_key} - {cont_plano_conta}',
                        provider: ''
                    }
                },
                cont_centro_resultados_key: {
                    tipo: types.comp.choose, label: 'Centro de Resultados:',
                    data: {
                        key: ['cont_centro_resultados_key'],
                        from: ['dbms', 'contabil', 'cont_centro_resultados'],
                        template: '{cont_centro_resultados_key} - {cont_centro_resultado}',
                        provider: ''
                    }
                },
                juridico: {
                    tipo: types.comp.int, label: 'Tipo de Pessoa:'
                },
                codigo: {
                    tipo: types.comp.text, label: 'Código:'
                },
                limite_credito: {
                    tipo: types.comp.float, label: 'Limite Credito:'
                },
                limite_compromisso: {
                    tipo: types.comp.float, label: 'Limite Compromisso:'
                },
                limite_desconto: {
                    tipo: types.comp.float, label: 'Limite Desconto:'
                },

                //endregion

                // region :: Tabela de Parc Físicos
                rg: {
                    tipo: types.comp.text, label: 'RG:'
                },
                cpf: {
                    tipo: types.comp.text, label: 'CPF:'
                },
                sexo: {
                    tipo: types.comp.text, label: 'Sexo:'
                },
                est_civil: {
                    tipo: types.comp.text, label: 'Estado Civil:'
                },
                profissao: {
                    tipo: types.comp.text, label: 'Profissão:'
                },
                naturalidade: {
                    tipo: types.comp.text, label: 'Naturalidade:'
                },

                //endregion

                // region :: Tabela de Parc Juridicos

                razao_social: {
                    tipo: types.comp.text, label: 'Razão Social:'
                },
                cnpj: {
                    tipo: types.comp.text, label: 'CNPJ:'
                },
                insc_estadual: {
                    tipo: types.comp.text, label: 'Inscrição Estadual:'
                },
                insc_municipal: {
                    tipo: types.comp.text, label: 'Inscrição Municipal:'
                },
                fone_empresa: {
                    tipo: types.comp.text, label: 'Fone Empresa:'
                },
                email_empresa: {
                    tipo: types.comp.text, label: 'Email Empresa:'
                },
                site_empresa: {
                    tipo: types.comp.text_big, label: 'Site Empresa:'
                },

                //endregion*/
            }
        }
    };

    //endregion


    //region :: Forms

    this.forms = {

        // Form de update
        update:{
            _config: {
                bounds: { width: 950, height: 500 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small,
                autosave  : false,
                external: [
                    ['dbms', 'parceiros', 'parceiros'],
                    ['dbms', 'parceiros', 'parc_fisicos'],
                    ['dbms', 'parceiros', 'parc_juridicos']
                ]
            },
            linhas: [
                {titulo:"Dados Principais"},
                {parceiro: 60},



                {tabs:100},
            ],
            tabs: {
                tabs: [
                    {
                        label: 'Dados Principais',
                        linhas: [
                            {codigo:20, parceiro: 60, juridico: 20},
                            {cnpj: 20,cpf: 20,insc_municipal: 25,rg: 25,insc_estadual: 25, sexo: 10, naturalidade: 30, est_civil: 20,razao_social: 40 },
                        ]
                    },
                    {
                        label: 'Finanças',
                        linhas: [
                            {parc_contas_key: 35, /*cont_plano_contas_key: 35, cont_centro_resultados_key: 35*/ },
                            {limite_credito: 35, limite_compromisso:35,limite_desconto: 35}
                        ]
                    },
                    {
                        label: 'Endereços',
                        linhas: [
                            {end_paises_key: 100}
                        ]
                    },
                    {
                        label: 'Endereços Eletrônicos',
                        linhas: [
                        ]
                    }
                ]
            },
            ctrls: {

                // region :: Condições p/ Campos de Pessoa física
                cpf: {
                    hidden: {
                        field: 'juridico', cond: 'isTrue'
                    }
                },
                rg: {
                    hidden: {
                        field: 'juridico', cond: 'isTrue'
                    }
                },
                sexo: {
                    hidden: {
                        field: 'juridico', cond: 'isTrue'
                    }
                },
                naturalidade: {
                    hidden: {
                        field: 'juridico', cond: 'isTrue'
                    }
                },
                est_civil: {
                    hidden: {
                        field: 'juridico', cond: 'isTrue'
                    }
                },
                //endregion

                // region :: Condições p/ Campos de Pessoa Jurídica
                cnpj: {
                    hidden: {
                        field: 'juridico', cond: 'isFalse'
                    }
                },
                insc_municipal: {
                    hidden: {
                        field: 'juridico', cond: 'isFalse'
                    }
                },
                insc_estadual: {
                    hidden: {
                        field: 'juridico', cond: 'isFalse'
                    }
                },
                razao_social: {
                    hidden: {
                        field: 'juridico', cond: 'isFalse'
                    }
                }

                //endregion

            },
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['dbms', 'empresas', 'emp_clientes'],
                    fields: [

                    ]
                },
                1: {
                    from: ['dbms', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [

                    ]
                },
                2: {
                    from: ['dbms', 'parceiros', 'parc_juridicos'],
                    join: {source: 1, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [

                    ]
                },
                3: {
                    from: ['dbms', 'parceiros', 'parc_fisicos'],
                    join: {source: 1, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [

                    ]
                }
            },
            where: [
                ['AND', 1, 'emp_clientes_key', types.where.check]
            ],
            order: [
                ['0', 'emp_clientes_key', 'desc']
            ],
            search: [
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'parceiros', 'parceiros'],
                    where: [

                    ]
                },
                1: {
                    from: ['dbms', 'empresas', 'emp_clientes'],
                    where: [

                    ]
                },
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
module.exports = EmpClientes;