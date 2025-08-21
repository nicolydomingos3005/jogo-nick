let numeroAleatorio = Math.floor(Math.random() * 100) + 1;  // Número aleatório entre 1 e 100
let tentativas = 0;

const inputGuess = document.getElementById('guess');
const buttonCheck = document.getElementById('check-btn');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

buttonCheck.addEventListener('click', () => {
    let palpite = Number(inputGuess.value);  // O palpite do jogador
    tentativas++;  // Incrementa o número de tentativas

    if (palpite < 1 || palpite > 100 || isNaN(palpite)) {
        messageElement.textContent = "Por favor, insira um número entre 1 e 100!";
        messageElement.style.color = "red";
        return;
    }

    if (palpite < numeroAleatorio) {
        messageElement.textContent = "Muito baixo! Tente novamente.";
        messageElement.style.color = "orange";
    } else if (palpite > numeroAleatorio) {
        messageElement.textContent = "Muito alto! Tente novamente.";
        messageElement.style.color = "orange";
    } else {
        messageElement.textContent = `Você acertou! O número era ${numeroAleatorio}.`;
        messageElement.style.color = "green";
        buttonCheck.disabled = true;  // Desabilita o botão depois que o jogador acertar
    }

    attemptsElement.textContent = `Tentativas: ${tentativas}`;
});
