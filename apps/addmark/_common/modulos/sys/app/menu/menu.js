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
        this.appbar = [
            {icon: 'add icon', title: 'Lançar Débito',  description: 'Cadastrar nova despesa'},
            {icon: 'add icon', title: 'Lançar Crédito', description: 'Cadastrar nova receita'},
            {icon: 'add icon', title: 'Fluxo de Caixa', description: 'Ver o seu fluxo de caixa'}
        ];

        // Carga de dados
        this.data.load(function(){

            // Efetua o bind do menu
            //tshark.bindIntf('.app-menu-popup');

            var row = sys.app.menu.data.getRowAt(0);
        });

        // Armazena a última área aberta / inicializa com home
        this.old_area = 'app-home';

        this.old_subarea = '';

    },

    /**
     * Clique do menu
     */
    click: function(){

        // Esconde o menu
        $('.app-menu-trigger').popup('hide');

        // Esconde a área atual
        if (sys.app.menu.old_area) {
            $("." + sys.app.menu.old_area).transition('hide');
        }
        if (sys.app.menu.old_subarea) {
            $("." + sys.app.menu.old_subarea).transition('hide');
        }

        // Nova área
        sys.app.menu.old_subarea = $(this).data('area');

        var row = sys.app.menu.data.getRowAt($(this).data('menu-index'))
            , ndx = $(this).data('submenu-index')
        ;

        sys.app.menu.old_area = row['area'];
        sys.app.menu.appbar = row['appbar'] || [];

       /* app.bar.icon = 'circular large ' + row.icon;
        app.bar.area = row.label;
        row.submenu.forEach(s => {
            if (s._index_ == ndx){
                app.bar.secao = s.label;
                app.bar.submenu = s['submenu'];
            }
        });
        */

        // Exibe a nova área
        if (sys.app.menu.old_area) {
            $("." + sys.app.menu.old_area).transition('fade up');
        }
        if (sys.app.menu.old_subarea) {
            $("." + sys.app.menu.old_subarea).transition('fade up');
        }
    }

});


//# sourceURL=sys.app.menu.js