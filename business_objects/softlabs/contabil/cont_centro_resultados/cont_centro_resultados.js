/**
 * BusinessObject :: ContCentroResultados
 *  Implementação de objeto de negócio: cont_centro_resultados.
 *
 * Engine de aplicações - TShark.
 * @since Wed Apr 27 2016 18:11:58 GMT-0300 (BRT)
 * @constructor
 */
function ContCentroResultados(){

    //region :: Definições do Objeto

    // Id
    this.id = 'cont_centro_resultados';

    // Map
    this.source = {
        table: 'cont_centro_resultados',
        metadata: {
            key: 'cont_centro_resultados_key',
            fields: {
                cont_centro_resultados_key: {
                    tipo: types.comp.key, label: 'Cont Centro Resultados:'
                }, 
                parent_key: {
                    tipo: types.comp.dropdown, label: 'Parent:',
                    data: { 
                        key: ['parent_key'], 
                        from: ['softlabs', '', 'parent'], 
                        template: '{row.parent_key} - {row.paren}', 
                        provider: '' 
                    } 
                }, 
                _left: {
                    tipo: types.comp.int, label: ' Left:'
                }, 
                _right: {
                    tipo: types.comp.int, label: ' Right:'
                }, 
                _moving: {
                    tipo: types.comp.int, label: ' Moving:'
                }, 
                _integracao: {
                    tipo: types.comp.text, label: ' Integração:'
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                codigo: {
                    tipo: types.comp.text, label: 'Codigo:'
                }, 
                centro_resultado: {
                    tipo: types.comp.text, label: 'Centro Resultado:'
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
                {titulo: "Informações de cont_centro_resultados"},
                {cont_centro_resultados_key: 25, parent_key: 25, _left: 25, _right: 25}, 
                {_moving: 25, _integracao: 25, ativo: 25, codigo: 25}, 
                {centro_resultado: 25, observacoes: 75}
            ],
            ctrls: {
                centro_resultado: {
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
                    from: ['softlabs', 'contabil', 'cont_centro_resultados'],
                    fields: [
                        'centro_resultado'
                    ]
                },
                1: { 
                    from: ['softlabs', '', 'parent'],
                        join: {source: 0, tipo: types.join.left, on: 'parent_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'cont_centro_resultados_key', types.where.check]
            ],
            order: [
                [0, 'centro_resultado', 'asc']
            ],
            search: [ 
                {alias: 0, field: 'centro_resultado',  param: types.search.like_full }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'contabil', 'cont_centro_resultados'],
                    key: 'cont_centro_resultados_key',
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
module.exports = ContCentroResultados;