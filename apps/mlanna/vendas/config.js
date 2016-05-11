/**
 * BusinessObjects - Objetos suportados pela aplicação
 * 20/02/16
 */
module.exports = {
    depth: {
        app: {

        }
    },
    info: {
        owner: 'Casas do João',
        cnpj: '20.335.273/0001-02',
        email: 'admin@casasjoao.com.br'
    },
    
    security:{
        active: true,
        mode: 'simple',
        users: {
            labs: '1234',
            admin: '1234'
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
        },

        // Acesso ao SAP via DI
        sap_di: {
            tipo: 'di',
            conn: {
                user: 'manager',
                pwd: '1234'
            }
        }

    },

    // Objetos de negócio da aplicação
    businessObjects: {

        sap: {
            conn: 'sap-di',
            sap: {
                modulos: [
                    'ocrd', 'oitm'
                ]
            }
        },

        default: {
            conn: 'blue1',
            sap: {
                modulos: [
                    'compras', 'vendas'
                ]
            },
            map: {
                modulos: [
                    'clientes', 'itens'
                ]
            },
            concil: {
                modulos: [
                    'concil_vendas'
                ]
            },
            itens: {
                conn: 'giro',
                modulos: [
                    /* Se não definido nenhum, valem todos */
                ]
            }
        }

    }

};