// Espera o carregamento
window.addEventListener('load', () => {
    // escolhe o form
    const form = document.querySelector('#imc-form');
  
    // Verifica o form
    if (form) {
      // eventos
      form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        // Atribui os valores dos inputs às variáveis
        const altura = parseFloat(document.querySelector('#altura').value);
        const peso = parseFloat(document.querySelector('#peso').value);
  
        // calcula os valores
        const imc = peso / (altura * altura);
  
        // Condições
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
      // exibe o resultado com base na condição
      resultadoDiv.innerHTML = `<p>Seu IMC é: ${imc.toFixed(2)}</p><p>Diagnóstico: ${diagnostico}</p>`;
    });
  }
});
  
  
  
  
  