# 🚀 Álbum Copa 2026 - Backend

Backend completo com Node.js, Express e MongoDB para o aplicativo de figurinhas da Copa 2026.

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Conta MongoDB Atlas (gratuita)

## 🔧 Instalação

### 1. Clone o projeto
```bash
cd album-copa-2026-backend
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas informações:

```
PORT=5000
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/album-copa-2026?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Configure MongoDB Atlas

1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster
4. Adicione um Database User
5. Copie a connection string e cole em `MONGODB_URI`

### 4. Inicie o servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

## 📡 Endpoints da API

### Autenticação

#### Registrar novo usuário
```
POST /api/auth/register
Body: {
  "username": "seu_nome",
  "email": "seu@email.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "username": "seu_nome",
  "password": "senha123"
}
```

#### Obter dados do usuário
```
GET /api/auth/me
Headers: {
  "Authorization": "Bearer seu_token_jwt"
}
```

#### Atualizar dados do usuário
```
PUT /api/auth/update
Headers: {
  "Authorization": "Bearer seu_token_jwt"
}
Body: {
  "data": { "Brasil": [1, 2, 3], ... },
  "darkMode": true
}
```

## 🚀 Deploy

### Opção 1: Render (Recomendado)
1. Acesse [render.com](https://render.com)
2. Crie uma conta gratuita
3. Crie um novo Web Service
4. Conecte seu repositório GitHub
5. Adicione as variáveis de ambiente
6. Deploy automático!

### Opção 2: Heroku
```bash
heroku create seu-app-name
heroku config:set MONGODB_URI=sua_uri
heroku config:set JWT_SECRET=sua_chave_secreta
git push heroku main
```

### Opção 3: Railway
1. Acesse [railway.app](https://railway.app)
2. Crie um novo projeto
3. Conecte com GitHub
4. Deploy em minutos

## 📝 Estrutura do Projeto

```
album-copa-2026-backend/
├── models/
│   └── User.js          # Schema do usuário MongoDB
├── controllers/
│   └── authController.js # Lógica de autenticação
├── routes/
│   └── auth.js          # Rotas de autenticação
├── middleware/
│   └── auth.js          # Middleware JWT
├── server.js            # Arquivo principal
├── package.json
├── .env.example
└── README.md
```

## 🔐 Segurança

- ✅ Senhas com hash bcrypt
- ✅ Autenticação JWT
- ✅ CORS configurado
- ✅ Helmet para headers de segurança
- ✅ Validação de entrada

## 📦 Dependências

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Variáveis de ambiente
- **cors** - CORS middleware
- **helmet** - Headers de segurança

## 🐛 Troubleshooting

### Erro de conexão MongoDB
- Verifique se MONGODB_URI está correto
- Verifique se seu IP está na whitelist do MongoDB Atlas
- Verifique se o usuário tem permissão de acesso

### Erro de CORS
- Adicione a URL do frontend em `cors.origin`
- Certifique-se que o frontend está enviando os headers corretos

### Erro de JWT
- Verifique se o token está sendo enviado corretamente
- Certifique-se que JWT_SECRET é o mesmo

## 📧 Suporte

Para dúvidas ou problemas, entre em contato!

---

**Desenvolvido com ❤️ para a Copa 2026**
