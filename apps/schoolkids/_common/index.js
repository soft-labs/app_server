/**
 * Sistema Escolar - S2 KIDS 1.0
 *  
 *
 * @engine TShark 3.0
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 29/05/2016
 */
var tshark = tshark || new TShark();

/**
 * Inicialização do sistema após o fim
 * da carga do browser
 * @since 29/05/16
 */
$(document).ready(function() {

    // Inicializa TShark
    tshark.init({
        register: [
            'sys.app.menu'
        ]
    });

    // Inicializa o app
    app.init();

});

/**
 * Implementação da interface da aplicação
 * @since 29/05/16
 */
app = $.extend(true, app, {

    // Informações genéricas na interface
    info: {
        titulo  : 'Geração de Objetos de Negócio',
        desc    : 'Gere objetos de negócio à partir da base de dados',
        help    : '',
        icon    : 'circular settings icon'
    },

    // Modo atual da aplicação
    mode: 'desenv',

    // Período de data ativo
    periodo:{
        de : moment().subtract(7, 'days').format('DD/MM/YYYY'),
        ate: moment().add(7, 'days').format('DD/MM/YYYY')
    },

    // Barra de ação
    appbar: [],

    
    // Inicializador da aplicação
    init: function () {

    },

    /**
     * Atualiza a barra de botões global do app
     * @param itens
     */
    resetAppBar: function(itens){
        this.appbar = itens;
        tshark.bindAPIs('.app-bar');
    },
    

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
        
    }


    //endregion



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