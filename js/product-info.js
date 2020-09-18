var product = {};
var comentArray = [];
var currentProductArray=[];
var rating = 0;
const stars = document.querySelector(".ratings").children;

function showImagesGallery(array){

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    let carrouselItemHtml="";
    //Cargo imagenes del producto

    for(let i=0; i<array.images.length;i++){
        let imageSrc = array.images[i];
        if(i==0){
            carrouselItemHtml+= `
            <div class="carousel-item active">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>
        `
        }else{
            
        
        carrouselItemHtml+= `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>
        `
        }
        
    }

    htmlContentToAppend += `
    <div id="carouselExampleControls" class="carousel slide col-8" data-ride="carousel">
    <div class="carousel-inner">
    `+carrouselItemHtml+`
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
    </div>
    `
   document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

    //Cargo imagenes de productos relacionados

    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];
        for(let j=0; j<array.relatedProducts.length; j++){
            let imagRelated = array.relatedProducts[j];
            if(imagRelated==i){
                htmlContentToAppend2 += `
                <div id="relatedProduct" class="card" style="width: 18rem;">
                    <div class="card bg-light">
                        <img class="card-img-top" src="` + product.imgSrc + `" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">` + product.name + `</h4>
                            <a href="product-info.html" class="btn">Ver mas...</a>
                        </div>
                    </div>
                </div>
                `
            document.getElementById("relproductImagesGallery").innerHTML = htmlContentToAppend2;
            }
        }

        
    }
}




//Funcion para mostrar comentarios desde array

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
                <span>`+score+`</span>
                <p id="nombreUsuario">`+coment.user+`</p>
                <p>`+coment.description+`</p> 
                <p>`+`Publicado el `+coment.dateTime+`</p>                             
                </div>
                `                
                document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
    
}

//Funcion para dar puntuacion con estrellas 

function estrellas(){
    for(let i=0; i<stars.length; i++){
        stars[i].addEventListener("mouseover",function(){
            quitarEstrellas();
            agregarEstrellas(i);
        })
        stars[i].addEventListener("click",function(){
            if(document.getElementById("commentsTextArea").value==null){
                alert("Ingrese un comentario");                
            }
            rating=i+1;
            index=i;
            
        })
        
    }
    
    
}

//Funcion para quitar estrellas

function quitarEstrellas(){
    for(let j=0; j<stars.length; j++){
        stars[j].classList.remove("fa-star");
        stars[j].classList.add("fa-star-o");
    }
}

//Funcion para agregar estrellas

function agregarEstrellas(i){
    for(let j=0; j<=i; j++){
        stars[j].classList.remove("fa-star-o");
        stars[j].classList.add("fa-star");
    }
}

//Funcion para crear comentario nuevo y guardarlo

function nuevoComentario(puntuacion){
    let description=document.getElementById("commentsTextArea").value;
    let usuario = recuperarUsuario().usuario;
    let date = new Date();
    let formatDate= date.getFullYear()+ "-" + (date.getMonth() + 1) + "-" +date.getDate()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var comentariosNuevos={
        "score": puntuacion,
        "description": description,
        "user": usuario,
        "dateTime": formatDate
    }
    rating=0;
    comentArray.push(comentariosNuevos);
    showComents(comentArray);
    quitarEstrellas();
    
}

document.getElementById("boton-publicar").addEventListener("click", function(a){
    a.preventDefault();
    if(rating==0){
        alert("Debe asignar una puntuación");
    }else{
        if(document.getElementById("commentsTextArea").value==""){
            alert("Ingrese un comentario!");
        }else{
            nuevoComentario(rating);
            document.getElementById("commentsTextArea").value="";
    }
        }
        
    
    //showComents(comentArray);
});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    //Cargo JSON de productos
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray= resultObj.data;
        }
    });

    //Cargo JSON de product_info
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
            productCriteriaHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product);
        }
    });

    //Cargo JSON de comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentArray=resultObj.data;  
        }
        showComents(comentArray);
   
    });
    
    estrellas();
    
    
});






