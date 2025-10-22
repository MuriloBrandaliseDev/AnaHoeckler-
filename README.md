# Ana Hoeckler Estética - Site Profissional

Um site moderno, responsivo e profissional para a Estética da Ana Hoeckler, desenvolvido com Flask e design contemporâneo.

## 🚀 Características

- **Design Moderno**: Interface elegante com cores rosas claros e efeitos visuais sofisticados
- **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- **Navegação Suave**: Menu fixo com scroll suave entre seções
- **Animações**: Efeitos visuais e transições elegantes
- **Formulário de Contato**: Sistema de contato integrado
- **Performance Otimizada**: Carregamento rápido e eficiente

## 🛠️ Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Fontes**: Google Fonts (Playfair Display, Poppins)
- **Ícones**: Font Awesome 6
- **Design**: CSS Grid, Flexbox, CSS Variables

## 📁 Estrutura do Projeto

```
Site_Estetica/
├── app.py                 # Aplicação principal Flask
├── config.py              # Configurações da aplicação
├── run.py                 # Arquivo de inicialização
├── requirements.txt       # Dependências Python
├── README.md             # Este arquivo
├── .gitignore            # Arquivos ignorados pelo Git
├── static/               # Arquivos estáticos
│   ├── css/
│   │   └── style.css    # Estilos principais
│   ├── js/
│   │   └── script.js    # JavaScript interativo
│   └── images/          # Imagens do site
└── templates/            # Templates HTML
    └── index.html       # Página principal
```

## 🚀 Como Executar

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Instalação

1. **Clone ou baixe o projeto**
2. **Navegue para o diretório do projeto**
   ```bash
   cd Site_Estetica
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute a aplicação (opção 1 - recomendada)**
   ```bash
   python run.py
   ```

   **Ou execute diretamente (opção 2)**
   ```bash
   python app.py
   ```

5. **Acesse o site**
   - Abra seu navegador
   - Acesse: `http://localhost:5000`

## 🎨 Personalização

### Cores
As cores principais estão definidas como variáveis CSS em `static/css/style.css`:
- `--primary-pink`: Rosa principal (#f8b4d9)
- `--secondary-pink`: Rosa secundário (#fce4ec)
- `--accent-pink`: Rosa de destaque (#f06292)

### Conteúdo
- Edite o arquivo `templates/index.html` para modificar textos e estrutura
- Ajuste estilos em `static/css/style.css`
- Modifique funcionalidades em `static/js/script.js`

## 📱 Responsividade

O site é totalmente responsivo e inclui:
- Menu mobile com toggle
- Layout adaptativo para diferentes tamanhos de tela
- Otimização para dispositivos móveis
- Breakpoints em 768px e 480px

## 🔧 Funcionalidades

- **Navegação Fixa**: Menu que permanece visível durante o scroll
- **Scroll Suave**: Navegação interna com animações
- **Formulário de Contato**: Sistema de envio de mensagens
- **Animações**: Efeitos visuais ao scroll e hover
- **Efeitos Parallax**: Elementos de fundo com movimento sutil
- **Menu Mobile**: Navegação responsiva para dispositivos móveis

## 🚀 Desenvolvimento

### Estrutura da Aplicação
- **Factory Pattern**: Aplicação criada usando `create_app()`
- **Configuração**: Sistema de configuração por ambiente
- **Rotas**: Estrutura organizada para futuras expansões

### Comandos Úteis
```bash
# Executar em modo desenvolvimento
python run.py

# Executar com configuração específica
FLASK_ENV=development python app.py

# Instalar dependências
pip install -r requirements.txt

# Verificar dependências
pip list
```

## 📝 Próximos Passos

Para expandir o site, considere:
- Adicionar mais páginas (Sobre, Serviços, Galeria)
- Implementar sistema de blog
- Integrar com banco de dados
- Adicionar sistema de agendamento online
- Implementar área administrativa
- Adicionar sistema de notificações
- Implementar cache para melhor performance

## 🐛 Solução de Problemas

### Erro de Porta
Se a porta 5000 estiver ocupada, altere no arquivo `run.py`:
```python
port=5001  # ou outra porta disponível
```

### Dependências
Se houver problemas com dependências:
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 🤝 Contribuição

Este projeto foi desenvolvido especificamente para a Estética da Ana Hoeckler. Para sugestões ou melhorias, entre em contato.

## 📄 Licença

Projeto desenvolvido para uso exclusivo da Estética da Ana Hoeckler.

---

**Desenvolvido com ❤️ para proporcionar uma experiência digital excepcional**

### 🎯 Status do Projeto
- ✅ Estrutura básica implementada
- ✅ Design responsivo criado
- ✅ Navegação funcional
- ✅ Animações implementadas
- ✅ Formulário de contato
- 🔄 Próximo: Páginas adicionais
- 🔄 Próximo: Sistema de agendamento
