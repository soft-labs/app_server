/*
 * Menu da aplicação
 */
module.exports = {
    rows: [

        // Menu de finanças
        {
            label: "Finanças",
            area: "app-financas",
            icon: "line chart icon",
            submenu: [
                {
                    label: "Fluxo de Caixa",
                    subarea: 'app-caixa'
                },
                {
                    label: "Contas à Pagar",
                    server: "dbms financeiro fin_apagar list",
                    subarea: 'app-apagar'
                },
                {
                    label: "Contas à Receber",
                    server: "dbms financeiro fin_areceber list",
                    subarea: 'app-areceber'
                },
                {
                    label: "Resultados"
                }
            ]
        },

        // Menu de integrações
        {
            label: "Integrações",
            area: "app-integracoes",
            icon: "cloud download icon",
            submenu: [
                {
                    label: "Operações de Loja"
                },
                {
                    label: "Cartões"
                },
                {
                    label: "Bancárias"
                }
            ]
        },

        // Menu de cadastros
        {
            label: "Cadastros",
            area: "app-cadastros",
            icon: "edit icon",
            submenu: [
                {
                    label: "Clientes",
                    server: "softlabs empresas emp_clientes create",
                    area: "app-contas"
                },
                {
                    label: "Fornecedores",
                    server: "softlabs empresas emp_fornecedores list",
                    area: "app-contas"
                },
                {
                    label: "Bancos e Contas",
                    server: "softlabs financeiro fin_contas list",
                    area: "app-contas"
                },
                {
                    label: "Plano de Contas"
                }
            ]
        },

        // Menu de Sistema
        {
            label: "Sistema",
            area: "app-sistema",
            icon: "options icon",
            submenu: [
                {
                    label: "Cockpit",
                    area: "app-home"
                },
                {
                    label: "Configurações"
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