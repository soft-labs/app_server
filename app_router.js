/**
 * Roteamentos da aplicação
 */
var router   = require('koa-router')()
    , fs     = require('fs-extra')
    , extend = require('extend')
;


//region :: Home page

router.get('/', function *(next) {
    this.body = 'Acesso negado';
});


router.get('/testes', function *(next) {
    require('../_testes')();
});



/**
 * Clientes sem filial
 */
router.get(/^\/(\w+)$/, function *(next) {
    yield initCliente(this);
});

/**
 * Clientes com filial
 */
router.get(/^\/(\w+)\/(\w+)$/, function *(next) {
    yield initCliente(this);
});

/**
 * Inicializa um cliente na primeira carga
 * e seta os cookies necessários para a utilização
 * do aplicativo
 * @param req
 */
function *initCliente(req){
    var path        = 'apps' + req.originalUrl + '/'
        , engine    = req.app.engine
        , clientes  = req.app.context.clientes
        , app       = req.captures[0]
    ;

    // Registra o contexto do cliente
    var novo = engine.assurePath(clientes, req.captures,
        {
            _log: {
                _last_access    : '',
                _logged_users   : { }
            },
            app: req.captures,
            flowPaths: {
                up: [
                    global.appRoot + '/apps/' + req.captures.join('/') + '/',
                    global.appRoot + '/apps/' + req.captures[0] + '/_common/',
                    global.appRoot + '/_common/'
                ],
                down: [
                    global.appRoot + '/_common/',
                    global.appRoot + '/apps/' + req.captures[0] + '/_common/',
                    global.appRoot + '/apps/' + req.captures.join('/') + '/'
                ]
            }
        }
    );
    
    // Seta o config no request para o cliente atual
    req.state.config = engine.getObjPath(clientes, req.captures);

    // Foi registrado
    if (novo) {

        extend(true,
            req.state.config,

            fs.existsSync('./config.js')
                ? require('./config.js') : {},

            fs.existsSync('./_common/config.js')
                ? require('./_common/config.js') : {},

            fs.existsSync('apps/' + app  + '/_common/config.js')
                ? require('apps/' + app  + '/_common/config.js') : {},

            fs.existsSync(path + '/config.js')
                ? require(path + '/config.js') : {}
        );
    }

    // Registra cookie
    var key = require('tshark/cookie').setKey(req);
    if (!req.app.context.running[key]){
        req.app.context.running[key] = req.state.config;
    }

    // Renderiza index
    req.body = yield engine.render('index', req);
    
}

//endregion


module.exports = router;
