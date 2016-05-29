/**
 * BusinessObject :: SecUsuarios
 *  Implementação de objeto de negócio: sec_usuarios.
 *
 * Engine de aplicações - TShark.
 * @since Thu May 26 2016 11:10:38 GMT-0300 (BRT)
 * @constructor
 */
function SecUsuarios(){

    //region :: Definições do Objeto

    // Id
    this.id = 'sec_usuarios';

    // Map
    this.source = {
        table: 'sec_usuarios',
        metadata: {
            key: 'sec_usuarios_key',
            label: 'usuario',
            fields: {
                sec_usuarios_key: {
                    tipo: types.comp.key, label: 'Sec Usuarios:'
                }, 
                parceiros_key: {
                    tipo: types.comp.choose, label: 'Parceiros:',
                    data: { 
                        key: ['parceiros_key'], 
                        from: ['softlabs', 'parceiros', 'parceiros'], 
                        template: '{parceiros_key} - {parceiro}', 
                        provider: '' 
                    } 
                }, 
                sec_perfis_key: {
                    tipo: types.comp.choose, label: 'Sec Perfis:',
                    data: { 
                        key: ['sec_perfis_key'], 
                        from: ['softlabs', 'security', 'sec_perfis'], 
                        template: '{sec_perfis_key} - {sec_perfi}', 
                        provider: '' 
                    } 
                }, 
                ativo: {
                    tipo: types.comp.int, label: 'Ativo:'
                }, 
                auditar: {
                    tipo: types.comp.int, label: 'Auditar:'
                }, 
                usuario: {
                    tipo: types.comp.text, label: 'Usuario:'
                }, 
                senha: {
                    tipo: types.comp.text, label: 'Senha:'
                }, 
                nome: {
                    tipo: types.comp.text, label: 'Nome:'
                }, 
                telefone: {
                    tipo: types.comp.text, label: 'Telefone:'
                }, 
                email: {
                    tipo: types.comp.text, label: 'Email:'
                }, 
                expira_em: {
                    tipo: types.comp.date, label: 'Expira Em:'
                }, 
                observacoes: {
                    tipo: types.comp.text_big, label: 'Observações:'
                }
            }
        }
    };

    //endregion


    //region :: Forms

    this.forms = {

        // Form de update
        update:{
            _config: {
                bounds: { width: 800, height: 450 },
                labels: types.form.lines.labels.ontop,
                comps : types.form.lines.distribution.percent,
                state : types.form.state.ok,
                size  : types.form.size.small,
                external: [
                    
                ]
            },
            linhas: [
                {titulo: "Informações de sec_usuarios"},
                {sec_usuarios_key: 25, parceiros_key: 25, sec_perfis_key: 25, ativo: 25}, 
                {auditar: 25, usuario: 25, senha: 25, nome: 25}, 
                {telefone: 25, email: 25, expira_em: 25, observacoes: 25}
            ],
            ctrls: {
                usuario: {
                    extra_right: { class: '', tag: '' },
                    extra_left:  { class: '', tag: '' }
                }
            }
        }

    };

    //endregion


    //region :: Providers

    this.providers = {

        default: {
            sources: {
                0: {
                    from: ['softlabs', 'security', 'sec_usuarios'],
                    fields: [
                        
                    ]
                },
                1: { 
                    from: ['softlabs', 'parceiros', 'parceiros'],
                    join: {source: 0, tipo: types.join.left, on: 'parceiros_key', where: ''},
                    fields: [
                        
                    ]
                },
                2: { 
                    from: ['softlabs', 'security', 'sec_perfis'],
                    join: {source: 0, tipo: types.join.left, on: 'sec_perfis_key', where: ''},
                    fields: [
                        
                    ]
                } 
            },
            where: [ 
                ['AND', 0, 'sec_usuarios_key', types.where.check]
            ],
            order: [
                [0, 'usuario', 'asc']
            ],
            search: [
                    {alias: 4, field: 'usuario',  param: types.search.like_full },
                    {alias: 4, field: 'senha',  param: types.search.like_full },
                    {alias: 4, field: 'nome',  param: types.search.like_full },
                    {alias: 4, field: 'telefone',  param: types.search.like_full },
                    {alias: 4, field: 'email',  param: types.search.like_full },
                    {alias: 4, field: 'expira_em',  param: types.search.maior_igual }
            ],
            limit: 250,
            showSQL: 0
        },

        update: {
            sources: {
                0: {
                    from: ['softlabs', 'security', 'sec_usuarios'],
                    key: 'sec_usuarios_key',
                    where: [
                        
                    ]
                }
            },
            showSQL: 0
        }

    };

    //endregion


    //region :: Eventos


    //region :: onGet

    /**
     * Evento chamado no início de qualquer operação GET
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onGet = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final de qualquer operação GET
     * @param ret Objeto de retorno
     *
    this.onAfterGet = function *(ret, ctx){

    };

    /* */
    //endregion

    
    //region :: onList
    
    /**
     * Evento chamado na operação GET :: LIST
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onList = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: LIST
     * @param ret Objeto de retorno
     *
    this.onAfterList = function *(ret, ctx){

    };

     /* */
    //endregion

    
    //region :: onSearch
    
    /**
     * Evento chamado na operação GET :: SEARCH
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onSearch = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: SEARCH
     * @param ret Objeto de retorno
     *
    this.onAfterSearch = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onSelect

    /**
     * Evento chamado antes de rodar um select
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
     this.onSelect = function *(prov, ctx){

    };

     /* */
    //endregion


    //region :: onGetRow

    /**
     * Evento chamado para processamento customizado de
     * cada row em um select
     * @param row
     *
     this.onGetRow = function (row){
        row['teste'] = 'estive no get row!!!';
    };

     /* */
    //endregion


    //region :: onGetForm

    /**
     * Evento chamado na recuperação de um formulário
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onGetForm = function *(form, ctx){

    };

     /**
     * Evento chamado na recuperação de dados de um formulário
     * @param ret Objeto de retorno
     *
    this.onGetFormData = function *(ret, get){

    };

     /* */
    //endregion


    //region :: onEdit
     
    /**
     * Evento chamado na operação GET :: EDIT
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onEdit = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: EDIT
     * @param ret Objeto de retorno
     *
    this.onAfterEdit = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onCreate

    /**
     * Evento chamado na operação GET :: CREATE
     * @param ret Objeto de retorno
     * @param ctx Contexto de chamada
     *
    this.onCreate = function *(ret, ctx){

    };

    /**
     * Evento chamado ao final da operação GET :: CREATE
     * @param ret Objeto de retorno
     *
    this.onAfterCreate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onInsert
     
    /**
     * Evento chamado na operação POST :: Insert
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onInsert = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação POST :: Insert
     * @param ret Objeto de retorno
     *
    this.onAfterInsert = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onUpdate

    /**
     * Evento chamado na operação PUT :: Update
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onUpdate = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação PUT :: Update
     * @param ret Objeto de retorno
     *
    this.onAfterUpdate = function *(ret, ctx){

    };

     /* */
    //endregion


    //region :: onDelete

    /**
     * Evento chamado na operação DELETE :: Delete
     * @param prov Provider de dados
     * @param ctx Contexto de chamada
     *
    this.onDelete = function *(prov, ctx){

    };

    /**
     * Evento chamado ao final da operação DELETE :: Delete
     * @param ret Objeto de retorno
     *
    this.onAfterDelete = function *(ret, ctx){

    };

     /* */
    //endregion


    /* */
    //endregion


    //region :: Regras de Negócio

    //endregion
    
}

// Types
const types = require('../../../../tshark/types');

// Exporta
module.exports = SecUsuarios;