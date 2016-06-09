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
                    ['dbms', 'parceiros', 'parc_juridicos'],
                    ['dbms', 'enderecos', 'enderecos']
                ]
            },
            linhas: [
                {titulo:"Dados Principais"},
                {parceiro: 60, telefone: 20, celular: 20},
                {email: 50, cpf: 30,cnpj: 30, juridico: 20},
                {titulo:"Endereço Principal"},
                {end_tipos_key:20,cep:20,numero:20,complemento:42,},
                {end_estados_key:20,end_cidades_key:42,end_bairros_key:42,},
                {endereco:100},
            ],
            ctrls: {

                // region :: Campos Virtuais

                telefone:{
                    tipo: types.comp.text, label: 'Telefone Fixo:'
                },
                celular:{
                    tipo: types.comp.text, label: 'Celular:'
                },
                email:{
                    tipo: types.comp.text, label: 'E-mail:'
                },
                end_tipos_key:{
                    tipo: types.comp.int, label: 'Tipo de Endereço:'
                },

                //endregion

                // region :: Toggle Tipo de Documento
                cpf:{
                    hidden: {
                        field:'juridico', cond:'isTrue'
                    }
                },
                cnpj:{
                    hidden: {
                        field:'juridico', cond:'isFalse'
                    }
                },

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
                },
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
                /*1: {
                    from: ['dbms', 'parceiros', 'parc_fisicos'],
                    where: [

                    ]
                },*/
                1: {
                    from: ['dbms', 'parceiros', 'parc_juridicos'],
                    where: [

                    ]
                },
                2: {
                    from: ['dbms', 'empresas', 'emp_clientes'],
                    where: [

                    ]
                },
                3: {
                    from: ['dbms', 'enderecos', 'enderecos'],
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