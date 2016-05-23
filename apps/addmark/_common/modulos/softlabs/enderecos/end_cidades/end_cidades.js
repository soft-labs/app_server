/**
 * TShark - Client 3.0
 * Funcionalidades de interface: end_cidades
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Tue May 17 2016 14:43:03 GMT-0300 (BRT)
 */
tshark.modulos._add('softlabs.enderecos.end_cidades', {

    /**
     * Inicializa o menu
     */
    init: function(){

    },


    //region :: Eventos onBefore

    //region :: Eventos onBefore - Listagens

    /**
     * Chamado antes de requisitar uma listagem no server
     *
    onBeforeList: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado antes de executar uma pesquisa no server
     *
    onBeforeSearch: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos onBefore - Forms

    /**
     * Chamado antes de requisitar um form de edição no server
     *
    onBeforeEdit: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado antes de requisitar um form de inserção no server
     *
    onBeforeCreate: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion


    //region :: Eventos onBefore - Dados

    /**
     * Chamado antes de enviar os dados de inserção ao server
     *
    onBeforeInsert: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado antes de enviar os dados de edição ao server
     *
    onBeforeUpdate: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado antes de enviar os dados de deleção ao server
     *
    onBeforeDelete: function(el, settings){


        // Libera ou não para continuar
        return true;
    },

     /* */
    //endregion

    /* */
    //endregion


    //region :: Eventos onAfter

    //region :: Eventos onAfter - Listagens
    
    /**
     * Chamado após a listagem de dados
     *
    onAfterList: function(response, next){

    },

    /**
     * Chamado após a execução de uma pesquisa
     *
    onAfterSearch: function(response, next){

    },

     /* */
    //endregion


    // region :: Eventos onAfter - Forms

    /**
     * Chamado após receber a interface de inserção
     *
    onAfterCreate: function(response, next){

    },

    /**
     * Chamado após receber a interface de edição
     *
    onAfterEdit: function(response, next){

    },

    /**
     * Chamado após receber qualquer das interfaces de formulário
     *
    onAfterForm: function(response, next){

    },

     /* */
    //endregion


    //region :: Eventos onAfter - Dados

    /**
     * Chamado após a execução de um insert no server
     *
    onAfterInsert: function(response, next){

    },

    /**
     * Chamado após a execução de um update no server
     *
    onAfterUpdate: function(response, next){

    },

    /**
     * Chamado após a execução de um delete no server
     *
    onAfterDelete: function(response, next){

    },

    /**
     * Chamado após qualquer operação de insert ou update no server
     *
    onAfterSave: function(response, next){

    },

     /* */
    //endregion

    /* */
    //endregion

    
    //region :: Regras de Negócio

    //endregion

});


//# sourceURL=softlabs.enderecos.end_cidades