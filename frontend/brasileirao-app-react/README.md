# 💻 Frontend Web - Brasileirão Série B

**Aplicação React moderna para acompanhar o Campeonato Brasileiro Série B**

## 🌟 Características

- ⚡ **Vite** - Build tool ultra-rápido
- 🎨 **Design Responsivo** - Funciona em todos os dispositivos
- ✨ **Animações Fluidas** - Powered by Framer Motion
- 🔄 **SPA** - Navegação instantânea com React Router
- 📱 **Mobile First** - Otimizado para dispositivos móveis

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações e efeitos visuais
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Icons** - Ícones modernos
- **CSS3** - Estilização avançada

## 🚀 Instalação e Execução

```bash
# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Páginas

### 🏠 Home
- Dashboard principal com navegação rápida
- Estatísticas do campeonato
- Design com animações elegantes

### 🏆 Classificação
- Tabela completa de classificação
- Indicadores visuais para zonas (acesso, rebaixamento)
- Responsiva com scroll horizontal

### ⚽ Artilheiros
- Ranking dos goleadores
- Cards animados com posições
- Destaque para top 3

### 📅 Rodadas
- Jogos de cada rodada
- Navegação entre rodadas
- Resultados e próximas partidas

### ❤️ Meu Time
- Seleção de time favorito
- Jogos específicos do time
- Estatísticas personalizadas

## 🎨 Componentes

### BottomNav
```jsx
// Navegação inferior responsiva
<BottomNav />
```

### ContentContainer
```jsx
// Container padrão para páginas
<ContentContainer title="Título da Página">
  {/* Conteúdo */}
</ContentContainer>
```

### LoadingSpinner
```jsx
// Spinner animado com Framer Motion
<LoadingSpinner />
```

## ⚙️ Configuração

### API Backend
Por padrão, conecta com backend em `localhost:8080`:

```javascript
axios.get('http://localhost:8080/api/classificacao')
```

### Responsividade
Utiliza `clamp()` para escalabilidade perfeita:

```css
fontSize: 'clamp(18px, 4vw, 28px)'
padding: 'clamp(10px, 2vw, 20px)'
```

## 📁 Estrutura

```
src/
├── components/      # Componentes reutilizáveis
│   ├── BottomNav.jsx
│   ├── ContentContainer.jsx
│   └── LoadingSpinner.jsx
├── pages/          # Páginas da aplicação
│   ├── Home.jsx
│   ├── Classificacao.jsx
│   ├── Artilheiros.jsx
│   ├── Rodadas.jsx
│   └── MeuTime.jsx
├── assets/         # Imagens e recursos
├── global.css      # Estilos globais
└── main.jsx       # Ponto de entrada
```

## 🎯 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview da build
npm test             # Execute testes
```

## 🎨 Animações

Powered by **Framer Motion** com efeitos modernos:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Conteúdo animado */}
</motion.div>
```

## 📱 Responsividade

- **Mobile**: < 480px
- **Tablet**: 481px - 768px  
- **Desktop**: > 769px

Técnicas: CSS Grid, Flexbox, clamp(), Media queries, Touch-friendly

---

**🎉 Frontend moderno e otimizado para a melhor experiência do usuário!**
