# 🚀 Backend API - Brasileirão Série B

**API REST em Go para dados do Campeonato Brasileiro Série B**

## 📋 Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Configuração](#configuração)
- [Testes](#testes)

## 🎯 Sobre

Esta API fornece dados completos sobre o Campeonato Brasileiro Série B, incluindo:

- 🏆 Classificação em tempo real
- ⚽ Lista de artilheiros
- 📅 Rodadas e jogos
- 📊 Estatísticas detalhadas

## 🛠️ Tecnologias

- **Go 1.21+** - Linguagem principal
- **Gin** - Framework web rápido e minimalista
- **CORS** - Middleware para requisições cross-origin
- **HTTP Client** - Para integração com API externa

## ⚡ Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd backend

# Instale as dependências
go mod tidy

# Execute o servidor
go run main.go
```

**Servidor rodando em:** `http://localhost:8080`

## 🌐 Endpoints

### Classificação
```http
GET /api/classificacao
```
Retorna a tabela de classificação completa.

### Artilheiros
```http
GET /api/artilheiros
```
Lista dos maiores goleadores do campeonato.

### Rodadas
```http
GET /api/rodadas
```
Informações sobre todas as rodadas.

### Jogos da Rodada
```http
GET /api/jogos/{numero_rodada}
```
Jogos de uma rodada específica.

## ⚙️ Configuração

### Token da API

Edite o arquivo `config/config.go`:

```go
// Para desenvolvimento/teste
var token = "test_99496160057c22591d39add19c660f"

// Para produção (descomente quando necessário)
// var token = "live_7041b1b61ad2369574a2545b0580c4"
```

### CORS

CORS configurado para aceitar requisições de:
- `localhost:3000-3006` (desenvolvimento frontend)

## 🧪 Testes

```bash
# Execute todos os testes
go test ./...

# Teste manual da API
curl http://localhost:8080/api/classificacao
```

## 🏗️ Estrutura

```
backend/
├── config/          # Configurações e tokens
├── controllers/     # Controladores HTTP
├── database/        # Conexão com dados
├── routes/          # Definição de rotas
├── services/        # Integração com API externa
├── utils/           # Utilitários e cache
└── main.go         # Ponto de entrada
```

---

**⚡ API pronta para integração com frontend React e Android!** 
