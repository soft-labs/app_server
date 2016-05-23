/**
 * BusinessObject :: Parceiros
 *  Implementação de objeto de negócio: parceiros.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:16:25 GMT-0300 (BRT)
 * @constructor
 */
function Parceiros(){

    //region :: Definições do Objeto

    // Id
    this.id = 'parceiros';

    // Map
    this.source = {
        table: 'parceiros',
        metadata: {
            key: 'parceiros_key',
            label: 'parceiro',
            fields: {
                parceiros_key: {
                    tipo: types.comp.key, label: 'Parceiros:'
                }, 
                end_paises_key: {
                    tipo: types.comp.dropdown, label: 'End Paises:',
                    data: { 
                        key: ['end_paises_key'], 
                        from: ['softlabs', 'enderecos', 'end_paises'], 
                        template: '{row.end_paises_key} - {row.end_paise}', 
                        provider: '' 
                    } 
                }, 
                parc_contas_key: {
                    tipo: types.comp.dropdown, label: 'Parc Contas:',
                    data: { 
                        key: ['parc_contas_key'], 
                        from: ['softlabs', 'parceiros', 'parc_contas'], 
                        template: '{row.parc_contas_key} - {row.parc_conta}', 
                        provider: '' 
                    } 
                }, 
                cont_plano_contas_key: {
                    tipo: types.comp.dropdown, label: 'Cont Plano Contas:',
                    data: { 
                        key: ['cont_plano_contas_key'], 
                        from: ['softlabs', 'contabil', 'cont_plano_contas'], 
                        template: '{row.cont_plano_contas_key} - {row.cont_plano_conta}', 
                        provider: '' 
                    } 
                }, 
                cont_centro_resultados_key: {
                    tipo: types.comp.dropdown, label: 'Cont Centro Resultados:',
                    data: { 
                        key: ['cont_centro_resultados_key'], 
                        from: ['softlabs', 'contabil', 'cont_centro_resultados'], 
                        template: '{row.cont_centro_resultados_key} - {row.cont_centro_resultado}', 
                        provider: '' 
                    } 
                }, 
                juridico: {
                    tipo: types.comp.int, label: 'Juridico:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Codigo:'
                }, 
                parceiro: {
                    tipo: types.comp.text, label: 'Parceiro:'
                }, 
                foto: {
                    tipo: types.comp.text_big, label: 'Foto:'
                }, 
                dt_foto: {
                    tipo: types.comp.date, label: 'Dt Foto:'
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
                {titulo: "Informações de parceiros"},
                {parceiros_key: 25, end_paises_key: 25, parc_contas_key: 25, cont_plano_contas_key: 25}, 
                {cont_centro_resultados_key: 25, juridico: 25, codigo: 25, parceiro: 25}, 
                {foto: 25, dt_foto: 25, limite_credito: 25, limite_compromisso: 25}, 
                {limite_desconto: 25, observacoes: 75}
            ],
            ctrls: {
                parceiro: {
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
                    from: ['softlabs', 'parceiros', 'parceiros'],
                    fields: [
                        'parceiro'
                    ]
                },
                1: { 
                    from: ['softlabs', 'enderecos', 'end_paises'],
                        join: {source: 0, tipo: types.join.left, on: 'end_paises_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'parceiros', 'parc_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'parc_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'contabil', 'cont_plano_contas'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_plano_contas_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'contabil', 'cont_centro_resultados'],
                        join: {source: 0, tipo: types.join.left, on: 'cont_centro_resultados_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'parceiros_key', types.where.check]
            ],
            order: [
                [0, 'parceiro', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'parceiro',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'parceiros', 'parceiros'],
                    key: 'parceiros_key',
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
module.exports = Parceiros;