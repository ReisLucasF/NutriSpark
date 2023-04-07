// Espera que a página esteja totalmente carregada antes de executar o código
window.addEventListener('load', () => {
    // Seleciona o formulário
    const form = document.querySelector('#imc-form');
  
    // Verifica se o formulário existe antes de adicionar o ouvinte de eventos
    if (form) {
      // Adiciona um evento de submit ao formulário
      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
  
        // Seleciona a altura e o peso inseridos pelo usuário
        const altura = parseFloat(document.querySelector('#altura').value);
        const peso = parseFloat(document.querySelector('#peso').value);
  
        // Calcula o IMC
        const imc = peso / (altura * altura);
  
        // Exibe o resultado na tela
        const resultadoDiv = document.querySelector('#resultado');
      let diagnostico = '';
      if (imc < 18.5) {
        diagnostico = 'Baixo peso';
      } else if (imc >= 18.5 && imc < 25) {
        diagnostico = 'Intervalo normal';
      } else if (imc >= 25 && imc < 30) {
        diagnostico = 'Sobrepeso';
      } else if (imc >= 30 && imc < 35) {
        diagnostico = 'Obesidade classe I';
      } else if (imc >= 35 && imc < 40) {
        diagnostico = 'Obesidade classe II';
      } else {
        diagnostico = 'Obesidade classe III';
      }
      resultadoDiv.innerHTML = `<p>Seu IMC é: ${imc.toFixed(2)}</p><p>Diagnóstico: ${diagnostico}</p>`;
    });
  }
});
  
  
  
  
  