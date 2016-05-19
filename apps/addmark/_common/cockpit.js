/**
 * Created by labs on 05/05/16.
 */
app.cockpit = {

    /**
     * Chamado na inicialização do app
     */
    init: function(){

        this.charts = {};

        // Forecast
        var ctx = document.getElementById("chartForecast").getContext("2d");
        this.charts.forecast = new Chart(ctx, {
            type: 'bar',
            data: this.struct.forecast,
            options: {
                responsive: true,
                title: false,
                legend: { position: 'bottom' }
            }
        });

        // Impacto
        ctx = document.getElementById("chartImpacto").getContext("2d");
        this.charts.impacto = new Chart(ctx, {
            type: 'radar',
            data: this.struct.impacto,
            options: {
                legend: false,
                title: false,
                scale: {
                    reverse: false,
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }
            }
        });

        // Pagamentos
        ctx = document.getElementById("piePagtos").getContext("2d");
        this.charts.piePagtos = new Chart(ctx, {
            type: 'pie',
            data: this.struct.despesas.pie,
            options: {
                slegend: false,
                ztitle: false
            }
        });

        ctx = document.getElementById("barPagtos").getContext("2d");
        this.charts.barPagtos = new Chart(ctx, {
            type: 'bar',
            data: this.struct.desp_bar,
            options: {
                slegend: false,
                ztitle: false
            }
        });

        // Receitas
        ctx = document.getElementById("pieRec").getContext("2d");
        this.charts.pieRec = new Chart(ctx, {
            type: 'pie',
            data: this.struct.receitas.pie,
            options: {
                slegend: false,
                ztitle: false
            }
        });

        ctx = document.getElementById("barRec").getContext("2d");
        this.charts.barPagtos = new Chart(ctx, {
            type: 'bar',
            data: this.struct.rec_bar,
            options: {
                slegend: false,
                ztitle: false
            }
        });


        this.setData(0, 'despesas');
        this.setData(2, 'receitas');
        //this.struct.despesas.data = this.struct.despesas._raw.pivot('data');
        //this.struct.receitas.data = this.struct.receitas._raw.pivot('data');


        // Registra submenus
        $('.app-submenu-trigger')
            .popup({
                popup : $('.app-submenu-popup'),
                on    : 'click',
                position: 'top left',
                lastResort: 'bottom left'
            })
        ;

    },

    /**
     * Chamado sempre que o módulo é exibido
     */
    show: function(){
        
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

    },

    popSubmenu: function(){
        var s   = $(this).data('sub')
            , k = $(this).data('key')
        ;
        app.cockpit.setData(k, s);
    },

    setData: function(opt, s){

        switch (opt){
            case 0:
                app.cockpit.struct[s].data = app.cockpit.struct[s]._raw.pivot('data');
                break;

            case 1:
                app.cockpit.struct[s].data = app.cockpit.struct[s]._raw.pivot('nome', '_stats.sum.valor', true);
                break;

            case 2:
                app.cockpit.struct[s].data = app.cockpit.struct[s]._raw.pivot('historico', '_stats.sum.valor', true);
                break;
        }

        app.cockpit.setPie(s);

    },

    setPie: function(s){

        var pie = app.cockpit.charts[(s == 'receitas' ? 'pieRec' : 'piePagtos')];
        pie.data.labels = [];
        pie.data.datasets = [];
        pie.data.datasets.push({data: [], backgroundColor: []});

        var l = app.cockpit.struct[s].data.length
            , i = Math.random();
        app.cockpit.struct[s].data.forEach(r => {
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
    }
    
};