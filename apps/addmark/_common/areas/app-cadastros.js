/**
 * Área de finanças
 */
app.areas.add('app-cadastros', {

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

    // region :: Sub Areas

    /**
     * Subarea Clientes
     */
    'app-clientes':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {
                    icon: 'home icon',
                    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'sys app menu click',
                    area: "app-home"
                },
                {
                    icon: 'users icon',
                    title: 'Clientes Cadastrados',
                    description: 'Listagem',
                    client:'app areas show',
                    area:'app-cadastros',
                    subarea:'app-clientes'
                },
                {
                    icon: 'add icon',
                    title: 'Novo Cliente',
                    description: 'Cadastrar Novo',
                    server: 'dbms empresa emp_clientes create',
                    active: 1
                }
            ]);
        },
    },

    /**
     * Subarea Clientes-Detalhes
     */
    'app-clientes_detalhes':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            dbms.empresas.emp_clientes.refreshDataSet();
        }
    },


    /**
     * Subarea Fornecedores
     */
    'app-fornecedores':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {
                    icon: 'home icon',
                    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'sys app menu click',
                    area: "app-home"
                },
                {
                    icon: 'users icon',
                    title: 'Fornecedores Cadastrados',
                    description: 'Listagem',
                    client:'app areas show',
                    area:'app-cadastros',
                    subarea:'app-fornecedores'
                },
                {
                    icon: 'add icon',
                    title: 'Novo Fornecedor',
                    description: 'Cadastrar Novo',
                    server: 'dbms empresa emp_fornecedores create',
                    active: 1
                }
            ]);
        },
    },


    /**
     * Subarea Fornecedores-Detalhes
     */
    'app-fornecedores_detalhes':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            dbms.empresas.emp_fornecedores.refreshDataSet();
        }
    },

    // endregion

});