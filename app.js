function manejarEnvioFormulario() {
    let importe = document.forms['formularioTransaccion']['importe'].value;
    let origen = document.forms['formularioTransaccion']['origen'].value;
    let fecha = document.forms['formularioTransaccion']['fecha'].value + "Z";

    let resultado = validarTransaccion(importe,origen,fecha);

    let importeNumero = Number(importe);

    if (importeNumero == 0){
        alert("El importe no puede ser 0.");
        return;
    } if (importeNumero < 0){
        alert("El importe no puede ser negativo.");
        return;
    }

    if (!resultado.valido){
        resultado.errores.forEach(error => {
            alert(error);
        });
        return;
    } else {
        crearTransaccion(importe,origen,new Date(fecha));
        ordenarTransacciones(transaccionesGlobal);
        mostrarTransacciones();
    };
};

function crearTransaccion(importe,origen,fecha) {
    const transaccion = {
        id: siguienteId,
        importe: importe,
        origen: origen,
        fecha: fecha,
    }

    transaccionesGlobal.push(transaccion);

    siguienteId++;

    localStorage.setItem("Transacciones", JSON.stringify(transaccionesGlobal));
    return transaccion;
};

function mostrarTransacciones() {
    let contenedorTransacciones = document.getElementById("contenedorTransacciones");
    contenedorTransacciones.innerHTML = "";

    transaccionesGlobal.forEach(transaccion => {
        let parrafoTransacciones = document.createElement("p");

        let fechaFormateada = new Date(transaccion.fecha).toLocaleDateString();

        let texto = `${fechaFormateada} | ${transaccion.origen} | ${transaccion.importe}€`;

        parrafoTransacciones.textContent = texto;

        contenedorTransacciones.appendChild(parrafoTransacciones);
    });
}

function validarTransaccion(importe,origen,fecha) {
    let errores = [];
    let valido;

    if (importe == "") {
        errores.push("Error en el importe.");
    } if (origen == "") {
        errores.push("Error en el origen.");
    } if (fecha == "") {
        errores.push("Error en la fecha.");
    }

    if (errores.length > 0) {
        valido = false;
    } else {
        valido = true;
    };

    const check = {
        valido: valido,
        errores: errores,
    };

    return check;
}

function leerTransacciones() {
    let transacciones = localStorage.getItem("Transacciones");
    if (transacciones) {
        transacciones = JSON.parse(transacciones);
        return transacciones;
    } else {
        return;
    };
};

function ordenarTransacciones(arrayTransacciones) {
    arrayTransacciones.sort(function (a,b) {
        return b.fecha - a.fecha;
    });
};

//=======================================================================

var transaccionesGlobal;
var siguienteId;

var datosGuardados = JSON.parse(localStorage.getItem("Transacciones"));

if (datosGuardados){
    transaccionesGlobal = datosGuardados;
} else {
    transaccionesGlobal = [];
};

var maxId = 0;

transaccionesGlobal.forEach(transaccion => {
    if (transaccion.id > maxId) {
        maxId = transaccion.id;
    }
});

siguienteId = maxId + 1;

ordenarTransacciones(transaccionesGlobal);
mostrarTransacciones();