# API WhatsApp (Simulação)

API REST desenvolvida com Node.js e Express com o objetivo de simular funcionalidades básicas do WhatsApp, permitindo consulta de usuários, contatos e mensagens.

## Tecnologias utilizadas

- Node.js
- Express
- CORS
- JavaScript

## Funcionalidades

- Listar todos os usuários  
- Consultar perfil de um usuário  
- Listar contatos de um usuário  
- Listar todas as mensagens de um usuário  
- Listar mensagens com um contato específico  
- Filtrar mensagens por palavra-chave  

## Endpoints

### Listar usuários
```http
GET /v1/senai/usuarios
```

### Perfil do usuário
```http
GET /v1/senai/usuarios/profile?numero=119XXXXXXXX
```

### Contatos do usuário
```http
GET /v1/senai/usuarios/contatos?numero=119XXXXXXXX
```

### Mensagens do usuário
```http
GET /v1/senai/usuarios/mensagens?numero=119XXXXXXXX
```

### Mensagens por contato
```http
GET /v1/senai/usuarios/contatos/mensagens?numero=119XXXXXXXX&nome=Nome%20Contato
```

### Filtro de mensagens
```http
GET /v1/senai/usuarios/mensagens/filtro?numero=119XXXXXXXX&palavra=texto
```

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/api-whatsapp.git
```

### 2. Acesse a pasta
```bash
cd api-whatsapp
```

### 3. Execute o servidor
```bash
node app.js
```

## Acesso

API em produção:
```
https://api-whatsapp-2u8q.onrender.com/
```

Documentação da API (Postman):
```
https://documenter.getpostman.com/view/53364438/2sBXirjU3v
```

Documentação interna:
```
https://api-whatsapp-2u8q.onrender.com/v1/senai/help
```

Exemplo de uso:
```http
GET https://api-whatsapp-2u8q.onrender.com/v1/senai/usuarios
```

```http
GET https://api-whatsapp-2u8q.onrender.com/v1/senai/usuarios/mensagens?numero=119XXXXXXXX
```

## Próximas melhorias

- Implementar métodos POST, PUT e DELETE  
- Integração com banco de dados  

## Autor

Julio Augusto

## Licença

Este projeto é apenas para fins educacionais.
