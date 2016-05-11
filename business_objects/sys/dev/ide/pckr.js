/**
 * Created by labs on 06/05/16.
 */


String.prototype.obfuscate = function () {
    var bytes = [];
    for (var i = 0; i < this.length; i++) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes.join('');
};


var
    fs      = require('fs-extra')
    , dir   = module.paths[0] + '/tshark/client/v3/'
    , files = ['_api.js', '_dataset.js', '_extends.js', '_forms.js', '_modulo.j', 'tshark.js']
    , templ = fs.readFileSync(dir + 'tshark.js', 'utf8')

    , re_multiline_comments = /\/\*(.|\n)*?\*\//g
    , re_single_comment     = /\/\/(.|\n)*?\s.+/g
    , re_extra_space        = /^\s+|\s+$|\s+(?=\s)/g
;



templ = templ.replace(re_multiline_comments, '');
templ = templ.replace(re_single_comment, '');
templ = templ.replace(re_extra_space, '');


fs.writeFileSync(dir + '/dist/' + 'tshark.js', templ);

// 'teste'.obfuscate()

