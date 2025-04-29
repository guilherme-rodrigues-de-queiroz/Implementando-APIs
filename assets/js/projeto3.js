// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

document.addEventListener('DOMContentLoaded', function(){
    const selectEstados = document.querySelector("#ddlEstados");
    const estados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

    fetch(estados)
    .then(function(resposta){
        if(resposta.ok){
            return resposta.json();
        }

        throw new Error("Erro ao processar requisição de estados.");
    })
    .then(function(jsonResposta){
        jsonResposta.forEach(function(estado){
            const optionEstado = document.createElement("option");
            optionEstado.value = estado.id;
            optionEstado.innerHTML = `${estado.nome} (${estado.sigla})`;
            selectEstados.appendChild(optionEstado);
        })
    })
    .catch(function(error){
        console.log(error);
    })

    selectEstados.addEventListener('change', function(){
        const selectCidades = document.querySelector("#ddlCidades");
        selectCidades.innerHTML = "<option> === Selecione a Cidade === </option>";

        const idEstado = selectEstados.value;
        const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`;

        fetch(urlCidades)
        .then(function(resposta){
            if(resposta.ok){
                return resposta.json();
            }

            throw new Error("Erro ao processar a requisição de cidades");
        })
        .then(function(jsonResposta){
            jsonResposta.forEach(function(urlCidades){
                const optionCidades = document.createElement("option");
                optionCidades.value = urlCidades.id;
                optionCidades.innerHTML = `${urlCidades.nome}`;
                selectCidades.appendChild(optionCidades);
            })
        })
        .catch(function(error){
            console.log(error);
        })
    })
});
