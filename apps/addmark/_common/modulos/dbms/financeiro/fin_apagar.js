/**
 * TShark - Client 3.0
 * Funcionalidades de interface: fin_apagar
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Sun May 29 2016 09:15:38 GMT-0300 (BRT)
 */
tshark.modulos._add('dbms.financeiro.fin_apagar', {

    /**
     * Inicializa o menu
     */
    init: function(){

        //region :: Chart / List

        app.charts.add('apagar', 'chart_apagar', {
            type: 'bar',
            options: {
                slegend: false,
                ztitle: false
            }
        }, {
            labels: [],
            datasets: [{
                type: 'bar',
                label: 'Despesas',
                backgroundColor: "#F7464A",
                data: [],
                borderColor: 'black',
                borderWidth: 1
            }]
        });

        this.displayOpts = [
            {value: 1, icon: 'icon list',  label: 'Listagem'},
            {value: 2, icon: 'icon bar chart', label: 'Gráfico'}
        ];

        $('.display.apagar')
            .dropdown({
                onChange: function(value, text, $choice){
                    $('#chart_apagar')
                        .transition(value == '1' ? 'hide' : 'show');
                    $('.lista.apagar')
                        .transition(value == '2' ? 'hide' : 'show');
                }
            })
            .dropdown('set selected', 1);

        //endregion

        //region :: Pivot

        this.data.group = [];
        
        this.pivotOpts = [
            {value: 1, icon: 'icon tasks', label: 'Vencimento'},
            {value: 2, icon: 'icon tasks', label: 'Fornecedores'},
            {value: 3, icon: 'icon tasks', label: 'Situação'},
            {value: 4, icon: 'icon tasks', label: 'Grupo'}
        ];
        
        $('.pivot.apagar')
            .dropdown({
                onChange: function(value, text, $choice){
                    dbms.financeiro.fin_apagar.pivotData();
                }
            })
            .dropdown('set selected', 1);
        
        //endregion

    },


    //region :: Eventos - List

    /**
     * Chamado antes de requisitar uma listagem no server
     *
    onBeforeList: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após a listagem de dados
     */
    onAfterList: function(response, next){
        this.pivotData();
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

     /**
     * Chamado após a execução de uma pesquisa
     */
    onAfterSearch: function(response, next){
        this.pivotData();
    },

     /* */
    //endregion


    //region :: Eventos - Edit

    /**
     * Chamado antes de requisitar um form de edição no server
     *
    onBeforeEdit: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após receber a interface de edição
     *
    onAfterEdit: function(response, next){

    },

    /* */
    //endregion


    //region :: Eventos - Create

    /**
     * Chamado antes de requisitar um form de inserção no server
     *
    onBeforeCreate: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

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

    /**
     * Chamado após receber qualquer das interfaces de formulário
     *
    onAfterForm: function(response, next){

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
    
    
    //region :: Regras de Negócio

    /**
     * Executa o pivotamento de dados para os
     * agrupamentos
     */
    pivotData: function(){
        var p = $('.pivot.apagar').dropdown('get value');

        switch (p){

            case '2':
                dbms.financeiro.fin_apagar.data.group = dbms.financeiro.fin_apagar.data.rows.pivot('parceiro', '_stats.sum.valor', true);
                break;

            case '3':
                dbms.financeiro.fin_apagar.data.group = dbms.financeiro.fin_apagar.data.rows.pivot('lanc_status', '_stats.sum.valor', true);
                break;

            case '4':
                dbms.financeiro.fin_apagar.data.group = dbms.financeiro.fin_apagar.data.rows.pivot('descricao', '_stats.sum.valor', true);
                break;

            default:
                dbms.financeiro.fin_apagar.data.group = dbms.financeiro.fin_apagar.data.rows.pivot('dt_vencimento');
                break;
        }

        // Ajusta os dados do gráfico de barras
        dbms.financeiro.fin_apagar.setChartBarData();
    },

    /**
     * Alimenta o bar chart com dados
     */
    setChartBarData: function(){
        app.charts.data.apagar.labels = [];
        app.charts.data.apagar.datasets[0].data = [];

        dbms.financeiro.fin_apagar.data.group.forEach(row => {
            app.charts.data.apagar.labels.push(row.label);
            app.charts.data.apagar.datasets[0].data.push(row._stats.sum.valor_bruto);
        });

        app.charts.reset('apagar');
    },

    /**
     * Atualiza dados quando o periodo é mudado
     */
    onChangePeriodo: function(el, dt){
        this.list();
    }

    //endregion

});


//# sourceURL=dbms.financeiro.fin_apagar