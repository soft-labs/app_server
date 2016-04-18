/**
 * Servidor de Aplicações - TShark v3
 *  Servidor de aplicações distintas, baseadas no engine TShark v3.
 *
 *  Estrutura típica das aplicações:
 *
 *   apps
 *    |--+ super_app_varejo
 *    |  |--+ _common
 *    |     |--+ _tmp
 *    |     |--+ css
 *    |     |--+ imgs
 *    |     |--+ js
 *    |     |--+ modulos
 *    |     |--+ views
 *    |     |- config.js
 *    |     |- router.js
 *    |     |- menu.js
 *    |     |- index.js
 *    |
 *    |  |--+ cliente1
 *    |     |--+ _tmp
 *    |     |--+ css
 *    |     |--+ imgs
 *    |     |--+ js
 *    |     |--+ modulos
 *    |     |--+ views
 *    |     |- config.js
 *    |     |- router.js
 *    |     |- menu.js
 *    |     |- index.js
 *    |
 *    |  |--+ cliente...n...
 *    |     |--+ css
 *    |     |--+ ...
 *    |
 *    |--+ super_app_escolas
 *    |  |--+ ...
 *    |
 *   _common
 *    |--+
 *    |  |--+ _tmp
 *    |  |--+ css
 *    |  |--+ imgs
 *    |  |--+ js
 *    |  |--+ modulos
 *    |  |--+ views
 *    |  |- config.js
 *    |  |- router.js
 *    |
 *    |--+ tshark
 *    |  |--+ business_objects
 *    |
 *    |- app.js
 *    |- config.js
 *    |- router.js
 *
 *
 * @link <a href='http://koajs.com/'>Koa</a>
 * @link <a href='https://github.com/alexmingoia/koa-router'>koa-router</a>
 * @link <a href='https://github.com/chrisyip/koa-jade'>koa-jade</a>
 * @link <a href='https://github.com/LeanKit-Labs/seriate'>Seriate</a>
 * @link <a href='http://underscorejs.org/'>Undescore</a>
 * @link <a href='https://www.npmjs.com/package/extend'>extend</a>
 * @author Labs
 * @since 22/03/2016
 */
require('app-module-path').addPath(require('path').resolve(__dirname));
var ts_static   = require('./tshark/static')
    , koaBody   = require('koa-body')
    , app       = require('koa')()
;

var path = require('path');
global.appRoot = path.resolve(__dirname);

/**
 * Configurações gerais da aplicação
 * @type { * }
 */
app.context.config = require('./config');
app.context.clientes = {};
app.context.running = {};


/**
 * Parsing de body (POST DATA && QUERY STRING)
 */
app.use(koaBody({formidable:{uploadDir: __dirname}}));

/**
 * Inicializa engine :: TShark
 * @type {TShark}
 */
app.engine = new (require('./tshark/tshark'))(app, true);

/**
 * Roteamento de APIs de business objects
 */
app.use(app.engine.router.routes());


/**
 * Roteamento da aplicação
 * @type {SQL|exports|module.exports}
 */
var router = require('./app_router');
app.use(router.routes());


/**
 * Roteamento especial de arquivos estaticos 
 * (js, css, png, jpg, etc...)
 */
app.use(ts_static({
    caching: false,         // Caching de arquivos       | True quando em produção 
    inside_node: false,     // TShark como node_module ? | True quando em produção
    quiet: true,            // Não exibe msg de erros    | True quando em produção
    log: false              // False quando em produção
}));


app.on('aerror', function(err, ctx){
    console.log(err.message);
   // ctx.throw(500, err.message);

   // ctx.statusCode = 500;
   // ctx.body = err.message;
});


/**
 * Http server
 */
app.listen(app.context.config.run.port);
console.log('running...');