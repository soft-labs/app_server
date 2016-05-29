/**
 * BusinessObject :: FinBaixas
 *  Implementação de objeto de negócio: fin_baixas.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:09:45 GMT-0300 (BRT)
 * @constructor
 */
function FinBaixas(){

    //region :: Definições do Objeto

    // Id
    this.id = 'fin_baixas';

    // Map
    this.source = {
        table: 'fin_baixas',
        metadata: {
            key: 'fin_baixas_key',
            label: 'historico',
            fields: {
                fin_baixas_key: {
                    tipo: types.comp.key, label: 'Fin Baixas:'
                }, 
                fin_lancamentos_key: {
                    tipo: types.comp.choose, label: 'Fin Lancamentos:',
                    data: { 
                        key: ['fin_lancamentos_key'], 
                        from: ['softlabs', 'financeiro', 'fin_lancamentos'], 
                        template: '{fin_lancamentos_key} - {fin_lancamento}', 
                        provider: '' 
                    } 
                }, 
                fin_contas_key: {
                    tipo: types.comp.choose, label: 'Fin Contas:',
                    data: { 
                        key: ['fin_contas_key'], 
                        from: ['softlabs', 'financeiro', 'fin_contas'], 
                        template: '{fin_contas_key} - {fin_conta}', 
                        provider: '' 
                    } 
                }, 
                fin_especies_key: {
                    tipo: types.comp.choose, label: 'Fin Especies:',
                    data: { 
                        key: ['fin_especies_key'], 
                        from: ['softlabs', 'financeiro', 'fin_especies'], 
                        template: '{fin_especies_key} - {fin_especie}', 
                        provider: '' 
                    } 
                }, 
                cancelado: {
                    tipo: types.comp.int, label: 'Cancelado:'
                }, 
                dt_baixa: {
                    tipo: types.comp.datetime, label: 'Dt Baixa:'
                }, 
                historico: {
                    tipo: types.comp.text, label: 'Historico:'
                }, 
                ref_bancaria: {
                    tipo: types.comp.text, label: 'Ref Bancaria:'
                }, 
                valor: {
                    tipo: types.comp.float, label: 'Valor:'
                }, 
                vl_multa: {
                    tipo: types.comp.float, label: 'Vl Multa:'
                }, 
                vl_juros: {
                    tipo: types.comp.float, label: 'Vl Juros:'
                }, 
                chq_numero: {
                    tipo: types.comp.text, label: 'Chq Numero:'
                }, 
                chq_emitente: {
                    tipo: types.comp.text, label: 'Chq Emitente:'
                }, 
                chq_contato: {
                    tipo: types.comp.text, label: 'Chq Contato:'
                }, 
                chq_banco: {
                    tipo: types.comp.text, label: 'Chq Banco:'
                }, 
                chq_agencia: {
                    tipo: types.comp.text, label: 'Chq Agencia:'
                }, 
                chq_conta: {
                    tipo: types.comp.text, label: 'Chq Conta:'
                }, 
                chq_bom_para: {
                    tipo: types.comp.date, label: 'Chq Bom Para:'
                }, 
                cc_numero: {
                    tipo: types.comp.text, label: 'Cc Numero:'
                }, 
                cc_nsu: {
                    tipo: types.comp.text, label: 'Cc Nsu:'
                }, 
                cc_taxa: {
                    tipo: types.comp.float, label: 'Cc Taxa:'
                }, 
                bol_numero: {
                    tipo: types.comp.text, label: 'Bol Numero:'
                }, 
                bol_cod_barras: {
                    tipo: types.comp.text, label: 'Bol Cod Barras:'
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
                {titulo: "Informações de fin_baixas"},
                {fin_baixas_key: 25, fin_lancamentos_key: 25, fin_contas_key: 25, fin_especies_key: 25}, 
                {cancelado: 25, dt_baixa: 25, historico: 25, ref_bancaria: 25}, 
                {valor: 25, vl_multa: 25, vl_juros: 25, chq_numero: 25}, 
                {chq_emitente: 25, chq_contato: 25, chq_banco: 25, chq_agencia: 25}, 
                {chq_conta: 25, chq_bom_para: 25, cc_numero: 25, cc_nsu: 25}, 
                {cc_taxa: 25, bol_numero: 25, bol_cod_barras: 25, observacoes: 25}
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
                    from: ['softlabs', 'financeiro', 'fin_baixas'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'financeiro', 'fin_lancamentos'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_lancamentos_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'financeiro', 'fin_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'financeiro', 'fin_especies'],
                    join: {source: 0, tipo: types.join.left, on: 'fin_especies_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'fin_baixas_key', types.where.check]
            ],
            order: [
                [0, 'historico', 'asc']
            ],
            search: [
                    {alias: 0, field: 'historico',  param: types.search.like_full },
                    {alias: 0, field: 'ref_bancaria',  param: types.search.like_full },
                    {alias: 0, field: 'chq_numero',  param: types.search.like_full },
                    {alias: 0, field: 'chq_emitente',  param: types.search.like_full },
                    {alias: 0, field: 'chq_contato',  param: types.search.like_full },
                    {alias: 0, field: 'chq_banco',  param: types.search.like_full },
                    {alias: 0, field: 'chq_agencia',  param: types.search.like_full },
                    {alias: 0, field: 'chq_conta',  param: types.search.like_full },
                    {alias: 0, field: 'chq_bom_para',  param: types.search.maior_igual },
                    {alias: 0, field: 'cc_numero',  param: types.search.like_full },
                    {alias: 0, field: 'cc_nsu',  param: types.search.like_full },
                    {alias: 0, field: 'bol_numero',  param: types.search.like_full },
                    {alias: 0, field: 'bol_cod_barras',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'financeiro', 'fin_baixas'],
                    key: 'fin_baixas_key',
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
module.exports = FinBaixas;