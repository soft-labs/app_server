/**
 * TShark - Client 3.0
 * Funcionalidades de interface: fin_areceber
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since Mon May 23 2016 09:05:37 GMT-0300 (BRT)
 */
tshark.modulos._add('softlabs.financeiro.fin_areceber', {

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
        softlabs.financeiro.fin_areceber.setData($(this).data('key'));
    },

    /**
     * Executa o pivotamento de dados
     * @param opt
     * @param s
     */
    setData: function(opt){
        switch (opt){
            case 0:
                softlabs.financeiro.fin_areceber.pivot = softlabs.financeiro.fin_areceber.data.rows.pivot('dt_vencimento');
                break;

            case 1:
                softlabs.financeiro.fin_areceber.pivot = softlabs.financeiro.fin_areceber.data.rows.pivot('parceiro', '_stats.sum.valor_bruto', true);
                break;

            case 2:
                softlabs.financeiro.fin_areceber.pivot = softlabs.financeiro.fin_areceber.data.rows.pivot('descricao', '_stats.sum.valor_bruto', true);
                break;
        }
    },


    //region :: Eventos - List

    /**
     * Chamado antes de requisitar uma listagem no server
     */
    onBeforeList: function(el, settings){

        settings.data['teste'] = 987;

        // Libera ou não para continuar
        return true;
    },


     /**
     * Chamado após a listagem de dados
     */
    onAfterList: function(response, next){
        app.resetAppBar([
            {icon: 'payment icon', title: 'Contas à Receber',  description: 'Gestão de Receitas'},
            {icon: 'add icon', title: 'Lançar Recebimento', description: 'Cadastrar nova conta', api: 'softlabs financeiro fin_areceber create', active: 1}
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

        tshark.send('form_place', "#form_area_areceber");

        // Libera ou não para continuar
        return true;
    },

    /**
     * Chamado após receber qualquer das interfaces de formulário
     */
    onAfterForm: function(response, next){

        $('#form_areceber')
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

        this.send({
            row: {'fin_lanc_tipos_key': '1'}
        });

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


//# sourceURL=softlabs.financeiro.fin_areceber