//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function guardarDatosUsuario(){
    let primerNombre = document.getElementById("primer-nombre").value;
    let segundoNombre = document.getElementById("segundo-nombre").value;
    let primerApellido = document.getElementById("primer-apellido").value;
    let segundoApellido = document.getElementById("segundo-apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let usuario = recuperarUsuario();
    guardarUsuario(usuario.usuario,usuario.contraseña, primerNombre,segundoNombre,primerApellido,segundoApellido, email,telefono);
    mostrarDatos();
}

function mostrarDatos(){
    let unUsuario = recuperarUsuario();
    document.getElementById("primer-nombre").value=unUsuario.primerNombre;
    document.getElementById("segundo-nombre").value=unUsuario.segundoNombre;
    document.getElementById("primer-apellido").value=unUsuario.primerApellido;
    document.getElementById("segundo-apellido").value=unUsuario.segundoApellido;
    document.getElementById("email").value=unUsuario.email;
    document.getElementById("telefono").value=unUsuario.telefono;
    
    
}




document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = recuperarUsuario();
    if(usuario.primerNombre!=null){ 
        mostrarDatos();
    }
    
});


(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
      alert("Debe completar todos los datos");
      event.preventDefault();
      event.stopPropagation();
    } else{
      alert("Los datos se han actualizado");
      guardarDatosUsuario();
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();