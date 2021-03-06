/**
 * BusinessObject :: ContHistoricos
 *  Implementação de objeto de negócio: cont_historicos.
 *
 * Engine de aplicações - TShark.
 * @since Tue May 31 2016 14:32:48 GMT-0300 (BRT)
 * @constructor
 */
function ContHistoricos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_historicos';

    // Map
    this.source = {
        table: 'cont_historicos',
        metadata: {
            key: 'cont_historicos_key',
            label: 'historico',
            fields: {
                cont_historicos_key: {
                    tipo: types.comp.key, label: 'Cont Historicos:'
                }, 
                cont_determinacao_key: {
                    tipo: types.comp.choose, label: 'Determinação:',
                    data: { 
                        key: ['cont_determinacao_key'], 
                        from: ['dbms', 'contabil', 'cont_determinacao'], 
                        template: '{cont_determinacao_key} - {descricao}',
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.check, label: 'Ativo:', default:1
                },
                tipo: {
                    tipo: types.comp.dropdown,
                    data: {
                        label: 'value',
                        rows: [
                            {tipo:1 ,value : 'Tipo Um'},
                            {tipo:2 ,value : 'Tipo Dois'},
                        ]
                    },
                    label: 'Tipo:'
                },
                historico: {
                    tipo: types.comp.text, label: 'Categoria:'
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
                {titulo: "Informações da Categoria de Lançamento"},
                {ativo: 9, historico: 50, cont_determinacao_key: 30,tipo: 15,},
                {tabs:100},
            ],
            tabs: {
                tabs: 
                    [
                        {
                            label: 'Centro de Resultados',
                            linhas: [
                                {titulo: "Centros de Resultados da Categoria"},
                                {template: 100}
                            ]
                        },
                        {
                            label: 'Observações',
                            linhas: [
                                {observacoes: 100}
                            ]
                        },
                    ]
            },
            ctrls: {
                template: {
                    id: 'dbms contabil cont_historicos_resultados_rel-list-area',
                    tipo: types.comp.template
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
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', 'contabil', 'cont_determinacao'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_determinacao_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_historicos_key', types.where.check]
            ],
            order: [
                [0, 'historico', 'asc']
            ],
            search: [
                    {alias: 0, field: 'historico',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        despesas: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    fields: [

                    ]
                },
                1: {
                    from: ['dbms', 'contabil', 'cont_determinacao'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_determinacao_key', where: ''},
                    fields: [

                    ]
                }
            },
            where: [
                ['AND', 0, 'cont_historicos_key', types.where.check],
                ['AND', 0, 'tipo', '=', '2'],
            ],
            order: [
                [0, 'historico', 'asc']
            ],
            search: [
                {alias: 0, field: 'historico',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        receitas: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_historicos'],
                    fields: [

                    ]
                },
                1: {
                    from: ['dbms', 'contabil', 'cont_determinacao'],
                    join: {source: 0, tipo: types.join.left, on: 'cont_determinacao_key', where: ''},
                    fields: [

                    ]
                }
            },
            where: [
                ['AND', 0, 'cont_historicos_key', types.where.check],
                ['AND', 0, 'tipo', '=', '1'],
            ],
            order: [
                [0, 'historico', 'asc']
            ],
            search: [
                {alias: 0, field: 'historico',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'contabil', 'cont_historicos'],
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
     * @param ret Objeto de r   etorno
     */
    this.onAfterUpdate = function *(ret, ctx){

        var cont_historicos_key = this.params.key;

        //buscando todos subrows no client dataset
        var subrow = this.params.subrow;

        //instanciando o objeto do módulo m:n
        var obj_hist_rel = this.engine.initObj(['dbms','contabil','cont_historicos_resultados_rel'],ctx);

        //percorrendo cada subrow
        for( var row in subrow )
        {
            //se não tiver o código do histórico, é insert
            if( subrow[row]['cont_historicos_key'] == "" )
            {
                subrow[row]['cont_historicos_key'] = cont_historicos_key;
                obj_hist_rel.params.row = subrow[row];
                yield obj_hist_rel.insert(ctx);
            }
            //senão update
            else
            {
                obj_hist_rel.params.row = subrow[row];
                yield obj_hist_rel.update(ctx);
            }
        }
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
module.exports = ContHistoricos;