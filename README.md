Nome do Software: Viagem365

    Descrição:

        Sistema é ligado em máquina local, possui a função de cadastrar novos usuários e listá-los, possibilitando fazer login para acesso das rotas
        com segurança e autenticação com JSONWEBTOKEN que gera um token a cada login e para acessar as rotas locais é necessário passar no parâmetro no Headers 
        do postman, desta forma, o usuário está seguro pois só ele pode consultar, alterar ou deletar seus dados.
        Ao realizar o cadastro e realizar o login, o usuário poderá inserir um local, passando pela rota locais, incluindo um CEP ou
        NOME DO LOCAL que deseja ir, ao passar esse parâmetro, o sistema retornará dados do local e será armazendo no banco de dados e ficará vinculado ao usuário.
        Além de inserir o usuário poderá modificar, deletar ou consultar os locais inseridos.

O sistema possui as seguintes funcionalidades:

        - Cadastro de Usuário
        - Listar Usuários
        - Listar usuário por ID
        - Realizar login no sistema com validação do token nas rotas
        - Cadastrar um local que ficará vinculado ao usuário que cadastrou
        - Listar todos os locais que o usuário cadastrou
        - Listar um local específico do usuário pelo ID
        - Deletar algum local do usuário
        - Alterar alguma informação do local do usuário.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ESTRUTURA DO BANCO DE DADOS:

    Banco de dados relacional utilizado: Postgres

    A criação das tabelas é realizada automaticamente através do SEQUELIZE, tecnologia para bancos de dados relacionais,
    utilizando objetos Java Script para interagir com o Banco de Dados.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

API:
    API utilizada é através do site: https://nominatim.openstreetmap.org/ui/search.html
    API Open Source para buscar localizações no mapa mundial.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ROTAS DO SOFTWARE:

    Utilizada a biblioteca Axios para fazer as requisições HTTP de GET, POST, DELETE, PUT.

    Para melhor demonstração de uso das rotas, foi implementado o modelo SWAGGER,
    para acessar com mais detalhes cada rota acesse a URL http://localhost:3000/docs

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    PASSO A PASSO PARA UTILIZAR O SISTEMA E SUAS ROTAS:


    Comandos principais para executar no terminal e rodar o sistema:

    npm install - Comando para instalar as dependências do package.json

    sequelize db:migrate - Comando para executar a criação das tabelas.

    sequelize db:seed:all - Comando para inserir os dados na tabela usuários.

    npm run start:dev - Comando para ligar o servidor

    http://localhost:3000/docs/ - Acesso a documentação (swagger) para visualizar os exemplos

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        :D
