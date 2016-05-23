/**
 * BusinessObject :: ProdIcms
 *  Implementação de objeto de negócio: prod_icms.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:16:38 GMT-0300 (BRT)
 * @constructor
 */
function ProdIcms(){

    //region :: Definições do Objeto

    // Id
    this.id = 'prod_icms';

    // Map
    this.source = {
        table: 'prod_icms',
        metadata: {
            key: 'prod_icms_key',
            label: 'icms',
            fields: {
                prod_icms_key: {
                    tipo: types.comp.key, label: 'Prod Icms:'
                }, 
                prod_cod_tributacao_key: {
                    tipo: types.comp.dropdown, label: 'Prod Cod Tributação:',
                    data: { 
                        key: ['prod_cod_tributacao_key'], 
                        from: ['softlabs', '', 'prod_cod_tributacao'], 
                        template: '{row.prod_cod_tributacao_key} - {row.prod_cod_tributaca}', 
                        provider: '' 
                    } 
                }, 
                cod_aliquota: {
                    tipo: types.comp.int, label: 'Cod Aliquota:'
                }, 
                icms: {
                    tipo: types.comp.text, label: 'Icms:'
                }, 
                aliquota: {
                    tipo: types.comp.float, label: 'Aliquota:'
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
                {titulo: "Informações de prod_icms"},
                {prod_icms_key: 25, prod_cod_tributacao_key: 25, cod_aliquota: 25, icms: 25}, 
                {aliquota: 100}
            ],
            ctrls: {
                icms: {
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
                    from: ['softlabs', 'producao', 'prod_icms'],
                    fields: [
                        'icms'
                    ]
                },
                1: { 
                    from: ['softlabs', '', 'prod_cod_tributacao'],
                        join: {source: 0, tipo: types.join.left, on: 'prod_cod_tributacao_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'prod_icms_key', types.where.check]
            ],
            order: [
                [0, 'icms', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'icms',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'producao', 'prod_icms'],
                    key: 'prod_icms_key',
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
module.exports = ProdIcms;