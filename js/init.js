const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL2 = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
let unUsuario="";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//Guarda el usuario nuevo en el local storage
function guardarUsuario(unUsuario, unaContraseña, unPrimerNombre, unSegundoNombre, unPrimerApellido, unSegundoApellido, unMail, unTelefono){
  let usuario = {
    usuario: unUsuario,
    contraseña: unaContraseña,
    primerNombre: unPrimerNombre,
    segundoNombre: unSegundoNombre,
    primerApellido: unPrimerApellido,
    segundoApellido: unSegundoApellido,
    email: unMail,
    telefono: unTelefono
  }
  unUsuario=usuario;
  localStorage.clear();
  localStorage.setItem("usuarioGuardado", JSON.stringify(usuario));
  location.href = "index.html";

}

//Recupera el usuario guardado en el local storage
function recuperarUsuario(){
  let usuario = JSON.parse(localStorage.getItem("usuarioGuardado"));
  return usuario;
}


//Verifica si existe algun usuario guardado en el local storage
function existeUsuario(){ 
  if(recuperarUsuario()==null){
    location.href = "login.html";
  }
}

//Verifica los datos ingresados y llama a la funcion guardar
function login(){

  let unUsuario = document.getElementById("usuario").value;
  let unaContraseña = document.getElementById("contraseña").value;
  
  if(unUsuario.length>0 && unaContraseña.length>0){
    if(/^\s+|\s+$/.test(unaContraseña)) {
      alert("Introduzca una contraseña valida"); 
    }else{
      guardarUsuario(unUsuario,unaContraseña, "","","","","","");
    }
    
  }else{
    alert("Debe completar todos los campos");
  }
  
}

//Carga datos JSON desde url
var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener("DOMContentLoaded", function(e){
  let usuario = recuperarUsuario();
  document.getElementById("dropdownMenuButton").innerHTML=("Bienvenido! "+usuario.usuario);
  
});