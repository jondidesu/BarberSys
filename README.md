
# 💈 BarberSys

Já imaginou ter um sistema simples, intuitivo e eficiente para gerenciar sua barbearia? Aqui está a solução ideal para facilitar o seu dia a dia! Com o **BarberSys**, você poderá organizar agendamentos, clientes e serviços de forma prática, rápida e descomplicada.

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB (com Mongoose)
- Middleware de autenticação (JWT)
- Uploads (imagem/arquivos)

### Frontend
- React.js
- HTML/CSS/JS
- Gerenciamento de rotas e estados modernos

## 📁 Estrutura do Projeto

```
BarberSys/
├── backend/
│   ├── controllers/      # Lógica dos controladores
│   ├── middlewares/      # Funções intermediárias (ex: autenticação)
│   ├── models/           # Modelos de dados (ex: mongoose)
│   ├── routes/           # Definições das rotas
│   ├── uploads/          # Arquivos enviados (ex: fotos dos clientes)
│   ├── .env              # Variáveis de ambiente
│   ├── .gitignore
│   ├── app.js            # Configuração principal do app Express
│   ├── server.js         # Inicialização do servidor
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── sistema-barbearia/
│       ├── public/       # Arquivos públicos (HTML, ícones)
│       ├── src/          # Componentes, páginas e lógica do React
│       ├── .gitignore
│       ├── package.json
│       ├── package-lock.json
│       └── README.md
```

## 🔧 Funcionalidades

- Cadastro e gerenciamento de clientes
- Registro e controle de agendamentos
- Gestão de serviços oferecidos pela barbearia
- Upload de imagens (como fotos de perfil ou cortes)
- Sistema de login e autenticação
- Interface amigável e responsiva

## ⚙️ Como Executar Localmente

### Pré-requisitos

- Node.js
- MongoDB
- npm ou yarn

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/barbersys.git
   cd barbersys
   ```

2. Configure o backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Edite com as suas variáveis
   npm start
   ```

3. Configure o frontend:
   ```bash
   cd frontend/sistema-barbearia
   npm install
   npm start
   ```

4. Acesse em: `http://localhost:3000`

## ✨ Contribuições

Sinta-se à vontade para abrir issues, pull requests ou sugerir melhorias.

---

Feito com ❤️ para facilitar a vida de barbeiros!
