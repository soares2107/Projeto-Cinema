document.getElementById('form-filme').addEventListener('submit', function (e) {
  e.preventDefault();

  const indexEdicao = document.getElementById('form-filme').dataset.index;
  const imagem = document.getElementById('imagem').value;

  if (!imagem) {
    alert('Por favor, selecione uma imagem do filme.');
    return;
  }

  const filme = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    genero: document.getElementById('genero').value,
    classificacao: document.getElementById('classificacao').value,
    duracao: parseInt(document.getElementById('duracao').value),
    estreia: document.getElementById('estreia').value,
    imagem: imagem
  };

  let filmes = JSON.parse(localStorage.getItem('filmes') || '[]');

  if (indexEdicao) {
    filmes[indexEdicao] = filme;
    document.getElementById('form-filme').dataset.index = '';
  } else {
    filmes.push(filme);
  }

  localStorage.setItem('filmes', JSON.stringify(filmes));
  document.getElementById('form-filme').reset();
  listarFilmes();
});

// Listar na tabela
function listarFilmes() {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const tbody = document.getElementById('tabela-filmes');
  tbody.innerHTML = '';

  filmes.forEach((filme, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${filme.titulo}</td>
      <td>${filme.genero}</td>
      <td>${filme.classificacao}</td>
      <td>${filme.duracao} min</td>
      <td>${new Date(filme.estreia).toLocaleDateString('pt-BR')}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarFilme(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirFilme(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Editar
function editarFilme(index) {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const filme = filmes[index];

  document.getElementById('titulo').value = filme.titulo;
  document.getElementById('descricao').value = filme.descricao;
  document.getElementById('genero').value = filme.genero;
  document.getElementById('classificacao').value = filme.classificacao;
  document.getElementById('duracao').value = filme.duracao;
  document.getElementById('estreia').value = filme.estreia;
  document.getElementById('imagem').value = filme.imagem;

  document.getElementById('form-filme').dataset.index = index;
}

// Excluir
function excluirFilme(index) {
  if (confirm('Tem certeza que deseja excluir este filme?')) {
    const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
    filmes.splice(index, 1);
    localStorage.setItem('filmes', JSON.stringify(filmes));
    listarFilmes();
  }
}

// Inicializar
window.addEventListener('load', listarFilmes);
