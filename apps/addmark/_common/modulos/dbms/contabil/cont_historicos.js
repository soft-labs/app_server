/**
 * TShark - Client 3.0
 * Funcionalidades de interface: cont_historicos
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Fri Jun 10 2016 11:59:13 GMT-0300 (BRT)
 */
tshark.modulos._add('dbms.contabil.cont_historicos', {

    /**
     * Inicializa o menu
     */
    init: function(){

    },
    
    //region :: Eventos Disponíveis

    /**
     * Chamado após receber qualquer das interfaces de formulário
     */
    onAfterForm: function(response, next){
        var key = response.key;
        dbms.contabil.cont_historicos_resultados_rel.list({template:'_list',cont_historicos_key:key});
    },

    /**
     * Chamado após receber a interface de edição
     *
     onAfterEdit: function(response, next){
        var key = response.key;
        dbms.contabil.cont_historicos_resultados_rel.list({template:'_list',cont_historicos_key:key});
    },

     /**
     * Chamado após receber a interface de inserção
     *
     onAfterCreate: function(response, next){
        var key = response.key;
        dbms.contabil.cont_historicos_resultados_rel.list({template:'_list',cont_historicos_key:key});
    },

    /**
     * Chamado após a listagem de dados
     *
    onAfterList: function(response, next){
        this.data.group = this.data.rows.parentTree('codigo');
    },

    /**
     * Chamado após qualquer operação de insert ou update no server
     *
    onAfterSave: function(response, next){
        this.list({template: '_list'});
    },

    /**
     * Chamado após a execução de uma pesquisa
     *
    onAfterSearch: function(response, next){
        this.data.group = this.data.rows.parentTree('codigo');
    },
     
    //endregion
    
    
    //region :: Eventos Disponíveis

    //region :: Eventos - List

    /**
     * Chamado antes de requisitar uma listagem no server
     *
    onBeforeList: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

    /* */
    //endregion


    //region :: Eventos - Search

    /**
     * Chamado antes de executar uma pesquisa no server
     *
    onBeforeSearch: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos - Edit

    /**
     * Chamado antes de requisitar um form de edição no server
     *
    onBeforeEdit: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /* */
    //endregion


    //region :: Eventos - Create

    /**
     * Chamado antes de requisitar um form de inserção no server
     *
    onBeforeCreate: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /* */
    //endregion


    //region :: Eventos - Edit / Create

    /**
     * Chamado antes de requisitar uma interface de formulário
     *
    onBeforeForm: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

    /* */
    //endregion


    //region :: Eventos - Insert

    /**
     * Chamado antes de enviar os dados de inserção ao server
     *
    onBeforeInsert: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a execução de um insert no server
     *
    onAfterInsert: function(response, next){

    },

    /* */
    //endregion


    //region :: Eventos - Update

    /**
     * Chamado antes de enviar os dados de edição ao server
     */
    onBeforeUpdate: function(el, settings){

        tshark.send({'subrow':dbms.contabil.cont_historicos_resultados_rel.data.rows});

        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a execução de um update no server
     *
    onAfterUpdate: function(response, next){

    },

    /* */
    //endregion


    //region :: Eventos - Delete

    /**
     * Chamado antes de enviar os dados de deleção ao server
     *
    onBeforeDelete: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após a execução de um delete no server
     *
    onAfterDelete: function(response, next){

    },

    /* */
    //endregion


    // region :: Eventos - Save

    /**
     * Chamado antes de enviar qualquer operação de insert ou update ao server
     *
    onBeforeSave: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após qualquer operação de insert ou update no server
     *
    onAfterSave: function(response, next){

    },

     /* */
    //endregion

    //endregion

});


//# sourceURL=dbms.contabil.cont_historicos