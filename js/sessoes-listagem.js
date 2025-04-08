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
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <div class="ratio ratio-16x9">
          <img src="${filme.imagem}" alt="${filme.titulo}" 
     class="img-fluid"
     data-bs-toggle="tooltip" 
     title="${filme.descricao}">

        </div>
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
          <ul class="list-unstyled mb-3">
            <li><strong>Gênero:</strong> ${filme.genero}</li>
            <li><strong>Classificação:</strong> ${filme.classificacao}</li>
            <li><strong>Duração:</strong> ${filme.duracao} min</li>
            <li><strong>Sala:</strong> ${sala.nome}</li>
            <li><strong>Data/Hora:</strong> ${dataFormatada}</li>
            <li><strong>Idioma:</strong> ${sessao.idioma}</li>
            <li><strong>Formato:</strong> ${sessao.formato}</li>
            <li><strong>Preço:</strong> R$ ${sessao.preco.toFixed(2)}</li>
          </ul>
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