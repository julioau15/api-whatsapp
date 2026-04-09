/***********************************************************************
 * Objetivo: Arquivo responsável pelas funções da API WhatsApp
 * Data: 08/04/2026
 * Autor: Julio
 * Versão: 1.0
 * ********************************************************************/

/*
 * END-POINTS:
 *  (getUsuarios) Listar todos os dados de usuário independente do número
 *  (getProfileUsuario) Listar dados da conta do profile do usuário filtrando pelo número
 *  (getContatosUsuario) Listar dados de contato para cada usuário filtrando pelo número
 *  (getMensagensUsuario) Listar todas as mensagens trocadas de uma conta de usuário filtrando pelo número
 *  (getMensagensContato) Listar as mensagens trocadas de uma conta com um contato
 *  (getFiltroMensagens) Filtro de mensagens por palavras-chave
 */

// Import dos dados da API
const contatos = require('./contatos').contatos

// Retorna todos os usuários
const getUsuarios = () => contatos

// Retorna dados de Profile de um usuário
const getProfileUsuario = (num) => {
    let numero = String(num)
    let dadosProfile = {
        "account":"",
        "nickname":"",
        "created-since":{},
        "profile-image":"",
        "number":"",
        "background":""
    }
    let status = false

    contatos['whats-users'].forEach(usuario => {
        if(numero == String(usuario.number)){
            dadosProfile.account = usuario.account
            dadosProfile.nickname = usuario.nickname
            dadosProfile['created-since'] = usuario['created-since']
            dadosProfile['profile-image'] = usuario['profile-image']
            dadosProfile.number = usuario.number
            dadosProfile.background = usuario.background

            status = true
        }
    })

    if(!status)
        return status

    return dadosProfile
}

// Retorna todos contatos de um usuário
const getContatosUsuario = (num) => {
    let numero = String(num)
    let dadosContatos = {"contacts":[]}
    let status = false

    contatos['whats-users'].forEach(usuario => {
        if(numero == String(usuario.number)){
            status = true
            usuario.contacts.forEach(contato => {
                dadosContatos.contacts.push(
                    {
                        "name":contato.name,
                        "description":contato.description,
                        "image":contato.image
                    }
                )
            })
        }
    })

    if(!status)
        return status

    return dadosContatos   
}

// Retorna todas mensagens de um usuário
const getMensagensUsuario = (num) => {
    let numero = String(num)
    let mensagens = {"messages":[]}
    let status = false

    contatos['whats-users'].forEach(usuario => {
        if(numero == String(usuario.number)){
            status = true
            usuario.contacts.forEach(contato => {
                mensagens.messages.push(contato.messages)
            })
        }
    })

    if(!status)
        return status

    return mensagens  
}

// Retorna as mensagens de um usuário com um contato
const getMensagensContato = (num, nameContact) => {
    let numero = String(num)
    let nomeContato = String(nameContact)
    let mensagens = {
        "name":"",
        "description":"",
        "image":"",
        "messages":[]
    }
    let status = false

    contatos['whats-users'].forEach(usuario => {
        if(numero == String(usuario.number)){
            usuario.contacts.forEach(contato => {
                if(nomeContato.toLowerCase().replaceAll(" ", "") == String(contato.name).toLowerCase().replaceAll(" ", "")){
                    mensagens.name = contato.name
                    mensagens.description = contato.description
                    mensagens.image = contato.image
                    mensagens.messages = contato.messages

                    status = true
                }
            })
            
        }
    })

    if(!status)
        return status

    return mensagens  
}

// filtra mensagens do usuário que contenham uma palavra-chave informada
const getFiltroMensagens = (num, palavra) => {
    let numero = String(num)
    let palavraChave = String(palavra)
    let mensagens = {
        "messages":[]
    }
    let status = false

    contatos['whats-users'].forEach(usuario => {
        if(numero == String(usuario.number)){
            usuario.contacts.forEach(contato => {
                contato.messages.forEach(mensagem => {
                    if(String(mensagem.content).toLowerCase().includes(palavraChave.toLowerCase())){
                        mensagens.messages.push(mensagem)
                        status = true
                    }
                })
            })
        }
    })

    if(!status)
        return status
    
    return mensagens
}

// Export das funções
module.exports = {
    getUsuarios,
    getProfileUsuario,
    getContatosUsuario,
    getMensagensUsuario,
    getMensagensContato,
    getFiltroMensagens
}