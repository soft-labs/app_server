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
        register: [
            'sys.app.menu'
        ]
    });

    // Inicializa o app
    app.init();

});

/**
 * Implementação da interface da aplicação
 * @since 28/04/16
 */
app = $.extend(true, app, {

    // Modo atual da aplicação
    mode: 'desenv',


    // Inicializador da aplicação
    init: function () {

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
        
        // Inicializa cockpit
        this.cockpit.init();

    },


    //region :: Estruturas da aplicação

    // Informações genéricas na interface
    info: {
        title   : 'Sistema Martins Lanna',
        subtitle: 'Suite de aplicações para os processos da mineradora',
        help    : '',
        icon    : 'circular settings icon'
    },
    
    // Submenu dinâmico
    submenu: [],

    // Repositório de dados do app
    struct: {

        // Objeto para armazenamento das informações do pack que será criado
        bar: {
            icon   : '',
            area   : 'teste',
            secao  : '123'
        },

        financeiro: {
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


    //region :: Eventos

    /**
     * Intercepta o afterlist GLOBAL e implementa a atualização
     * das listagens de todos os módulos apontando dinâmicamente
     * para um mesmo layout.
     * @param mod
     * @param response
     */
    onAfterList: function(mod, response){

        // Bind\
        tshark.initIntf();

        // Limpa a área de pesquisa
        $('#search').val('');

        // Exibe a janela de listagem
        $('#list')
            .modal('setting', 'transition', 'fade')
            // .modal('setting', 'allowMultiple', true)
            .modal('show');
    },

    /**
     * Intercepta o afterform GLOBAL e implementa os formulários
     * de todos os módulos apontando dinâmicamente para um mesmo
     * layout.
     * @param mod
     * @param response
     */
    onAfterForm: function(mod, response){

        // Bind
        tshark.rebind(                              // Rebind pq a cada form o módulo de origem de dados pode ter mudado
            '#form',                                // Bind feito no ponto mais alto do layout
            mod,                                    // (Novo) Mod de origem dos dados
            [".description", mod.form.obj]          // Aplica o template em uma região do layout '.description'
        );

        // Exibe a janela do form
        $('#form')
            .modal('setting', 'transition', 'fade')
            .modal('setting', 'allowMultiple', true)
            .modal('show');
    },

    /**
     * Exibe mensagem após a operação de update
     * @param mod
     * @param response
     */
    onAfterUpdate: function(mod, response){
        this.checkSave(mod, response);
    },

    /**
     * Exibe mensagem após a operação de insert
     * @param mod
     * @param response
     */
    onAfterInsert: function(mod, response){
        this.checkSave(mod, response);
    },

    /**
     * Centraliza a exibição de mensagens de update
     * e insert.
     * @param mod
     * @param response
     */
    checkSave: function(mod, response){
        if (response['result']){
            alertify.success('Operação executada com sucesso!');
        } else {
            alertify.error('Não foi possível completar a operação.');
            alertify.error('Por favor, tente novamente.');
        }
    },

    //endregion


    //region :: Regras de Negócio

    //endregion

});


//region :: Extras

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