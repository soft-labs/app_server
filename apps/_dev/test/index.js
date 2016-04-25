
// Fim da carga do browser
$(document).ready(function() {
    tshark.init();
    tshark.execBind('#teste', obj1);
});


var obj1 = {
    titulo: 'Objeto Um',
    rows: [
        {key: 1, label: 'João'},
        {key: 2, label: 'Pedro'},
        {key: 3, label: 'Paulo'},
        {key: 4, label: 'Luiz'}
    ]
};

var obj2 = {
    titulo: 'Objeto Dois',
    rows: [
        {test: 1, name: 'Maria'},
        {test: 2, name: 'Joana'}
    ]
};


var t = 1;
function swapTemplate(){

    if (t == 1){

        tshark.bounded['#teste'].unbind();
        $('#list').html($('#t1').val());
        //tshark.bounded['#teste'].models = obj1;
        tshark.bounded['#teste'] = rivets.bind($('#teste'), obj1);

        t = 2;

    } else {

        tshark.bounded['#teste'].unbind();
        $('#list').html($('#t2').val());
        //tshark.bounded['#teste'].models = obj2;
        //tshark.bounded['#teste'].bind();
        tshark.bounded['#teste'] = rivets.bind($('#teste'), obj2);

        t = 1;
    }
}

var o = 1;
function swapModel(){

    if (o == 1){
        tshark.execBind('#teste', obj1);
        o = 2;

    } else {
        tshark.execBind('#teste', obj2);
        o = 1;
    }
}


//# sourceURL=index.js