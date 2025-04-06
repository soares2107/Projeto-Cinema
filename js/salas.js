document.getElementById('form-sala').addEventListener('submit', function (e) {
    e.preventDefault();

    const sala = {
      nome: document.getElementById('nome').value,
      capacidade: parseInt(document.getElementById('capacidade').value),
      tipo: document.getElementById('tipo').value
    };

    const salas = JSON.parse(localStorage.getItem('salas') || '[]');
    salas.push(sala);
    localStorage.setItem('salas', JSON.stringify(salas));

    document.getElementById('alerta').classList.remove('d-none');
    document.getElementById('form-sala').reset();

    setTimeout(() => {
      document.getElementById('alerta').classList.add('d-none');
    }, 3000);
  });