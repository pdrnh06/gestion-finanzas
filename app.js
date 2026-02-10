function validarTransaccion(importe, origen, fecha) {
    let errores = [];
    let valido;

    if (importe == "" || fecha == "") {
        errores.push("Error en el importe.")
    } if (origen == ""){
        errores.push("Error en el origen.")
    } if (fecha == "") {
        errores.push("Error en la fecha.")
    }

    if (errores.length > 0){
        valido = false;
    } else {
        valido = true
    }

    const check = {
        valido: valido,
        errores: errores,
    };

    return check;
}

function manejarEnvioFormulario() {
    let x = document.forms['formularioTransaccion']['importe'].value;
    let y = document.forms['formularioTransaccion']['origen'].value;
    let z = document.forms['formularioTransaccion']['fecha'].value;

    let esValida = validarTransaccion(x,y,z);

    let importeNumero = Number(x);

    if (x == null || importeNumero < 0){
        alert("El importe no puede ser 0 o negativo.")
        return;
    }

    if (!esValida){
        alert("Algún campo se encuentra vacío o tiene valores incorrectos.")
        return;
    }
}