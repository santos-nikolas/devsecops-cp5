// Calculadora segura: aceita apenas números e + - * /, sem eval()
function calcular(expressao) {
    const tokens = expressao.replace(/\s+/g, '').match(/\d+(\.\d+)?|[+\-*/]/g);
    if (!tokens || tokens.join('') !== expressao.replace(/\s+/g, '')) {
        throw new Error('Expressão inválida');
    }

    // Primeiro resolve * e /, depois + e -
    const pilha = [Number(tokens[0])];
    for (let i = 1; i < tokens.length; i += 2) {
        const operador = tokens[i];
        const numero = Number(tokens[i + 1]);
        if (Number.isNaN(numero)) throw new Error('Expressão inválida');
        if (operador === '*') pilha.push(pilha.pop() * numero);
        else if (operador === '/') pilha.push(pilha.pop() / numero);
        else if (operador === '-') pilha.push(-numero);
        else pilha.push(numero);
    }
    return pilha.reduce((a, b) => a + b, 0);
}

document.getElementById('calcular').addEventListener('click', () => {
    const entrada = document.getElementById('expressao').value;
    const saida = document.getElementById('resultado');
    try {
        saida.textContent = 'Resultado: ' + calcular(entrada);
    } catch (e) {
        saida.textContent = e.message;
    }
});
