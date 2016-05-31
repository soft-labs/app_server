/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Menus da aplicação
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('sys.app.menu', {

    /**
     * Inicializa o menu
     */
    init: function(){

        // Carga de dados
        this.data.load();

    },

    /**
     * Esconde o menu
     */
    hideMenu: function(){
        $('.app-menu-trigger').popup('hide');
    }
    
});


//# sourceURL=sys.app.menu.js