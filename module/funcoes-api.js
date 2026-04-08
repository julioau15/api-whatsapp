/***********************************************************************
 * Objetivo: Arquivo responsável pelas funções da API WhatsApp
 * Data: 08/04/2026
 * Autor: Julio
 * Versão: 1.0
 * ********************************************************************/

/**
 * END-POINTS:
 *  (getListaUsuarios) Listar todos os dados de usuário independente do número
 *  (getDadosProfile) Listar dados da conta do profile do usuário filtrando pelo número
 *  (getDadosContatos) Listar dados de contato para cada usuário filtrando pelo número
 *  (getListaMensagens) Listar todas as mensagens trocadas de uma conta de usuário filtrando pelo número
 *  (getMensagensContato) Listar as mensagens trocadas de uma conta com um contato
 *  (getFiltroPalavraChave) Filtro de mensagens por palavras-chave
 */

const contatos = require('./contatos').contatos

const getListaUsuarios = () => contatos

const getDadosProfile = (num) => {
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

const getDadosContatos = (num) => {
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

const getListaMensagens = (num) => {
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
                if(nomeContato.trim().toLowerCase() == String(contato.name).trim().toLowerCase()){
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

const getFiltroPalavraChave = (num, palavra) => {
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