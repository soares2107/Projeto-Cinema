// === ALERTA DE SUCESSO (inserido via JS no DOM) ===
function inserirAlertaNoDOM() {
  const estilo = document.createElement("style");
  estilo.textContent = `
    .alerta {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #28a745;
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      font-size: 16px;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
    .alerta.hidden {
      opacity: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(estilo);

  const div = document.createElement("div");
  div.id = "alerta-sucesso";
  div.className = "alerta hidden";
  document.body.appendChild(div);
}

function mostrarAlertaSucesso(mensagem) {
  const alerta = document.getElementById("alerta-sucesso");
  alerta.textContent = mensagem;
  alerta.classList.remove("hidden");
  setTimeout(() => {
    alerta.classList.add("hidden");
  }, 3000);
}

// === CADASTRO / EDIÇÃO DE FILMES ===
document.getElementById("form-filme").addEventListener("submit", function (e) {
  e.preventDefault();

  const indexEdicao = document.getElementById("form-filme").dataset.index;
  const imagem = document.getElementById("imagem").value;

  if (!imagem) {
    alert("Por favor, selecione uma imagem do filme.");
    return;
  }

  const filme = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    genero: document.getElementById("genero").value,
    classificacao: document.getElementById("classificacao").value,
    duracao: parseInt(document.getElementById("duracao").value),
    estreia: document.getElementById("estreia").value,
    imagem: imagem,
  };

  let filmes = JSON.parse(localStorage.getItem("filmes") || "[]");

  if (indexEdicao) {
    filmes[indexEdicao] = filme;
    document.getElementById("form-filme").dataset.index = "";
    mostrarAlertaSucesso("Filme editado com sucesso!");
  } else {
    filmes.push(filme);
    mostrarAlertaSucesso("Filme cadastrado com sucesso!");
  }

  localStorage.setItem("filmes", JSON.stringify(filmes));
  document.getElementById("form-filme").reset();
  listarFilmes();
});

// === LISTAR FILMES NA TABELA ===
function listarFilmes() {
  const filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
  const tbody = document.getElementById("tabela-filmes");
  tbody.innerHTML = "";

  filmes.forEach((filme, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${filme.titulo}</td>
      <td>${filme.genero}</td>
      <td>${filme.classificacao}</td>
      <td>${filme.duracao} min</td>
      <td>${new Date(filme.estreia).toLocaleDateString("pt-BR")}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarFilme(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirFilme(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// === EDITAR FILME ===
function editarFilme(index) {
  const filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
  const filme = filmes[index];

  document.getElementById("titulo").value = filme.titulo;
  document.getElementById("descricao").value = filme.descricao;
  document.getElementById("genero").value = filme.genero;
  document.getElementById("classificacao").value = filme.classificacao;
  document.getElementById("duracao").value = filme.duracao;
  document.getElementById("estreia").value = filme.estreia;
  document.getElementById("imagem").value = filme.imagem;

  document.getElementById("form-filme").dataset.index = index;
}

// === EXCLUIR FILME ===
function excluirFilme(index) {
  if (confirm("Tem certeza que deseja excluir este filme?")) {
    const filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
    filmes.splice(index, 1);
    localStorage.setItem("filmes", JSON.stringify(filmes));
    listarFilmes();
    mostrarAlertaSucesso("Filme excluído com sucesso!");
  }
}

// === INICIALIZAÇÃO ===
window.addEventListener("load", function () {
  listarFilmes();
  inserirAlertaNoDOM(); // Insere o alerta no DOM ao carregar a página
});
