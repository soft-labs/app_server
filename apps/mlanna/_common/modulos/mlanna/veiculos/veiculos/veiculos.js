/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Mapeamento de veículos
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('mlanna.veiculos.veiculos', {

    /**
     * Permite extender uma classe
     */
    extends: 'cadastros',

    /**
     * Inicialização do módulo
     */
    init: function(){
        
    },

    /**
     * onBefore: Chamado antes de descer ao server
     * @param el elemento html que acionou a API
     * @param settings pacote que será enviado ao server
     */
    onBeforeList: function(el, settings){

        // Personaliza máximo de retorno
        this.send({
            limit: 1
        }, 'provider');

        // Dá prosseguimento
        return true;
    },
    
    /**
     * vous absjahsbasj ajsh jashd jahsdaj
     */
    onBeforeInsert: function(el, settings){

        
        
        // Libera ou não para continuar
        return true;
    },

    /**
     * on: Chamado no retorno do server antes do processamento default da API no client
     * @param response pacote de dados recebido do server
     * @param next função que dá continuidade ao processo - se não chamada ao final, o processamento default não acontece
     *
    onList: function(response, next){
        next();
    },

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     *
    onAfterList: function(response){

    }*/

});
//# sourceURL=softlabs.mlanna.ml_veiculos.js