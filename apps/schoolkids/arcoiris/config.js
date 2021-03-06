/**
 * Configurações globais do aplicativo - Nível CLIENT.
 *  As configurações deste arquivo estarão disponíveis apenas
 *  para este cliente do aplicativo.
 *
 * @engine TShark 3.0
 * @copyright [== © 2016, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 09/04/2016
 */
module.exports = {
    info: {
        owner: 'Escolinha Arco Íris',
        cnpj: '20.335.273/0001-02',
        email: 'admin@casasilva.com.br'
    },

    // Segurança nivel aplicativo - afeta todos os clients
    security: {
        active: true,
        mode: 'simple',
        users: {
            labs: '1234',
            admin: '1234'
        }
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
    },
    
    // Conexões à repositórios de dados
    conexoes:{

        // Base Default
        default: {
            tipo: 'mysql',
            conn: {
                database: 'softlabs',
                // host: 'localhost',
                // port: '3347',
                user: 'root',
                password: 'desenv123'
            }
        }

    },

    // Objetos de negócio da aplicação
    businessObjects: {

    }
};