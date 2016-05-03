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
                    submenu: [
                        {
                            label: "Agrupar por",
                            submenu: [
                                {label: "Data"},
                                {label: "Semana"},
                                {label: "Quinzena"},
                                {label: "Previsto x Realizado"},
                                {label: "Receitas x Despesas"},
                            ]
                        },
                        {
                            label: "Visualizar",
                            submenu: [
                                {label: "Fluxo padrão"},
                                {label: "Por Contas Gerenciais"},
                                {label: "Por Centros de Resultado"},
                            ]
                        }
                    ]
                },
                {
                    label: "Contas à Pagar"
                },
                {
                    label: "Contas à Receber"
                },
                {
                    label: "Demonstrativo de Resultados"
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
                    label: "Vendas"
                },
                {
                    label: "Cartões"
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
                    label: "Clientes"
                },
                {
                    label: "Fornecedores"
                },
                {
                    label: "Bancos e Contas"
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
                    label: "Tela Inicial",
                    area: "app-home"
                },
                {
                    label: "Configurações"
                },
                {
                    label: "Permissões de Acessos"
                },
                {
                    label: "Sair do Sistema",
                    api: "sys app security logout"
                }
            ]
        }
    ]
};