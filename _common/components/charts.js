/**
 * Gráficos
 */
app.charts = {

    // Armazena dados dos charts
    data: {},

    // Acrescenta um gráfico
    add: function(id, opts, data){
        try {
            var ctx = document.getElementById(id).getContext("2d");
            if (app.charts[id]) {
                app.charts[id].destroy();
            }

            opts.data = app.charts.data[id] = data;
            app.charts[id]      = new Chart(ctx, opts);
            //app.charts[id].data = app.charts.data[id];

        } catch (e){
            tshark.log(e.message, e.stack);
        }
    },

    // Atualiza um gráfico
    reset: function(id){
        if (app.charts[id]){
            app.charts[id].update();
        }
    }
    
};