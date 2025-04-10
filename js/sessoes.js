function carregarOpcoes() {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');

  const selectFilme = document.getElementById('filme');
  const selectSala = document.getElementById('sala');

  selectFilme.innerHTML = '<option value="">Selecione um filme</option>';
  selectSala.innerHTML = '<option value="">Selecione uma sala</option>';

  filmes.forEach((filme, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = filme.titulo;
    selectFilme.appendChild(option);
  });

  salas.forEach((sala, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = sala.nome;
    selectSala.appendChild(option);
  });
}

document.getElementById('form-sessao').addEventListener('submit', function (e) {
  e.preventDefault();

  const indexEdicao = document.getElementById('form-sessao').dataset.index;

  const sessao = {
    filmeIndex: document.getElementById('filme').value,
    salaIndex: document.getElementById('sala').value,
    dataHora: document.getElementById('dataHora').value,
    preco: parseFloat(document.getElementById('preco').value),
    idioma: document.getElementById('idioma').value,
    formato: document.getElementById('formato').value
  };

  let sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');

  if (indexEdicao) {
    sessoes[indexEdicao] = sessao;
    document.getElementById('form-sessao').dataset.index = '';
  } else {
    sessoes.push(sessao);
  }

  localStorage.setItem('sessoes', JSON.stringify(sessoes));
  document.getElementById('form-sessao').reset();

  document.getElementById('alerta').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('alerta').classList.add('d-none');
  }, 3000);

  listarSessoes();
});

function listarSessoes() {
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');

  const tbody = document.getElementById('tabela-sessoes');
  tbody.innerHTML = '';

  sessoes.forEach((sessao, index) => {
    const tr = document.createElement('tr');

    const filme = filmes[sessao.filmeIndex]?.titulo || 'Desconhecido';
    const sala = salas[sessao.salaIndex]?.nome || 'Desconhecida';
    const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');

    tr.innerHTML = `
      <td>${filme}</td>
      <td>${sala}</td>
      <td>${dataFormatada}</td>
      <td>${sessao.idioma}</td>
      <td>${sessao.formato}</td>
      <td>R$ ${sessao.preco.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarSessao(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirSessao(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarSessao(index) {
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  const sessao = sessoes[index];

  document.getElementById('filme').value = sessao.filmeIndex;
  document.getElementById('sala').value = sessao.salaIndex;
  document.getElementById('dataHora').value = sessao.dataHora;
  document.getElementById('preco').value = sessao.preco;
  document.getElementById('idioma').value = sessao.idioma;
  document.getElementById('formato').value = sessao.formato;

  document.getElementById('form-sessao').dataset.index = index;
}

function excluirSessao(index) {
  if (confirm('Deseja excluir esta sessão?')) {
    const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
    sessoes.splice(index, 1);
    localStorage.setItem('sessoes', JSON.stringify(sessoes));
    listarSessoes();
  }
}

window.addEventListener('load', () => {
  carregarOpcoes();
  listarSessoes();
});
