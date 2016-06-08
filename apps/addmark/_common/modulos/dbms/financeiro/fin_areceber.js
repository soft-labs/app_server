/**
 * TShark - Client 3.0
 * Funcionalidades de interface: fin_areceber
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Sun May 29 2016 09:15:38 GMT-0300 (BRT)
 */
tshark.modulos._add('dbms.financeiro.fin_areceber', {

    /**
     * Inicialização
     */
    init: function(){

        // Swap de tela
        this.displayOpts = [
            {value: 1, icon: 'icon list',      client: this.path + '.swapList', label: 'Listagem'},
            {value: 2, icon: 'icon bar chart', client: this.path + '.swapList', label: 'Gráfico'}
        ];

        // Opções de agrupamento
        this.pivotOpts = [
            {value: 1, icon: 'icon tasks', client: this.path + '.pivotData', label: 'Vencimento'},
            {value: 2, icon: 'icon tasks', client: this.path + '.pivotData', label: 'Clientes'},
            {value: 3, icon: 'icon tasks', client: this.path + '.pivotData', label: 'Situação'},
            {value: 4, icon: 'icon tasks', client: this.path + '.pivotData', label: 'Origem'}
        ];

        //region :: Gráficos

        // Barra
        app.charts.add('bar_areceber', {
            type: 'bar',
            options: {
                slegend: false,
                ztitle: false
            }
        }, {
            labels: [],
            datasets: [{
                type: 'bar',
                label: 'Receitas',
                backgroundColor: "rgba(100,53,201,0.8)",
                data: [],
                borderColor: 'black',
                borderWidth: 1
            }]
        });

        // Pizza
        app.charts.add('pie_areceber', {
            type: 'pie',
            options: {

            }
        }, {
            labels: [],
            datasets: [
                {data: [], backgroundColor: [], hoverBackgroundColor:[]}
            ]}
        );

        //endregion

        // Carrega dados
        this.list();
    },


    //region :: Eventos Aplicados

    /**
     * Chamado após a listagem de dados
     */
    onAfterList: function(response, next){
        this.pivotData();

        $('.app-receita-action')
            .popup({
                context: '.app',
                position: 'bottom center',
                inline: true,
                on: 'click'
            })
        ;

    },

    /**
     * Chamado após a execução de uma pesquisa
     */
    onAfterSearch: function(response, next){
        this.pivotData();
    },

    /**
     * Atualiza dados quando o periodo é mudado
     */
    onChangePeriodo: function(el, dt){
        this.list();
    },

    /**
     * Chamado antes de requisitar um form de edição no server
     */
    onBeforeEdit: function(el, settings){
        this.formInfo = 'Edição de documento de receita';

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado antes de requisitar um form de inserção no server
     */
    onBeforeCreate: function(el, settings){
        this.formInfo = 'Provisionamento de Receita';

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após receber qualquer das interfaces de formulário
     *
    onAfterForm: function(response, next){
        $('.ui.modal.' + this.path + '-form')
            .modal('show');
    },*/

    //endregion


    //region :: Funções de Interface
    
    /**
     * Alterna entre lista e gráfico
     */
    swapList: function(){
        var value = $(this).data('value');
        $('#bar_areceber')
            .transition(value == '1' ? 'hide' : 'show');
        $('#pie_areceber')
            .transition(value == '1' ? 'hide' : 'show');
        $('.lista.areceber')
            .transition(value == '2' ? 'hide' : 'show');
    },

    /**
     * Executa o pivotamento de dados para os
     * agrupamentos
     */
    pivotData: function(){
        var p = $(this).data('value');

        switch (p){

            case 2:
                dbms.financeiro.fin_areceber.data.group = dbms.financeiro.fin_areceber.data.rows.groupBy({
                    field: 'parceiro',
                    order: {
                        group: {
                            by: '_stats.sum.valor_bruto',
                            desc: true
                        },
                        sub: {
                            by: 'valor_bruto',
                            desc: true
                        }
                    }
                });
                break;

            case 3:
                dbms.financeiro.fin_areceber.data.group = dbms.financeiro.fin_areceber.data.rows.groupBy({
                    field: 'lanc_status',
                    order: {
                        group: {
                            by: '_stats.sum.valor_bruto',
                            desc: true
                        },
                        sub: {
                            by: 'valor_bruto',
                            desc: true
                        }
                    }
                });
                break;

            case 4:
                dbms.financeiro.fin_areceber.data.group = dbms.financeiro.fin_areceber.data.rows.groupBy({
                    field: 'historico',
                    order: {
                        group: {
                            by: '_stats.sum.valor_bruto',
                            desc: true
                        },
                        sub: {
                            by: 'dt_vencimento',
                            desc: false
                        }
                    }
                });
                break;

            default:
                dbms.financeiro.fin_areceber.data.group = dbms.financeiro.fin_areceber.data.rows.groupBy('dt_vencimento', false);
                break;
        }

        // Ajusta os dados do gráfico de barras
        dbms.financeiro.fin_areceber.setChartData();


        dbms.financeiro.fin_areceber.setTooltips();


    },

    /**
     * Alimenta o bar chart com dados
     */
    setChartData: function(){

        // Monta dados
        var labels  = []
            , data  = []
            , color = []
        ;
        dbms.financeiro.fin_areceber.data.group.forEach(row => {
            labels.push(row.label);
            data.push(row._stats.sum.valor_bruto);
            color.push(randomColor());
        });

        // Gráfico de barras
        if (app.charts.data['bar_areceber']) {
            app.charts.data['bar_areceber'].labels = labels;
            app.charts.data['bar_areceber'].datasets[0].data = data;
            app.charts.reset('bar_areceber');
        }

        // Gráfico de pizza
        if (app.charts.data['pie_areceber']) {
            app.charts.data['pie_areceber'].labels = labels;
            app.charts.data['pie_areceber'].datasets[0] = {
                data: data,
                backgroundColor: color,
                hoverBackgroundColor: color
            };
            app.charts.reset('pie_areceber');
        }
    },

    /**
     * Ajusta tooltips da listagem
     */
    setTooltips: function(){

        $('.app-areceber-tooltip-datas').not('.tooltipstered')
            .tooltipster({
                position: 'left',
                theme: 'tooltipster-shadow'
            });

        $('.app-areceber-tooltip-datas')
            .each(function(){
                $(this)
                    .tooltipster('content', $(
                        '<div class="ui relaxed divided list">' +
                        '  <div class="item">' +
                        '    <i class="calendar middle aligned icon"></i>' +
                        '    <div class="content">' +
                        '      <a class="header">Vencimento:</a>' +
                        '      <div class="description">' + $(this).data('dt_vencimento') + '</div>' +
                        '    </div>' +
                        '  </div>' +
                        '  <div class="item">' +
                        '    <i class="calendar middle aligned icon"></i>' +
                        '    <div class="content">' +
                        '      <a class="header">' + $(this).data('dt_documento') + '</a>' +
                        '      <div class="description">Data do Documento</div>' +
                        '    </div>' +
                        '  </div>' +
                        '  <div class="item">' +
                        '    <i class="calendar middle aligned icon"></i>' +
                        '    <div class="content">' +
                        '      <a class="header">' + $(this).data('dt_lancamento') + '</a>' +
                        '      <div class="description">Data de Lançamento</div>' +
                        '    </div>' +
                        '  </div>' +
                        '</div>')
                    )
            })
        ;


        $('.app-areceber-tooltip-actions').not('.tooltipstered')
            .tooltipster({
                position: 'bottom',
                interactive: true,
                theme: 'tooltipster-shadow'
            });

        $('.app-areceber-tooltip-actions')
            .each(function(){
                $(this)
                    .tooltipster('content',
                        $('<div class="ui content"></div>')
                            .append($('<div class="ui labeled icon menu"></div>')
                                .append($(
                                    '    <div class="cursor item">' +
                                    '      <i class="money middle aligned icon"></i>' +
                                    '      Dar Baixa ' +
                                    '    </div>')//.api(tshark.api)
                                )

                                .append($(
                                    '    <div class="cursor item">' +
                                    '      <i class="cancel middle aligned icon"></i>' +
                                    '      Cancelar ' +
                                    '    </div>')//.api(tshark.api)
                                )

                                .append($(
                                    '    <div class="cursor item" data-action="dbms financeiro fin_apagar edit" data-key="' + $(this).data('key') + '">' +
                                    '      <i class="edit middle aligned icon"></i>' +
                                    '      Alterar ' +
                                    '    </div>')//.api(tshark.api)
                                )
                            ))

                /*
                 '    <div class="cursor item">' +
                 '      <i class="money middle aligned icon"></i>' +
                 '      Dar Baixa ' +
                 '    </div>' +

                 '    <div class="cursor item">' +
                 '      <i class="cancel middle aligned icon" onclick="alert(1)"></i>' +
                 '      Cancelar' +
                 '    </div>' +

                 '    <div class="cursor item" data-action="dbms financeiro fin_apagar edit" data-key="' + $(this).data('key') + '">' +
                 '      <i class="edit middle aligned icon"></i>' +
                 '      Alterar' +
                 '    </div>' +

                 ).api(tshark.api))*/

            });

    }

    //endregion
    

    //region :: Eventos Disponíveis


    //region :: Eventos - List

    /**
     * Chamado antes de requisitar uma listagem no server
     *
     onBeforeList: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos - Search

    /**
     * Chamado antes de executar uma pesquisa no server
     *
     onBeforeSearch: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos - Edit


    /**
     * Chamado após receber a interface de edição
     *
     onAfterEdit: function(response, next){

    },

     /* */
    //endregion


    //region :: Eventos - Create


    /**
     * Chamado após receber a interface de inserção
     *
     onAfterCreate: function(response, next){

    },

     /* */
    //endregion


    //region :: Eventos - Edit / Create

    /**
     * Chamado antes de requisitar uma interface de formulário
     *
     onBeforeForm: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos - Insert

    /**
     * Chamado antes de enviar os dados de inserção ao server
     *
     onBeforeInsert: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a execução de um insert no server
     *
     onAfterInsert: function(response, next){

    },

     /* */
    //endregion


    //region :: Eventos - Update

    /**
     * Chamado antes de enviar os dados de edição ao server
     *
     onBeforeUpdate: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a execução de um update no server
     *
     onAfterUpdate: function(response, next){

    },

     /* */
    //endregion


    //region :: Eventos - Delete

    /**
     * Chamado antes de enviar os dados de deleção ao server
     *
     onBeforeDelete: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a execução de um delete no server
     *
     onAfterDelete: function(response, next){

    },

     /* */
    //endregion


    // region :: Eventos - Save

    /**
     * Chamado antes de enviar qualquer operação de insert ou update ao server
     *
     onBeforeSave: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após qualquer operação de insert ou update no server
     *
     onAfterSave: function(response, next){

    },

     /* */
    //endregion

    //endregion

});


//# sourceURL=dbms.financeiro.fin_areceber