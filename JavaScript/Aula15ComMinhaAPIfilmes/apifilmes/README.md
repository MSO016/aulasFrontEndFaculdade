# **API de Lista de Filmes**

Esta é uma API RESTful para gerir uma lista de filmes, desenvolvida com Node.js, Express e MongoDB. Serve como backend para aplicações frontend que precisam de armazenar e aceder a dados de filmes.

## **Para iniciar**

node populate.js

e depois 

npm start

## **Funcionalidades**

A API oferece os seguintes endpoints para operações CRUD (Criar, Ler, Atualizar, Eliminar) na coleção de filmes:

* GET /  
  * Verifica se a API está a correr.  
  * **Resposta:** {"API de Filmes Conectada e funcionando\!"}  
* POST /films  
  * Cria um novo filme.  
  * **Corpo da Requisição (JSON):**  
    {  
        "codigo": "FILM001",  
        "titulo": "A Origem",  
        "genero": "Ficção Científica",  
        "autores": \["Christopher Nolan"\],  
        "ano": 2010,  
        "valor": 29.99  
    }

  * **Resposta de Sucesso (201 Created):** O objeto do filme criado.  
  * **Resposta de Erro (400 Bad Request):** Se o código já existe.  
  * **Resposta de Erro (500 Internal Server Error):** Para outros erros.  
* GET /films  
  * Recupera todos os filmes da base de dados.  
  * **Resposta de Sucesso (200 OK):** Um array de objetos de filmes.  
  * **Resposta de Erro (500 Internal Server Error):** Para erros de busca.  
* GET /films/:id  
  * Recupera um filme específico pelo seu ID (ID do MongoDB).  
  * **Resposta de Sucesso (200 OK):** O objeto do filme.  
  * **Resposta de Erro (404 Not Found):** Se o filme não for encontrado.  
  * **Resposta de Erro (500 Internal Server Error):** Para erros de busca.  
* PUT /films/:id  
  * Atualiza um filme existente pelo seu ID.  
  * **Corpo da Requisição (JSON):** Os campos a serem atualizados.  
    {  
        "valor": 25.00,  
        "genero": "Ficção Científica / Ação"  
    }

  * **Resposta de Sucesso (200 OK):** O objeto do filme atualizado.  
  * **Resposta de Erro (404 Not Found):** Se o filme não for encontrado.  
  * **Resposta de Erro (500 Internal Server Error):** Para outros erros.  
* DELETE /films/:id  
  * Elimina um filme específico pelo seu ID.  
  * **Resposta de Sucesso (200 OK):** {"message": "Filme deletado com sucesso\!"}  
  * **Resposta de Erro (404 Not Found):** Se o filme não for encontrado.  
  * **Resposta de Erro (500 Internal Server Error):** Para outros erros.

## **Tecnologias Utilizadas**

* **Node.js**: Ambiente de execução JavaScript.  
* **Express.js**: Framework web para Node.js.  
* **Mongoose**: Modelagem de objetos MongoDB para Node.js.  
* **MongoDB**: Base de dados NoSQL.  
* **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.  
* **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

## **Pré-requisitos**

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

* [**Node.js**](https://nodejs.org/): Versão 14 ou superior.  
* [**MongoDB Community Server**](https://www.mongodb.com/try/download/community): O servidor da base de dados MongoDB. Certifique-se de que está a correr no seu sistema (porta padrão 27017).

## **Configuração e Instalação**

Siga estes passos para configurar e executar a API localmente:

1. **Clone o repositório:**  
   git clone \<URL\_DO\_SEU\_REPOSITORIO\_GITHUB\>  
   cd api-filmes-escola

2. **Instale as dependências:**  
   npm install

3. **Confirme que o MongoDB está a correr:**  
   * **Windows:** Verifique nos "Serviços" (services.msc) se o "MongoDB Server" está "Em execução". Se não, inicie-o.  
   * **macOS (Homebrew):** brew services start mongodb-community  
   * **Linux:** sudo systemctl start mongod

## **População da Base de Dados (Opcional, para dados iniciais)**

Execute este script **apenas uma vez** para inserir 10 filmes de exemplo na sua base de dados MongoDB.

node populate.js

*Isto irá limpar a coleção de filmes antes de inserir os novos, garantindo dados consistentes.*

## **Como Executar a API (Backend)**

Após a configuração, inicie o servidor da API:

npm start

O servidor estará a correr na porta 8800 (ou na porta configurada nas variáveis de ambiente). Deverá ver mensagens no terminal como: BackEnd: Conectado ao MongoDB com sucesso\! e BackEnd da API de Filmes conectado na porta 8800\!.

## **Testes da API**

Pode testar a API usando ferramentas como [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/downloads/) ou curl.

Aqui estão alguns exemplos de comandos curl para os endpoints principais:

### **1\. Testar Conexão**

curl http://localhost:8800/

### **2\. Criar um Novo Filme (POST)**

curl \-X POST \-H "Content-Type: application/json" \-d '{  
    "codigo": "F011",  
    "titulo": "Blade Runner 2049",  
    "genero": "Ficção Científica",  
    "autores": \["Denis Villeneuve"\],  
    "ano": 2017,  
    "valor": 30.00  
}' http://localhost:8800/films

### **3\. Obter Todos os Filmes (GET)**

curl http://localhost:8800/films

### **4\. Obter um Filme por ID (GET)**

*Substitua SEU\_ID\_DO\_FILME pelo \_id de um filme existente (obtido de uma requisição GET anterior).*

curl http://localhost:8800/films/SEU\_ID\_DO\_FILME

### **5\. Atualizar um Filme por ID (PUT)**

*Substitua SEU\_ID\_DO\_FILME pelo \_id de um filme existente.*

curl \-X PUT \-H "Content-Type: application/json" \-d '{  
    "valor": 28.50  
}' http://localhost:8800/films/SEU\_ID\_DO\_FILME

### **6\. Eliminar um Filme por ID (DELETE)**

*Substitua SEU\_ID\_DO\_FILME pelo \_id de um filme existente.*

curl \-X DELETE http://localhost:8800/films/SEU\_ID\_DO\_FILME

## **Integração com o Frontend (Projeto da Escola)**

Esta API é desenhada para ser utilizada por uma aplicação frontend. O seu index.html (o projeto da escola) fará requisições GET para http://localhost:8800/films no seu created() hook do Vue.js para carregar a lista de filmes.

*Atenção: As operações de "Salvar", "Alterar" e "Excluir" no frontend (se não modificadas para fazer requisições à API) operarão apenas na lista local do Vue após o carregamento inicial, não persistindo as alterações na base de dados via API.*