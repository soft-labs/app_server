/**
 * Barra de ações do aplicativo
 */
app.automod = {
    itens: [],
    area: '',
    subarea: '',
    mod: '',

    /**
     * Acrescenta itens ao componente
     * [
     *      {
     *           label: "Tipos de Movimentação",
     *           info: "Configura os tipos de lançamentos do sistema",
     *           path: "dbms movimentacoes mov_tipos",
     *       },
     * ]
     * @param itens
     */
    add: function(itens) {
        itens.forEach(item => {
            item.icon = item['icon'] || '';
            item.info = item['info'] || '';
            this.itens.push(item);
        })
    },

    /**
     * Seta as áreas onde serão exibidos os modulos
     * @param area
     * @param subarea
     */
    setAreas: function(area, subarea){
        this.area = area;
        this.subarea = subarea;
    },


    show: function(){
        var d = $(this).data()
            , ndx = d['index']
        ;

        app.automod.item = app.automod.itens[ndx];
        if (app.automod.item) {
            app.automod.index = ndx;
            app.automod.mod = tshark.getMod(app.automod.item.path);
            if (app.automod.mod){
                app.automod._show(d);

            } else {
                tshark.register(app.automod.item.path, function(){
                    app.automod.mod = this;
                    app.automod._show(d);
                });
            }
        }
    },

    _show: function(data){
        app.areas.hide();
        app.automod.mod.list({template: '_list'});
        app.areas.show(app.automod.area, app.automod.subarea, data);
    }

};