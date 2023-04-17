export function validar(input) {
    const tipoImput = input.dataset.tipo;

    if (validadores[tipoImput]) {
        validadores[tipoImput](input);
    };


    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");   
        input.parentElement.querySelector(".input-message-error").innerHTML= ""; 
    }else{
        input.parentElement.classList.add("input-container--invalid"); 
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoImput, input); 
    };
};

const validadores =  {
    nacimiento:(input) => validarNacimiento(input),
};

const tipoDeErrores = [
    'valueMissing',
    'typeMisMatch',
    'patrerMisMatch',
    'customError'
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío."
    }, 
    email :{
        valueMissing: "El campo Correo no puede estar vacío.",
        typeMisMatch: "El correo no es válido"
    },

    password :{
        valueMissing: "El campo Contraseña no puede estar vacío.",
        patrerMisMatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },

    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad"
    },

    numero: {
        valueMissing: "El campo Número de telefono no puede estar vacío.",
        patrerMisMatch: "El formato requerido es de 10 números"
    },

    direccion: {
        valueMissing: "Elste campo no puede estar vacío.",
        patrerMisMatch: "El campo debe contener entre 10 a 40 carácteres"
    }, 

    ciudad: {
        valueMissing: "Elste campo no puede estar vacío.",
        patrerMisMatch: "El campo debe contener entre 10 a 40 carácteres"
    },
    
    estado: {
        valueMissing: "Elste campo no puede estar vacío.",
        patrerMisMatch: "El campo debe contener entre 10 a 40 carácteres"
    } 



}

function mostrarMensajeDeError(tipoDeImput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeImput][error];
        }
    })

    return mensaje;

};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }
