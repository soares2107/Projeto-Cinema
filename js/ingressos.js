function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
    const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
    const salas = JSON.parse(localStorage.getItem('salas') || '[]');

    const selectSessao = document.getElementById('sessao');
    sessoes.forEach((sessao, index) => {
      const filme = filmes[sessao.filmeIndex]?.titulo || 'Filme';
      const sala = salas[sessao.salaIndex]?.nome || 'Sala';
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${filme} - ${sala} - ${new Date(sessao.dataHora).toLocaleString()}`;
      selectSessao.appendChild(option);
    });
  }

  document.getElementById('form-ingresso').addEventListener('submit', function (e) {
    e.preventDefault();

    const ingresso = {
      sessaoIndex: document.getElementById('sessao').value,
      nome: document.getElementById('nome').value,
      cpf: document.getElementById('cpf').value,
      assento: document.getElementById('assento').value,
      pagamento: document.getElementById('pagamento').value
    };

    const ingressos = JSON.parse(localStorage.getItem('ingressos') || '[]');
    ingressos.push(ingresso);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));

    document.getElementById('alerta').classList.remove('d-none');
    document.getElementById('form-ingresso').reset();

    setTimeout(() => {
      document.getElementById('alerta').classList.add('d-none');
    }, 3000);
  });

  window.onload = carregarSessoes;