//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var subTotalCost=0;
var totalProduct=0;
var porcentajeComison=0.15;
let total=0;
let totalConEnvio=0;
var currentCartArray=[];
var currentCantArray=[];
var verificarModal=false;

function verificar(){
  var validado=true;
  if(verificarModal==false){
    alert("Debe seleccionar un metodo de pago");
    validado=false;
  }else{
    if(currentCartArray.length<1){
      alert("No tiene productos en su carrito");
      validado=false;
    }
  }
  return validado;
}

function verificarPayPal(){
  if(document.getElementById("input-paypal").value==""){
    alert("Debe completar todos los datos");
  }else{
    document.getElementById("paypal").innerHTML=`<div class="text-center"><h5>PAGO PROCESADO CON EXITO</h5></div>`;
    document.getElementById("title-pay-method").innerHTML=`<img src="https://i.imgur.com/yK7EDD1.png" width="80">`;
    verificarModal=true;
  }
  
}

function verificarTarjeta(){
    if(document.getElementById("input-card-name").value=="" || document.getElementById("input-card-number").value=="" || document.getElementById("input-card-date").value=="" || document.getElementById("input-card-cvv").value==""){
      alert("Debe completar todos los datos");
    }else{
      document.getElementById("card-div").innerHTML=`<div class="text-center"><h5>PAGO PROCESADO CON EXITO</h5></div>`;
      document.getElementById("title-pay-method").innerHTML=`<img src="https://i.imgur.com/sB4jftM.png" width="80">`;
      verificarModal=true;
    }
}


function deleteProduct(posicion){
  currentCartArray.splice(posicion,1);
  if(currentCantArray.length<1){
    calcTotal(null,0);
  }
  showCartList();
  updateCart();
  
}

function updateCart(){
  subTotal=document.getElementsByClassName("subTotal");
  var cantidad = document.getElementsByClassName("cartClass");
  total=0;
  for(let i=0; i<currentCartArray.length; i++){
    let product=currentCartArray[i];
    product.count=cantidad[i].value;
    let subTotal= calcSubtotal(product);
    document.getElementsByClassName("subTotal")[i].innerHTML=product.currency+" "+subTotal;
    calcTotal(product, subTotal);
    document.getElementById("total").innerHTML="UYU "+total;
  }
  /*
  showCartList();
  */

}

function calcEnvio(){
  let costoEnvio=(Math.round(total * porcentajeComison * 100) / 100);
  totalConEnvio=total+costoEnvio;
  document.getElementById("comissionText").innerHTML="$ "+costoEnvio;
  document.getElementById("totalCostText").innerHTML="$ "+totalConEnvio;
}

function calcSubtotal(product){
  return product.unitCost*product.count;
  }

function calcTotal(product,subTotal){
  if(product!=null){
    if(product.currency=="USD"){
      total=total+subTotal*40;
    }else{
      total=total+subTotal;
    }
    calcEnvio();
  }else{
    total=0;
    calcEnvio();
  }
  document.getElementById("productCostText").innerHTML="$ "+total;

}

function showCartList(){

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray[i];
        let subTotal= calcSubtotal(product);
        calcTotal(product,subTotal);
        htmlContentToAppend2 += `
        <tr>
        <td><img src="${product.src}" width="100px"</td>
        <td>${product.name}</td>
        <td>${product.currency} ${product.unitCost}</td>
        <td><input type="number" value="${product.count}" class="cartClass" min="1" max="1000" step="1"/></td>
        <td><p class="subTotal" >${product.currency} ${subTotal}</p></td>
        <td><button type="button" onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-xs"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
        </tr>`  
    }
    htmlContentToAppend += `
    <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Costo</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
        <th scope="col">Eliminar producto</th>
      </tr>
    </thead>
    <tbody>
    ` + htmlContentToAppend2 + `
    </tbody>
    <tfoot>
    <tr>
      <td>Total</td>
      <td></td>
      <td></td>
      <td></td>
      <td><p id="total">UYU ${total}</p></td>
      <td></td>
    </tr>
  </tfoot>
  </table>`       
  document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;

}

document.addEventListener("input", function(event){
  updateCart();
  /*
  if (event.target.className == "cardClass"){
      
      updateCart();
  }
  */
}, false);

document.getElementById("premiumradio").addEventListener("change", function(){
  porcentajeComison = 0.15;
  calcEnvio();
});

document.getElementById("expressradio").addEventListener("change", function(){
  porcentajeComison = 0.07;
  calcEnvio();
});



document.getElementById("standardradio").addEventListener("change", function(){
  porcentajeComison = 0.05;
  calcEnvio();
});

/*
document.getElementById("paypal-button").addEventListener("click", function() {
  document.getElementById("contidionsModal").style.display="none";
});
*/

/*document.getElementById("confirm-button").addEventListener("click", function(){
  
})

*/
document.getElementById("submit-button").addEventListener("submit",function(){
  verificar();
})

document.getElementById("confirm-btn-card").addEventListener("click",function(){
  verificarTarjeta();
})

document.getElementById("confirm-btn-paypal").addEventListener("click",function(){
  verificarPayPal();
})



document.addEventListener("DOMContentLoaded", function(e){
  
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          currentCartArray=resultObj.data.articles;
            showCartList();
        }
    });  
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
    var verificado = verificar();
    if(verificado==false){
      event.preventDefault();
      event.stopPropagation();
    }else{
      alert("Gracias por su compra");
    }
  }
  form.classList.add('was-validated');
  }, false);
  });
  }, false);
  })();