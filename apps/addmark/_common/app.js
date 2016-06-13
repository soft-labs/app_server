/**
 * Sistema Financeiro Addmark - Retail PRO 1.0
 *  Implementação de funcionalidades financeiras e
 *  integração com o RetailPRO
 *
 * @engine TShark 3.0
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 28/04/2016
 */
var tshark = tshark || new TShark();

/**
 * Inicialização do sistema após o fim
 * da carga do browser
 * @since 28/04/16
 */
$(document).ready(function() {

    // Inicializa TShark
    tshark.init({

        // Módulos que precisam estar disponívels do início
        register: [
            'sys.app.menu',
            'dbms.financeiro.fin_apagar',
            'dbms.financeiro.fin_areceber',
            'dbms.financeiro.fin_lancamentos',
            'dbms.movimentacoes.mov_tipos',
            'dbms.movimentacoes.movimentacoes',
        ]
        
    });

    // Inicializa o app
    app.init();

});


//region :: Extra



var rdVal = function(neg) {
    var n = (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    if (neg){
        return (n > 0 ? n*-1 : n);
    } else {
        return (n < 0 ? n*-1 : n);
    }
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};


var rec    = [rdVal(), rdVal(), rdVal(), rdVal(), rdVal(), rdVal()]
    , desp = [rdVal(1), rdVal(1), rdVal(1), rdVal(1), rdVal(1), rdVal(1)]
    , med  = []
    , mr   = 0
    , md   = 0
    , liq  = 0
    ;


rec.forEach((v, i) => {
    var n = (v + desp[i]);
    mr += v;
    md -= desp[i];
    med.push(n);
    liq += n;
});

//endregion


/**
 * Implementação da interface da aplicação
 * @since 28/04/16
 */
app = $.extend(true, app, {

    // Informações genéricas na interface
    info: {
        titulo  : 'Geração de Objetos de Negócio',
        desc    : 'Gere objetos de negócio à partir da base de dados',
        help    : '',
        icon    : 'circular settings icon'
    },
    
    config: {
        periodo: {
            min: 30,
            max: 30
        }
    },

    // Modo atual da aplicação
    mode: 'desenv',

    
    // Inicializador da aplicação
    init: function () {

        // Áreas ativas
        app.areas.init('app_home');

        // Ativa o menu principal
        $('.app-menu-trigger')
            .popup({
                popup : $('.app-menu-popup'),
                on    : 'click',
                position: 'bottom right',
                lastResort: 'bottom right'
            })
        ;

        // Ativa o menu principal
        $('#app-submenu-trigger')
            .popup({
                popup : $('.app-submenu-popup'),
                on    : 'click',
                position: 'top left',
                lastResort: 'bottom left'
            })
        ;

        
        //region :: Automod

        this.automod.init({
            area    : 'app_sistema',
            subarea : 'app_automod',
            icon    : 'settings',
            itens: [
                {
                    label: "Tipos de Movimentação",
                    info: "Configura os tipos de lançamentos do sistema",
                    path: "dbms movimentacoes mov_tipos",
                },
                {
                    label: "Categorias de Lançamentos",
                    info: "Gestão das categorias de lançamento e distribuições contábeis",
                    path: "dbms contabil cont_historicos",
                },
                {
                    label: "Categorias de Contas Gerenciais",
                    info: "Cadastro das categorias de contas gerenciais",
                    path: "dbms contabil cont_categorias",
                },
                {
                    label: "Contas Gerenciais",
                    info: "Cadastro das contas gerenciais",
                    path: "dbms contabil cont_plano_contas",
                },
                {
                    label: "Centros de Resultado",
                    info: "Cadastro dos centros de resultado",
                    path: "dbms contabil cont_centro_resultados",
                },
                {
                    label: "Tipos de Endereço",
                    info: "Cadastro de tipos de endereço",
                    path: "dbms enderecos end_tipos",
                },
                {
                    label: "Endereços Eletrônicos",
                    info: "Cadastro de tipos de endereços eletrônicos",
                    path: "dbms enderecos end_eletronico_tipos",
                },
                {
                    label: "Países",
                    info: "Cadastro de Países",
                    path: "dbms enderecos end_paises",
                },
                {
                    label: "Cidades",
                    info: "Cadastro de Cidades",
                    path: "dbms enderecos end_cidades",
                },
                {
                    label: "Bairros",
                    info: "Cadastro de Bairros",
                    path: "dbms enderecos end_bairros",
                }
            ]
        });
        
        //endregion
    },


    
    //region :: Eventos globais
    
    /**
     * Intercepta requisições de listagem para acrescentar o período do app
     */
    onBeforeList: function(el, settings){
        tshark.send('periodo', {
            de: moment(app.periodo.dt_de).format('YYYY-MM-DD'),
            ate: moment(app.periodo.dt_ate).format('YYYY-MM-DD')
        });
        
        // Libera ou não para continuar
        return true;
    },
    
    //endregion
    

    //region :: Estruturas da aplicação

    

    // Repositório de dados do app
    struct: {

        // Objeto para armazenamento das informações do pack que será criado
        bar: {
            icon   : '',
            area   : 'teste',
            secao  : '123'
        },

        zfinanceiro: {
            fluxo: [
                {
                    label: '09/04/2016', values: [
                    {receita: '0', despesa: '459.87', historico: 'Pagamento de Energia Elétrica'},
                    {receita: '0', despesa: '68.87', historico: 'Fornecedor Casa João'},
                ]
                },
                {
                    label: '10/04/2016', values: [
                    {receita: '0', despesa: '32.87', historico: 'Reparo Luminária'},
                    {receita: '500', despesa: '0', historico: 'Receita de Vendas'},
                ]
                },
                {
                    label: '11/04/2016', values: [
                    {receita: '45.78', despesa: '0', historico: 'Receita de Vendas'},
                    {receita: '0', despesa: '59.8', historico: 'Adiantamento Funcionário'},
                    {receita: '0', despesa: '43.3', historico: 'Lanches'},
                    {receita: '100', despesa: '0', historico: 'Receita de Vendas'},
                ]
                },
                {
                    label: '12/04/2016', values: [
                    {receita: '340.7', despesa: '0', historico: 'Taxa Condomínio'},
                ]
                }
            ],

            fluxo2: [
                {data: '09/04/2016', receita: '0', despesa: '459.87', historico: 'Pagamento de Energia Elétrica'},
                {data: '09/04/2016', receita: '0', despesa: '68.87', historico: 'Fornecedor Casa João'},
                {data: '10/04/2016', receita: '0', despesa: '32.87', historico: 'Reparo Luminária'},
                {data: '10/04/2016', receita: '500', despesa: '0', historico: 'Receita de Vendas'},
                {data: '11/04/2016', receita: '45.78', despesa: '0', historico: 'Receita de Vendas'},
                {data: '11/04/2016', receita: '0', despesa: '59.8', historico: 'Adiantamento Funcionário'},
                {data: '11/04/2016', receita: '0', despesa: '43.3', historico: 'Lanches'},
                {data: '11/04/2016', receita: '100', despesa: '0', historico: 'Receita de Vendas'},
                {data: '12/04/2016', receita: '340.7', despesa: '0', historico: 'Taxa Condomínio'}
            ]
        }
        
    },


    //endregion


    
    
    
    
    
    
    
    
    

    cockpit: {
    
    setPie: function(s){

        var pie = app.areas['app_home'].charts[(s == 'receitas' ? 'pieRec' : 'piePagtos')];
        pie.data.labels = [];
        pie.data.datasets = [];
        pie.data.datasets.push({data: [], backgroundColor: []});

        var l = app.areas['app_home'].struct[s].data.length
            , i = Math.random();
        app.areas['app_home'].struct[s].data.forEach(r => {
            pie.data.labels.push(r.label);
            pie.data.datasets[0].data.push(r._stats.sum.valor);
            pie.data.datasets[0].backgroundColor.push(randomColor());

        });
        pie.update();
    },

    showChartDesp: function(){
        $('.lista.despesas').transition('hide');
        $('#piePagtos').transition('show');
        $('#barPagtos').transition('show');
    },

    showListDesp: function(){
        $('#piePagtos').transition('hide');
        $('#barPagtos').transition('hide');
        $('.lista.despesas').transition('show');
    },

    showChartRec: function(){
        $('.lista.receitas').transition('hide');
        $('#pieRec').transition('show');
        $('#barRec').transition('show');
    },

    showListRec: function(){
        $('#barRec').transition('hide');
        $('#pieRec').transition('hide');
        $('.lista.receitas').transition('show');
    },

    // Repositório de dados do app
        struct: {

            forecast: {
                result: liq,
                labels: app.meses_array.slice(0,6),
                datasets: [
                    {
                        type: 'line',
                        label: 'Resultado: R$ ' + liq.formatMoney(),
                        backgroundColor: "rgba(151,187,205,0.5)",
                        data: med,
                        borderColor: 'white',
                        borderWidth: 2
                    },
                    {
                        type: 'bar',
                        label: 'Receitas: R$ ' + mr.formatMoney(),
                        backgroundColor: "rgba(100,53,201,0.8)",
                        data: rec,
                        borderColor: 'black',
                        borderWidth: 1
                    },
                    {
                        type: 'bar',
                        label: 'Despesas: R$ ' + md.formatMoney(),
                        backgroundColor: '#F7464A',
                        data: desp
                    }
                ]
            },

            impacto: {
                labels: [
                    "Segmento 1", "Segmento B", "Segmento Y", "Segmento 12",
                    "Segmento 3", "Segmento 2", "Segmento X", "Segmento Alpha"
                ],
                datasets: [
                    {
                        label: "Receitas",
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [rdVal(), null, null, null, null, rdVal(), rdVal(), rdVal()]
                    },
                    {
                        label: "Despesas",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [rdVal(), rdVal(), rdVal(), rdVal(), rdVal(), rdVal(), rdVal(), rdVal()]
                    }
                ]
            },

            receitas: {
                _raw: [
                    {data: '08/05/2016', nome: 'Comercial Sampaio', historico: 'Grupo Um',      valor: '30.0'},
                    {data: '08/05/2016', nome: 'Alfa Comunicação',  historico: 'Grupo Dois',    valor: '230.0'},
                    {data: '09/05/2016', nome: 'Cliente Final',     historico: 'Grupo Um',      valor: '54.29'},
                    {data: '10/05/2016', nome: 'Comercial Sampaio', historico: 'Grupo Seis',    valor: '25.90'},
                    {data: '10/05/2016', nome: 'Cliente Final',     historico: 'Grupo Quatro',  valor: '5.90'},
                    {data: '15/05/2016', nome: 'Visa',              historico: 'Grupo Dois',    valor: '950.90'}
                ],
                data: [],
                pie: {labels: [], datasets: []},
                options: [
                    {label: 'Vencimento'},
                    {label: 'Clientes'},
                    {label: 'Grupo'}
                ]
            },

            despesas: {
                _raw: [
                    {data: '13/05/2016', nome: 'Receita Federal',   historico: 'Grupo Alpha',   valor: '3145.90'},
                    {data: '14/05/2016', nome: 'AES Eletropaulo',   historico: 'Grupo Beta',    valor: '245.90'},
                    {data: '14/05/2016', nome: 'Vivo',              historico: 'Grupo Omega',   valor: '100.0'},
                    {data: '14/05/2016', nome: 'João da Silva',     historico: 'Grupo Alpha',   valor: '34.12'},
                    {data: '16/05/2016', nome: 'Industrias ACME',   historico: 'Grupo Beta',    valor: '48.90'},
                    {data: '16/05/2016', nome: 'Rede Ampla',        historico: 'Grupo Teta',    valor: '67.0'},
                    {data: '18/05/2016', nome: 'UNIMED',            historico: 'Grupo Omega',   valor: '200'},
                    {data: '18/05/2016', nome: 'Prefeitura Municipal', historico: 'Grupo Teta', valor: '23.90'},
                    {data: '19/05/2016', nome: 'Caluia Imports',    historico: 'Grupo Omega',   valor: '934.0'},
                    {data: '21/05/2016', nome: 'Pai e Irmãos Ltda', historico: 'Grupo Alpha',   valor: '81.0'},
                    {data: '25/05/2016', nome: 'Posto 5 Estrelas',  historico: 'Grupo Omega',   valor: '345.90'}
                ],
                data: [],
                pie: {labels: [], datasets: []},
                options: [
                    {label: 'Vencimento'},
                    {label: 'Fornecedores'},
                    {label: 'Grupo'}
                ]
            },

            desp_bar: {
                labels: ['13/05/2016', '14/05/2016', '16/05/2016', '18/05/2016', '19/05/2016', '21/05/2016', '25/05/2016'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Despesas',
                        backgroundColor: "#F7464A",
                        data: ['3145.90', '380.02', '155.9', '223.90', '934.0', '81.0', '345.90'],
                        borderColor: 'black',
                        borderWidth: 1
                    }
                ]
            },

            rec_bar: {
                labels: ['08/05/2016', '09/05/2016', '10/05/2016', '15/05/2016'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Receitas',
                        backgroundColor: "rgba(100,53,201,0.8)",
                        data: ['260.0', '54.29', '31.8', '5.90', '950.0'],
                        borderColor: 'black',
                        borderWidth: 1
                    }
                ]
            }

        }
    }

});


