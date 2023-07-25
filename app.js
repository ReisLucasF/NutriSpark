document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnIMC").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadSessaoDeCalculo("src/imc.html");
    });

    document.getElementById("btnCalorias").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadSessaoDeCalculo("src/calorias.html");
    });

    document.getElementById("btnGEB").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadSessaoDeCalculo("src/geb.html");
    });

    document.getElementById("btnPercentualGordura").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadSessaoDeCalculo("src/percentual_gordura.html");
    });

    document.getElementById("btnAgua").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadSessaoDeCalculo("src/necessidades_agua.html");
    });

    document.getElementById("btnBack").addEventListener("click", function () {
        showButtons();
        showimagem();
        hideSessaoDeCalculo();
    });

    // faz o carregamento AJAX das sessões
    function loadSessaoDeCalculo(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("result").innerHTML = data;
                document.getElementById("btnBack").style.display = "block";

                document.getElementById("btncalcular").addEventListener("click", function () {
                    if (url.includes("src/imc.html")) {
        
                      //IMC
                      const peso = parseFloat(document.getElementById("peso").value);
                        const altura = parseFloat(document.getElementById("altura").value);
                        const imc = calcularimc(peso, altura);
                        const imcResultElement = document.getElementById("imcResult");

                        document.getElementById("imcResult").textContent = `Seu IMC é: ${imc.toFixed(2)}`;

                        if (imc < 18.5) {
                        imcResultElement.textContent += " - Abaixo do peso";
                        } else if (imc >= 18.5 && imc < 24.9) {
                        imcResultElement.textContent += " - Peso normal";
                        } else if (imc >= 25 && imc < 29.9) {
                        imcResultElement.textContent += " - Sobrepeso";
                        } else if (imc >= 30 && imc < 34.9) {
                        imcResultElement.textContent += " - Obesidade grau I";
                        } else if (imc >= 35 && imc < 39.9) {
                        imcResultElement.textContent += " - Obesidade grau II";
                        } else if (imc >= 40) {
                        imcResultElement.textContent += " - Obesidade grau III";
                        }
                    } else if (url.includes("src/calorias.html")) {
        
                      //necessidades calóricas
                      const peso = parseFloat(document.getElementById("peso").value);
                      const altura = parseFloat(document.getElementById("altura").value);
                      const idade = parseInt(document.getElementById("idade").value);
                      const genero = document.querySelector('input[name="genero"]:checked').value;
                      const nivelDeAtividade = parseFloat(document.getElementById("nivelDeAtividade").value);
                      const caloricNeeds = calcularCaloricNeeds(peso, altura, idade, genero, nivelDeAtividade);
                      document.getElementById("caloricNeedsResult").textContent = `Suas necessidades calóricas diárias são: ${caloricNeeds.toFixed(2)} calorias`;
                    } else if (url.includes("src/geb.html")) {
        
                      //GEB
                      const peso = parseFloat(document.getElementById("peso").value);
                      const altura = parseFloat(document.getElementById("altura").value);
                      const idade = parseInt(document.getElementById("idade").value);
                      const genero = document.querySelector('input[name="genero"]:checked').value;
                      const geb = calcularGEB(peso, altura, idade, genero);
                      document.getElementById("gebResult").textContent = `Seu Gasto Energético Basal é: ${geb.toFixed(2)} calorias`;
                    } else if (url.includes("src/percentual_gordura.html")) {
        
                      //percentual de gordura corporal
                      const peso = parseFloat(document.getElementById("peso").value);
                        const circuferenciaCintura = parseFloat(document.getElementById("circuferenciaCintura").value);
                        const circuferenciaQuadril = parseFloat(document.getElementById("circuferenciaQuaril").value);
                        const circuferenciaPescoco = parseFloat(document.getElementById("circuferenciaPescoco").value);
                        const genero = document.querySelector('input[name="genero"]:checked').value;
                        const GEBpercent = calcularGEBpercent(peso, circuferenciaCintura, circuferenciaQuadril, circuferenciaPescoco, genero);
                        document.getElementById("bodyFatResult").textContent = `Seu percentual de gordura corpora: ${GEBpercent.toFixed(2)}%`;
                    } else if (url.includes("src/necessidades_agua.html")) {
        
                      //necessidades de água
                      const peso = parseFloat(document.getElementById("peso").value);
                      const aguaNecessidade = calcularaguaNecessidade(peso);
                      document.getElementById("aguaNecessidadeResult").textContent = `Suas necessidades diárias de água são: ${aguaNecessidade.toFixed(2)}L`;
                    }
                });
            })
            .catch(error => {
                console.error("Erro ao carregar a sessão de cálculo", error);
            });
    }

    // Esconder os botões de seleção de cálculo
    function hideButtons() {
        document.getElementById("buttons").style.display = "none";
        
        // document.getElementById("container").style.display = "none";
    }

    // Exibir os botões de seleção de cálculo
    function showButtons() {
        document.getElementById("buttons").style.display = "";
        
    }

    function hideimagem(){
        document.getElementById("banner").style.display = "none";
    }

    function showimagem(){
        document.getElementById("banner").style.display = ""
    }

    // Esconder a sessão de cálculo
    function hideSessaoDeCalculo() {
        document.getElementById("result").innerHTML = "";
        document.getElementById("btnBack").style.display = "none";
    }
    //calcular o IMC
    function calcularimc(peso, altura) {
        if (isNaN(peso) || isNaN(altura) || altura === 0) {
            return 0;
        }

        const imc = peso / Math.pow(altura, 2);
        return imc;
    }

    //calcular as necessidades calóricas
    function calcularCaloricNeeds(peso, altura, idade, genero, nivelDeAtividade) {
        let bmr;
        if (genero === "masculino") {
            bmr = 88.36 + (13.4 * peso) + (4.8 * altura * 100) - (5.7 * idade);
        } else if (genero === "feminino") {
            bmr = 447.6 + (9.2 * peso) + (3.1 * altura * 100) - (4.3 * idade);
        }

        const caloricNeeds = bmr * nivelDeAtividade;
        return caloricNeeds;
    }

    //calcular o Gasto Energético Basal (GEB)
    function calcularGEB(peso, altura, idade, genero) {
        let geb;
        if (genero === "masculino") {
            geb = 88.36 + (13.4 * peso) + (4.8 * altura * 100) - (5.7 * idade);
        } else if (genero === "feminino") {
            geb = 447.6 + (9.2 * peso) + (3.1 * altura * 100) - (4.3 * idade);
        }
        return geb;
    }

    //calcular o percentual de gordura corporal
    function calcularGEBpercent(peso, circuferenciaCintura, circuferenciaQuadril, circuferenciaPescoco, genero) {
        if (isNaN(peso) || isNaN(circuferenciaCintura) || isNaN(circuferenciaQuadril) || isNaN(circuferenciaPescoco)) {
            return 0;
        }
    
        let GEBpercent;
        if (genero === "masculino") {
            GEBpercent = 86.010 * Math.log10(circuferenciaCintura - circuferenciaPescoco) - 70.041 * Math.log10(peso) + 36.76;
        } else if (genero === "feminino") {
            GEBpercent = 163.205 * Math.log10(circuferenciaCintura + circuferenciaQuadril - circuferenciaPescoco) - 97.684 * Math.log10(peso) - 78.387;
        }
        return GEBpercent;
    }

    //calcular as necessidades de água
    function calcularaguaNecessidade(peso) {
        if (isNaN(peso)) {
            return 0;
        }

        const aguaNecessidade = (peso * 30)/1000;
        return aguaNecessidade;
    }
});


if (typeof navigator.serviceWorker !== 'undefined'){
    navigator.serviceWorker.register('pwabuilder-sw.js')
}