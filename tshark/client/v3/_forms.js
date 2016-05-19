/**
 *  TShark - Client 3.0
 *
 *   Implementa geração de forms dinâmicos com base nas 
 * estruturas retornadas pelos objetos de negócio no server
 * 
 * @copyright [== © 2016, Softlabs ==]
 * @link <a href="http://www.softlabs.com.br">Softlabs</a>
 * @author Luiz Antonio B. Silva [Labs]
 * @since 03/04/16.
 */
var tshark = tshark || new TShark();

/**
 * Implementa um popup dinâmico
 */
alertify.popupForm || alertify.dialog('popupForm', function(){
    return {
        main:function(content){
            this.setContent(content);
        },
        setup:function(){
            return {
                focus:{
                    element:function(){
                        return this.elements.body.querySelector(this.get('focus'));
                    },
                    select:true
                },
                options:{
                   // basic:true,
                    modal:true,
                    maximizable:false,
                    resizable:true,
                    padding:false
                }
            };
        },
        settings:{
            focus: undefined
        }
    };
});

/**
 * Implementação da classe
 */
(function() {


    /**
     * Cria um novo form
     * @param mod
     * @param layout
     * @param place (opcional)
     * @returns {*|jQuery|HTMLElement}
     */
    TShark.prototype.createForm = function (mod, layout, place) {
        var
            f_config = layout['_config'] || {}
            , f_id   = guid()

            // Configurações do form
            , form = $("<form>", {
                id: f_id,
                class: "ui " + f_config['size']  + " "
                + f_config['comps'] + " "
                + f_config['state'] + " "
                + " form "
            })
        ;

        // Processa as linhas
        layout.linhas.forEach((l) => {
            var l_config = {};
            if (l['_config']){
                l_config = $.extend(l_config, l['_config']);
                delete(l['_config']);
            }
            var config      = $.extend({}, f_config, l_config)
                , inline    = config['labels']
                , width     = config['comps']
                , icon      = ''
                ;

            // Processa os comps em uma linha
            var linha = $("<div>", {class: inline + " fields", style: 'white-space: nowrap;'});
            for (var f in l){

                // Título
                if (f == 'titulo' || f == 'icon'){
                    if (f == 'icon') continue;

                    icon = (l['icon'] ? '<i class="' + l['icon'] + ' icon"></i>': '');
                    form.append($("<h4>", {class: "ui dividing header"}).html(icon + l[f]));

                    // Componentes
                } else {
                    var ctrl = layout.ctrls[f]
                        , f_class = (width == 'percent' ? getWidth(l[f]) + " wide " : " ")
                        ;

                    // Área do comp
                    var field = $("<div>", {
                        class: f_class + " field "
                    });

                    if (ctrl['label']) {
                        icon = (ctrl['icon'] ? '<i class="' + ctrl['icon'] + ' icon"></i>': '');
                        field.append(
                            $("<label>", {'title': ctrl['help']})
                                .html(icon + ' ' + ctrl['label'])
                        );
                    }

                    // Processa um comp
                    field.append(getComp(ctrl, f, mod));

                    linha.append(field);
                }
            }
            form.append(linha);
        });

        // Registra
        mod.form.obj = form;
        mod.api.last_form_id = f_id;

        // Coloca na tela
        if (place){

            tshark.putLayout(form, place);

           // rivets.bind($(f_id), app);
        }

        // Retorna
        return f_id;
    };


    /**
     * Coloca um form em um lugar na tela e efetua seu bind
     * @param content
     * @param place (opcional)
     * @returns {*|jQuery|HTMLElement}
     */
    TShark.prototype.putLayout = function (content, place) {

        if (typeof place == 'string'){
            place = $(place);
        }

        if (place.length){
            var bound = place.data('_bound');
            if (bound){
                bound.unbind();
            }

            place
                .empty()
                .append(content)
            ;


            // Bind global do var app com o .app
            //tshark.appBound.update();

            tshark.bindIntf(place);
            
            place.data('_bound', rivets.bind(place, app));

            tshark.bindIntf(place);
            tshark.bindAPIs(place);
        }
    };

    /**
     * Cria uma área de componente
     * @param ctrl
     * @param field
     * @param mod
     * @returns {*|jQuery|HTMLElement}
     */
    function getComp (ctrl, field, mod){

        var
            input = false
        ;

        switch (ctrl['comp']){

            case 'inpText'      :
            case 'inpInt'       :
            case 'inpFloat'     :
            case 'inpMoney'     :
            case 'inpPercent'   :
            case 'inpDate'      :
            case 'inpTime'      :
            case 'inpDateTime'  :
                input = getInput(ctrl, field, mod.path);
                break;

            case 'inpMemo'      :
            case 'inpMemoShort' :
            case 'inpMemoLong'  :
                input = getMemo(ctrl, field, mod.path);
                break;

            case 'dropdown'  :
            case 'inpDropdown'  :
            case 'inpList'      :
            case 'inpChoose'    :
                input = getSelect(ctrl, field, mod.path);
                break;

            case 'inpCheckBox':
            case 'inpSlider':
            case 'inpToggle':
            case 'inpRadio':
                input = getCheck(ctrl, field, mod.path);
                break;

            default:
                ctrl['state'] = 'error';
                ctrl['placeholder'] = 'componente desconhecido';
                input = getInput(ctrl, field, mod.path);
        }

        if (ctrl['data']){
            mod.form.comps[field] = new Dataset(ctrl.data.from);
            if (ctrl['data']['rows']){
                mod.form.comps[field].reset(ctrl['data']);
                
            } else {
                mod.form.comps[field].load({
                    fields: parseFields(ctrl.data['template'])
                });
            }
        }

        return input;
    }

    /**
     * Recebe um template e processa o conteúdo extraindo 'row.[field]'
     * dele e retornando em um array
     * @param templ { string } Template a ser pesquisado
     * @param re { regex } Regular expression de tag (opcional, default para /row\.(\w+)/g
     * @returns {Array}
     */
    function parseFields(templ, re){
        if (!templ) return [];

        var tmp = templ.match(re || /row\.(\w+)/g)
            , fields = []
            ;

        if (tmp != null){
            fields = tmp.map(function(f){
                return f.split('.')[1];
            });
        }

        return fields;
    }

    /**
     * Retorna uma largura de field com base em width
     * @param w
     * @returns {*}
     */
    function getWidth(w){
        var widths = {
            1: 'one',       2: 'two',       3: 'three',     4: 'four',
            5: 'five',      6: 'six',       7: 'seven',     8: 'eight',
            9: 'nine',     10: 'ten',      11: 'eleven',   12: 'twelve',
            13: 'thirteen', 14: 'fourteen', 15: 'fiveteen', 16: 'sixteen'
        };
        return widths[Math.round(16 * (w / 100))];
    }

    /**
     * Retorna uma área de field
     * @param inp
     * @param ctrl
     * @param tipo
     * @returns {*|jQuery|HTMLElement}
     */
    function wrap(inp, ctrl, tipo){

        var wrapper  = $("<div>")
            , classe = "ui " + (tipo || 'input')
            , done
        ;

        // Extra left?
        if (ctrl['extra_left']) {
            classe += ' left ';
            if (ctrl['extra_left']['class']) {
                classe += ctrl['extra_left']['class'];
            }

            $(wrapper)
                .append(ctrl['extra_left']['tag'])
                .append(inp)
            ;
            done = true;
        }

        // Extra right?
        if (ctrl['extra_right']) {
            classe += ' right ';
            if (ctrl['extra_right']['class']) {
                classe += ctrl['extra_right']['class'];
            }

            if (!done) {
                $(wrapper).append(inp);
                done = true;
            }


            $(wrapper)
                .append(ctrl['extra_right']['tag']);
        }

        if (!done) {
            $(wrapper).append(inp);
        }

        $(wrapper).addClass(classe);

        return wrapper;
    }

    /**
     * Acrescenta extras ao componente
     * @param input
     * @param ctrl
     */
    function setExtras(input, ctrl){

        // State
        if (ctrl['state']) {
            $(input).prop(ctrl['state'], "on");
        }

        // Help
        if (ctrl['help']) {
            $(input).prop('title', ctrl['help']);
        }

        // Placeholder
        if (ctrl['hint'] || ctrl['placeholder']) {
            $(input).prop('placeholder', ctrl['hint'] || ctrl['placeholder']);
        }

        // Disabled / success / error / warning / loading ?
        if (ctrl['state']) {
            $(input).addClass(ctrl['state']);
        }

        // Transparent?
        if (ctrl['transparent']){
            $(input).addClass('transparent');
        }

        // Size?
        if (ctrl['size']){
            $(input).addClass(ctrl['size']);
        }

        return input;
    }

    /**
     * Retorna um componente do tipo input
     * @param ctrl
     * @param field
     */
    function getInput(ctrl, field, path) {
        var params = {
                type: "text",
                class: "ui fluid",
                'rv-value': path + ".data.row." + field,
                'onblur': path.split('.').join(' ') + " save"
            }
        ;

        switch (ctrl['comp']) {
            case 'inpInt':
                params.type = 'number';
                params.step = 1;
                break;

            case 'inpFloat':
            case 'inpMoney':
            case 'inpPercent':
                params.type = 'number';
                params.step = 0.01;
                break;

            case 'inpDate':
                params.type = 'date';
                break;

            case 'inpTime':
                params.type = 'time';
                break;

            case 'inpDateTime':
                params.type = 'datetime-local';
                break;
        }
        var input = setExtras($("<input>", params), ctrl);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl)
        }

        // Retorna
        return input;
    }

    /**
     * Retorna componentes de memo
     * @param ctrl
     * @param field
     * @returns {*|jQuery|HTMLElement}
     */
    function getMemo(ctrl, field, path){
        var params = {
                class: "ui fluid",
                'rv-value': path + ".data.row." + field,
                'onblur': path.split('.').join(' ') + " save"
            }
        ;

        switch (ctrl['comp']) {
            case 'inpMemoShort' : params.rows = 2;  break;
            case 'inpMemo'      : params.rows = 6;  break;
            case 'inpMemoLong'  : params.rows = 12; break;
        }
        var memo = setExtras($("<textarea>", params), ctrl);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            memo = wrap(memo, ctrl)
        }

        // Retorna
        return memo;

    }

    /**
     * Retorna componentes de checkbox
     * @param ctrl
     * @param field
     * @returns {*|jQuery|HTMLElement}
     */
    function getCheck(ctrl, field, path){
        var params = {
                class: "ui fluid",
                type: "checkbox",
                'rv-checked': path + ".data.row." + field,
                'onchange': path.split('.').join(' ') + " save"
            }
        ;

        var check = setExtras($("<input>", params), ctrl);

        // Extra
        //if (ctrl['extra_left'] || ctrl['extra_right']) {
            check = wrap(check, ctrl, 'toggle checkbox')
        //}

        // Retorna
        return check;

    }

    /**
     * Retorna um dropdown
     * @param ctrl
     * @param field
     */
    function getSelect(ctrl, field, path){
        return simpleSelect(ctrl, field, path);
        //return selSelection(ctrl, field, path);
    }

    function selSelection(ctrl, field, path) {
        var
            val      = (ctrl.data['key'] ? ctrl.data['key'] : field)
            , select = $("<div>", {
                id : field,
                class: "ui selection dropdown",
                "rv-value"  : path + ".data.row." + val
            })
            .append(
                $("<input>", {
                    type: "hidden",
                    name: field

                })
            )
            .append($("<i>", {class: "dropdown icon"}))
            .append($("<div>", {class: "default text"}))
            .append(
                $("<div>", {class: "menu"})
                    .append(
                        $("<div>", {
                            class: "item",
                            'rv-each-row'  : path + '.form.comps.' + field + '.rows',
                            'rv-data-value': 'row.' + val
                        })
                            .html(
                                (ctrl.data['template'] ? ctrl.data['template'] : "{row." + field + "}")
                            )
                    )
            )
        ;
        return select;
    }

    /**
     * Dropdowm simples baseado em SELECT
     * @param ctrl
     * @param field
     * @returns {*|jQuery|HTMLElement}
     */
    function simpleSelect(ctrl, field, path){
        var
            val  = (ctrl.data['key'] ? ctrl.data['key'] : field)
        , select = $("<select>", {
                id : field,
                class       : "ui fluid dropdown",
                style       : "white-space: nowrap !important",
                //'rv-value'  : "tshark.selectOpt < " + path + ".data.row." + val,
               'rv-selectvalue' : path + ".data.row." + val,
               // 'onschange'    : path.split('.').join(' ') + " save"
            }
        ).append(
            $("<option>", {
                'rv-each-row': path + '.form.comps.' + field + '.rows',
                'rv-value'   : 'row.' + val
                }
            )
                .html(
                    (ctrl.data['template'] ? ctrl.data['template'] : "{row." + field + "}")
                )
        );

        return select;
    }

    /**
     * Dropdowm complexo, permite variações
     * @param ctrl
     * @param field
     * @returns {*|jQuery|HTMLElement}
     */
    function extraSelect(ctrl, field, path){
        var
            val   = (ctrl.data['key'] ? ctrl.data['key'] : field)
        ,  params = {
            class: "ui fluid selection dropdown"
            //'rv-value': "data.row." + val,
            //'rv-data-value': "data.row." + val,
            // style: "white-space: nowrap !important"
        };

        var select = $("<div>", params);
        $(select)
            .append(
                $("<input>", {type: 'hidden', name: field, 'rv-value': "data.row." + val})
            )
            .append(
                $("<i>", {class: 'dropdown icon'})
            )
            .append(
                $("<div>", {
                    class: 'default text',
                    style: "width: inherit; overflow: hidden !important; white-space: nowrap !important;"
                }).html(ctrl['placeholder'])
            )
            .append(
                $("<div>", {class: 'menu'})
                    .append(
                        $("<div>", {
                            class: 'item',
                            style: "",
                            'rv-each-row'  : 'form.comps.' + field + '.rows',
                            'rv-data-value': 'row.' + val
                        }).html(
                            (ctrl.data['template'] ? ctrl.data['template'] : "{row." + field + "}")
                        )
                    )
            );
        return select;
    }


})($);


TShark.prototype.selectOpt = function () {

    var x = arguments;

};

rivets.binders.selectvalue = function (el, value){
    tshark.sucesso(el.id + ' - ' + value);
    $(el).dropdown('set value', value);
};

rivets.binders.sselectvalue = {
    bind: function(el) {
        var self = this;
        this.callback = function() {
            self.model[self.observer.key.path] = $(this).val();
        };
        $(el).on('change', this.callback);
    },

    unbind: function(el) {
        $(el).off('change', this.callback);
    },

    routine: function(el, value) {
        if (value != null) {
            $(this.el).dropdown('set value', value);
        }
        tshark.sucesso($(this.el).id + ' - ' + value);
    }
};
