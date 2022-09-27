function calcular(){
    var altura = (document.getElementById("altura").value)/100
    var peso = document.getElementById("peso").value

    console.log(altura)
    console.log(peso)

    var imc = peso / altura ** 2;
    
    var textarea = ""
    if(imc<18.5){
        textarea =("Você está abaixo do peso, procure orientação médica. Seu IMC é de: "+imc.toFixed(2));
    }
    else if(imc.toFixed(2)<24.9){
        textarea =("Você está no peso ideal, parabéns! Seu IMC é de: "+imc.toFixed(2));
    }
    else if(imc.toFixed(2)<29.9){
        textarea =("Você está com sobrepeso, procure orientação médica. Seu IMC é de: "+imc.toFixed(2));
    }
    else if(imc.toFixed(2)<39.9){
        textarea =("Você está com obesidade, procure orientação médica. Seu IMC é de: "+imc.toFixed(2));
    }
    else if(imc.toFixed(2)>39.9){
        textarea =("Você está obesidade mórbida, procure orientação médica urgente! Seu IMC é de: "+imc.toFixed(2));
    }

    document.getElementById("textarea").innerText=textarea
    
}