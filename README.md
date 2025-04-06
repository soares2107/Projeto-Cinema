# 🎬 Sistema Web de Controle de Cinema

Este é um sistema web para controle de cinema, desenvolvido com **HTML**, **CSS**, **JavaScript puro** e **Bootstrap 5.3**. O objetivo é simular um sistema completo com funcionalidades como:

- Cadastro de filmes, salas e sessões
- Venda de ingressos
- Listagem de sessões disponíveis
- Armazenamento local via `localStorage`

> ⚠️ **Projeto em desenvolvimento** – esta é a primeira versão do sistema, ainda em fase inicial. Melhorias e funcionalidades extras serão adicionadas em breve.

## 🚀 Como executar com Docker

Certifique-se de ter o Docker instalado. Depois, execute:

```bash
docker build -t cinema-app .
docker run -d -p 8080:80 --name cinema-container cinema-app
```

Acesse: [http://localhost:8080](http://localhost:8080)

## 🧱 Tecnologias utilizadas

- HTML5
- CSS3 + Bootstrap 5.3
- JavaScript
- Docker (NGINX para servir os arquivos)
- `localStorage` para persistência no navegador

## 📁 Estrutura do projeto

```
cinema/
├── index.html
├── cadastro-filmes.html
├── cadastro-salas.html
├── cadastro-sessoes.html
├── venda-ingressos.html
├── sessoes.html
├── css/
│   └── style.css
├── js/
│   ├── filmes.js
│   ├── salas.js
│   ├── sessoes.js
│   ├── ingressos.js
│   ├── sessoes-listagem.js
│   └── index.js
├── Dockerfile
└── README.md
```

## 📌 Próximas etapas

- ✅ Separação de scripts em arquivos externos
- ✅ Dockerização com NGINX
- ⏳ Validação de dados no front-end
- ⏳ Melhorias visuais e responsividade total
- ⏳ Integração futura com backend (ex: Node.js ou Firebase)

---

Feito com 💻 por [Seu Nome]
