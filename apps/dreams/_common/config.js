/**
 * Configurações globais do aplicativo - Nível APP.
 *  As configurações deste arquivo estarão disponíveis em todos
 *  os clientes deste aplicativo.
 *
 *  Todos os parâmetros definidos aqui poderão ser sobreescritos
 *  nos CLIENT, exceto o que estiver em:
 *   specific:{
 *       app:{
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
        app: {
            
        }
    },

    // Segurança nivel aplicativo - afeta todos os clients
    security: {
        active: true,
        mode: 'softlabs.security'
    },

    // Conexões à repositórios de dados
    conexoes:{

        // Base Default
        default: {
            tipo: 'mysql',
            conn: {
                database: 'dreams',
                user: 'root',
                password: 'desenv123'
            }
        }

    },

    // Server push
    pushserver: {
        url:  "localhost",
        port: "8000",
        ios: {
            cert: "apps/dreams/_common/cert/dev/cert.pem",
            key: "apps/dreams/_common/cert/dev/key.pem",
            pass: "Dr3@m$#T3@m",
        }
    },

    email: {
        user     : "noreply@dreamsteam.com.br",
        password : "Dreamsteam8",
        host     : "email-ssl.com.br",
        port     : "987",
        dreams   : "noreply@dreamsteam.com.br",
        ssl      : true
    },
    
    // Auditoria nivel aplicativo
    auditing: {

        // Desligado por padrão
        active: false,

        // Audita sempre quem tá aqui
        white_list: {

        },

        // Nunca audita quem está aqui
        black_list: {
            
        }
    }
};