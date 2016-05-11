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
app = $.extend(app, {

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

        // Dataset do app
        this.data = new Dataset();
        
    },


    //region :: Estruturas da aplicação

    // Informações genéricas na interface
    info: {
        titulo: 'Dreams App Server',
        desc: 'Central de APIs - Dreams',
        help: '',
        icon: 'circular settings icon'
    },

    // Estruturas de dados
    struct: {
        verb: [],
        url: '',
        apis: [
            {
                id   : 'users/users',
                label: 'User',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'users/profile',
                label: 'Profile',
                verbs: [
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'users/follower',
                label: 'Follower',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'users/following',
                label: 'Following',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'dreams/dreams',
                label: 'Dreams',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'dreams/comingtrue',
                label: 'Coming True',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                ]
            },
            {
                id   : 'dreams/cametrue',
                label: 'CameTrue',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                ]
            },
            {
                id   : 'dreams/tocometrue',
                label: 'To Come True',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                ]
            },
            {
                id   : 'dreams/albuns',
                label: 'Album',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'dreams/comments',
                label: 'Comments',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'dreams/likes',
                label: 'Likes',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            },
            {
                id   : 'dreams/denuncy',
                label: 'Denuncy',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'search',  label: 'GET  "\\?query=params"'},
                    {op: 'get',     label: 'GET  "\\id"'},
                    {op: 'create',  label: 'POST "\\"'},
                    {op: 'edit',    label: 'PUT  "\\id"'}
                ]
            }
        ]
    },

    //endregion


    //region :: Eventos

    /**
     * Intercepta qualquer retorno que contenha data
     * e monta o result na tela
     */
    onData: function(mod, response, next){
        $('#listagem')
            .empty()
            .html('<pre style="width: 100%"><code style="width: 100%">' +
                    JSON.stringify(response['data'], null, 4) +
                  '</code></pre>'
            );
        next();
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
     * Centraliza a exibição de mensagens de update e insert.
     */
    onAfterSave: function(mod, response, next){
        if (response['result']){
            alertify.success('Operação executada com sucesso!');
        } else {
            alertify.error('Não foi possível completar a operação.');
            alertify.error('Por favor, tente novamente.');
        }
        next();
    },

    //endregion


    //region :: Regras de Negócio


    updateVerb: function(){
        var i = $(this).val();
        app.struct.verb = app.struct.apis[i].verbs;
        app.struct.url = '/dreams/' +  app.struct.apis[i].id;
    },

    callAPI: function(){
        var path  = $('#url').val().split('/')
            , p   = $('#params').val()
            , v   = $('#verb').val()
            , api = app.struct.verb[v].op
            , data = {}
        ;

        switch (api){
            case 'get':
            case 'edit':
                data.key = p;
                break;

            case 'search':
                data.query = p;
                break;
        }

        tshark.call(path.join(' ') + ' ' + api, data);
    }

    //endregion

});

