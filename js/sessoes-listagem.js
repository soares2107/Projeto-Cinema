const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
const salas = JSON.parse(localStorage.getItem('salas') || '[]');

const container = document.getElementById('lista-sessoes');

sessoes.forEach((sessao, index) => {
  const filme = filmes[sessao.filmeIndex];
  const sala = salas[sessao.salaIndex];

  const card = document.createElement('div');
  card.className = 'col-md-6 col-lg-4 mb-4';

  card.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${filme?.titulo || 'Filme não encontrado'}</h5>
        <p class="card-text"><strong>Sala:</strong> ${sala?.nome || 'N/A'}</p>
        <p class="card-text"><strong>Data e Hora:</strong> ${new Date(sessao.dataHora).toLocaleString()}</p>
        <p class="card-text"><strong>Preço:</strong> R$ ${sessao.preco.toFixed(2)}</p>
        <p class="card-text"><strong>Idioma:</strong> ${sessao.idioma} | <strong>Formato:</strong> ${sessao.formato}</p>
      </div>
      <div class="card-footer text-end">
        <a href="venda-ingressos.html?sessao=${index}" class="btn btn-primary">Comprar Ingresso</a>
      </div>
    </div>
  `;

  container.appendChild(card);
});
