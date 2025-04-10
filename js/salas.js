document.getElementById('form-sala').addEventListener('submit', function (e) {
  e.preventDefault();

  const indexEdicao = document.getElementById('form-sala').dataset.index;

  const sala = {
    nome: document.getElementById('nome').value,
    capacidade: parseInt(document.getElementById('capacidade').value),
    tipo: document.getElementById('tipo').value
  };

  let salas = JSON.parse(localStorage.getItem('salas') || '[]');

  if (indexEdicao) {
    salas[indexEdicao] = sala;
    document.getElementById('form-sala').dataset.index = '';
  } else {
    salas.push(sala);
  }

  localStorage.setItem('salas', JSON.stringify(salas));

  document.getElementById('form-sala').reset();
  document.getElementById('alerta').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('alerta').classList.add('d-none');
  }, 2000);

  listarSalas();
});

// Listar
function listarSalas() {
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');
  const tbody = document.getElementById('tabela-salas');
  tbody.innerHTML = '';

  salas.forEach((sala, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sala.nome}</td>
      <td>${sala.capacidade}</td>
      <td>${sala.tipo}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarSala(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirSala(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Editar
function editarSala(index) {
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');
  const sala = salas[index];

  document.getElementById('nome').value = sala.nome;
  document.getElementById('capacidade').value = sala.capacidade;
  document.getElementById('tipo').value = sala.tipo;

  document.getElementById('form-sala').dataset.index = index;
}

// Excluir
function excluirSala(index) {
  if (confirm('Deseja excluir esta sala?')) {
    const salas = JSON.parse(localStorage.getItem('salas') || '[]');
    salas.splice(index, 1);
    localStorage.setItem('salas', JSON.stringify(salas));
    listarSalas();
  }
}

// Inicializar
window.addEventListener('load', listarSalas);
