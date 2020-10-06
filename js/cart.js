//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var subTotalCost=0;
var totalProduct=0;
var currentCartArray=[];
var currentCantArray=[];



function subTotal(){
  let cantProduct=document.getElementById("idCantCart");
  for(let i=0; i<currentCartArray.length; i++){
    
  }
}

function updateCart(){
  
  var cantidad = document.getElementsByClassName("cartClass");
  for(let i=0; i<currentCartArray.length; i++){
    let product=currentCartArray[i];
    product.count=cantidad[i].value;
  }
  showCartList();

  
}



function showCartList(){

    console.log("Entro en show cart");
    console.log("CurrentCartArray es "+currentCartArray.length);
    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    let total=0;
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray[i];
        let subTotal= product.unitCost*product.count;
        if(product.currency=="USD"){
          total=total+subTotal*40;
        }else{
          total=total+subTotal;
        }
        htmlContentToAppend2 += `
        <tr>
        <td><img src="${product.src}" width="100px"</td>
        <td>${product.name}</td>
        <td>${product.currency} ${product.unitCost}</td>
        <td><input name="cantidad" class="cartClass" type="number" value= "${product.count}" style="width:60px" min="1" max="99" ></td>
        <td>${product.currency} ${subTotal}</p></td>
        </tr>
              ` 
        
        
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
      <td>UYU ${total}</td>
    </tr>
  </tfoot>
  </table>
              `       
              document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray[i];
        htmlContentToAppend += `
    
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
              ` 
        
    }
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