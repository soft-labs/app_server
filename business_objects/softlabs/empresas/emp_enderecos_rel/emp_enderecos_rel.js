/**
 * BusinessObject :: EmpEnderecosRel
 *  Implementação de objeto de negócio: emp_enderecos_rel.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:14:47 GMT-0300 (BRT)
 * @constructor
 */
function EmpEnderecosRel(){

    //region :: Definições do Objeto

    // Id
    this.id = 'emp_enderecos_rel';

    // Map
    this.source = {
        table: 'emp_enderecos_rel',
        metadata: {
            key: ['empresas_key', 'enderecos_key'],
            label: ,
            fields: {
                empresas_key: {
                    tipo: types.comp.key, label: 'Empresas:',
                    data: { 
                        key: ['empresas_key'], 
                        from: ['softlabs', 'empresas', 'empresas'], 
                        template: '{row.empresas_key} - {row.empresa}', 
                        provider: '' 
                    } 
                }, 
                enderecos_key: {
                    tipo: types.comp.key, label: 'Enderecos:',
                    data: { 
                        key: ['enderecos_key'], 
                        from: ['softlabs', 'enderecos', 'enderecos'], 
                        template: '{row.enderecos_key} - {row.endereco}', 
                        provider: '' 
                    } 
                }, 
                end_tipos_key: {
                    tipo: types.comp.dropdown, label: 'End Tipos:',
                    data: { 
                        key: ['end_tipos_key'], 
                        from: ['softlabs', 'enderecos', 'end_tipos'], 
                        template: '{row.end_tipos_key} - {row.end_tipo}', 
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
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Informações de emp_enderecos_rel"},
                {empresas_key: 25, enderecos_key: 25, end_tipos_key: 50}
            ],
            ctrls: {
                
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['softlabs', 'empresas', 'emp_enderecos_rel'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'empresas', 'empresas'],
                        join: {source: 0, tipo: types.join.left, on: 'empresas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'enderecos', 'enderecos'],
                        join: {source: 0, tipo: types.join.left, on: 'enderecos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'enderecos', 'end_tipos'],
                        join: {source: 0, tipo: types.join.left, on: 'end_tipos_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'empresas_key', types.where.check],
                ['AND', 0, 'enderecos_key', types.where.check]
            ],
            order: [
                ['0', 'empresas_key', 'desc'],
                ['0', 'enderecos_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'empresas', 'emp_enderecos_rel'],
                    key: ['empresas_key', 'enderecos_key'],
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
module.exports = EmpEnderecosRel;