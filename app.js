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

// Renderizado
function mostrarTransacciones() {
    let cuerpoTransacciones = document.getElementById("cuerpoTransacciones");
    cuerpoTransacciones.innerHTML = "";

    transaccionesGlobal.forEach(transaccion => {
        let nuevaFila = document.createElement("tr");
        nuevaFila.addEventListener("click", () => seleccionar(nuevaFila));

        let datosFecha = document.createElement("td");
        let datosOrigen = document.createElement("td");
        let datosImporte = document.createElement("td");

        let fechaFormateada = new Date(transaccion.fecha).toLocaleDateString();
        let origen = transaccion.origen;
        let importe = transaccion.importe;

        datosFecha.textContent = fechaFormateada;
        datosOrigen.textContent = origen;
        datosImporte.textContent = importe + "€";

        nuevaFila.appendChild(datosFecha);
        nuevaFila.appendChild(datosOrigen);
        nuevaFila.appendChild(datosImporte);

        cuerpoTransacciones.appendChild(nuevaFila);
    });
}

function seleccionar(fila) {
    fila.classList.toggle("seleccionado");
}

//=======================================================================

var transaccionesGlobal;
var siguienteId;

var datosGuardados = JSON.parse(localStorage.getItem("Transacciones"));

if (datosGuardados){
    datosGuardados.forEach(transaccion => {
    transaccion.fecha = new Date(transaccion.fecha);
    });

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