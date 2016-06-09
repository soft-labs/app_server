/*
 * Menu da aplicação
 */
module.exports = {
    rows: [

        // Menu de finanças
        {
            label: "Tickets",
            area: "app_financas",
            icon: "line chart icon",
            submenu: [
                {
                    label: "Abertura",
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
                    label: "Pesagem de Entrada"
                },
                {
                    label: "Pesagem de Saída"
                },
                {
                    label: "Apontamentos"
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
                    label: "Transportadoras"
                },
                {
                    label: "Motoristas"
                },
                {
                    label: "Veículos",
                    api: 'mlanna veiculos veiculos list'
                },
                {
                    label: "Pontos de Venda"
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