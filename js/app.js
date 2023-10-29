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
            // Se houver um erro ao avaliar a expressão, exibe uma string vazia no visor de resposta.
            answerScreen.innerHTML = '';
        }
    }
}


// Função anexada a todos os botões.
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id === 'clear') {
            // Se o botão "Limpar" for clicado, redefine o valor do visor para uma string vazia.
            realTimeScreenValue = [''];
        } else if (btn.id === 'erase') {
            // Se o botão "Apagar" for clicado, remove o último elemento do valor do visor.
            realTimeScreenValue.pop();
        } else if (btn.id === 'evaluate') {
            // Se o botão "Avaliar" for clicado, defina o valor do visor como o resultado da expressão.
            realTimeScreenValue = [answerScreen.innerHTML];
        } else if (btn.id === 'porce') {
            // Se o botão de porcentagem for clicado
            // Obter o valor atual na tela e converter para um número, ou 0 se não for um número válido.
            let currentValue = parseFloat(realTimeScreenValue.join('')) || 0;
            // Calcular a porcentagem dividindo o valor atual por 100.
            let percentage = currentValue / 100;
            // Atualizar o valor no visor com a porcentagem calculada, convertendo-a de volta para uma string.
            realTimeScreenValue = [percentage.toString()];
        } else {
            // Se qualquer outro botão for clicado, adicione o valor do botão ao valor do visor.
            realTimeScreenValue.push(btn.value);
        }
        // Atualizar a interface do usuário com base no valor do visor após as operações.
        updateScreen();
    });
});
