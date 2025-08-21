let numeroAleatorio = Math.floor(Math.random() * 100) + 1;  // Número aleatório entre 1 e 100
let tentativas = 0;

const inputGuess = document.getElementById('guess');
const buttonCheck = document.getElementById('check-btn');
const buttonRetry = document.getElementById('retry-btn');
const buttonPlayAgain = document.getElementById('play-again-btn');
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
        buttonRetry.classList.add('hidden');  // Esconde o botão de tentar novamente
        buttonPlayAgain.classList.remove('hidden');  // Mostra o botão de jogar novamente
    }

    attemptsElement.textContent = `Tentativas: ${tentativas}`;
});

// Evento de Tentar Novamente (resetar o campo, manter o número)
buttonRetry.addEventListener('click', () => {
    inputGuess.value = '';  // Limpa o campo de entrada
    buttonCheck.disabled = false;  // Habilita o botão de tentar
    messageElement.textContent = '';  // Limpa a mensagem
    tentativas = 0;  // Reseta as tentativas
    attemptsElement.textContent = `Tentativas: ${tentativas}`;
    buttonRetry.classList.add('hidden');  // Esconde o botão de tentar novamente
});

// Evento de Jogar Novamente (gerar um novo número aleatório)
buttonPlayAgain.addEventListener('click', () => {
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;  // Novo número aleatório
    tentativas = 0;  // Reseta o número de tentativas
    inputGuess.value = '';  // Limpa o campo de entrada
    buttonCheck.disabled = false;  // Habilita o botão de adivinhar
    messageElement.textContent = '';  // Limpa a mensagem
    attemptsElement.textContent = `Tentativas: ${tentativas}`;
    buttonRetry.classList.add('hidden');  // Esconde o botão de tentar novamente
    buttonPlayAgain.classList.add('hidden');  // Esconde o botão de jogar novamente
});
