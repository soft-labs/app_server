/**
 * Barra de ações do aplicativo
 */
app.actionbar = {
    itens: [],

    /**
     * Atualiza a barra de botões global do app
     */
    reset: function(itens){
        app.actionbar.itens.length = 0;
        itens.forEach(i => {
            app.actionbar.itens.push(i);
        });

        tshark.initAPIs();
        tshark.initSemantic();
    }

};