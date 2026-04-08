/***********************************************************************
 * Objetivo: API WhatsApp
 * Data: 08/04/2026
 * Autor: Julio
 * Versão: 1.0
 * ********************************************************************/

/**
 * END-POINTS:
 *  () Listar todos os dados de usuário independente do número
 *  () Listar dados da conta do profile do usuário filtrando pelo número
 *  () Listar dados de contato para cada usuário filtrando pelo número
 *  () Listar todas as mensagens trocadas de uma conta de usuário filtrando pelo número
 *  () Listar as mensagens trocadas de uma conta com um contato
 *  () Filtro de mensagens por palavras-chave
 */

const express = require('express')
const cors = require('cors')

const {
    getUsuarios,
    getProfileUsuario,
    getContatosUsuario,
    getMensagensUsuario,
    getMensagensContato,
    getFiltroMensagens
} = require('./module/funcoes-api')

const corsOptions = {
    origin:["*"],
    methods:"GET",
    allowedHeaders: ['Content-type', 'Autorization']
}

const port = 8080

const app = express()

app.use(cors(corsOptions))

const DOC_API = {
    "project": "WhatSapp",
    "description":"API para manipular dados de usuarios no WhatSapp.",
    "date": "2026-04-08",
    "version": "1.0",
    "developer": "Julio Augusto",
    "end-points": [
        {
            "id": 1,
            "route 1": '/v1/senai/usuarios',
            "description":"Retorna uma lista com todos usuários."
        },
        {
            "id": 2,
            "route 2": '/v1/senai/profile/dados/?numero=11987876567',
            "description":"Retorna os dados de profile do usuário filtrando pelo número."
        },
        {
            "id": 3,
            "route 3": '/v1/senai/contatos/dados/?numero=11987876567',
            "description":"Retorna os dados dos contatos do usuário filtrando pelo número."
        },
        {
            "id": 4,
            "route 4": '/v1/senai/mensagens/usuario/?numero=11987876567',
            "description":"Retorna todas mensagens do usuário filtrando pelo número."
        },
        {
            "id": 5,
            "route 5": '/v1/senai/contato/mensagens/?numero=11987876567&nome=ana%20maria',
            "description":"Retorna o histórico de mensagens entre o usuário e um contato filtrando pelo número do usuário e pelo nome do contato."
        }, 
        {
            "id": 6,
            "route 6": '/v1/senai/filtro/mensagens/?numero=11987876567&palavra=ei!',
            "description":"Retorna as mensagens que contenham a palavra chave, filtrando pelo número do usuário e pela palavra."
        }
    ]
}


// Raiz do projeto sucesso
app.get('/', (req,res) => {
    res.status(200).json(
        {
            "message": "API Estados e cidades Funcionando. Por favor, acesse a documentação.",
            "route_doc": "/v1/senai/help"
        }
    )
})

app.get('/v1/senai/help', (req,res) => {
    res.status(200).json(DOC_API)
})

app.get('/v1/senai/usuarios', (req,res) => {
    let usuarios = getUsuarios()
    res.status(200).json(usuarios)
})

app.get('/v1/senai/profile/dados/', (req,res) => {
    let numero = req.query.numero
    let dadosProfile = getProfileUsuario(numero)
    if(dadosProfile){
        res.status(200).json(dadosProfile)
    }else{
        res.status(404).json({"message": "Erro, dados do usuário não encontrados."})
    }
})

app.get('/v1/senai/contatos/dados/', (req,res) => {
    let numero = req.query.numero
    let dadosContatos = getContatosUsuario(numero)
    if(dadosContatos){
        res.status(200).json(dadosContatos)
    }else{
        res.status(404).json({"message": "Erro, dados dos contatos não encontrados."})
    }
})

app.get('/v1/senai/mensagens/usuario/', (req,res) => {
    let numero = req.query.numero
    let mensagens = getMensagensUsuario(numero)
    if(mensagens){
        res.status(200).json(mensagens)
    }else{
        res.status(404).json({"message": "Erro, nenhuma mensagem foi encontrada."})
    }
})

app.get('/v1/senai/contato/mensagens/', (req,res) => {
    let numero = req.query.numero
    let nomeContato = req.query.nome
    let mensagensContato = getMensagensContato(numero, nomeContato)
    if(mensagensContato){
        res.status(200).json(mensagensContato)
    }else{
        res.status(404).json({"message": "Erro, nenhuma mensagem foi encontrada."})
    }
})

app.get('/v1/senai/filtro/mensagens/', (req,res) => {
    let numero = req.query.numero
    let palavraChave = req.query.palavra
    let filtroMensagens = getFiltroMensagens(numero, palavraChave)
    if(filtroMensagens){
        res.status(200).json(filtroMensagens)
    }else{
        res.status(404).json({"message": "Erro, nenhuma mensagem foi encontrada."})
    }
})

// Raiz do projeto Erro
app.use((req,res) => {
    res.status(404).json(
        {
            "message": "não foi possivel acessar esta rota. Por favor, acesse a documentação.",
            "route_doc": "/v1/senai/help"
        }
    )
})

app.listen(port, (req,res) => {
    console.log(`API WhatSapp no ar.`)
})
