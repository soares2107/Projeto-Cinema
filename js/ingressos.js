function carregarSessoes() {
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');
  const selectSessao = document.getElementById('sessao');
  sessoes.forEach((sessao, index) => {
    const filme = filmes[sessao.filmeIndex]?.titulo || 'Filme';
    const sala = salas[sessao.salaIndex]?.nome || 'Sala';
    const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${filme} - ${sala} - ${dataFormatada}`;
    selectSessao.appendChild(option);
  });
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}


window.addEventListener('load', carregarSessoes);
document.getElementById('form-ingresso').addEventListener('submit', function (e) {
  e.preventDefault();

  const cpf = document.getElementById('cpf').value.trim();
  const sessaoIndex = document.getElementById('sessao').value;
  const assento = document.getElementById('assento').value.trim().toUpperCase();

  if (!validarCPF(cpf)) {
    alert('CPF inválido!');
    return;
  }

  const ingressos = JSON.parse(localStorage.getItem('ingressos') || '[]');

  // Verifica duplicidade de assento na mesma sessão
  const ingressoDuplicado = ingressos.find(ing =>
    ing.sessaoIndex === sessaoIndex && ing.assento === assento
  );

  if (ingressoDuplicado) {
    alert('Este assento já foi vendido para esta sessão.');
    return;
  }

  const ingresso = {
    sessaoIndex,
    nome: document.getElementById('nome').value,
    cpf,
    assento,
    pagamento: document.getElementById('pagamento').value
  };

  ingressos.push(ingresso);
  localStorage.setItem('ingressos', JSON.stringify(ingressos));
  exibirIngressosVendidos();

  document.getElementById('alerta').classList.remove('d-none');
  document.getElementById('form-ingresso').reset();
  setTimeout(() => {
    document.getElementById('alerta').classList.add('d-none');
  }, 3000);
});

function exibirIngressosVendidos() {
  const tabela = document.querySelector('#tabela-ingressos tbody');
  if (!tabela) return;

  tabela.innerHTML = '';

  const ingressos = JSON.parse(localStorage.getItem('ingressos') || '[]');
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');

  ingressos.forEach(ingresso => {
    const sessao = sessoes[ingresso.sessaoIndex];
    const filme = filmes[sessao?.filmeIndex]?.titulo || 'Filme';
    const sala = salas[sessao?.salaIndex]?.nome || 'Sala';
    const dataHora = new Date(sessao?.dataHora).toLocaleString('pt-BR');

    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${ingresso.nome}</td>
      <td>${ingresso.cpf}</td>
      <td>${ingresso.assento}</td>
      <td>${ingresso.pagamento}</td>
      <td>${filme} - ${sala} - ${dataHora}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Chamada ao carregar a página e após nova venda
window.addEventListener('load', () => {
  carregarSessoes();
  exibirIngressosVendidos();
});

