/**
 * TShark - Client 3.0
 * Tela de geração de objetos de negócio
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href='www.softlabs.com.br'>Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('sys.dev.ide', {

    /**
     * Inicializa o módulo
     */
     init: function(){
        
     },
     
    /**
     * Refresh dos módulos depois que cria package
     * @param response
     */
    onAfterCreatePackage: function(response){
        app.bizobj.load('listModulos');
        app.package.id = '';
        app.package.modulos.clear();
        alertify.success('Package criado com sucesso!');
    }

});

//# sourceURL=sys.dev.ide.js