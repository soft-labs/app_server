/**
 * Conjunto de extenções ao RIVETJS
 * Created by labs on 19/05/16.
 */


//region :: Binders


/**
 * Customização de each para implementar
 * fields internos no row e referencia ao
 * dataset
 */
var old_each_routine = rivets.binders['each-*'].routine;
rivets.binders['each-*'].routine = function(el, value) {
    var first = true, sum = {}, count = 0, avg = 0;
    if (value) {
        value.forEach( (v, i) => {
            count++;
            if (typeof v == "object") {
                v['_index_'] = i;
                v['_first_'] = first;
                v['_last_'] = false;

                // Referencia ao dataset
                if (this.model['_type_'] && this.model['_type_'] == 'Dataset') {
                    v['_dataset_'] = this.model.path;
                }

                // SUM
                if (first){
                    for(var p in v){
                        if (isFloat(v[p])){
                            sum[p] = toFloat(v[p]);
                        }
                    }

                } else {
                    for(var s in sum){
                        sum[s] += toFloat(v[s]);
                    }
                }

                first = false;
            }
        });
        if (typeof  value[value.length - 1] == "object") {
            value[value.length - 1]['_last_'] = true;
        }
    }

    old_each_routine.apply(this, arguments);
};


/**
 * Binder para seleção de um row no dataset
 *  Ex: div rv-row-key="row.map_filiais_key"
 */
rivets.binders['row-key'] = {
    bind: function(el) {
        var self = this;
        this.callback = function() {
            if (self['model'] && self.model['_dataset_']){
                try {
                    var dts = app[self.model._dataset_[0]][self.model._dataset_[1]][self.model._dataset_[2]].data;
                    dts.goTo($(this).data('key'));
                } catch (e){}
            }
        };
        $(el).on('click', this.callback);
    },

    unbind: function(el) {
        $(el).off('click', this.callback);
    },

    routine: function(el, value) {
        $(el).data('key', value);
    }
};



//endregion



//region :: Formatadores

rivets.formatters.concat = function(value) {
    var sep = arguments[1]
        , args = Array.prototype.slice.call(arguments, 2)
        ;
    args.unshift(value);
    return args.join(sep);
};

rivets.formatters.replace = function(value){
    return arguments[1].replace('%s', value);
};

rivets.formatters.mais = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return toFloat(value) + (args.reduce(function(a, b) {
            return toFloat(a) + toFloat(b);
        }, 0));
};

rivets.formatters.menos = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return toFloat(value) - (args.reduce(function(a, b) {
            return toFloat(a) + toFloat(b);
        }, 0));
};

rivets.formatters.plus = function(value) {
    var args = Array.prototype.slice.call(arguments, 1)
        , mult = args.reduce(function(a, b) {
            return toFloat(a) * (toFloat(b) ? toFloat(b) : 1);
        }, toFloat(value))
        ;
    return mult;
};

rivets.formatters.money = function(value){
    return (value != undefined ? value.toMoney() : '');
};

rivets.formatters.float = function(value){
    return (value != undefined ? value.toFloat() : '');
};

rivets.formatters.int = function(value){
    return (value != undefined ? value.toInt() : '');
};

rivets.formatters.menorQueZero = function(value){
    return (toFloat(value) < 0 ? true : false);
};

rivets.formatters.maiorQueZero = function(value){
    return (toFloat(value) > 0 ? true : false);
};

rivets.formatters.clearIfEmpty = function(value){
    return (value == "" ? null : value);
};

rivets.formatters.clearIfEmptyOrZero = function(value){
    return (value == "" || value == "0" || value == "0,00" ? null : value);
};

rivets.formatters.igualA = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (value == args[0]);
};
rivets.formatters.diffDe = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (value != args[0]);
};

rivets.formatters.in = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (args.indexOf(value) > -1);
};
rivets.formatters.notIn = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (args.indexOf(value) == -1);
};

rivets.formatters.or = function(value) {
    return (arguments[0] ? arguments[0] : arguments[1]);
};

rivets.formatters.not = function(value) {
    var args = Array.prototype.slice.call(arguments, 1);
    return !value;
};

//endregion