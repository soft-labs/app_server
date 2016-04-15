/**
 * Created by labs on 15/04/16.
 */

function Cookie(){
    
}

Cookie.prototype.setKey = function(ctx){

    // Cria chave identificadora
    const crypto = require('crypto')
        , hash1  = crypto.createHash('sha256')
        , hash2  = crypto.createHash('sha256')
    ;
    hash1.update(ctx.ip);
    
    // Registra cookie
    var c_key = hash1.digest('hex')
        , key = ctx.cookies.get(c_key)
    ;
    if (!key) {
        hash2.update(ctx.originalUrl + Date.now() + (Math.random() * (500 - 1) + 1));
        key = hash2.digest('hex');
    }
    ctx.cookies.set(c_key, key);
    
    return key;
};


Cookie.prototype.getKey = function(ctx){

    // Cria chave identificadora
    const crypto = require('crypto')
        , hash   = crypto.createHash('sha256')
    ;
    hash.update(ctx.ip);
    var c_key = hash.digest('hex');
    
    return ctx.cookies.get(c_key)
};


// Exporta
module.exports = new Cookie();