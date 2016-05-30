/**
 * Área de finanças
 */
app.areas.add('app-financas', {

    /**
     * Chamado na inicialização da area
     */
    init: function () {

    },

    /**
     * Chamado sempre que a área é exibida
     */
    onShow: function (area, subarea, data) {

    },

    /**
     * Chamado quando a área deixa de ser exibida
     */
    onClose: function(new_area, new_subarea, data){
        return true;
    },

    'app-apagar':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {icon: 'home icon',    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'app areas show',
                    area: "app-home"
                },
                {icon: 'payment icon', title: 'Contas à Pagar',
                    description: 'Gestão de Gastos e Despesas'
                },
                {icon: 'add icon',     title: 'Lançar Pagamento',
                    description: 'Cadastrar nova conta',
                    server: 'dbms financeiro fin_apagar create',
                    active: 1
                }
            ]);
        }

    }


});