/**
 * Inicialização do sistema após o fim
 * da carga do browser
 * @since 20/02/16
 */
var tshark = tshark || new TShark();
$(document).ready(function() {

    // Inicializa TShark
    tshark.init({
        register: [
            'sys.dev.ide'
        ]
    });

    // Inicializa o app
    app.init(); 
    
});


/**
 * Implementação da interface da aplicação
 * @since 10/03/16
 */
var app = {
    
    // Modo atual da aplicação
    mode: 'desenv',

    // Inicializador da aplicação
    init: function () {

        // Registrando o módulo da IDE
        //tshark.register('sys.dev.ide');

        // Bind interface
        tshark.bind('#ide', this);

        // Carga de dados
        this.conn.load('getConexoes');
        this.bizobj.load('listModulos');

        // Ajusta o dataset de package
        this.package.modulos.key = "name";

    },


    //region :: Estruturas da aplicação
    
    // Informações genéricas na interface
    info: {
        titulo  : 'Geração de Objetos de Negócio',
        desc    : 'Gere objetos de negócio à partir da base de dados',
        help    : '',
        icon    : 'circular settings icon'
    },

    // Objeto que irá armazenar as conexões disponíveis
    conn: new Dataset('sys.dev.ide'),

    // Objeto que irá armazenar as tabelas encontradas em uma conexão
    tabelas: new Dataset('sys.dev.ide'),
    
    // Objeto que irá armazenar os pacotes existentes no server
    bizobj: new Dataset('sys.dev.ide'),

    // Objeto para armazenamento das informações do pack que será criado
    package: {
        id      : '',
        owner   : '',
        modulos : new Dataset(this.path)
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

        // Bind
        tshark.rebind(                              // Rebind pq a cada listagem o módulo de origem dos dados pode ser outro
            '#list',                                // Bind feito no ponto mais alto do layout
            mod,                                    // (Novo) Mod de origem dos dados
            ['#listagem', response.layout['list']]  // Aplica o template em uma região do layout '#list'
        );

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
        if (response['result'] && response['result'] == 1){
            alertify.success('Operação executada com sucesso!');
        } else {
            alertify.error('Não foi possível completar a operação.');
            alertify.error('Por favor, tente novamente.');
        }
    },

    //endregion
    
    
    //region :: Regras de Negócio


    //region :: Listagem de tabelas
    
    /**
     * Carrega tabelas do banco da conexão.
     * Atenção! this neste contexto é o elemento DOM do click! 
     */
    refreshTables: function(){
        app.tabelas.clear();
        app.tabelas.load('getTables', {
            connID: app.conn.row['id']
        });
    },

    /**
     * Move uma tabela da lista para o novo package.
     * Atenção! this neste contexto é o elemento DOM do click!
     */
    addTable: function(ev){
        var key   = ev.currentTarget.dataset['id']
            , row = app.tabelas.getRow(key)
        ;

        if (row) {
            app.package.modulos.addRow(row);
            app.tabelas.delRow(key);
        }
    },

    /**
     * Remove uma tabela do pacote a ser criado.
     * Atenção! this neste contexto é o elemento DOM do click!
     */
    delTable: function(ev){
        var key   = ev.currentTarget.dataset['id']
            , row = app.package.modulos.getRow(key)
        ;

        if (row) {
            app.tabelas.addRow(row);
            app.package.modulos.delRow(key);
        }
    },

    
    //endregion


    //region :: Criação de packages
    
    /**
     * Cria packages chamando a api createPackage em sys.dev.ide
     * Atenção!!! No módulo, o evento 'onCreatePackage' será 
     * responsável pelo refresh da árvore de app.bizobj
     */
    createPackage: function(){
        // tshark.call('exec sys dev ide createPackage', {  // - Chamada pelo TShark, usando path completo
        // sys.dev.ide.call('exec createPackage', {         // - Chamada pelo módulo, usando call genérico 
        sys.dev.ide.exec('createPackage', {                 // - Chamada pelo módulo, usando call específico
            id      : app.package.id,
            owner   : app.package.owner,
            modulos : app.package.modulos.rows,
            connID  : app.conn.row['id']
        });
    },

    //endregion


    //region :: Package Preview
    
    /**
     * Exibe uma listagem defaul para um módulo selecionado
     */
    showList: function(){
        var   o = $(this).data('owner')
            , p = $(this).data('pack')
            , m = $(this).data('mod')
        ;

        tshark.call('list ' + o + '  ' + p + ' ' + m);
    }
    
    //endregion
    
    
    //endregion
    
};
