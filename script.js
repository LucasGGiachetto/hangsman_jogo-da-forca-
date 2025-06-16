const palavrasPorIdioma = {
    pt: [
        'computador', 'teclado', 'monitor', 'internet',
        'programacao', 'algoritmo', 'bicicleta', 'paralelepipedo',
        'xícara', 'xadrez', 'abacaxi', 'elefante', 'girassol',
        'arara', 'lanterna', 'ventilador', 'biblioteca', 'queijo',
        'esfinge', 'tartaruga', 'plástico', 'música', 'fone', 'tecnologia'
    ],
    en: [
        'computer', 'keyboard', 'monitor', 'internet',
        'programming', 'algorithm', 'bicycle', 'parallelepiped',
        'cup', 'chess', 'pineapple', 'elephant', 'sunflower',
        'macaw', 'flashlight', 'fan', 'library', 'cheese',
        'sphinx', 'turtle', 'plastic', 'music', 'headphone', 'technology'
    ]
};

const gameTexts = {
    pt: {
        title: "Jogo da Forca",
        guessedLetters: "Letras Chutadas",
        winMessage: "Parabéns! Você venceu!",
        loseMessage: "VOCÊ PERDEU! A palavra era: ",
        invalidLetter: "Por favor, insira uma letra válida.",
        alreadyTried: "Você já tentou esta letra. Tente outra.",
        placeholder: ""
    },
    en: {
        title: "Hangman Game",
        guessedLetters: "Guessed Letters",
        winMessage: "Congratulations! You won!",
        loseMessage: "YOU LOST! The word was: ",
        invalidLetter: "Please enter a valid letter.",
        alreadyTried: "You already tried this letter. Try another one.",
        placeholder: ""
    }
};

let palavraEscolhida = "";
let exibicaoPalavra = [];
let letrasChutadas = [];
let tentativasRestantes = 6;
let numeroErros = 0;
let currentLanguage = 'pt';


function iniciarJogo() {
    document.getElementById('botao-reiniciar').style.display = 'none';
    document.getElementById('mensagem').style.display = 'none';
    document.getElementById('entrada-letra').disabled = false;
    document.getElementById('entrada-letra').value = '';
    document.getElementById('entrada-letra').focus();

    const palavras = palavrasPorIdioma[currentLanguage];
    palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
    
    letrasChutadas = [];
    tentativasRestantes = 6;
    numeroErros = 0;

    atualizarExibicao();
    updateUITexts();
}

function chutarLetra() {
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();
    const texts = gameTexts[currentLanguage];

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert(texts.invalidLetter);
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert(texts.alreadyTried);
        return;
    }

    letrasChutadas.push(letra);

    let acertou = false;
    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === letra) {
            exibicaoPalavra[i] = letra;
            acertou = true;
        }
    }

    if (!acertou) {
        tentativasRestantes--;
        numeroErros++;
    }

    entradaLetra.value = '';
    atualizarExibicao();
}

function atualizarExibicao() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById("letras-chutadas").innerText = letrasChutadas.join(', ');
    document.getElementById("imagem").src = `img/forca${numeroErros}.png`;

    if (tentativasRestantes === 0) {
        encerrarJogo('lose');
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('win');
    }
}

function encerrarJogo(resultado) {
    const texts = gameTexts[currentLanguage];
    
    document.getElementById('entrada-letra').disabled = true;
    document.getElementById('mensagem').style.display = 'block';
    document.getElementById('botao-reiniciar').style.display = 'block';

    if (resultado === 'win') {
        document.getElementById('mensagem').textContent = texts.winMessage;
        document.getElementById('mensagem').style.color = '#4CAF50';
    } else {
        document.getElementById('mensagem').textContent = texts.loseMessage + palavraEscolhida;
        document.getElementById('mensagem').style.color = '#f44336';
    }
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateUITexts();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[onclick="changeLanguage('${lang}')"]`).classList.add('active');

    iniciarJogo();
}

function updateUITexts() {
    const texts = gameTexts[currentLanguage];

    document.getElementById('game-title').textContent = texts.title;
    document.getElementById('guessed-letters-title').textContent = texts.guessedLetters;
    document.title = texts.title;
    
    document.getElementById('entrada-letra').placeholder = texts.placeholder;
    document.getElementById('btn-chutar').textContent = texts.btnGuess;
    document.getElementById('botao-reiniciar').textContent = texts.btnRestart;
}

document.addEventListener('DOMContentLoaded', function() {
    // Configura eventos
    document.getElementById('entrada-letra').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            chutarLetra();
        }
    });

    iniciarJogo();
    updateUITexts();
});