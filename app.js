function validarTransaccion(importe,origen,fecha) {

    let errores = [];
    let valido;

    if (importe == "") {
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

function crearTransaccion(importe,origen,fecha) {

    const transaccion = {
        id: siguienteId,
        importe: importe,
        origen: origen,
        fecha: fecha,
    }

    transacciones.push(transaccion);

    siguienteId++;

    localStorage.setItem("Transacciones", JSON.stringify(transacciones));

    return transaccion;
}

function leerTransacciones() {
    let transacciones = localStorage.getItem("Transacciones");
    if (transacciones) {
        transacciones = console.log(JSON.parse(transacciones));
        return transacciones;
    } else {
        console.log("No hay ninguna transacción actualmente.")
        return;
    }
    
}

function manejarEnvioFormulario() {

    let importe = document.forms['formularioTransaccion']['importe'].value;
    let origen = document.forms['formularioTransaccion']['origen'].value;
    let fecha = document.forms['formularioTransaccion']['fecha'].value;

    let resultado = validarTransaccion(importe,origen,fecha);

    let importeNumero = Number(importe);

    if (importeNumero == 0){
        alert("El importe no puede ser 0.")
        return;
    } if (importeNumero < 0){
        alert("El importe no puede ser negativo.")
        return;
    }

    if (!resultado.valido){
        resultado.errores.forEach(error => {
            alert(error)
        });
        return;
    } else {
        crearTransaccion(importe,origen,fecha);
    }
}

var transacciones = [];
var siguienteId = 1;