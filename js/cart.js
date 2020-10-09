//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var subTotalCost=0;
var totalProduct=0;
let total=0;
var currentCartArray=[];
var currentCantArray=[];


function updateCart(){
  subTotal=document.getElementsByClassName("subTotal");
  var cantidad = document.getElementsByClassName("cartClass");
  total=0;
  for(let i=0; i<currentCartArray.length; i++){
    let product=currentCartArray[i];
    product.count=cantidad[i].value;
    let subTotal= product.unitCost*product.count;
    document.getElementsByClassName("subTotal")[i].innerHTML=product.currency+" "+subTotal;
    calcTotal(product, subTotal);
    document.getElementById("total").innerHTML="UYU "+total;
  }
  /*
  showCartList();
  */

}


function calcTotal(product,subTotal){
  if(product.currency=="USD"){
    total=total+subTotal*40;
  }else{
    total=total+subTotal;
  }
}

function showCartList(){

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray[i];
        let subTotal= product.unitCost*product.count;
        calcTotal(product,subTotal);
        htmlContentToAppend2 += `
        <tr>
        <td><img src="${product.src}" width="100px"</td>
        <td>${product.name}</td>
        <td>${product.currency} ${product.unitCost}</td>
        <td><input type="number" value="${product.count}" class="cartClass" min="0" max="1000" step="1"/></td>
        <td><p class="subTotal" >${product.currency} ${subTotal}</p></td>
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


document.addEventListener("DOMContentLoaded", function(e){
  
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          currentCartArray=resultObj.data.articles;
            showCartList();
        }
    });   
});