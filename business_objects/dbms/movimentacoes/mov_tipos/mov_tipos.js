/**
 * BusinessObject :: MovTipos
 *  Implementação de objeto de negócio: mov_tipos.
 *
 * Engine de aplicações - TShark.
 * @since Sun May 29 2016 08:58:34 GMT-0300 (BRT)
 * @constructor
 */
function MovTipos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'mov_tipos';

    // Map
    this.source = {
        table: 'mov_tipos',
        metadata: {
            key: 'mov_tipos_key',
            label: 'codigo',
            fields: {
                mov_tipos_key: {
                    tipo: types.comp.key, label: 'Mov Tipos:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Codigo:'
                }, 
                mov_tipo: {
                    tipo: types.comp.text, label: 'Mov Tipo:'
                }, 
                gera_credito: {
                    tipo: types.comp.int, label: 'Gera Credito:'
                }, 
                gera_debito: {
                    tipo: types.comp.int, label: 'Gera Debito:'
                }, 
                gera_entrada: {
                    tipo: types.comp.int, label: 'Gera Entrada:'
                }, 
                gera_saida: {
                    tipo: types.comp.int, label: 'Gera Saida:'
                }, 
                mod_origem: {
                    tipo: types.comp.text, label: 'Mod Origem:'
                }, 
                mod_destino: {
                    tipo: types.comp.text, label: 'Mod Destino:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }, 
                val_estoq_entrada_key: {
                    tipo: types.comp.choose, label: 'Val Estoq Entrada:',
                    data: { 
                        key: ['val_estoq_entrada_key'], 
                        from: ['dbms', '', 'val_estoq_entrada'], 
                        template: '{val_estoq_entrada_key} - {val_estoq_entrad}', 
                        provider: '' 
                    } 
                }, 
                val_estoq_saida_key: {
                    tipo: types.comp.choose, label: 'Val Estoq Saida:',
                    data: { 
                        key: ['val_estoq_saida_key'], 
                        from: ['dbms', '', 'val_estoq_saida'], 
                        template: '{val_estoq_saida_key} - {val_estoq_said}', 
                        provider: '' 
                    } 
                }, 
                val_ent_destino_key: {
                    tipo: types.comp.choose, label: 'Val Ent Destino:',
                    data: { 
                        key: ['val_ent_destino_key'], 
                        from: ['dbms', '', 'val_ent_destino'], 
                        template: '{val_ent_destino_key} - {val_ent_destin}', 
                        provider: '' 
                    } 
                }, 
                val_ent_origem_key: {
                    tipo: types.comp.choose, label: 'Val Ent Origem:',
                    data: { 
                        key: ['val_ent_origem_key'], 
                        from: ['dbms', '', 'val_ent_origem'], 
                        template: '{val_ent_origem_key} - {val_ent_orige}', 
                        provider: '' 
                    } 
                }, 
                val_rateios_templates_key: {
                    tipo: types.comp.choose, label: 'Val Rateios Templates:',
                    data: { 
                        key: ['val_rateios_templates_key'], 
                        from: ['dbms', '', 'val_rateios_templates'], 
                        template: '{val_rateios_templates_key} - {val_rateios_template}', 
                        provider: '' 
                    } 
                }, 
                val_cont_plano_contas_key: {
                    tipo: types.comp.choose, label: 'Val Cont Plano Contas:',
                    data: { 
                        key: ['val_cont_plano_contas_key'], 
                        from: ['dbms', '', 'val_cont_plano_contas'], 
                        template: '{val_cont_plano_contas_key} - {val_cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                val_fin_contas_credito_key: {
                    tipo: types.comp.choose, label: 'Val Fin Contas Credito:',
                    data: { 
                        key: ['val_fin_contas_credito_key'], 
                        from: ['dbms', '', 'val_fin_contas_credito'], 
                        template: '{val_fin_contas_credito_key} - {val_fin_contas_credit}', 
                        provider: '' 
                    } 
                }, 
                val_fin_contas_debito_key: {
                    tipo: types.comp.choose, label: 'Val Fin Contas Debito:',
                    data: { 
                        key: ['val_fin_contas_debito_key'], 
                        from: ['dbms', '', 'val_fin_contas_debito'], 
                        template: '{val_fin_contas_debito_key} - {val_fin_contas_debit}', 
                        provider: '' 
                    } 
                }, 
                val_dia_vencimento: {
                    tipo: types.comp.int, label: 'Val Dia Vencimento:'
                }, 
                lbl_valor_liquido: {
                    tipo: types.comp.text, label: 'Lbl Valor Liquido:'
                }, 
                lbl_valor_bruto: {
                    tipo: types.comp.text, label: 'Lbl Valor Bruto:'
                }, 
                lbl_dt_vencimento: {
                    tipo: types.comp.text, label: 'Lbl Dt Vencimento:'
                }, 
                lbl_estoq_entrada_key: {
                    tipo: types.comp.choose, label: 'Lbl Estoq Entrada:',
                    data: { 
                        key: ['lbl_estoq_entrada_key'], 
                        from: ['dbms', '', 'lbl_estoq_entrada'], 
                        template: '{lbl_estoq_entrada_key} - {lbl_estoq_entrad}', 
                        provider: '' 
                    } 
                }, 
                lbl_estoq_saida_key: {
                    tipo: types.comp.choose, label: 'Lbl Estoq Saida:',
                    data: { 
                        key: ['lbl_estoq_saida_key'], 
                        from: ['dbms', '', 'lbl_estoq_saida'], 
                        template: '{lbl_estoq_saida_key} - {lbl_estoq_said}', 
                        provider: '' 
                    } 
                }, 
                lbl_fin_contas_credito_key: {
                    tipo: types.comp.choose, label: 'Lbl Fin Contas Credito:',
                    data: { 
                        key: ['lbl_fin_contas_credito_key'], 
                        from: ['dbms', '', 'lbl_fin_contas_credito'], 
                        template: '{lbl_fin_contas_credito_key} - {lbl_fin_contas_credit}', 
                        provider: '' 
                    } 
                }, 
                lbl_fin_contas_debito_key: {
                    tipo: types.comp.choose, label: 'Lbl Fin Contas Debito:',
                    data: { 
                        key: ['lbl_fin_contas_debito_key'], 
                        from: ['dbms', '', 'lbl_fin_contas_debito'], 
                        template: '{lbl_fin_contas_debito_key} - {lbl_fin_contas_debit}', 
                        provider: '' 
                    } 
                }, 
                lbl_descricao: {
                    tipo: types.comp.text, label: 'Lbl Descrição:'
                }, 
                exibe_cfop: {
                    tipo: types.comp.int, label: 'Exibe Cfop:'
                }, 
                exibe_mov_itens_valor: {
                    tipo: types.comp.int, label: 'Exibe Mov Itens Valor:'
                }, 
                exibe_mov_itens: {
                    tipo: types.comp.int, label: 'Exibe Mov Itens:'
                }, 
                exibe_plano_contas: {
                    tipo: types.comp.int, label: 'Exibe Plano Contas:'
                }, 
                exibe_rateio: {
                    tipo: types.comp.int, label: 'Exibe Rateio:'
                }, 
                exibe_desconto: {
                    tipo: types.comp.int, label: 'Exibe Desconto:'
                }, 
                exibe_multa_juros: {
                    tipo: types.comp.int, label: 'Exibe Multa Juros:'
                }, 
                exibe_dt_entrada: {
                    tipo: types.comp.int, label: 'Exibe Dt Entrada:'
                }, 
                exibe_responsavel_destino: {
                    tipo: types.comp.int, label: 'Exibe Responsavel Destino:'
                }, 
                exibe_responsavel_origem: {
                    tipo: types.comp.int, label: 'Exibe Responsavel Origem:'
                }, 
                intf_height: {
                    tipo: types.comp.int, label: 'Intf Height:'
                }, 
                intf_width: {
                    tipo: types.comp.int, label: 'Intf Width:'
                }, 
                intf_focus: {
                    tipo: types.comp.text, label: 'Intf Focus:'
                }, 
                intf_label: {
                    tipo: types.comp.text, label: 'Intf Label:'
                }, 
                after_finalizar: {
                    tipo: types.comp.text, label: 'After Finalizar:'
                }, 
                finaliza_ao_criar: {
                    tipo: types.comp.int, label: 'Finaliza Ao Criar:'
                }, 
                requer_observacoes: {
                    tipo: types.comp.int, label: 'Requer Observações:'
                }, 
                importar_mov_tipos_key: {
                    tipo: types.comp.choose, label: 'Importar Mov Tipos:',
                    data: { 
                        key: ['importar_mov_tipos_key'], 
                        from: ['dbms', '', 'importar_mov_tipos'], 
                        template: '{importar_mov_tipos_key} - {importar_mov_tipo}', 
                        provider: '' 
                    } 
                }, 
                importar_filtro_entidade: {
                    tipo: types.comp.int, label: 'Importar Filtro Entidade:'
                }, 
                mod_destino_label: {
                    tipo: types.comp.text, label: 'Mod Destino Label:'
                }, 
                mod_origem_label: {
                    tipo: types.comp.text, label: 'Mod Origem Label:'
                }, 
                gera_lanc_ent_destino: {
                    tipo: types.comp.int, label: 'Gera Lanc Ent Destino:'
                }, 
                gera_lanc_ao_criar: {
                    tipo: types.comp.int, label: 'Gera Lanc Ao Criar:'
                }, 
                gera_parcelamentos: {
                    tipo: types.comp.int, label: 'Gera Parcelamentos:'
                }, 
                gera_mensalidades: {
                    tipo: types.comp.int, label: 'Gera Mensalidades:'
                }, 
                gera_impostos: {
                    tipo: types.comp.int, label: 'Gera Impostos:'
                }, 
                gera_saida_producao: {
                    tipo: types.comp.int, label: 'Gera Saida Produção:'
                }, 
                gera_entrada_producao: {
                    tipo: types.comp.int, label: 'Gera Entrada Produção:'
                }, 
                mov_customizada: {
                    tipo: types.comp.int, label: 'Mov Customizada:'
                }, 
                mov_tipos_categorias_key: {
                    tipo: types.comp.choose, label: 'Mov Tipos Categorias:',
                    data: { 
                        key: ['mov_tipos_categorias_key'], 
                        from: ['dbms', 'movimentacoes', 'mov_tipos_categorias'], 
                        template: '{mov_tipos_categorias_key} - {mov_tipos_categoria}', 
                        provider: '' 
                    } 
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
                {titulo: "Informações de mov_tipos"},
                {mov_tipos_key: 25, codigo: 25, mov_tipo: 25, gera_credito: 25}, 
                {gera_debito: 25, gera_entrada: 25, gera_saida: 25, mod_origem: 25}, 
                {mod_destino: 25, observacoes: 25, val_estoq_entrada_key: 25, val_estoq_saida_key: 25}, 
                {val_ent_destino_key: 25, val_ent_origem_key: 25, val_rateios_templates_key: 25, val_cont_plano_contas_key: 25}, 
                {val_fin_contas_credito_key: 25, val_fin_contas_debito_key: 25, val_dia_vencimento: 25, lbl_valor_liquido: 25}, 
                {lbl_valor_bruto: 25, lbl_dt_vencimento: 25, lbl_estoq_entrada_key: 25, lbl_estoq_saida_key: 25}, 
                {lbl_fin_contas_credito_key: 25, lbl_fin_contas_debito_key: 25, lbl_descricao: 25, exibe_cfop: 25}, 
                {exibe_mov_itens_valor: 25, exibe_mov_itens: 25, exibe_plano_contas: 25, exibe_rateio: 25}, 
                {exibe_desconto: 25, exibe_multa_juros: 25, exibe_dt_entrada: 25, exibe_responsavel_destino: 25}, 
                {exibe_responsavel_origem: 25, intf_height: 25, intf_width: 25, intf_focus: 25}, 
                {intf_label: 25, after_finalizar: 25, finaliza_ao_criar: 25, requer_observacoes: 25}, 
                {importar_mov_tipos_key: 25, importar_filtro_entidade: 25, mod_destino_label: 25, mod_origem_label: 25}, 
                {gera_lanc_ent_destino: 25, gera_lanc_ao_criar: 25, gera_parcelamentos: 25, gera_mensalidades: 25}, 
                {gera_impostos: 25, gera_saida_producao: 25, gera_entrada_producao: 25, mov_customizada: 25}, 
                {mov_tipos_categorias_key: 100}
            ],
            ctrls: {
                codigo: {
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
                    from: ['dbms', 'movimentacoes', 'mov_tipos'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['dbms', '', 'val_estoq_entrada'],
                    join: {source: 0, tipo: types.join.left, on: 'val_estoq_entrada_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['dbms', '', 'val_estoq_saida'],
                    join: {source: 0, tipo: types.join.left, on: 'val_estoq_saida_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['dbms', '', 'val_ent_destino'],
                    join: {source: 0, tipo: types.join.left, on: 'val_ent_destino_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['dbms', '', 'val_ent_origem'],
                    join: {source: 0, tipo: types.join.left, on: 'val_ent_origem_key', where: ''},
                    fields: [
                        
                    ]
                },
                5: { 
                    from: ['dbms', '', 'val_rateios_templates'],
                    join: {source: 0, tipo: types.join.left, on: 'val_rateios_templates_key', where: ''},
                    fields: [
                        
                    ]
                },
                6: { 
                    from: ['dbms', '', 'val_cont_plano_contas'],
                    join: {source: 0, tipo: types.join.left, on: 'val_cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                7: { 
                    from: ['dbms', '', 'val_fin_contas_credito'],
                    join: {source: 0, tipo: types.join.left, on: 'val_fin_contas_credito_key', where: ''},
                    fields: [
                        
                    ]
                },
                8: { 
                    from: ['dbms', '', 'val_fin_contas_debito'],
                    join: {source: 0, tipo: types.join.left, on: 'val_fin_contas_debito_key', where: ''},
                    fields: [
                        
                    ]
                },
                9: { 
                    from: ['dbms', '', 'lbl_estoq_entrada'],
                    join: {source: 0, tipo: types.join.left, on: 'lbl_estoq_entrada_key', where: ''},
                    fields: [
                        
                    ]
                },
                10: { 
                    from: ['dbms', '', 'lbl_estoq_saida'],
                    join: {source: 0, tipo: types.join.left, on: 'lbl_estoq_saida_key', where: ''},
                    fields: [
                        
                    ]
                },
                11: { 
                    from: ['dbms', '', 'lbl_fin_contas_credito'],
                    join: {source: 0, tipo: types.join.left, on: 'lbl_fin_contas_credito_key', where: ''},
                    fields: [
                        
                    ]
                },
                12: { 
                    from: ['dbms', '', 'lbl_fin_contas_debito'],
                    join: {source: 0, tipo: types.join.left, on: 'lbl_fin_contas_debito_key', where: ''},
                    fields: [
                        
                    ]
                },
                13: { 
                    from: ['dbms', '', 'importar_mov_tipos'],
                    join: {source: 0, tipo: types.join.left, on: 'importar_mov_tipos_key', where: ''},
                    fields: [
                        
                    ]
                },
                14: { 
                    from: ['dbms', 'movimentacoes', 'mov_tipos_categorias'],
                    join: {source: 0, tipo: types.join.left, on: 'mov_tipos_categorias_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'mov_tipos_key', types.where.check]
            ],
            order: [
                [0, 'codigo', 'asc']
            ],
            search: [
                    {alias: 6, field: 'codigo',  param: types.search.like_full },
                    {alias: 6, field: 'mov_tipo',  param: types.search.like_full },
                    {alias: 6, field: 'mod_origem',  param: types.search.like_full },
                    {alias: 6, field: 'mod_destino',  param: types.search.like_full },
                    {alias: 6, field: 'lbl_valor_liquido',  param: types.search.like_full },
                    {alias: 6, field: 'lbl_valor_bruto',  param: types.search.like_full },
                    {alias: 6, field: 'lbl_dt_vencimento',  param: types.search.like_full },
                    {alias: 6, field: 'lbl_descricao',  param: types.search.like_full },
                    {alias: 6, field: 'intf_focus',  param: types.search.like_full },
                    {alias: 6, field: 'intf_label',  param: types.search.like_full },
                    {alias: 6, field: 'after_finalizar',  param: types.search.like_full },
                    {alias: 6, field: 'mod_destino_label',  param: types.search.like_full },
                    {alias: 6, field: 'mod_origem_label',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['dbms', 'movimentacoes', 'mov_tipos'],
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
module.exports = MovTipos;