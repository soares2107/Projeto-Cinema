window.addEventListener('load', () => {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
  const container = document.getElementById('filmes-cartaz');

  if (!container) return;

  if (filmes.length === 0) {
    container.innerHTML = `<p class="text-center">Nenhum filme cadastrado.</p>`;
    return;
  }

  filmes.forEach(filme => {
    const col = document.createElement('div');
    col.className = 'col-md-3 p-2';


    col.innerHTML = `
      <div class="card mb-3 shadow-sm card-filme" style="width: 20rem;">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
          <ul class="list-unstyled">
            <li><strong>Gênero:</strong> ${filme.genero}</li>
            <li><strong>Duração:</strong> ${filme.duracao} min</li>
            <li><strong>Classificação:</strong> ${filme.classificacao}</li>
            <li><strong>Estreia:</strong> ${new Date(filme.estreia).toLocaleDateString('pt-BR')}</li>
          </ul>
          <a href="sessoes.html" class="btn btn-primary w-100">Ver Sessões</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
});
