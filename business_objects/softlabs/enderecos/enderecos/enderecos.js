/**
 * BusinessObject :: Enderecos
 *  Implementação de objeto de negócio: enderecos.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:12:31 GMT-0300 (BRT)
 * @constructor
 */
function Enderecos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'enderecos';

    // Map
    this.source = {
        table: 'enderecos',
        metadata: {
            key: 'enderecos_key',
            fields: {
                enderecos_key: {
                    tipo: types.comp.key, label: 'Enderecos:'
                }, 
                end_bairros_key: {
                    tipo: types.comp.dropdown, label: 'End Bairros:',
                    data: { 
                        key: ['end_bairros_key'], 
                        from: ['softlabs', 'enderecos', 'end_bairros'], 
                        template: '{row.end_bairros_key} - {row.end_bairro}', 
                        provider: '' 
                    } 
                }, 
                end_cidades_key: {
                    tipo: types.comp.dropdown, label: 'End Cidades:',
                    data: { 
                        key: ['end_cidades_key'], 
                        from: ['softlabs', 'enderecos', 'end_cidades'], 
                        template: '{row.end_cidades_key} - {row.end_cidade}', 
                        provider: '' 
                    } 
                }, 
                end_estados_key: {
                    tipo: types.comp.dropdown, label: 'End Estados:',
                    data: { 
                        key: ['end_estados_key'], 
                        from: ['softlabs', 'enderecos', 'end_estados'], 
                        template: '{row.end_estados_key} - {row.end_estado}', 
                        provider: '' 
                    } 
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
                cep: {
                    tipo: types.comp.text, label: 'Cep:'
                }, 
                endereco: {
                    tipo: types.comp.text, label: 'Endereco:'
                }, 
                numero: {
                    tipo: types.comp.text, label: 'Numero:'
                }, 
                complemento: {
                    tipo: types.comp.text, label: 'Complemento:'
                }, 
                bairro: {
                    tipo: types.comp.text, label: 'Bairro:'
                }, 
                localidade: {
                    tipo: types.comp.text, label: 'Localidade:'
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
                {titulo: "Informações de enderecos"},
                {enderecos_key: 25, end_bairros_key: 25, end_cidades_key: 25, end_estados_key: 25}, 
                {end_paises_key: 25, cep: 25, endereco: 25, numero: 25}, 
                {complemento: 25, bairro: 25, localidade: 25, observacoes: 25}
            ],
            ctrls: {
                endereco: {
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
                    from: ['softlabs', 'enderecos', 'enderecos'],
                    fields: [
                        'endereco'
                    ]
                },
                1: { 
                    from: ['softlabs', 'enderecos', 'end_bairros'],
                        join: {source: 0, tipo: types.join.left, on: 'end_bairros_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'enderecos', 'end_cidades'],
                        join: {source: 0, tipo: types.join.left, on: 'end_cidades_key', where: ''},
                    fields: [
                        
                    ]
                },
                3: { 
                    from: ['softlabs', 'enderecos', 'end_estados'],
                        join: {source: 0, tipo: types.join.left, on: 'end_estados_key', where: ''},
                    fields: [
                        
                    ]
                },
                4: { 
                    from: ['softlabs', 'enderecos', 'end_paises'],
                        join: {source: 0, tipo: types.join.left, on: 'end_paises_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'enderecos_key', types.where.check]
            ],
            order: [
                [0, 'endereco', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'endereco',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'enderecos', 'enderecos'],
                    key: 'enderecos_key',
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
module.exports = Enderecos;