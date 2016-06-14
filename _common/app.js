/**
 * TShark - Client 3.0
 * Implementação de funcionalidades de interface
 *  - Inicialização do App
 *
 * @copyright [== © 2015, Softlabs ==]
 * @link www.softlabs.com.br
 * @author Luiz Antonio B. Silva [Labs]
 * @since 11/10/2015
 */
var tshark = new TShark({  // Instancia do TShark
    base_url: 'tshark'
});

// Instancia do app
var app  = {             

    //region :: Meses do ano
    meses: {
        1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho',
        7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
    },
    meses_array: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],

    meses_abrev: {
        1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun',
        7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez'
    },
    meses_abrev_array: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],

    //endregion

    //region :: Dias da semana
    
    dias: {1: 'Domingo', 2: 'Segunda', 3: 'Terça', 4: 'Quarta', 5: 'Quinta', 6: 'Sexta', 7: 'Sábado'},
    dias_array: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],

    dias_abrev: {1: 'Dom', 2: 'Seg', 3: 'Ter', 4: 'Qua', 5: 'Qui', 6: 'Sex', 7: 'Sáb'},
    dias_abrev_array: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],

    dias_full: {
        1: 'Domingo', 2: 'Segunda-feira', 3: 'Terça-feira', 4: 'Quarta-feira', 
        5: 'Quinta-feira', 6: 'Sexta-feira', 7: 'Sábado'
    },
    dias_full_array: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],

    //endregion

    /**
     * Indicador da carga
     */
    loaded: false,

    /**
     * Entrada de router
     */
    router: 'tshark',
    
    /**
     * Dataset global do app
     */
    data: new Dataset(),

    /**
     * Submenu dinâmico
     */
    submenu: [],
    
    /**
     * Inicializador default
     */
    init: function(){
            
    }
};

// Fim da carga do browser
$(document).ready(function() {

    // Registra o módulo de security
    tshark.register('sys.app.security');

    // Carga feita
    app.loaded = true;
});

