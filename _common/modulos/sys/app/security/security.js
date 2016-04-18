/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Segurança
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('sys.app.security', {

    /**
     * Inicializa o menu
     */
    init: function(){

        // Efetua o bind
        rivets.bind($('#login'), this);
        tshark.bind('#login');

    },

    /**
     * Clique do menu
     */
    click: function(){

        // Esconde a área atual
        $("#" + old_area).css('display', 'none');

        // Nova área
        old_area = $(this).data('area');

        // Migra menu
        $("#menu_lateral")
            .appendTo($("#" + old_area).find("#menu_area"));

        var r = $(this).data('row');
        sys.app.menu.data.goTo(r);

        tshark.bind('#menu_lateral');
        
        // Exibe
        $("#" + old_area).css('display', 'block');

    }

});


//# sourceURL=sys.app.security.js