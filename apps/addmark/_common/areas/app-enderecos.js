/**
 * Área de Endereços
 */
app.areas.add('app-enderecos', {

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
     * Subarea Países
     */
    'app-paises':{

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
                    area: "app-home"
                },
                {
                    icon: 'marker icon',
                    title: 'Países Cadastrados',
                    description: 'Listagem',
                    client:'app areas show',
                    area:'app-enderecos',
                    subarea:'app-paises'
                },
                {
                    icon: 'add icon',
                    title: 'Novo País',
                    description: 'Cadastrar Novo',
                    server: 'dbms enderecos end_paises create',
                    active: 1
                }
            ]);
        },
    },

    // endregion

});