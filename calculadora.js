// Calculadora "rápida": avalia direto o que o usuário digitou
document.getElementById('calcular').addEventListener('click', () => {
    const entrada = document.getElementById('expressao').value;
    document.getElementById('resultado').textContent = 'Resultado: ' + eval(entrada);
});
