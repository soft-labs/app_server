'use strict';

var send        = require('koa-send')
    , path      = require('path')
    , fs        = require('fs-extra')
;


/**
 * Engine de aplicações - TShark.
 *   Serve arquivos estáticos, cuidando que arquivos js e css sejam servidos
 * implementando composição e overwrite.
 *
 *   Se o mesmo arquivo css ou js existir em multiplos paths,
 *      ex: appone/myapp/js/teste.js e appone/_common/js/teste.js
 *
 *   Ele será carregado por padrão do path mais baixo para o path mais alto,
 *   fazendo concatenação com os arquivos encontrados.
 *
 *   Para alterar o fluxo, requisite o arquivo com '?flow=[up|down]'
 *   Para evitar a concatenação, e retornar o primeiro encontrado,
 *   requisite o arquivo com '?over=1'
 * @param opts {{caching: false, log: false}}
 * @author labs
 * @since 10/04/2016
 * @constructor
 */
module.exports = function(opts) {
    let options = opts || {};
    let log = options.log || false;
    let caching = options.caching || false;
    let ts_path = options.inside_node ? 'node_modules/' : '';
    options.root = './';

    let cookies = require('./cookie');

    let cache = {};
    return function*(next) {
        try {
            var key         = cookies.getLoggedUser(this)
                , tmp       = this.path.split('/')
                , file      = path.parse(this.path)
                , cliente   = this.app.context.running[key]
                , cli       = (cliente
                    ? cliente.app.join('/')
                    : ''
                )
                , app       = (cliente
                    ? cliente.app[0]
                    : tmp[1]
                )
            ;
            tmp.shift();
            tmp.shift();
            var p = tmp.join('/');

            if (!caching || !cache[cli]) {
                cache[cli] = {};
            }

            if (!cache[cli][p]) {
                cache[cli][p] = [];

                var base_cli = 'apps/' + cli + '/'
                    , base_app = 'apps/' + app + '/_common/'
                    , base_global = '_common/'
                    , base_tshark = ts_path + 'tshark/'
                    , flow_up = [base_cli + p, base_app + p, base_global + p, base_tshark + p]
                    , flow_down = [base_tshark + p, base_global + p, base_app + p, base_cli + p]
                ;

                var over = this.request.query['overwrite'] || this.request.query['over'];

                // Serve js e css em overwrite
                var done = false;
                if (file.ext == '.js' || file.ext == '.css') {
                    var flow = (this.request.query['flow'] && this.request.query['flow'] == 'up'
                            ? flow_up
                            : flow_down
                    );

                    flow.forEach((arq) => {
                        if (!done && fs.existsSync(arq)) {
                            cache[cli][p].push(arq);
                            done = over;
                        }
                    });

                    // Serve o resto, o primeiro que achar
                } else {
                    var flow = (this.request.query['flow'] && this.request.query['flow'] == 'down'
                            ? flow_down
                            : flow_up
                    );
                    flow.forEach((arq) => {
                        if (!done && fs.existsSync(arq)) {
                            cache[cli][p].push(arq);
                            done = true;
                        }
                    });

                }
            }

            var sent = false;
            if (cache[cli][p].length == 1) {
                try {
                    sent = yield send(this, cache[cli][p][0], options);
                    if (sent) {
                        return;
                    } else {
                        return yield *next;
                    }
                } catch (e){
                    
                }
            } else {
                var buff = '', q = '';
                for (var i = 0; i < cache[cli][p].length; i++) {
                    buff += q + fs.readFileSync(cache[cli][p][i], 'utf8');
                    q = '\n\n\n';
                }
                if (file.ext == '.css'){
                    this.set('Content-Type', 'text/css; charset=utf-8');
                } else if (file.ext == '.js') {
                    this.set('Content-Type', 'application/javascript; charset=utf-8');
                    buff += '\n\n//# sourceURL=' + tmp.join('.') + '.js'
                }
                this.body = buff;
            }
        } catch (e){
      //      console.log(e);
        }






        /*
nome
ferruchio 10
Helemond Swartz 10
gustavo 10

animal
flamingo 10
Helefante 0
golfinho 10

fruta
hamora
gaqui

comida
farofa 10
hamburguer 10
gulash 10

cor
fermelho
hazul


cep
foz do iguacu 10
heliopolis 10
guarani 10

ator
fernando duarte 10
Henrique duarte 10
Gilberto gil 10

carro
fiesta 5
hb20 5
gurgel 10

objeto
faca 10
holograma 10
garrafa 10

programa tv
focas no mundo 0
Hello Kit 10
gelo e fogo

minha sogra e
feliz 10
Historiadora 10
garconete 10

pch
fim do dedo 0
hunha
goelho

75
75
80

        */
    }
};
