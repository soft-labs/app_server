/*
 * Menu da aplicação
 */
module.exports = {
    rows: [

        // Menu de Usuários
        {
            label: "Sistema",
            area: "app_home",
            icon: "options icon",
            submenu: [
                {
                    label: "Sonhos",
                    icon: "cloud icon",
                    client: 'app.automod.show',
                    index: '1'
                },
                {
                    label: "Usuários",
                    icon: "users icon",
                    client: 'app.automod.show',
                    index: '0'
                },
                {
                    label: "APIs",
                    icon: "terminal icon",
                    subarea: "app_apis"
                },
                {
                    label: "Configurações",
                    icon: "settings icon",
                    subarea: "app_config"
                },
                {
                    label: "Acesso",
                    icon: "protect icon",
                    subarea: "app_acesso"
                },
                {
                    label: "Sair do Sistema",
                    icon: "log out icon",
                    api: "sys app security logout"
                }
            ]
        }
    ]
};