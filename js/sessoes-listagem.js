window.addEventListener('load', () => {
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const salas = JSON.parse(localStorage.getItem('salas') || '[]');
  const lista = document.getElementById('lista-sessoes');
  sessoes.forEach(sessao => {
    const filme = filmes[sessao.filmeIndex];
    const sala = salas[sessao.salaIndex];
    if (!filme || !sala) return;
    const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');
    const card = document.createElement('div');
    card.className = 'col-md-3';
    card.innerHTML = `
  <div class="card mb-4 shadow-sm card-filme" style="width: 18rem;">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
          <ul class="list-unstyled">
            <li><strong>Gênero:</strong> ${filme.genero}</li>
            <li><strong>Duração:</strong> ${filme.duracao} min</li>
            <li><strong>Classificação:</strong> ${filme.classificacao}</li>
          </ul>
          <a href="venda-ingressos.html" class="btn btn-primary w-100">Comprar Ingressos</a>
        </div>
      </div>
    `;
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(tooltipEl => {
      new bootstrap.Tooltip(tooltipEl);
    });

    lista.appendChild(card);
  });
});