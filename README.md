# ⚽ Brasileirão Série B App

<div align="center">

![Logo Série B](frontend/brasileirao-app-react/src/assets/logo-serie-b.png)

**Aplicação completa para acompanhar o Campeonato Brasileiro Série B**

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Android](https://img.shields.io/badge/Android-Kotlin-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)

</div>

## 🌟 Sobre o Projeto

O **Brasileirão Série B App** é uma aplicação multiplataforma moderna que oferece informações completas sobre o Campeonato Brasileiro da Série B. Com design responsivo e interface intuitiva, você pode acompanhar classificação, artilheiros, rodadas e muito mais!

### ✨ Características Principais

- 🏆 **Classificação em tempo real** - Tabela completa com posições e estatísticas
- ⚽ **Artilheiros** - Ranking dos maiores goleadores do campeonato
- 📅 **Rodadas** - Jogos, resultados e próximas partidas
- ❤️ **Meu Time** - Acompanhe seu time favorito
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Design Moderno** - Interface elegante com efeitos visuais avançados
- ⚡ **Performance** - Carregamento rápido e navegação fluida

## 🏗️ Arquitetura

```
📦 brasileirao-app
├── 🌐 backend/          # API REST em Go
├── 💻 frontend/         # Web App em React
└── 📱 android/          # App Android nativo
```

### 🔧 Tecnologias Utilizadas

#### Backend
- **Go** - Linguagem principal
- **Gin** - Framework web
- **CORS** - Configuração para requisições cross-origin
- **API Futebol** - Fonte de dados oficial

#### Frontend Web
- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações fluidas
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP
- **CSS3** - Estilização responsiva

#### Android
- **Kotlin** - Linguagem nativa
- **Jetpack Compose** - UI moderna
- **Material Design** - Design system

## 🚀 Como Executar

### Pré-requisitos

- **Go 1.21+** ([Download](https://golang.org/dl/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Android Studio** (para app mobile)

### 🎯 Backend (API)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/app-brasileirao-android.git
cd app-brasileirao-android/backend

# Instale as dependências
go mod tidy

# Execute o servidor
go run main.go
```

**🌐 API estará disponível em:** `http://localhost:8080`

#### Endpoints Principais
- `GET /api/classificacao` - Tabela de classificação
- `GET /api/artilheiros` - Lista de artilheiros
- `GET /api/rodadas` - Informações das rodadas
- `GET /api/jogos/{rodada}` - Jogos de uma rodada específica

### 💻 Frontend Web

```bash
# Navegue para o diretório
cd frontend/brasileirao-app-react

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
```

**🌐 App estará disponível em:** `http://localhost:3000`

### 📱 Android App

```bash
# Abra o projeto no Android Studio
cd frontend/BrasileiraoSerieBApp

# Sincronize o projeto (Gradle)
# Execute no emulador ou device físico
```

## 🎨 Screenshots

<div align="center">

### 📱 Mobile
| Home | Classificação | Artilheiros |
|------|---------------|-------------|
| ![Home](docs/screenshots/mobile-home.png) | ![Classificação](docs/screenshots/mobile-classificacao.png) | ![Artilheiros](docs/screenshots/mobile-artilheiros.png) |

### 💻 Desktop
![Desktop](docs/screenshots/desktop-overview.png)

</div>

## 🧪 Testes

### Backend
```bash
cd backend
go test ./...
```

### Frontend
```bash
cd frontend/brasileirao-app-react
npm test
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` no backend:

```bash
# API Token (obtenha em https://api.api-futebol.com.br/)
API_TOKEN=seu_token_aqui

# Porta do servidor
PORT=8080

# Ambiente
ENV=development
```

### CORS
O backend está configurado para aceitar requisições do frontend nas portas:
- `3000-3006` (desenvolvimento)
- `80, 443` (produção)

## 📊 Status do Projeto

- ✅ **Backend API** - Funcional e completo
- ✅ **Frontend Web** - Implementado com design responsivo
- ✅ **Animações** - Efeitos visuais modernos
- ✅ **Android App** - Base estrutural criada
- 🔄 **Testes** - Em desenvolvimento
- 🔄 **Deploy** - Planejado para AWS/Vercel

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**João Marcos**
- 📧 Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
- 💼 LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- 🐙 GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [API Futebol](https://api.api-futebol.com.br/) - Dados do campeonato
- [CBF](https://www.cbf.com.br/) - Campeonato Brasileiro
- Comunidade open source por bibliotecas incríveis

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

![Footer](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)

</div>