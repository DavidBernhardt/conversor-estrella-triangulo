// Ver prototipo de funcion al final

rTriangulo = [];
rEstrella = [];


const $botonCalcular = document.querySelector ("#boton-calcular");
$botonCalcular.onclick = function(){
    const $primerInputTriangulo = document.querySelector("#r-uno");
    if ($primerInputTriangulo.disabled === false){
        rTriangulo = obtenerValores (".resistores-triangulo");

        if (validar (rTriangulo)){
            const rEstrella = transformarAEstrella (rTriangulo);
            escribir (rEstrella, ".resistores-estrella");
        }
        return false;
    }

    const $primerInputEstrella = document.querySelector ("#r-A");
    if ($primerInputEstrella.disabled === false){
        rEstrella = obtenerValores (".resistores-estrella");

        if (validar (rEstrella)){
            const rTriangulo = transformarATriangulo (rEstrella);
            escribir (rTriangulo, ".resistores-triangulo");
        }
        return false;
    }

    return false;
}

const $botonEstrellaATriangulo = document.querySelector("#boton-estrella-a-triangulo");
$botonEstrellaATriangulo.onclick = function(){
    $inputResistoresEstrella = document.querySelectorAll (".resistores-estrella input");
    $inputResistoresEstrella.forEach(element => element.disabled = false);

    $inputResistoresTriangulo = document.querySelectorAll (".resistores-triangulo input");
    $inputResistoresTriangulo.forEach(element => element.disabled = true);

    document.querySelector("#diagrama").src = "img/estrella-triangulo.svg"

    return false;
}

const $botonTrianguloAEstrella = document.querySelector("#boton-triangulo-a-estrella");
$botonTrianguloAEstrella.onclick = function(){
    $inputResistoresTriangulo = document.querySelectorAll (".resistores-triangulo input");
    $inputResistoresTriangulo.forEach(element => element.disabled = false);

    $inputResistoresEstrella = document.querySelectorAll (".resistores-estrella input");
    $inputResistoresEstrella.forEach(element => element.disabled = true);

    document.querySelector("#diagrama").src = "img/triangulo-estrella.svg"

    return false;
}

function transformarAEstrella(rTriangulo){
    const rUno = rTriangulo[0];
    const rDos = rTriangulo[1];
    const rTres = rTriangulo[2];

    let rEstrella = [];
    let rA = (rDos*rTres) / (rUno+rDos+rTres);
    let rB = (rUno*rTres) / (rUno+rDos+rTres);
    let rC = (rUno*rDos) / (rUno+rDos+rTres);

    rEstrella.push(rA);
    rEstrella.push(rB);
    rEstrella.push(rC);
    return rEstrella;
}

function transformarATriangulo(rEstrella){
    const rA = rEstrella[0];
    const rB = rEstrella[1];
    const rC = rEstrella[2];

    let rTriangulo = [];
    let rUno = (rA*rB + rB*rC + rC*rA) /rA;
    let rDos = (rA*rB + rB*rC + rC*rA) /rB;
    let rTres = (rA*rB + rB*rC + rC*rA) /rC;

    rTriangulo.push(rUno);
    rTriangulo.push(rDos);
    rTriangulo.push(rTres);
    return rTriangulo;
}

function obtenerValores (clase){
    let arrayResistores = [];
    $inputResistores = document.querySelectorAll (`${clase} input`);
    for (let i=0; i<$inputResistores.length; i++){
        arrayResistores.push (Number($inputResistores[i].value));
    }
    return arrayResistores;
}

function validar (arrayResistores){
    for (let i=0; i<arrayResistores.length; i++){
        if (arrayResistores[i] <= 0){
            alert ("Por favor, ingrese valores de resistencia positivos.")
            return false;
        }
    }
    return true;
}

function escribir (arrayResistores, clase){
    let $inputResistores = document.querySelectorAll (`${clase} input`);
    for (let i=0; i<$inputResistores.length; i++){
        $inputResistores[i].value = arrayResistores[i];
    }
    return;
}
