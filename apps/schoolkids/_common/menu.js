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
                    area: 'app-caixa',
                    submenu: [
                        {
                            label: "Agrupar por",
                            submenu: [
                                {label: "Data"},
                                {label: "Semana"},
                                {label: "Quinzena"},
                                {label: "Previsto x Realizado"},
                                {label: "Receitas x Despesas"}
                            ]
                        },
                        {
                            label: "Visualizar",
                            submenu: [
                                {label: "Fluxo padrão"},
                                {label: "Por Contas Gerenciais"},
                                {label: "Por Centros de Resultado"}
                            ]
                        }
                    ]
                },
                {
                    label: "Contas à Pagar",
                    api: "dbms financeiro fin_apagar list",
                    area: 'app_apagar'
                },
                {
                    label: "Contas à Receber",
                    api: "dbms financeiro fin_areceber list",
                    area: 'app_areceber'
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
            area: "app_cadastros",
            icon: "edit icon",
            submenu: [
                {
                    label: "Clientes",
                    api: "softlabs empresas emp_clientes create",
                    area: "app_contas"
                },
                {
                    label: "Fornecedores",
                    api: "softlabs empresas emp_fornecedores list",
                    area: "app_contas"
                },
                {
                    label: "Bancos e Contas",
                    api: "softlabs financeiro fin_contas list",
                    area: "app_contas"
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
                    area: "app_home"
                },
                {
                    label: "Configurações"
                },
                {
                    label: "Segurança"
                },
                {
                    label: "Sair do Sistema",
                    api: "sys app security logout"
                }
            ]
        }
    ]
};