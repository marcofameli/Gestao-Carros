# 🚗 Sistema de Gerenciamento de Carros


Uma aplicação fullstack robusta para gerenciamento de carros, marcas e proprietários, desenvolvida com Spring Boot e Angular.

## 📋 Índice

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [API Endpoints](#-api-endpoints)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)

## 🚀 Recursos

- ✨ Interface moderna e responsiva
- 🔐 Autenticação JWT
- 📊 CRUD completo para Carros, Marcas e Proprietários
- 🔍 Pesquisa e filtros avançados
- 📱 Design mobile-first

## 💻 Tecnologias

- **Backend:**
  - Spring Boot
  - Spring Security
  - JWT Authentication
  - PostgreSQL
  - Maven

- **Frontend:**
  - Angular 17
  - TypeScript
  - SCSS
  - Material UI

## 📁 Estrutura do Projeto

### Backend

```
backend/
├── src/
│   └── main/
│       └── java/br/com/carros/carros/
│           ├── auth/          # Autenticação JWT
│           ├── config/        # Configurações
│           ├── controller/    # Controllers REST
│           ├── entity/        # Modelos
│           ├── repository/    # Repositories
│           ├── service/       # Lógica de negócio
│           └── CarrosApplication.java
└── pom.xml
```

### Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/         # Autenticação
│   │   ├── components/   # Componentes
│   │   ├── models/       # Interfaces
│   │   └── services/     # Serviços
│   ├── assets/          
│   └── environments/
└── package.json
```

## 🔧 Instalação

### Backend

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-projeto.git

# Entre na pasta do backend
cd backend

# Instale as dependências
./mvnw clean install

# Inicie o servidor
./mvnw spring-boot:run
```

### Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```

O frontend estará disponível em `http://localhost:4200`

## 🔌 API Endpoints

### Login

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/login` | Autenticação login |

### Carros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/carro/save` | Criar novo carro |
| PUT | `/api/carro/update/{id}` | Atualizar carro |
| GET | `/api/carro/listAll` | Listar todos os carros |
| GET | `/api/carro/findById/{id}` | Buscar carro por ID |
| DELETE | `/api/carro/delete/{id}` | Deletar carro |

### Marcas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/marca/save` | Criar nova marca |
| PUT | `/api/marca/update/{id}` | Atualizar marca |
| GET | `/api/marca/listAll` | Listar todas as marcas |
| GET | `/api/marca/findById/{id}` | Buscar marca por ID |
| DELETE | `/api/marca/delete/{id}` | Deletar marca |

### Proprietários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/proprietario/save` | Criar novo proprietário |
| PUT | `/api/proprietario/update/{id}` | Atualizar proprietário |
| GET | `/api/proprietario/listAll` | Listar todos os proprietários |
| GET | `/api/proprietario/findById/{id}` | Buscar proprietário por ID |
| DELETE | `/api/proprietario/delete/{id}` | Deletar proprietário |

## 🗄️ Configuração do Banco de Dados

Adicione as seguintes configurações no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
