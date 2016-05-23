/**
 * BusinessObject :: ParcFisicos
 *  Implementação de objeto de negócio: parc_fisicos.
 *
 * Engine de aplicações - TShark.
 * @since Mon May 23 2016 09:16:25 GMT-0300 (BRT)
 * @constructor
 */
function ParcFisicos(){

    //region :: Definições do Objeto

    // Id
    this.id = 'parc_fisicos';

    // Map
    this.source = {
        table: 'parc_fisicos',
        metadata: {
            key: 'parceiros_key',
            label: parceiros_key,
            fields: {
                parceiros_key: {
                    tipo: types.comp.key, label: 'Parceiros:'
                }, 
                apelido: {
                    tipo: types.comp.text, label: 'Apelido:'
                }, 
                dia_nasc: {
                    tipo: types.comp.int, label: 'Dia Nasc:'
                }, 
                mes_nasc: {
                    tipo: types.comp.int, label: 'Mes Nasc:'
                }, 
                ano_nasc: {
                    tipo: types.comp.undefined, label: 'Ano Nasc:'
                }, 
                rg: {
                    tipo: types.comp.text, label: 'Rg:'
                }, 
                cpf: {
                    tipo: types.comp.text, label: 'Cpf:'
                }, 
                sexo: {
                    tipo: types.comp.text, label: 'Sexo:'
                }, 
                est_civil: {
                    tipo: types.comp.text, label: 'Est Civil:'
                }, 
                profissao: {
                    tipo: types.comp.text, label: 'Profissão:'
                }, 
                naturalidade: {
                    tipo: types.comp.text, label: 'Naturalidade:'
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
                {titulo: "Informações de parc_fisicos"},
                {parceiros_key: 25, apelido: 25, dia_nasc: 25, mes_nasc: 25}, 
                {ano_nasc: 25, rg: 25, cpf: 25, sexo: 25}, 
                {est_civil: 25, profissao: 25, naturalidade: 25, observacoes: 25}
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
                    from: ['softlabs', 'parceiros', 'parc_fisicos'],
                    fields: [
                        parceiros_key
                    ]
                }, 
            },
            where: [ 
                ['AND', 0, 'parceiros_key', types.where.check]
            ],
            order: [
                ['0', 'parceiros_key', 'desc']
            ],
            search: [ 
                
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'parceiros', 'parc_fisicos'],
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
module.exports = ParcFisicos;