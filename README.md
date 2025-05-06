  # Tweteroo API - Réplica do Twitter com Node.js e MongoDB

## Descrição
Tweteroo é uma réplica simplificada do Twitter, desenvolvida como parte do segundo projeto de back-end para a Driven Education. O projeto consiste em uma API desenvolvida em Node.js que utiliza banco de dados MongoDB para persistência dos dados.

Este projeto foi desenvolvido por **Lucas Sabbag Muto** para a **Driven Education**.

## Funcionalidades

- **Cadastro de Usuário**: Permite que usuários se cadastrem com nome de usuário e avatar
- **Criação de Tweets**: Usuários cadastrados podem publicar tweets
- **Listagem de Tweets**: Visualização dos tweets publicados em ordem cronológica inversa
- **Edição de Tweets**: Usuários podem editar seus próprios tweets
- **Exclusão de Tweets**: Possibilidade de excluir tweets publicados

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para desenvolvimento da API RESTful
- **MongoDB**: Banco de dados NoSQL para persistência dos dados
- **Joi**: Biblioteca para validação de dados
- **Nodemon**: Ferramenta para desenvolvimento que reinicia automaticamente o servidor
- **Dotenv**: Para gerenciamento de variáveis de ambiente

## Estrutura do Projeto

```
tweteroo/
├── .env                  # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Configurações e dependências do projeto
├── front-end/            # Interface de usuário (pronta)
└── src/                  # Código-fonte do backend
    ├── app.js            # Arquivo principal com configuração do servidor
    ├── config/           # Configurações (banco de dados)
    │   └── database.js
    ├── controllers/      # Controladores da aplicação
    │   ├── userController.js
    │   └── tweetController.js
    ├── middlewares/      # Middlewares personalizados
    │   ├── validateSchema.js
    │   └── authMiddleware.js
    ├── routes/           # Rotas da API
    │   ├── userRoutes.js
    │   └── tweetRoutes.js
    └── schemas/          # Esquemas de validação
        ├── userSchema.js
        └── tweetSchema.js
```

## Instalação e Execução

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/tweteroo.git
```

2. Instale as dependências:
```
cd tweteroo
npm install
```

3. Configure o arquivo `.env` na raiz do projeto:
```
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/
```

4. Inicie o MongoDB:
```
# Certifique-se de que o MongoDB está rodando localmente
```

5. Execute o servidor:
```
npm run dev
```

6. Para testar o front-end, abra o arquivo `front-end/index.html` usando o Live Server no VS Code

## Rotas da API

### Usuários

- **POST /sign-up**: Cadastrar um novo usuário
  - Body: `{ username: "string", avatar: "string" }`
  - Response: `201 Created`

### Tweets

- **POST /tweets**: Criar um novo tweet
  - Body: `{ username: "string", tweet: "string" }`
  - Response: `201 Created`

- **GET /tweets**: Listar todos os tweets
  - Response: `200 OK` com array de tweets

- **PUT /tweets/:id**: Editar um tweet específico
  - Body: `{ username: "string", tweet: "string" }`
  - Response: `204 No Content`

- **DELETE /tweets/:id**: Deletar um tweet específico
  - Response: `204 No Content`

## Formato dos Dados

### Usuário
```json
{
  "_id": "ObjectId",
  "username": "string",
  "avatar": "string"
}
```

### Tweet
```json
{
  "_id": "ObjectId",
  "username": "string",
  "tweet": "string"
}
```

## Validações

- Todas as rotas POST e PUT possuem validação de dados utilizando Joi
- Campos obrigatórios são verificados e retornam erro 422 (Unprocessable Entity) quando inválidos
- Para postar tweets, o usuário deve ter sido cadastrado previamente (retorna erro 401 caso contrário)

## Desenvolvimento

Este projeto seguiu uma abordagem de desenvolvimento incremental e organizada:

1. Configuração inicial do ambiente e dependências
2. Implementação da conexão com o banco de dados MongoDB
3. Criação de schemas de validação com Joi
4. Desenvolvimento das rotas e controladores
5. Implementação de middlewares para validação e autenticação
6. Testes e integração com o front-end

## Autor

Lucas Sabbag Muto

## Agradecimentos

Driven Education pela oportunidade de desenvolvimento deste projeto.
