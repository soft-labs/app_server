/**
 * Área de Clientes
 */
app.areas.add('app_sistema', {

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
     * Subarea Cconfigurações
     */
    'app_configuracoes':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {
                    icon: 'home icon',
                    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'app areas show',
                    area: "app_home"
                },
                {
                    icon: 'settings icon',
                    title: 'Configurações',
                    description: 'Configurações gerais do sistema',
                    active: 1
                }
            ]);
        }
    },
    
    /**
     * Subarea Automod
     */
    'app_automod':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {
                    icon: 'home icon',
                    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'app areas show',
                    area: "app_home"
                },
                {
                    icon: 'settings icon',
                    title: 'Configurações',
                    description: 'Configurações gerais do sistema',
                    client: 'app areas show',
                    area: "app_sistema",
                    subarea: "app_configuracoes",
                },
                {
                    icon: 'edit icon',
                    title: 'Edição',
                    description: 'Registros encontrados',
                    active: 1
                }
            ]);
        },
    },

    /**
     * Subarea Segurança
     */
    'app_seguranca':{

        /**
         * Chamado sempre que a área é exibida
         */
        onShow: function (area, subarea, data) {
            app.actionbar.reset([
                {
                    icon: 'home icon',
                    title: 'Home',
                    description: 'Cockpit financeiro',
                    client: 'app areas show',
                    area: "app_home"
                },
                {
                    icon: 'payment icon',
                    title: 'Contas Bancárias',
                    description: 'Gestão de Contas Financeiras',
                    client:'app areas show',
                    area:'app_cadastros',
                    subarea:'app_contas'
                },
                {
                    icon: 'add icon',
                    title: 'Cadastrar Conta',
                    description: 'Cadastrar nova conta',
                    server: 'dbms financeiro fin_contas create',
                    active: 1
                }
            ]);
        },
    },
    
    // endregion

});