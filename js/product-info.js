var product = {};
var comentArray = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

/*
                for(let  i=0; i<coment.score; i++){
                    console.log("Entre en for de score");
                    +`<span class="fa fa-star checked"></span>+`
                }
                */

function showComents(array){    
    let htmlContentToAppend="";
    for(let i = 0; i < array.length; i++){
        let coment = array[i]; 
        let score="";
        for(let i=1; i<=coment.score;i++){
        score+=`<span class="fa fa-star checked"></span>`
        }
        for(let i=coment.score+1; i<=5; i++){
        score+=`<span class="fa fa-star" id="starsUnchecked"></span>`
        }          
                htmlContentToAppend += `
                <hr class="my-3">
                <div >
                <spam>`+score+`</spam>
                <p id="nombreUsuario">`+coment.user+`</p>
                <p>`+coment.description+`</p> 
                <p>`+`Publicado el `+coment.dateTime+`</p>                             
                </div>
                `                
                document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentArray=resultObj.data;
           
        }
        showComents(comentArray);
   
    });
});

