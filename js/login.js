//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validate(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    location.href = "index.html";
    
  }

document.addEventListener("DOMContentLoaded", function(e){
    
    //login();
    
    //validate();
});
