# 🎬 Projeto Cinema

Sistema web para gerenciamento de um cinema, desenvolvido com **HTML**, **CSS**, **JavaScript** e **Bootstrap 5.3**. O projeto permite o cadastro de filmes, salas e sessões, além da venda de ingressos e listagem de sessões disponíveis.

## 🚀 Funcionalidades

- Cadastro de filmes, salas e sessões
- Venda de ingressos com validação de CPF e assento
- Listagem de sessões disponíveis
- Armazenamento de dados no `localStorage`

## 🗂️ Estrutura do Projeto

Projeto-Cinema/
├── assets/                 # Imagens e recursos estáticos
├── css/
│   └── style.css           # Estilos personalizados
├── js/
│   ├── index.js            # Lógica da página inicial
│   ├── ingressos.js        # Lógica de venda de ingressos
│   ├── sessoes.js          # Lógica de sessões
│   └── cadastro.js         # Lógica de cadastro de filmes e salas
├── cadastro-filmes.html    # Página de cadastro de filmes
├── cadastro-salas.html     # Página de cadastro de salas
├── cadastro-sessoes.html   # Página de cadastro de sessões
├── index.html              # Página inicial com filmes em cartaz
├── sessoes.html            # Página de listagem de sessões
├── venda-ingressos.html    # Página de venda de ingressos
└── README.md               # Este arquivo

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5.3

## 📦 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/soares2107/Projeto-Cinema.git
   ```
2. Abra o arquivo `index.html` em seu navegador.

## 📌 Observações

- Os dados são armazenados no `localStorage` do navegador, portanto, não persistem entre diferentes navegadores ou dispositivos.
- Este projeto é uma simulação e não possui backend implementado.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
