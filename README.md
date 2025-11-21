# Portfolio Profissional - Wesley Gomes

Portfolio profissional moderno e responsivo desenvolvido com HTML5, CSS3 e Tailwind CSS.

## 📋 Estrutura do Projeto

```
portifolio-wesley-gomes/
├── index.html              # Página principal
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind
├── src/
│   └── input.css           # Arquivo de entrada do Tailwind
├── assets/
│   ├── css/
│   │   ├── tailwind.css    # Tailwind gerado (otimizado)
│   │   ├── main.css        # Estilos principais
│   │   └── animations.css  # Animações e transições
│   ├── js/
│   │   └── main.js         # Funcionalidades JavaScript
│   └── images/             # Imagens e assets visuais
└── README.md               # Documentação do projeto
```

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização customizada
- **Tailwind CSS** - Framework CSS utilitário (build local otimizado)
- **JavaScript (Vanilla)** - Interatividade e animações
- **Google Fonts** - Tipografia Inter
- **Node.js/npm** - Gerenciamento de dependências e build

## ✨ Funcionalidades

- ✅ Design responsivo e moderno
- ✅ Navegação suave entre seções
- ✅ Animações ao scroll
- ✅ Efeitos hover interativos
- ✅ Navbar com efeito de transparência
- ✅ Destaque automático do link ativo na navegação
- ✅ SEO otimizado com meta tags
- ✅ Acessibilidade melhorada

## 📁 Organização dos Arquivos

### CSS
- `src/input.css` - Arquivo de entrada do Tailwind (importa base, components, utilities)
- `assets/css/tailwind.css` - CSS do Tailwind gerado e otimizado (não editar diretamente)
- `assets/css/main.css` - Estilos principais, tipografia, componentes reutilizáveis
- `assets/css/animations.css` - Keyframes, animações e delays

### Configuração
- `package.json` - Dependências e scripts do projeto
- `tailwind.config.js` - Configuração do Tailwind (conteúdo, tema, plugins)

### JavaScript
- `assets/js/main.js` - Funcionalidades interativas:
  - Scroll suave
  - Navbar dinâmica
  - Animações on scroll
  - Links ativos na navegação

## 🎨 Seções do Portfolio

1. **Hero** - Apresentação principal
2. **Sobre** - Informações pessoais e competências
3. **Experiência** - Histórico profissional
4. **Projetos** - Trabalhos selecionados
5. **Contato** - Informações de contato e redes sociais

## 🔧 Como Usar

### ⚠️ IMPORTANTE - Primeira vez usando o projeto

**É necessário gerar o CSS do Tailwind antes de usar o site!**

1. **Instale o Node.js** (se ainda não tiver):
   - Baixe em: https://nodejs.org/
   - Versão recomendada: LTS (Long Term Support)

2. **Clone ou baixe o repositório**

3. **Instale as dependências**:
```bash
npm install
```

4. **Gere o CSS do Tailwind** (build de produção):
```bash
npm run build
```

5. **Abra o arquivo `index.html` no navegador** - Agora o site está pronto!

> **Nota**: O arquivo `assets/css/tailwind.css` precisa ser gerado. Após o primeiro build, ele ficará disponível e você pode fazer deploy normalmente.

### Desenvolvimento

Para desenvolvimento com watch mode (recompila automaticamente ao salvar):
```bash
npm run dev
```

Isso irá observar mudanças nos arquivos e regenerar o CSS automaticamente.

### Deploy/Compartilhar

O arquivo `assets/css/tailwind.css` já está gerado e versionado no repositório, então você pode:

- **Opção 1**: Enviar os arquivos diretamente (funciona imediatamente)
- **Opção 2**: Se fizer mudanças, rode `npm run build` antes de fazer deploy

**Importante**: O CSS gerado (`tailwind.css`) já está incluído, então não é necessário Node.js no servidor de produção.

## 🌐 Deploy - Publicar seu Portfólio Online

### Opção 1: GitHub Pages (Recomendado - Gratuito)

1. **Crie um repositório no GitHub** (se ainda não tiver):
   - Acesse: https://github.com/new
   - Nomeie o repositório (ex: `portifolio-wesley-gomes`)
   - Marque como **Público** (necessário para GitHub Pages gratuito)

2. **Faça push do seu código**:
```bash
git init
git add .
git commit -m "Initial commit - Portfolio Wesley Gomes"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portifolio-wesley-gomes.git
git push -u origin main
```

3. **Ative o GitHub Pages**:
   - Vá em: `Settings` → `Pages` (no repositório)
   - Em `Source`, selecione: `Deploy from a branch`
   - Escolha a branch: `main`
   - Escolha a pasta: `/ (root)`
   - Clique em `Save`

4. **Aguarde alguns minutos** e seu site estará disponível em:
   - `https://SEU-USUARIO.github.io/portifolio-wesley-gomes/`

**Vantagens**: Gratuito, automático, URL limpa, HTTPS incluído

---

### Opção 2: Netlify (Muito fácil - Gratuito)

1. **Acesse**: https://www.netlify.com/
2. **Crie uma conta** (pode usar GitHub para login)
3. **Arraste e solte** a pasta do projeto na área de deploy
4. **Pronto!** Seu site estará online em segundos com uma URL como:
   - `https://seu-site.netlify.app/`

**Vantagens**: Super rápido, drag & drop, HTTPS automático

---

### Opção 3: Vercel (Rápido - Gratuito)

1. **Acesse**: https://vercel.com/
2. **Crie uma conta** (pode usar GitHub)
3. **Importe seu projeto** do GitHub ou faça upload
4. **Pronto!** URL automática:
   - `https://seu-site.vercel.app/`

**Vantagens**: Rápido, integração com GitHub, HTTPS automático

---

### Opção 4: Servidor Local (Para desenvolvimento)

Para testar localmente sem o caminho `file:///`:

#### Com Python (já instalado no Windows):
```bash
# Na pasta do projeto
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

#### Com Node.js (se tiver instalado):
```bash
npx http-server -p 8000
```
Depois acesse: `http://localhost:8000`

**Vantagens**: Testa localmente, sem fazer deploy

## 📝 Personalização

### Alterar Informações Pessoais
Edite o arquivo `index.html` e substitua:
- Nome (linha ~179)
- Email (linhas ~416, 422, 451)
- Links do LinkedIn e GitHub (linhas ~426, 436)
- Conteúdo das seções conforme necessário

### Customizar Cores e Estilos
Edite os arquivos em `assets/css/`:
- `main.css` - Cores principais, espaçamentos, componentes
- `animations.css` - Velocidade e tipos de animações

## 🌐 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Dispositivos móveis (iOS/Android)

## 📄 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

---

**Desenvolvido com dedicação e café ☕**

