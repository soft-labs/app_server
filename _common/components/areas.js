/**
 * Áreas de interface
 */
app.areas = {

    // Area ativa
    active: {
        area: false,
        subarea: false
    },

    /**
     * Inicializa as áreas que estão ativas ao ligar o app
     * @param area
     * @param subarea
     */
    init: function(area, subarea){
        app.areas.active.area = area;
        app.areas.active.subarea = subarea;
    },

    /**
     * Acrescenta uma área
     * @param id
     * @param area
     */
    add: function(id, area){
        app.areas[id] = area;
        app.areas.initArea(id);
    },

    /**
     * Inicializa area
     * @param id
     */
    initArea: function(id){
        if (app.loaded && app.areas[id]['init'] && !app.areas[id].loaded){
            app.areas[id].init();
            app.areas[id].loaded = true;
        }
    },

    /**
     * Atualiza a área exibida
     */
    show: function(area, subarea, data){
        
        if (typeof area != 'string'){
            data    = $(this).data();
            area    = data['area'];
            subarea = data['subarea'];
        }
        if (!area && !subarea) return;
        
        
        //region :: Área atual

        if (app.areas.active.area){

            if (app.areas.active.area != area) {

                // Evento onclose
                if (app.areas[app.areas.active.area] && app.areas[app.areas.active.area]['onClose']) {
                    if (!app.areas[app.areas.active.area].onClose(area, subarea, data)) {
                        return;
                    }
                }

                // Esconde a área atual
                $('.' + app.areas.active.area).transition('hide');
            }

            // Subarea
            if (app.areas.active.subarea && app.areas.active.subarea != subarea) {
                $('.' + app.areas.active.subarea).transition('hide');
            }

        }

        //endregion


        //region :: Nova área

        if (app.areas.active.area != area) {
            app.areas.active.area = area;

            // Evento onOpen
            if (app.areas[app.areas.active.area] && app.areas[app.areas.active.area]['onShow']) {
                app.areas[app.areas.active.area].onShow(area, subarea);
            }

            // Exibe a área atual
            $('.' + app.areas.active.area).transition('fade up');
        }

        if (app.areas.active.subarea != subarea) {
            app.areas.active.subarea = subarea;

            // Evento onOpen
            if (app.areas[app.areas.active.area] &&
                app.areas[app.areas.active.area][subarea] &&
                app.areas[app.areas.active.area][subarea]['onShow']) {
                app.areas[app.areas.active.area][subarea].onShow(area, subarea, data);
            }

            // Exibe a área atual
            $('.' + app.areas.active.subarea).transition('fade up');
        }

        //endregion

        return true;
    }

};


// Fim da carga do browser
$(document).ready(function() {

    // Inicializa áreas
    for (var id in app.areas) {
        app.areas.initArea(id);
    }

});

