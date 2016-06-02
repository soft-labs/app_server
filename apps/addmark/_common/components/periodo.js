/**
 * Implementa período para o aplicativo
 */
app.periodo = {
    de      : moment().subtract(app.config.periodo.de, 'days').format('DD/MM/YYYY'),
    ate     : moment().add(app.config.periodo.ate, 'days').format('DD/MM/YYYY'),
    
    dt_de   : moment().subtract(app.config.periodo.de, 'days'),
    dt_ate  : moment().add(app.config.periodo.ate, 'days'),

    changeDe: function(){
        app.periodo.change(this, 'de');
    },
    
    changeAte: function(){
        app.periodo.change(this, 'ate');
    },
    
    change: function(el, dt){
        var mod = $(el).data('modulo');
        $(el)
            .pickadate({
                container: '.app',
                selectMonths: true,
                
                onSet: function(ctx){
                    app.periodo[dt] = moment(ctx.select).format('DD/MM/YYYY');
                    app.periodo['dt_'+ dt] = moment(ctx.select);
                    
                    if (mod){
                        var obj = tshark.getObjPath(mod);
                        if (obj['onChangePeriodo']){
                            obj.onChangePeriodo($(el), dt);
                        }
                    }
                }
            });
    }

};