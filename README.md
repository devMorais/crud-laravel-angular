Guia Completo para Executar o Projeto em Ambiente Local
Este projeto é uma aplicação web para gerenciamento financeiro, desenvolvida com Laravel 11 no backend e Angular 17 no frontend. Abaixo, você encontrará todas as etapas necessárias para configurar e executar o projeto em um ambiente local.

Estrutura do Projeto
A estrutura do projeto está organizada da seguinte forma:

banco/: Contém scripts SQL para criação das tabelas transação e categoria.
backend/: Código do backend desenvolvido em Laravel 11.
frontend/: Código do frontend desenvolvido em Angular 17.
Requisitos de Ambiente
Servidor Local: Instale XAMPP ou Laragon para fornecer suporte ao Apache, PHP e MySQL.
Estrutura de Pastas: Coloque a pasta do backend dentro de htdocs (para XAMPP) ou www (para Laragon), para execução local.
Configuração do Projeto
1. Baixar e Extrair o Projeto
Baixe o arquivo ZIP do projeto no repositório.
Extraia o conteúdo em uma pasta de sua preferência.
Dentro da pasta extraída, localize as pastas backend e frontend.
2. Configurar o Backend (Laravel 11)
2.1. Mover o Backend para o Servidor Local
Coloque a pasta backend dentro de htdocs (caso use XAMPP) ou www (caso use Laragon).
2.2. Instalar Dependências do Laravel
Abra o terminal na pasta backend e execute o comando abaixo para instalar as dependências:
composer install
2.3. Configurar Variáveis de Ambiente
Renomeie o arquivo .env.example para .env.

Edite o arquivo .env com as seguintes configurações:

APP_NAME=ControleFinanceiro
APP_ENV=local
APP_KEY=base64:KSdkJAFqrQFsBEQRlR1O6JOEsA4OBoCxbfp9nTNMCVU=
APP_DEBUG=true
APP_TIMEZONE=America/Sao_Paulo
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finance_transactions
DB_USERNAME=root
DB_PASSWORD=
2.4. Criar Estrutura do Banco de Dados
Abra o phpMyAdmin (disponível no painel de controle do XAMPP ou Laragon).
Crie um banco de dados com o nome finance_transactions.
No terminal, ainda na pasta backend, execute:
php artisan migrate
2.5. Iniciar o Servidor do Backend
Certifique-se de que o Apache e o MySQL estão ativos no XAMPP ou Laragon.
Inicie o servidor Laravel com o comando:
php artisan serve
O backend estará acessível em http://127.0.0.1:8000.
3. Configurar o Frontend (Angular 17)
3.1. Instalar Dependências do Angular
Acesse a pasta frontend e instale as dependências executando:
cd frontend
npm install
3.2. Iniciar o Servidor do Frontend
No terminal, dentro da pasta frontend, execute:
ng serve
O frontend estará disponível em http://localhost:4200.
Funcionalidades da Aplicação
Cadastro de Transações: Criação de receitas e despesas.
Listagem de Transações: Exibição de todas as transações com opção de filtro.
Edição e Exclusão de Transações: Atualização e remoção de registros.
Gerenciamento de Categorias: Cadastro, edição e listagem de categorias.
Rotas da API (Backend)
Transações
GET /api/v1/transactions: Lista todas as transações
POST /api/v1/transactions: Cria uma nova transação
PUT /api/v1/transactions/{id}: Atualiza uma transação específica
DELETE /api/v1/transaction/{id}: Exclui uma transação específica
Categorias
GET /api/v1/categories: Lista todas as categorias
POST /api/v1/categories: Cria uma nova categoria
PUT /api/v1/categories/{id}: Atualiza uma categoria específica
DELETE /api/v1/category/{id}: Exclui uma categoria (caso não esteja vinculada a uma transação)
Acessar a Aplicação
Backend: Acesse http://127.0.0.1:8000.
Frontend: Acesse http://localhost:4200 para visualizar a aplicação e gerenciar transações e categorias.
Observação: O backend e o frontend precisam estar rodando simultaneamente para o funcionamento correto da aplicação.

