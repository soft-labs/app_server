/**
 * Configurações globais do aplicativo - Nível APP_SERVER.
 *  As configurações deste arquivo estarão disponíveis em todos
 *  os aplicativos deste app server.
 *
 *  Todos os parâmetros definidos aqui poderão ser sobreescritos
 *  nos níveis do APP ou do CLIENT, exceto o que estiver em:
 *   specific:{
 *       app_server:{
 *           // VALORES AQUI NÃO PODERÃO SER SOBREESCRITOS NOS NIVEIS ABAIXO
 *       }
 *   }
 *
 * @engine TShark 3.0
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 09/04/2016
 */
module.exports = {

    // Valores protegidos específicos do nível
    specific: {
        app_server: {
            
        }
    },

    // Segurança nivel global - afeta todos os aplicativos
    security: {
        active: true,
        mode: 'softlabs.security.login'
    },

    // Conexões à repositórios de dados
    conexoes:{

        // Base Default
        drivers: {
            mysql: {
                date    : '%d/%m/%Y',
                datetime: '%d/%m/%Y %H:%i:%s'
            }
        }

    },
    
    // Auditoria nivel global
    auditing: {

        // Desligado por padrão
        active: false,

        // Audita sempre quem tá aqui
        white_list: {

        },

        // Nunca audita quem está aqui
        black_list: {
            softlabs: {
                app: ['app_auditoria', 'app_logs']
            }
        }
    }

};
