/**
 * TShark - Client 3.0
 * Módulos de interface: Módulo de exemplo
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('sys.app.exemplo', {

    /**
     * Permite extender uma classe qualquer
     */
    extends: 'configuracoes',

    /**
     * Inicialização do módulo
     */
    init: function(){

        // Deine estrutura de informações para utilização no layout
        this.info = {
            titulo: 'Mapeamento de Filiais',
            info: 'Filiais registradas na retaguarda mapeadas para lojas no PDV',
            help: 'Configure nesta área o relacionamento entre filiais registradas na retaguarda e as registradas no PDV',
            icon: 'settings icon'
        };

    },


    //region :: Eventos - List

    /**
     * onBefore: Chamado antes de descer ao server
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeList: function(sender, settings){

        // Personaliza template
        //settings.data['template'] = 'meu_list';

        // Personaliza provider
        settings.data['provider'] = {
            limit: 500
        };

        // Dá prosseguimento
        return true;
    },
    
    /**
     * on: Chamado no retorno do server antes do processamento default da API no client
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
     onList: function(response, next){
        next();
    },
    
     /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
     onAfterList: function(response){
     },
    
    //endregion

    //region :: Eventos - Get

    /**
     * onBefore: Chamado antes de descer ao server
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeGet: function(sender, settings){

        // Personaliza template
        //settings.data['template'] = 'meu_list';

        // Personaliza provider
        settings.data['provider'] = {
            limit: 500
        };

        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default da API no client
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onGet: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterGet: function(response){
    },

    //endregion
    
    //region :: Eventos - Search

    /**
     * onBefore: Chamado antes de descer ao server
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeSearch: function(sender, settings){

        // Personaliza template
        //settings.data['template'] = 'meu_list';

        // Personaliza provider
        settings.data['provider'] = {
            limit: 500
        };

        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default da API no client
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onSearch: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterSearch: function(response){
    },

    //endregion

    //region :: Eventos - Forms

    /**
     * onBefore: Chamado antes de descer ao server em chamadas de Edit ou Create
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeForm: function(sender, settings){

        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default em chamadas de Edit ou Create
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onForm: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterForm: function(response){
    },

    //endregion

    //region :: Eventos - Edit

    /**
     * onBefore: Chamado antes de descer ao server em chamadas de Edit ou Create
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeEdit: function(sender, settings){

        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default em chamadas de Edit ou Create
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onEdit: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterEdit: function(response){
    },

    //endregion

    //region :: Eventos - Create

    /**
     * onBefore: Chamado antes de descer ao server em chamadas de Edit ou Create
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeCreate: function(sender, settings){
        
        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default em chamadas de Edit ou Create
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onCreate: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterCreate: function(response){
    },

    //endregion

    //region :: Eventos - Update

    /**
     * onBefore: Chamado antes de descer ao server em chamadas de Edit ou Create
     * @param sender elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeUpdate: function(sender, settings){

        // Dá prosseguimento
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default em chamadas de Edit ou Create
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     */
    onUpdate: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterUpdate: function(response){
    },

    //endregion
    
});
//# sourceURL=sys.app.exemplo.js