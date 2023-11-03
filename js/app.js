//variáveis.
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');
let porcent = document.querySelector('#porce');

// Visor da calculadora.
let realTimeScreenValue = [];

// Limpar.
clearbtn.addEventListener("click", () => {
    realTimeScreenValue = [''];
    updateScreen();
});

// Função para atualizar os visores.
function updateScreen() {
    // Atualiza o visor principal (currentInput) com o conteúdo do array realTimeScreenValue.
    currentInput.innerHTML = realTimeScreenValue.join('');

    // Verifica se o visor está vazio ou contém apenas uma string vazia.
    if (realTimeScreenValue.length === 1 && realTimeScreenValue[0] === '') {
        // Se estiver vazio, exibe '0' no visor de resposta (answerScreen).
        answerScreen.innerHTML = '0';
    } else {
        try {
            // Tenta avaliar a expressão no visor usando a função eval e exibe o resultado em answerScreen.
            answerScreen.innerHTML = eval(realTimeScreenValue.join(''));
        } catch (error) {
            // Se houver um erro ao avaliar a expressão, exibe uma mensagem de erro.
            answerScreen.innerHTML = 'Erro de expressão';
        }
    }
}

// Função anexada a todos os botões.
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id === 'clear') {
            // Se o botão "clear" for clicado, redefine o valor do visor para uma string vazia.
            realTimeScreenValue = [''];
        } else if (btn.id === 'erase') {
            // Se o botão "erase" for clicado, remove o último elemento do valor do visor.
            realTimeScreenValue.pop();
        } else if (btn.id === 'evaluate') {
            // Se o botão "evaluate" for clicado, defina o valor do visor como o resultado da expressão.
            realTimeScreenValue = [answerScreen.innerHTML];
        }else {
            // Se qualquer outro botão for clicado, adicione o valor do botão ao valor do visor.
            realTimeScreenValue.push(btn.value);
        }
        // Atualizar a interface do usuário com base no valor do visor após as operações.
        updateScreen();
    });
});

// O usuário pode utiizar o mouse ou teclado para utilizar a calculadora.
// Adicionei um evento de escuta ao documento para capturar as teclas pressionadas pelo usuário.
document.addEventListener("keydown", (event) => {
    // Mapeie as teclas do teclado aos valores dos botões da calculadora.
    const keyMappings = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        ",": ".",
        "Enter": "evaluate",  // Tecla Enter para avaliar a expressão.
        "Backspace": "erase"  // Tecla Backspace para apagar.
    };

    // Obtenho o valor correspondente à tecla pressionada no mapa de teclas.
    const key = keyMappings[event.key];

    // Se a tecla pressionada estiver mapeada a um botão da calculadora, simule o clique no botão correspondente.
    if (key) {
        // Se a tecla pressionada for Enter, dispare o evento de clique no botão "evaluate".
        if (key === "evaluate") {
            evaluate.click();
        }
        // Se a tecla pressionada for Backspace, dispare o evento de clique no botão "erase".
        else if (key === "erase") {
            erasebtn.click();
        }
        // Encontre o botão correspondente ao valor da tecla pressionada.
        else {
            // Se o botão foi encontrado, dispare o evento de clique no botão.
            const button = Array.from(buttons).find(btn => btn.value === key);
            if (button) {
                button.click();
            }
        }
    }
});
