/*
 * Menu da aplicação
 */
module.exports = {
    rows: [

        // Menu de finanças
        {
            label: "Finanças",
            area: "app_financas",
            icon: "line chart icon",
            submenu: [
                {
                    label: "Fluxo de Caixa",
                    subarea: 'app_caixa'
                },
                {
                    label: "Contas à Pagar",
                    server: "dbms financeiro fin_apagar list",
                    subarea: 'app_apagar'
                },
                {
                    label: "Contas à Receber",
                    server: "dbms financeiro fin_areceber list",
                    subarea: 'app_areceber'
                },
                {
                    label: "Resultados"
                }
            ]
        },

        // Menu de integrações
        {
            label: "Operações",
            area: "app_integracoes",
            icon: "cloud download icon",
            submenu: [
                {
                    label: "Operações de Loja"
                },
               /* {
                    label: "Cartões"
                },*/
                {
                    label: "Bancárias"
                }
            ]
        },

        // Menu de cadastros
        {
            label: "Cadastros",
            area: "app_cadastros",
            icon: "edit icon",
            submenu: [
                {
                    label: "Clientes",
                    server: "dbms empresas emp_clientes list",
                    subarea: "app_clientes"
                },
                {
                    label: "Fornecedores",
                    server: "dbms empresas emp_fornecedores list",
                    subarea: "app_fornecedores"
                },
                {
                    label: "Bancos e Contas",
                    server: "dbms financeiro fin_contas list",
                    subarea: "app_contas"
                },
                {
                    label: "Plano de Contas"
                }
            ]
        },

        // Menu de Sistema
        {
            label: "Sistema",
            area: "app_sistema",
            icon: "options icon",
            submenu: [
                {
                    label: "Cockpit",
                    area: "app_home",
                    subarea: ""
                },
                {
                    label: "Configurações",
                    subarea: "app_configuracoes"
                },
                {
                    label: "Segurança"
                },
                {
                    label: "Sair do Sistema",
                    server: "sys app security logout"
                }
            ]
        }
        
    ]
};