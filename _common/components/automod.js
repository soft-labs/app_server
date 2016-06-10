/**
 * Barra de ações do aplicativo
 */
app.automod = {
    itens: [],
    area: '',
    subarea: '',
    mod: '',

    /**
     * Inicializa componente e configura as áreas 
     * onde serão exibidos os modulos
     * @param area
     * @param subarea
     */
    init: function(opts){
        this.area    = opts['area'];
        this.subarea = opts['subarea'];
        this.icon    = opts['icon'] || 'settings';
        if (opts['itens']){
            opts['itens'].forEach(item => {
                this.add(item);
            });
        }
    },

    /**
     * Acrescenta itens ao componente
     * {
     *    label: "Tipos de Movimentação",
     *    info: "Configura os tipos de lançamentos do sistema",
     *    icon: "payment",
     *    path: "dbms movimentacoes mov_tipos",
     * }
     * @param itens
     */
    add: function(item) {
        item.icon = item['icon'] || this.icon;
        item.info = item['info'] || '';
        this.itens.push(item);
    },

    /**
     * Exibe um mod
     */
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