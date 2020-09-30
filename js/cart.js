//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function showCartList(currentCartArray){
    console.log("Entro en show cart");
    console.log("CurrentCartArray es "+currentCartArray.length);
    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray[i];
        let productCost=product.unitCost;
        if(productCost=="USD"){
            productCost=productCost*40;
        }
        htmlContentToAppend2 += `
    
        <tr>
        <td>` + product.src + `</td>
        <td>` + product.name + `</td>
        <td>` + product.currency + " " + productCost + `</td>
        <td><input name="cantidad" id="cantCart" type="text" value=` + product.count + ` style="width:30px"></td>
        <td>` + product.count*product.unitCost + `</td>
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



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showCartList(resultObj.data.articles);
        }
    });
});