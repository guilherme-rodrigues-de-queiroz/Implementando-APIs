const cep = document.querySelector('#txtCep');
const logra = document.querySelector('#txtLogradouro');
const num = document.querySelector('#txtNumero');
const bairro = document.querySelector('#txtBairro');
const cidade = document.querySelector('#txtCidade');
const estado = document.querySelector('#txtEstado');

cep.addEventListener("change", function () {
    const numeroCep = cep.value.replace(/\D/g, "");
    const url = `https://viacep.com.br/ws/${numeroCep}/json/`;
    const validaCep = /^[0-9]{8}$/;

    if (validaCep.test(numeroCep)) {
        fetch(url)
            .then(function (retorno) {
                if (retorno.ok) {
                    return retorno.json();
                }
            })
            .then(function (jsonRetorno) {
                logra.value = jsonRetorno.logradouro;
                num.value = jsonRetorno.ddd;
                bairro.value = jsonRetorno.bairro;
                cidade.value = jsonRetorno.localidade;
                estado.value = jsonRetorno.uf;
            }).catch(function (error) {
                console.log(error);
            })
    } else {
        logra.value = "";
        num.value = "";
        bairro.value = "";
        cidade.value = "";
        estado.value = "";
        cep.value = "";
        alert("O CEP é inválido!");
    }
});
