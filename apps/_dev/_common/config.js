/**
 * BusinessObjects - Objetos suportados pela aplicação
 * 20/02/16
 */
module.exports = {

    info: {
        owner: 'IDE Tshark',
        cnpj: '',
        email: ''
    },
    
    security:{
        active: false
    },
    
    // Conexões à repositórios de dados
    conexoes:{

        // Base default TShark
        default: {
            tipo: 'mysql',
            conn: {
                database: 'dreams',
               // host: 'localhost',
               // port: '3347',
                user: 'root',
                password: 'desenv123'
            }
        },
        
        // Base blue1 SAP
        sap: {
            tipo: 'sqlserver',
            conn: {
                server: "10.211.55.8",
                userName: 'sa',
                password: '1234',
                options: {
                    instanceName: 'SAP',
                    database: 'SBO_DEMOCOMERCIAL_HOMOLOG_SAP'
                }
            },
            pool: {
                min: 1,
                max: 10,
                timeout: 30000
            }
        }
    }
    
};