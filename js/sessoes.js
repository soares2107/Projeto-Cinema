function carregarOpcoes() {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');
  const selectFilme = document.getElementById('filme');
  filmes.forEach((filme, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = filme.titulo;
    selectFilme.appendChild(option);
  });
  const selectSala = document.getElementById('sala');
  salas.forEach((sala, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = sala.nome;
    selectSala.appendChild(option);
  });
}
window.addEventListener('load', carregarOpcoes);
document.getElementById('form-sessao').addEventListener('submit', function (e) {
  e.preventDefault();
  const sessao = {
    filmeIndex: document.getElementById('filme').value,
    salaIndex: document.getElementById('sala').value,
    dataHora: document.getElementById('dataHora').value,
    preco: parseFloat(document.getElementById('preco').value),
    idioma: document.getElementById('idioma').value,
    formato: document.getElementById('formato').value
  };
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  sessoes.push(sessao);
  localStorage.setItem('sessoes', JSON.stringify(sessoes));
  document.getElementById('alerta').classList.remove('d-none');
  document.getElementById('form-sessao').reset();
  setTimeout(() => {
    document.getElementById('alerta').classList.add('d-none');
  }, 3000);
});