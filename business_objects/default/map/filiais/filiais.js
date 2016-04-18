/**
 * BusinessObject que imlementa o mapeamento de um cliente
 * externo
 * @constructor
 */
function Filiais(){


    //region :: Definições do Objeto

    // Id
    this.id = 'filiais';

    // Map
    this.source = {
        table: 'map_filiais',
        metadata: {
            key: 'map_filiais_key',
            fields: {
                map_filiais_key: {
                    tipo: types.comp.key, label: 'Cód. Mapeamento:'
                },
                bplid: {
                    tipo: types.comp.text, label: 'Cód. Retaguarda:'
                },
                ext_filial_id: {
                    tipo: types.comp.text, label: 'Cód. PDV:'
                },
                whscode: {
                    tipo: types.comp.datetime, label: 'Depósito Padrão:'
                },
                listnum: {
                    tipo: types.comp.text, label: 'Lista de Preço Padrão:'
                },
                cardcode: {
                    tipo: types.comp.text, label: 'Parceiro de Negócio Associado:'
                },
                observacoes:{
                    tipo: types.comp.text_big, label: 'Observações:'
                }
            }
        }
    };

    //endregion


    //region :: Forms

    this.forms = {

        // Form de update
        /*
        TODO: tabs, accordion

         */
        update:{
            _config: {
                bounds: { width: 800, height: 450 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small
            },
            linhas: [
                {titulo: "Dados do cliente"},
                {cardcode: 40, cardname: 60, _config: { labels: types.form.lines.labels.inline } },
                {map_filiais_key: 50, bplid: 20, bplname: 30 },

                {titulo: "Observações", icon: "big calendar"},
                {whscode: 20, whsname: 80}
            ],
            ctrls: {
                cardcode: { label: 'Clientes:', comp: 'inpDate', icon: "calendar", hint: 'Escolha a data' },
                cardname: {
                    tipo: types.comp.dropdown,
                    data: {
                        key: ['map_clientes_key'],
                        from: ['default', 'map', 'clientes'],
                        template: '{row.ext_nome}',
                        provider: ''
                    }
                },
                bplid: {
                    tipo: types.comp.dropdown,
                    data: {
                        //key: ['whscode'],
                        from: ['sap', 'simples', 'filiais'],
                        template: '[ ({row.bplid}) -> {row.bplname} ]',
                        provider: ''
                    }
                },
                bplname: {
                    extra_right: {
                        class: 'labeled',
                        tag: '<a class="ui tag label">Add tag</a>'
                    },
                    extra_left: {
                        class: 'icon',
                        tag: '<i class="tags icon" />'
                    }
                },
                whscode: {
                    tipo: types.comp.dropdown,
                    data: {
                        key: ['whscode'],
                        from: ['sap', 'simples', 'depositos'],
                        template: '{row.whscode} :: {row.whsname}',
                        provider: ''
                    }
                },
                whsname: { tipo: types.comp.text_huge }
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                '0': {
                    from: ['map', 'filiais']
                },
                '1': {
                    from: ['sap', 'simples', 'filiais'],
                    join: {source: '0', tipo: types.join.left, on: 'bplid', where: ''},
                    fields: ['bplname']
                },
                '2': {
                    from: ['sap', 'simples', 'pns'],
                    join: {source: '1', tipo: types.join.left, on: ['cardcode', 'dflvendor'], where: ''},
                    fields: [
                        ['cardname', 'as', 'fornecedor']
                    ]
                },
                '3': {
                    from: ['sap', 'simples', 'pns'],
                    join: {source: '1', tipo: types.join.left, on: ['cardcode', 'dflcust'], where: ''},
                    fields: [
                        ['cardname', 'as', 'cliente']
                    ]
                },
                '4': {
                    from: ['sap', 'simples', 'depositos'],
                    join: {source: '0', tipo: types.join.left, on: 'whscode', where: ''},
                    fields: []
                },
                '5': {
                    from: ['sap', 'simples', 'listas'],
                    join: {source: '0', tipo: types.join.left, on: 'listnum', where: ''},
                    fields: []
                }
            },
            where: [
                ["AND", '0', "map_filiais_key", types.where.check]
            ],
            search: [
                {alias: '4', field: 'whscode',  param: types.search.like },
                {alias: '3', field: 'cardcode', param: types.search.in },
                {alias: '1', field: 'bplname',  param: types.search.like },
                {alias: '5', field: 'listnum',  param: types.search.menor },
                {alias: '5', field: 'listnum',  param: types.search.maior_igual }
            ],
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos

    /**
     * Evento chamado antes de renderizar o template de listagem
     * @param ret Objeto de retorno
     * @returns {Promise}
     */
    this.onGet = function *(ret, ctx){
        ret['estive_no_onGet no promises'] = 'ÊêÊêêêê';
    };
    
    /**
     * Evento chamado antes de renderizar o template de listagem
     * @param ret Objeto de retorno
     * @returns {Promise}
     */
    this.onAfterGet = function *(ret){
        ret['estive_no_onafterGet'] = 'ÊêÊêêêê tb!!!';
    };

    /**
     * Evento chamado antes de renderizar o template de listagem
     * @param ret Objeto de retorno
     * @returns {Promise}
     */
    this.onList = function *(ret, ctx){
        ret['estive_no_onlist no promises'] = 'ÊêÊêêêê';
    };

    /**
     * Evento chamado antes de renderizar o template de listagem
     * @param ret Objeto de retorno
     * @returns {Promise}
     */
    this.onAfterList = function *(ret){
        ret['estive_no_onafterlist'] = 'ÊêÊêêêê tb!!!';
    };

    /**
     * Evento chamado para cada row em select
     * @param row
     */
    this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };

    //endregion

}


// Types
var types = require('../../../../tshark/types');

// Exporta
module.exports = Filiais;