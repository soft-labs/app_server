/**
 * TShark - Client 3.0
 * Funcionalidades de interface: fin_apagar
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Mon May 23 2016 09:05:36 GMT-0300 (BRT)
 */
tshark.modulos._add('softlabs.financeiro.fin_apagar', {

    /**
     * Inicializa o menu
     */
    init: function(){
        this.pivot = [];
        
        this.options = [
            {label: 'Vencimento'},
            {label: 'Fornecedores'},
            {label: 'Grupo'}
        ];
    },

    popSubmenu: function(){
        softlabs.financeiro.fin_apagar.setData($(this).data('key'));
    },
    
    /**
     * Executa o pivotamento de dados
     * @param opt
     * @param s
     */
    setData: function(opt){
        switch (opt){
            case 0:
                softlabs.financeiro.fin_apagar.pivot = softlabs.financeiro.fin_apagar.data.rows.pivot('dt_vencimento');
                break;

            case 1:
                softlabs.financeiro.fin_apagar.pivot = softlabs.financeiro.fin_apagar.data.rows.pivot('parceiro', '_stats.sum.valor_bruto', true);
                break;

            case 2:
                softlabs.financeiro.fin_apagar.pivot = softlabs.financeiro.fin_apagar.data.rows.pivot('descricao', '_stats.sum.valor_bruto', true);
                break;
        }
    },


    //region :: Eventos - List

    /**
     * Chamado antes de requisitar uma listagem no server
     *
    onBeforeList: function(el, settings){

        // Libera ou não para continuar
        return true;
    },

     /**
     * Chamado após a listagem de dados
     */
    onAfterList: function(response, next){
        app.resetAppBar([
            {icon: 'payment icon', title: 'Contas à Pagar',  description: 'Gestão de Gastos e Despesas'},
            {icon: 'add icon', title: 'Lançar Pagamento', description: 'Cadastrar nova conta', api: 'softlabs financeiro fin_apagar create', active: 1}
        ]);

        this.setData(0);
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

     /**
     * Chamado após a execução de uma pesquisa
     *
    onAfterSearch: function(response, next){

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

     /**
     * Chamado após receber a interface de edição
     *
    onAfterEdit: function(response, next){

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

     /**
     * Chamado após receber a interface de inserção
     *
    onAfterCreate: function(response, next){

    },

    /* */
    //endregion


    //region :: Eventos - Edit / Create

    /**
     * Chamado antes de requisitar uma interface de formulário
     */
    onBeforeForm: function(el, settings){

        tshark.send('form_place', "#form_area_apagar");

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após receber qualquer das interfaces de formulário
     */
    onAfterForm: function(response, next){

        $('#form_apagar')
            .modal('setting', 'transition', 'fade')
            .modal('setting', 'allowMultiple', true)
            .modal('show');
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
     *
    onBeforeUpdate: function(el, settings){


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
     */
    onAfterSave: function(response, next){
        this.list();
    },

     /* */
    //endregion
    
    
    //region :: Regras de Negócio

    //endregion

});


//# sourceURL=softlabs.financeiro.fin_apagar