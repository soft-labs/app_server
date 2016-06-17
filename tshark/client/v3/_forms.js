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
        },
        prepare: function(){

        }
    };
});


/**
 * Choose from list
 */
if(!alertify.choose){

    alertify.dialog('choose',function factory(){
        return{
            main:function(message){
                this.message = message;
            },
            setup:function(){
                return {
                    options: {
                        title: "Selecione:",
                        padding : !1,
                    },
                    //buttons:[{text: "Fechar!", key:27/*Esc*/}],
                    //focus: { element:0 }
                };
            },
            prepare:function(){
                $(this.elements.dialog).css('height', '80%');
                this.setContent('<div class="ui segment">' + this.message + '</div>');
            },
            build: function(){
                this.setHeader($(this.elements.content).find('table')[0]);
            }
        }
    }, true);
}

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
        var processLinhas = function(l, inline, width, icon){
            var linha = $("<div>", {class: inline + " fields", style: 'white-space: nowrap;'});
            for (var f in l){
                var w = getWidth(l[f])
                    , f_class = (width == 'percent' ? (w ? w : 'sixteen') + " wide " : " ")
                    , field = $("<div>", {
                    class: f_class + " field "
                });

                // Tabs
                if (layout['tabs'] && layout.tabs[f]){
                    var _tab = layout.tabs[f]
                        , _tab_style = _tab['style'] || 'clean'
                        , _tab_itens = _tab['itens'] || _tab
                        , t_class
                        , i_color = 'violet'
                    ;

                    switch (_tab_style){
                        case 'clean':
                            t_class = 'small pointing tabular secondary menu';
                            i_color = 'violet';
                            break;

                        case 'small':
                            t_class = 'small pointing secondary menu';
                            i_color = 'violet';
                            break;

                        case 'pointing':
                            t_class = 'small pointing menu';
                            i_color = 'violet';
                            break;

                        case 'button':
                            t_class = 'small menu';
                            i_color = 'violet';
                            break;

                        case 'old':
                            t_class = 'mini tabular menu';
                            i_color = '';
                            break;

                    }
                    
                    var tab_header  = $("<div>", {class: "ui top attached " + t_class})
                        , tabs = []
                        , areas = []
                        , active = 'active '
                        , t = 0
                    ;

                    // Linhas do tab
                    _tab_itens.forEach(tab => {
                        var a = $("<a>", {class: active + i_color + " item", "data-tab": f + "_" + t}).html(tab['label'])
                            , d = $("<div>", {class: "ui bottom attached tab segment " + active, "data-tab": f + "_" + t})
                        ;

                        if (tab.hasOwnProperty('hidden')){
                            if (typeof tab['hidden'] == 'object'){
                                var h = mod.path + ".data.row." + tab.hidden['field'] + (
                                    tab.hidden['cond']
                                        ? ' | ' + tab.hidden['cond']
                                        : ''
                                );
                                $(a).attr('rv-hide', h);
                                $(d).attr('rv-hide', h);
                            }
                        }

                        tab['linhas'].forEach(tlinha => {
                            d.append(
                                processLinhas(tlinha, inline, width, icon)
                            );
                        });

                        tabs.push(a);
                        areas.push(d);

                        active = '';
                        t++;
                    });

                    tabs.forEach(tab => {
                        tab_header.append(tab);
                    });
                    field.append(tab_header);
                    areas.forEach(area => {
                        field.append(area);
                    });

                    linha.append(field);

                // Componentes
                } else {

                    // Título
                    if (f == 'titulo' || f == 'icon') {
                        if (f == 'icon') continue;

                        icon = (l['icon'] ? '<i class="' + l['icon'] + ' icon"></i>' : '');
                        field.append($("<h4>", {class: "ui dividing header"}).html(icon + l[f]));
                        linha.append(field);
                        return linha;

                    // Componentes
                    } else {
                        var ctrl = layout.ctrls[f];
                        if (ctrl['label']) {
                            icon = (ctrl['icon'] ? '<i class="' + ctrl['icon'] + ' icon"></i>' : '');
                            field.append(
                                $("<label>", {'title': ctrl['help']})
                                    .html(icon + ' ' + ctrl['label'])
                            );
                        }

                        ctrl['autosave'] = f_config['autosave'];

                        // Processa um comp
                        field.append(getComp(ctrl, f, mod));

                        if (ctrl.hasOwnProperty('hidden')){
                            if (typeof ctrl['hidden'] == 'object'){
                                $(field).attr('rv-hide', mod.path + ".data.row." + ctrl.hidden['field'] + (
                                        ctrl.hidden['cond']
                                            ? ' | ' + ctrl.hidden['cond']
                                            : ''
                                    )
                                );
                            }
                        }

                        linha.append(field);
                    }
                }
            }
            return linha;
        };

        // Processa layout
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
            form.append(processLinhas(l, inline, width, icon));
        });

        // Registra
        mod.form.obj = form;
        mod.api.last_form_id = f_id;

        // Coloca na tela
        if (place){
            tshark.putLayout(form, place);
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

        //    tshark.initSemantic(place);
            
            place.data('_bound', rivets.bind(place, app));

            tshark.initSemantic(place);
            tshark.initAPIs(place);
        }
    };

    /**
     * Mascaras de digitação para inputs
     */
    TShark.prototype.mask = {

        // Máscara numérica
        number: function(inp){
            var txt = $(inp).val().replace(/\D/g, '');
            $(inp).val(txt);
        },

        // Máscara money / percent
        float: function(inp){
            var txt = ($(inp).val().replace(/\D/g, '') * 1) + ''
                , len = txt.length - 3
                , res = ''
                , l = -5
                , p = ''
            ;

            while (len < 0){
                txt = '0' + txt;
                len++;
            }

            res = ',' + txt.substr(-2);
            txt = txt.substr(0, txt.length-2);

            do {
                res = txt.substr(-3) + p + res;
                txt = txt.substr(0, txt.length-3);
                p = '.';
            } while (txt);

            $(inp).val(res);
            $(inp).trigger('input');
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

            case 'inpText':
                input = getInpText(ctrl, field, mod.path);
                break;

            case 'inpInt':
                input = getInpInt(ctrl, field, mod.path);
                break;

            case 'inpFloat':
                input = getInpFloat(ctrl, field, mod.path);
                break;

            case 'inpMoney':
                input = getInpMoney(ctrl, field, mod.path);
                break;

            case 'inpPercent':
                input = getInpPercent(ctrl, field, mod.path);
                break;

            case 'inpDate':
                input = getInpDate(ctrl, field, mod.path);
                break;

            case 'inpTime':
                input = getInpTime(ctrl, field, mod.path);
                break;

            case 'inpDateTime':
                ctrl['state'] = 'disabled';
                input = getInpText(ctrl, field, mod.path);
                break;

            case 'inpMemo'      :
            case 'inpMemoShort' :
            case 'inpMemoLong'  :
                input = getMemo(ctrl, field, mod.path);
                break;

            case 'inpChoose'    :
                input = getChoose(ctrl, field, mod.path);
                break;

            case 'dropdown'     :
            case 'inpDropdown'  :
                input = getDropdown(ctrl, field, mod.path);
                break;

            case 'inpList'      :
                input = getSelect(ctrl, field, mod.path);
                break;

            case 'inpCheckBox':
            case 'inpSlider':
            case 'inpToggle':
            case 'inpRadio':
                input = getCheck(ctrl, field, mod.path);
                break;

            case 'inpTemplate':
                input = getTemplate(ctrl, field);
                break;

            case 'space':
                input = getSpace(ctrl, field);
                break;

            default:
                ctrl['state'] = 'error';
                ctrl['placeholder'] = 'componente desconhecido';
                input = getInput(ctrl, field, mod.path);
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
            , tag
        ;

        // Extra left?
        if (ctrl['extra_left']) {
            classe += ' left ';
            if (typeof ctrl['extra_left'] == 'string'){
                tag = ctrl['extra_left'];
            } else {
                if (ctrl['extra_left']['class']) {
                    classe += ctrl['extra_left']['class'];
                }
                tag = ctrl['extra_left']['tag'];
            }

            $(wrapper)
                .append(tag)
                .append(inp)
            ;
            done = true;
        }

        // Extra right?
        if (ctrl['extra_right']) {
            classe += ' right ';
            if (typeof ctrl['extra_right'] == 'string'){
                tag = ctrl['extra_right'];
            } else {
                if (ctrl['extra_right']['class']) {
                    classe += ctrl['extra_right']['class'];
                }
                tag = ctrl['extra_right']['tag'];
            }

            if (!done) {
                $(wrapper)
                    .append(inp);
                done = true;
            }


            $(wrapper)
                .append(tag);
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
    function setExtras(input, ctrl, path){

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

        if (ctrl.hasOwnProperty('disabled')){
            if (typeof ctrl['disabled'] == 'object'){
                $(input).attr('rv-disabled', path + ".data.row." + ctrl.disabled['field'] + (
                        ctrl.disabled['cond']
                            ? ' | ' + ctrl.disabled['cond']
                            : ''
                    )
                );
            }
        }

        return input;
    }


    /**
     * Input de texto
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getTemplate(ctrl, field, path){
        var input = setExtras($("<div>", {
            class: "ui fluid container " + ctrl['id']
        }), ctrl, path);

        input.html(ctrl['html']);
        
        // Retorna
        return input;
    }
    
    /**
     * Input de texto
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getSpace(ctrl, field, path){
        var input = setExtras($("<input>", {
            type: "hidden",
            class: "ui fluid"
        }), ctrl, path);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl)
        }

        // Retorna
        return input;
    }

    /**
     * Input de texto
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpText(ctrl, field, path){
        var params = {
            type: "text",
            class: "ui fluid",
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl)
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpInt(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid",
            style   : 'text-align: center;',
            onkeyup : 'tshark.mask.number(this)',
            onclick : 'tshark.mask.number(this)',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl)
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpFloat(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid",
            style   : 'text-align: center;',
            onkeyup : 'tshark.mask.float(this)',
            onclick : 'tshark.mask.float(this)',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl)
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpMoney(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid",
            style   : 'text-align: right;',
            onkeyup : 'tshark.mask.float(this)',
            onclick : 'tshark.mask.float(this)',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        ctrl['extra_right'] = ctrl['extra_right'] || "<div class='ui label'>R$</div>";
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl, ' right labeled input')
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpPercent(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid",
            style   : 'text-align: right;',
            onkeyup : 'tshark.mask.float(this)',
            onclick : 'tshark.mask.float(this)',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        ctrl['extra_right'] = ctrl['extra_right'] || "<div class='ui label'>%</div>";
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl, ' right labeled input')
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpDate(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid date",
            style   : 'text-align: center;',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        ctrl['extra_right'] = ctrl['extra_right'] || "<i class='circular calendar icon' />";
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl, ' icon input')
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpTime(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid time",
            style   : 'text-align: center;',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        ctrl['extra_right'] = ctrl['extra_right'] || "<i class='circular wait icon' />";
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl, ' icon input')
        }

        // Retorna
        return input;
    }

    /**
     * Input de inteiros
     * @param ctrl
     * @param field
     * @param path
     * @returns {*}
     */
    function getInpDateTime(ctrl, field, path){
        var params = {
            type    : "text",
            class   : "ui fluid datetime",
            style   : 'text-align: center;',
            'rv-value': path + ".data.row." + field
        };

        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        var input = setExtras($("<input>", params), ctrl, path);

        // Extra
        if (ctrl['extra_left'] || ctrl['extra_right']) {
            input = wrap(input, ctrl, ' icon input')
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
            }
        ;
        if (ctrl['autosave']){
            params['server-onblur'] = path.split('.').join(' ') + " save";
        }

        switch (ctrl['comp']) {
            case 'inpMemoShort' : params.rows = 2;  break;
            case 'inpMemo'      : params.rows = 6;  break;
            case 'inpMemoLong'  : params.rows = 12; break;
        }
        var memo = setExtras($("<textarea>", params), ctrl, path);

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
            }
        ;
        if (ctrl['autosave']){
            params['server-onchange'] = path.split('.').join(' ') + " save";
        }

        var check = setExtras($("<input>", params), ctrl, path);

        // Extra
        //if (ctrl['extra_left'] || ctrl['extra_right']) {
            check = wrap(check, ctrl, 'toggle checkbox')
        //}

        // Retorna
        return check;

    }

    /**
     * Retorna um componente do tipo input choose from list
     * @param ctrl
     * @param field
     */
    function getChoose(ctrl, field, path) {
        var inp = $('<div>', {
                class:"ui icon input",
                server: ctrl['data']['from'].join(' ') + ' choose',
                'data-from': path,
                'data-field': field,
                'data-provider': ctrl['data']['provider'],
            }).data('map', ctrl['data']['map'] || ctrl['data']['mapfields'])
                .append(
                    setExtras($('<input>', {
                        type: 'text',
                        readonly: 'on',
                        class: 'cursor',
                        'rv-template': path + ".data.row." + field + " | " + ctrl['data']['template'],
                    }), ctrl, path),
                    $('<input>', {
                        type: 'hidden',
                        'rv-value': path + ".data.row." + field
                    })
                )
                .append($('<i>', {
                    class: 'circular angle double up link icon'
                }))
            ;

        // Retorna
        return inp;
    }

    /**
     * componente dropdown
     * @param ctrl
     * @param field
     * @param path
     */
    function getDropdown(ctrl, field, path){
        var search  = ctrl['data']['from'] ? 'search' : ''
            , menu  = $('<div>', {class: 'menu'})
            , label = ctrl['data']['label']
            , itobj = {class: 'text'}
            , val   = ''
            , lbl   = ''
        ;

        // Itens combo (não dataset)
        if (ctrl['data']['rows']){
            ctrl['data']['rows'].forEach(row => {
                menu.append(
                    $('<div>', {
                        class: 'item',
                        'data-value': row[field],
                        'data-path': path
                    }).html(row[ctrl['data']['label']])
                )
            });
        } else {
            itobj['rv-text'] = path + ".data.row." + label;
        }

        try {
            var m = tshark.getMod(path);
            val = m.data.row[field];
        } catch (e){}

        return $('<div>', {class: 'ui fluid ' + search + ' selection dropdown binded', style: 'line-height: 0.9em !important; min-height: 0px'})
           .append(
               $('<input>', {
                   type: 'hidden',
                   'rv-value': path + ".data.row." + field
               })
           )
           .append(
               $('<i>', {class: 'dropdown icon'})
           )
           .append(
               $('<div>', itobj).html('{' + path + ".data.row." + label + '}')
           )
           .append(
               menu
           ).dropdown({
                apiSettings: ctrl['data']['from'] ? {
                    throttle: 600,
                    url: '/comps/dropdown/' + ctrl['data']['from'].join('/') + '/{query}',
                    data: {
                        label: label,
                        provider: ctrl['data']['provider']
                    }
                } : {},
                onChange: function (value, text, selectedItem) {
                    var mod = tshark.getMod(path);
                    mod.data.row[field] = value;
                   // mod.data.row[label] = text;
                    if (ctrl['autosave']) {
                        mod.save();
                    }
                }
            }).dropdown('set selected', val);
    }










    /**
     * Retorna um dropdown
     * @param ctrl
     * @param field
     *
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
     *
    function simpleSelect(ctrl, field, path){
        var
            val  = (ctrl.data['key'] ? ctrl.data['key'] : field)
        , select = $("<select>", {
                id : field,
                class       : "ui fluid dropdown",
                style       : "white-space: nowrap !important",
                //'rv-value'  : "tshark.selectOpt < " + path + ".data.row." + val,
               //'rv-selectvalue' : path + ".data.row." + val,
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
     *
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
    */

})($);

