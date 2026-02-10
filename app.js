function validarTransaccion() {
    
    let x = document.forms['formularioTransaccion']['importe'].value;
    if (x == "") {
        alert("El importe no puede estar en blanco.")
        return false;
    }

    let y = document.forms['formularioTransaccion']['origen'].value;
    if (y == "") {
        alert("El origen no puede estar en blanco.")
        return false;
    }

    let z = document.forms['formularioTransaccion']['fecha'].value;
    if (z == "") {
        alert("La fecha no puede estar en blanco.")
        return false;
    }
    }