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

        // Áreas ativas
        app.areas.init('app_home', 'app_apis');

        // Ativa o menu principal
        $('.app-menu-trigger')
            .popup({
                popup : $('.app-menu-popup'),
                on    : 'click',
                position: 'bottom right',
                lastResort: 'bottom right'
            })
        ;

        //region :: Automod

        this.automod.init({
            area    : 'app_home',
            subarea : 'app_automod',
            icon    : 'settings',
            itens: [
                {
                    label: "Usuários",
                    info: "Administração de usuários cadastrados no Dreams",
                    icon: "left floated big users icon",
                    path: "dreams users users"
                },
                {
                    label: "Sonhos",
                    info: "Gestão dos sonhos cadastrados",
                    icon: "left floated big cloud icon",
                    path: "dreams dreams dreams"
                },
                {
                    label: "Categorias",
                    info: "Gestão das categorias de sonhos sugeridos",
                    icon: "left floated big tag icon",
                    path: "dreams dreams dream_categorias"
                },
                {
                    label: "Sonhos",
                    info: "Gestão das sub categorias dos sonhos sugeridos",
                    icon: "left floated tags cloud icon",
                    path: "dreams dreams dream_subcategorias"
                }
            ]
        });

        //endregion
        
        
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
                id   : 'login',
                label: 'Login',
                info : '',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'forgotpwd',
                label: 'ForgotPWD',
                verbs: [
                    {op: 'post',   label: 'POST  "\\"'}
                ]
            },
            {
                id   : 'profile',
                label: 'Profile',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'put',     label: 'PUT  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                ]
            },
            {
                id   : 'users_suggested',
                label: 'Users Suggested',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                ]
            },
            {
                id   : 'dreamers',
                label: 'Dreamers',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'put',     label: 'PUT  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                ]
            },
            {
                id   : 'following',
                label: 'Following',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            {
                id   : 'followall',
                label: 'FollowAll',
                verbs: [
                    {op: 'post',    label: 'POST "\\"'},
                ]
            },
            {
                id   : 'followers',
                label: 'Followers',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'put',     label: 'PUT  "\\"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },


            {
                id   : 'mydreams',
                label: 'MyDreams',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },

            {
                id   : 'feedall',
                label: 'FeedAll',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'feedfollowing',
                label: 'FeedFollowing',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            
            {
                id   : 'dreamtoo',
                label: 'DreamToo',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            
            {
                id   : 'dreamfollowing',
                label: 'DreamFollowing',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },

            {
                id   : 'tocometrue',
                label: 'To Come True',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'comingtrue',
                label: 'Coming True',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'cametrue',
                label: 'CameTrue',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'suggested',
                label: 'Suggested',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'}
                ]
            },
            {
                id   : 'category',
                label: 'Category',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            {
                id   : 'subcategory',
                label: 'SubCategory',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            
            {
                id   : 'dreamcomments',
                label: 'DreamComments',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            {
                id   : 'dreamlikes',
                label: 'DreamLikes',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },

            {
                id   : 'albuns',
                label: 'Album',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            {
                id   : 'albumcomments',
                label: 'AlbumComments',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },
            {
                id   : 'albumlikes',
                label: 'AlbumLikes',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },

            {
                id   : 'denuncy',
                label: 'Denuncy',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'}
                ]
            },
            

            {
                id   : 'dreams',
                label: 'Dreams (API Global)',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            },            
            {
                id   : 'users',
                label: 'User (API Global)',
                verbs: [
                    {op: 'list',    label: 'GET  "\\"'},
                    {op: 'post',    label: 'POST "\\"'},
                    {op: 'put',     label: 'PUT  "\\id"'},
                    {op: 'delete',  label: 'DELETE "\\id"'}
                ]
            }
        ]
    },

    //endregion


    //region :: Eventos

    onBeforeXHR: function(xhr){
        var t = $('#token').val();
        if (t){
            xhr.setRequestHeader ('x-api-auth-dreamer', t);
        }
        
        xhr.setRequestHeader ('x-api-auth-token', 'b778b0aad2ceda1b1577a77ba1f295e14fce706b33d17469cf477194f76a633a');
        return xhr;
    },

    /**
     * Intercepta qualquer retorno e monta o 
     * result na tela
     */
    onResponse: function(mod, response, next){
        if (!mod) {
            app.updateRes(response);
        }
        next();
    },



    onDelete: function(mod, response, next){
        app.updateRes(response);
        next();
    },

    /**
     * Intercepta o afterform GLOBAL e implementa os formulários
     * de todos os módulos apontando dinâmicamente para um mesmo
     * layout.
     * @param mod
     * @param response
     */
    zonAfterForm: function(mod, response){

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
     *
     */
    zonBeforeInsert: function(el, settings){

        var p = $('#params').val();
        if (!p) return true;

        var tmp = p.split(',')
            , q = {}
        ;
        settings.data.row = settings.data.row || {};
        tmp.forEach(t => {
            var p2 = t.split('=');
            if (p2.length) {
                q[p2[0]] = p2[1];
                settings.data.row[p2[0]] = p2[1];
            }
        });
        tshark.send(q);

        // Libera ou não para continuar
        return true;
    },

    zonBeforeUpdate: function(el, settings) {
        settings.data.row['img_profile'] = extra_data['img_profile'];
        return true;
    },

    /**
     * Centraliza a exibição de mensagens de update e insert.
     */
    zonAfterSave: function(mod, response, next){
        if (response['result']){
            alertify.success('Operação executada com sucesso!');
            $('#listagem')
                .empty()
                .html('<pre style="width: 100%"><code style="width: 100%">' +
                    JSON.stringify(response, null, 4) +
                    '</code></pre>'
                );

        } else {
            alertify.error('Não foi possível completar a operação.');
            alertify.error('Por favor, tente novamente.');
        }
        next();
    },

    //endregion


    //region :: Regras de Negócio

    updateRes: function(response){
        $('#listagem')
            .empty()
            .html('<pre style="width: 100%"><code style="width: 100%">' +
                JSON.stringify(response, null, 4) +
                '</code></pre>'
            );
    },

    updateVerb: function(){
        var i = $(this).val();
        app.struct.verb = app.struct.apis[i].verbs;
        app.struct.url = '/dreams/' +  app.struct.apis[i].id;
    },

    callAPI: function(){
        var path  = $('#url').val().split('/')
            , p   = $('#params').val()
            , v   = $('#verb').val()
            , k   = $('#key').val()
            , api = app.struct.verb[v].op
            , data = {
                router: '/mobile',
                _token: $('#token').val()
            }
        ;

        var tmp = p.split(',')
            , q = {}
        ;
        tmp.forEach(t => {
            var p2 = t.split('=');
            if (p2.length) {
                q[p2[0]] = p2[1];
            }
        });
        tshark.send(q);

        switch (api){
            case 'put':
            case 'delete':
                tshark.send('row', q);
                tshark.send('key', k);
                api += ' ' + k;
                break;

            case 'post':
                tshark.send('row', q);
                break;

            case 'get':
            case 'edit':
            case 'list':
                api += ' ' + k;
                break;

            case 'followall':
                tshark.call('dreams users followall');
                return;
        }

        $('#listagem').empty();

        tshark.call(path.join(' ') + ' ' + api, data);
    }

    //endregion

});
