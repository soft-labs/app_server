/**
 * BusinessObject :: Veiculos
 *  Implementação de objeto de negócio: veiculos.
 *
 * Engine de aplicações - TShark.
 * @since Wed May 11 2016 11:19:23 GMT-0300 (BRT)
 * @constructor
 */
function Veiculos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'veiculos';

    // Map
    this.source = {
        table: 'veiculos',
        metadata: {
            key: 'veiculos_key',
            fields: {
                veiculos_key: {
                    tipo: types.comp.key, label: 'Veiculos:'
                }, 
                veic_marcas_key: {
                    tipo: types.comp.dropdown, label: 'Veic Marcas:',
                    data: { 
                        key: ['veic_marcas_key'], 
                        from: ['mlanna', 'veiculos', 'veic_marcas'], 
                        template: '{row.veic_marcas_key} - {row.marca}',
                        provider: '' 
                    } 
                }, 
                veic_modelos_key: {
                    tipo: types.comp.dropdown, label: 'Veic Modelos:',
                    data: { 
                        key: ['veic_modelos_key'], 
                        from: ['mlanna', 'veiculos', 'veic_modelos'], 
                        template: '{row.veic_modelos_key} - {row.modelo}',
                        provider: '' 
                    } 
                }, 
                motoristas_key: {
                    tipo: types.comp.dropdown, label: 'Motoristas:',
                    data: { 
                        key: ['motoristas_key'], 
                        from: ['mlanna', 'motoristas', 'motoristas'], 
                        template: '{row.motoristas_key} - {row.motorista}', 
                        provider: '' 
                    } 
                }, 
                veiculo: {
                    tipo: types.comp.text, label: 'Placa:'
                }, 
                dt_cadastro: {
                    tipo: types.comp.datetime, label: 'Dt Cadastro:'
                }, 
                cor: {
                    tipo: types.comp.text, label: 'Cor:'
                }, 
                observacoes: {
                    tipo: types.comp.text, label: 'Observações:'
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
                {titulo: "Informações de veiculos"},
                {veiculos_key: 25, veic_marcas_key: 25, veic_modelos_key: 25, motoristas_key: 25}, 
                {veiculo: 25, dt_cadastro: 25, cor: 25},
                {observacoes: 100}
            ],
            ctrls: {
                veiculo: {
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
                    from: ['mlanna', 'veiculos', 'veiculos'],
                    fields: [
                        'veiculo'
                    ]
                },
                1: { 
                    from: ['mlanna', 'veiculos', 'veic_marcas'],
                        join: {source: 0, tipo: types.join.left, on: 'veic_marcas_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['mlanna', 'veiculos', 'veic_modelos'],
                        join: {source: 0, tipo: types.join.left, on: 'veic_modelos_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['mlanna', 'motoristas', 'motoristas'],
                        join: {source: 0, tipo: types.join.left, on: 'motoristas_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'veiculos_key', types.where.check]
            ],
            order: [
                [0, 'veiculo', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'veiculo',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['mlanna', 'veiculos', 'veiculos'],
                    key: 'veiculos_key',
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
     * Evento chamado na operação POST :: Insert
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onInsert = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     *
     this.onAfterInsert = function *(ret){

    };

    /**
     * Evento chamado na operação PUT :: Update
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onUpdate = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     *
     this.onAfterUpdate = function *(ret){

    };

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
     this.onDelete = function *(ret, ctx){

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
module.exports = Veiculos;