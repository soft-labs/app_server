/**
 * Choose from list
 */
app.choose =  {

    dialog: '',

    // dataset
    data: new Dataset(),

    // Dataset que ele aponta
    target: '',

    // Elemento que chamou o choose
    element: '',

    // função de seleção - this é o row da lista do choose
    select: function(){

        // Ajusta o dataset
        var row   = app.choose.data.getRow($(this).data('key'))
            , fld = $(app.choose.element).data('field')
            , map = $(app.choose.element).data('map')
        ;

        // Fields mapeados
        if (map){
            var f = fld;
            for (var m in map){
                if (map[m] != fld) {
                    app.choose.target.row[map[m]] = row[m];
                } else {
                    f = m;
                }
            }
            app.choose.target.row[fld] = row[f];

        // Todos
        } else {
            var ignore = ['_first_', '_last_', '_index_', '_key_', '_rv', '_dataset_', '__proto__'];
            for (var r in row) {
                if (r != fld && typeof r != 'function' && ignore.indexOf(r) == -1) {
                    app.choose.target.row[r] = row[r];
                }
            }
            app.choose.target.row[fld] = row[fld];
        }

        // Fecha o dialogo
        if (app.choose.dialog) {
            app.choose.dialog.destroy();
            app.choose.dialog = false;
        }

    }
    
};
