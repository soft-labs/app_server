/**
 * Created by labs on 07/03/16.
 */
var configuracoes = {

    /**
     * onAfter: Chamado depois do processamento default ou depois do overwrite caso ocorra
     * @param response pacote de dados do server
     */
    onAfterList: function(response){
        
    },

    onAfterForm: function(response){
        
    },

    search: function(){
        
    }
};

/**
 * Armazena o bind realizado uma vez para que ele possa ser removido ao se trocar de
 * "dono" na tela
 */
var config_list_bind    = false
    , config_form_bind  = false
;