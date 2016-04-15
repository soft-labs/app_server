/**
 * TShark - Client 3.0
 * Implementação de funcionalidades de interface
 *  - Inicialização do App
 *
 * @copyright [== © 2015, Softlabs ==]
 * @link www.softlabs.com.brss
 * @author Luiz Antonio B. Silva [Labs]
 * @since 11/10/2015
 */
// Fim da carga do browser
$(document).ready(function() {

    // Inicializa TShark
    tshark.init();

    // Inicializa menu da aplicação
    tshark.register('sys.app.menu');

    // Bind inicial de APIs e componentes
    tshark.bind();

});
