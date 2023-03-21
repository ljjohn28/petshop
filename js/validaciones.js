

export function valida(input) {
    const tipoDeInput= input.dataset.tipo
    if(validadores[tipoDeInput])  {
        validadores[tipoDeInput](input)
    }
    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= ""

    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarmensajesDeError(tipoDeInput,input);
    }
};

const tipoDeErrores=  [
    "valueMissing",
    'typeMismatch',
    'patternMismatch',
    "customError",
    
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío "
    },
    email: {
        valueMissing: "Este campo no puede estar vacío ",
        typeMismatch: "El correo no es valido ",
    },

    password: {

        valueMissing: "Este campo no puede estar vacío ",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra mayuscula, un numero y no puede contener caracteres especiales ",
    },

    nacimiento: {
        
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El tipo requerido es (XXXX-XXX-XXX) (10 Números)"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La dirección debe contener enre 10 a 40 caracteres",

    },

    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La ciudad debe contener enre 10 a 40 caracteres",

    },
    estado:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El estado debe contener enre 3 a 40 caracteres",

    },

};




const validadores =  {
    nacimiento: input => validarNacimiento(input)
};

function mostrarmensajesDeError(tipoDeInput, input) {
    let mensaje= ""
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje= mensajesDeError[tipoDeInput][error]        ;
        }
    });
    return mensaje

    
};





function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if (! mayorDeEdad(fechaCliente)){
        mensaje= "Debes tener al menos 18 años de edad";
    }; 
    
    input.setCustomValidity(mensaje );
}
function mayorDeEdad(fecha) {
    const fechaActual=  new Date();
    const diferenciciaFechas=  new Date(
      
    fecha.getUTCFullYear()+18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate())  ;
    return ( diferenciciaFechas <= fechaActual );

}


