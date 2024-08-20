const token = "8048|Y1VBbwQM0y4tQv5rjHgCoRr9aYPHUS6b";
const valor = document.getElementById('txtNumero');
const btn = document.getElementById('btnProcessar');
const resultado = document.getElementById('resultado');

btn.addEventListener('click', function () {
    if (valor.value) {
        const url = `https://api.invertexto.com/v1/number-to-words?token=${token}&number=${valor.value}&language=pt&currency=BRL`;

        fetch(url)
            .then(function (resposta) {
                if (resposta.ok) {
                    return resposta.json();
                }

                throw new Error("Erro ao fazer requisição para API");
            })
            .then(function (resposta) {
                resultado.classList.remove("d-none");
                resultado.innerHTML = resposta.text;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
});
