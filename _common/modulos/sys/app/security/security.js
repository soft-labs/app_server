/**
 * TShark - Client 3.0
 * Funcionalidades de interface: Segurança
 *
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 04/03/2016
 */
tshark.modulos._add('sys.app.security', {

    /**
     * Inicializa
     */
    init: function(){
        this.data.addRow({
            username: '',
            password: ''
        });
    },

    /**
     * Executa um login
     * @param ev
     */
    login: function(ev){
        if (ev.keyCode == 13) {
            sys.app.security.exec('login');
        }
    },

    /**
     * Efetua o login
     */
    onBeforeLogin: function(el, settings){
        if (!this.data.row['username']) {
            $('#username').focus();
            return this.erro('Informe o seu usuário.');
        }
        
        if (!this.data.row['password']) {
            $('#password').focus();
            return this.erro('Informe sua senha.');
        }

        $('#login_form').addClass('loading');
        
        // Acrescenta o row ao pacote
        this.send(this.data.row);
        
        // Libera ou não para continuar
        return true;
    },
    
    /**
     * Chamado após o login
     */
    onAfterLogin: function(response, next){
        $('#login_form').removeClass('loading');
        
        // Falhou
        if (!response['result']){
            this.popErro('Acesso não autorizado.');
        
        // Ok    
        } else {
            $('#login').transition({
                animation: 'fade',
                onComplete: function(){
                    window.location.reload(true);
                }
            });
        }
        
    },

    /**
     * Executa um logout
     * @param ev
     */
    logout: function(ev){
        sys.app.security.exec('logout');
    },
    
    /**
     * Chamado após um logout
     */
    onAfterLogout: function(response, next){
        if (response['result']) {
            $('.app').transition({
                animation: 'fade',
                onComplete: function(){
                    window.location.reload(true);
                }
            });
        } else {
            this.popErro('Aconteceu um erro ao executar o comando.', 'Tente novamente, por favor');
        }
    }
    
});


//# sourceURL=sys.app.security.js