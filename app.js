document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnIMC").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadCalculationSession("src/imc.html");
    });

    document.getElementById("btnCalorias").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadCalculationSession("src/calorias.html");
    });

    document.getElementById("btnGEB").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadCalculationSession("src/geb.html");
    });

    document.getElementById("btnPercentualGordura").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadCalculationSession("src/percentual_gordura.html");
    });

    document.getElementById("btnAgua").addEventListener("click", function () {
        hideButtons();
        hideimagem();
        loadCalculationSession("src/necessidades_agua.html");
    });

    document.getElementById("btnBack").addEventListener("click", function () {
        showButtons();
        showimagem();
        hideCalculationSession();
    });

    // faz o carregamento AJAX das sessões
    function loadCalculationSession(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("result").innerHTML = data;
                document.getElementById("btnBack").style.display = "block";

                document.getElementById("btnCalculate").addEventListener("click", function () {
                    if (url.includes("src/imc.html")) {
        
                      //IMC
                      const weight = parseFloat(document.getElementById("weight").value);
                      const height = parseFloat(document.getElementById("height").value);
                      const bmi = calculateBMI(weight, height);
                      document.getElementById("bmiResult").textContent = `Seu IMC é: ${bmi.toFixed(2)}`;
                    } else if (url.includes("src/calorias.html")) {
        
                      //necessidades calóricas
                      const weight = parseFloat(document.getElementById("weight").value);
                      const height = parseFloat(document.getElementById("height").value);
                      const age = parseInt(document.getElementById("age").value);
                      const gender = document.querySelector('input[name="gender"]:checked').value;
                      const activityLevel = parseFloat(document.getElementById("activityLevel").value);
                      const caloricNeeds = calculateCaloricNeeds(weight, height, age, gender, activityLevel);
                      document.getElementById("caloricNeedsResult").textContent = `Suas necessidades calóricas diárias são: ${caloricNeeds.toFixed(2)} calorias`;
                    } else if (url.includes("src/geb.html")) {
        
                      //GEB
                      const weight = parseFloat(document.getElementById("weight").value);
                      const height = parseFloat(document.getElementById("height").value);
                      const age = parseInt(document.getElementById("age").value);
                      const gender = document.querySelector('input[name="gender"]:checked').value;
                      const geb = calculateGEB(weight, height, age, gender);
                      document.getElementById("gebResult").textContent = `Seu Gasto Energético Basal é: ${geb.toFixed(2)} calorias`;
                    } else if (url.includes("src/percentual_gordura.html")) {
        
                      //percentual de gordura corporal
                      const weight = parseFloat(document.getElementById("weight").value);
                      const waistCircumference = parseFloat(document.getElementById("waistCircumference").value);
                      const hipCircumference = parseFloat(document.getElementById("hipCircumference").value);
                      const neckCircumference = parseFloat(document.getElementById("neckCircumference").value);
                      const gender = document.querySelector('input[name="gender"]:checked').value;
                      const bodyFatPercentage = calculateBodyFatPercentage(weight, waistCircumference, hipCircumference, neckCircumference, gender);
                      document.getElementById("bodyFatResult").textContent = `Seu percentual de gordura corporal é: ${bodyFatPercentage.toFixed(2)}%`;
                    } else if (url.includes("src/necessidades_agua.html")) {
        
                      //necessidades de água
                      const weight = parseFloat(document.getElementById("weight").value);
                      const waterNeeds = calculateWaterNeeds(weight);
                      document.getElementById("waterNeedsResult").textContent = `Suas necessidades diárias de água são: ${waterNeeds.toFixed(2)} litros`;
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
    function hideCalculationSession() {
        document.getElementById("result").innerHTML = "";
        document.getElementById("btnBack").style.display = "none";
    }
    //calcular o IMC
    function calculateBMI(weight, height) {
        if (isNaN(weight) || isNaN(height) || height === 0) {
            return 0;
        }

        const bmi = weight / Math.pow(height, 2);
        return bmi;
    }

    //calcular as necessidades calóricas
    function calculateCaloricNeeds(weight, height, age, gender, activityLevel) {
        let bmr;
        if (gender === "male") {
            bmr = 88.36 + (13.4 * weight) + (4.8 * height * 100) - (5.7 * age);
        } else if (gender === "female") {
            bmr = 447.6 + (9.2 * weight) + (3.1 * height * 100) - (4.3 * age);
        }

        const caloricNeeds = bmr * activityLevel;
        return caloricNeeds;
    }

    //calcular o Gasto Energético Basal (GEB)
    function calculateGEB(weight, height, age, gender) {
        let geb;
        if (gender === "male") {
            geb = 88.36 + (13.4 * weight) + (4.8 * height * 100) - (5.7 * age);
        } else if (gender === "female") {
            geb = 447.6 + (9.2 * weight) + (3.1 * height * 100) - (4.3 * age);
        }
        return geb;
    }

    //calcular o percentual de gordura corporal
    function calculateBodyFatPercentage(weight, waistCircumference, hipCircumference, neckCircumference, gender) {
        if (isNaN(weight) || isNaN(waistCircumference) || isNaN(hipCircumference) || isNaN(neckCircumference)) {
            return 0;
        }

        let bodyFatPercentage;
        if (gender === "male") {
            bodyFatPercentage = 86.010 * Math.log10(waistCircumference - neckCircumference) - 70.041 * Math.log10(weight) + 36.76;
        } else if (gender === "female") {
            bodyFatPercentage = 163.205 * Math.log10(waistCircumference + hipCircumference - neckCircumference) - 97.684 * Math.log10(weight) - 78.387;
        }
        return bodyFatPercentage;
    }

    //calcular as necessidades de água
    function calculateWaterNeeds(weight) {
        if (isNaN(weight)) {
            return 0;
        }

        const waterNeeds = weight * 30;
        return waterNeeds;
    }
});


if (typeof navigator.serviceWorker !== 'undefined'){
    navigator.serviceWorker.register('pwabuilder-sw.js')
}