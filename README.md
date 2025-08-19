
### Backend (NestJS)
- **Framework**: NestJS com TypeScript
- **Banco de dados**: PostgreSQL com Prisma ORM
- **Arquitetura**: Clean Architecture com Domain-Driven Design
- **Geração de IDs**: ShortID para URLs únicas
- **Deploy**: Vercel Serverless Functions

### Frontend (React)
- **Framework**: React 19 com TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine v8
- **Ícones**: Tabler Icons
- **HTTP Client**: Axios
- **Deploy**: Vercel

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** v11 - Framework Node.js
- **Prisma** v6.14 - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **ShortID** - Geração de IDs únicos
- **TypeScript** v5.7
- **ESLint + Prettier** - Qualidade de código

### Frontend
- **React** v19 - Biblioteca UI
- **TypeScript** v5.8 - Tipagem estática
- **Vite** v7 - Build tool e dev server
- **Mantine** v8.2 - Componentes UI
- **Axios** v1.11 - Cliente HTTP
- **Tabler Icons** - Ícones
- **ESLint** - Qualidade de código

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- pnpm (recomendado) ou npm

### 1. Clone o repositório
```bash
git clone <repository-url>
cd URL-shortener
```

### 2. Configuração do Backend
```bash
cd server
pnpm install
```

#### Configurar variáveis de ambiente
Copie o arquivo de exemplo e configure:
```bash
cp exemple.env .env
```

Edite o arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/url_shortener"
FRONTEND_URL="http://localhost:3001"
PORT=3000
```

#### Configurar banco de dados
```bash
# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

### 3. Configuração do Frontend
```bash
cd ../web
pnpm install
```

#### Configurar variáveis de ambiente
Copie o arquivo de exemplo e configure:
```bash
cp exemple.env .env
```

Edite o arquivo `.env`:
```env
VITE_SERVER_URL="http://localhost:3000"
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento Local

#### 1. Inicie o Backend (Porta 3000)
```bash
cd server
pnpm run dev
```

#### 2. Inicie o Frontend (Porta 3001)
```bash
cd web
pnpm run dev
```

#### 3. Acesse a aplicação
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

### Usando Docker (Backend + PostgreSQL)
```bash
cd server
docker-compose up -d  # Inicia PostgreSQL
pnpm run dev          # Inicia o backend
```

## 📡 API Endpoints

### POST `/url`
Encurta uma URL longa

**Request:**
```json
{
  "originalUrl": "https://exemplo.com/url-muito-longa"
}
```

**Response:**
```json
{
  "shortUrl": "abc123"
}
```

### GET `/:shortUrl`
Redireciona para a URL original

**Exemplo:** `GET /abc123` → Redireciona para `https://exemplo.com/url-muito-longa`

## 🗄️ Modelo de Dados

```prisma
model Url {
  id          String   @id @default(cuid())
  shortUrl    String   @unique
  originalUrl String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([shortUrl])
}
```

## 🚀 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático no Vercel.

#### Backend
1. Configure as variáveis de ambiente no Vercel:
   - `DATABASE_URL` - String de conexão PostgreSQL
   - `FRONTEND_URL` - URL do frontend em produção

2. O deploy é automático via Git push

#### Frontend
1. Configure a variável de ambiente no Vercel:
   - `VITE_SERVER_URL` - URL do backend em produção

2. O deploy é automático via Git push
