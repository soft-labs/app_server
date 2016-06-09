/**
 * Área principal do app
 */
app.areas.add('app_home', {

    /**
     * Chamado na inicialização do app
     */
    init: function(){


        //region :: Charts
        
        // Forecast
        app.charts.add('chart_forecast', {
            type: 'bar',
            options: {
                slegend: false,
                ztitle: false
            }
        }, {
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
        });
        
        //endregion
        
        
        

        this.charts = {};
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

        this.onShow();
    },

    /**
     * Chamado sempre que o módulo é exibido
     */
    onShow: function(){
        app.actionbar.reset([
            {icon: 'add icon', title: 'Contas à Pagar',   description: 'Gestão de Gastos e Despesas',  client: 'app areas show', area: 'app_financas', subarea: 'app_apagar'},
            {icon: 'add icon', title: 'Contas à Receber', description: 'Gestão de Recebimentos',       client: 'app areas show', area: 'app_financas', subarea: 'app_areceber'},
            {icon: 'add icon', title: 'Fluxo de Caixa',   description: 'Gestão do Fluxo de Caixa'}
        ]);
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
        }

    }

});

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