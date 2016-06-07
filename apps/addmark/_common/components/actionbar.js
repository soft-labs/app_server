/**
 * Barra de ações do aplicativo
 */
app.actionbar = {
    itens: [],

        /**
         * Atualiza a barra de botões global do app
         */
        reset: function(itens){
        app.actionbar.itens = itens;
        tshark.initAPIs('.app-bar');
    }

};