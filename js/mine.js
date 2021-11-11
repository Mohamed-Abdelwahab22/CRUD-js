

var pNameInput =   document.getElementById("pNameId");
var pPriceInput =   document.getElementById("pPriceId");
var pCatInput =   document.getElementById("pCategoryId");
var pDescInput =   document.getElementById("pDescriptionId");
var mainButton = document.getElementById("mainButton");

var allProducts = [];

if(localStorage.getItem("item") != null) {

    allProducts = JSON.parse(localStorage.getItem("item"))

    displayProducts()

}

function addProduct(){

    var pNameValue = pNameInput.value;
    var pPriceValue = pPriceInput.value;
    var pCatValue = pCatInput.value;
    var pDescValue = pDescInput.value;

    product = {
        name : pNameValue ,
        price : pPriceValue ,
        Category : pCatValue ,
        Description : pDescValue
    }
    
    allProducts.push(product);

    localStorage.setItem("item" , JSON.stringify(allProducts))

    displayProducts()

    clearInputs()
   
}

function clearInputs(){

    pNameInput.value = ""; 
    pPriceInput.value = "";
    pCatInput.value = "";
    pDescInput.value = "";

}

function displayProducts() {

    hasala = ``;

    for(var i = 0 ; i < allProducts.length ; i++){

        hasala += 

        `<tr>
            <td> `+ i + `</td>
            <td> ` +  allProducts[i].name + `</td>
            <td> ` +  allProducts[i].price + `</td>
            <td> ` +  allProducts[i].Category + `</td>
            <td> ` +  allProducts[i].Description + `</td>
            <td><buuton onclick="updateProducts(`+ i +`)" class="btn btn-outline-warning">Update</button></td>
            <td> <button onclick="deleteProuduct(`+ i +`)" class="btn btn-outline-danger">Delete</buuton> </td>
        </tr>`

    }

    document.getElementById("tBody").innerHTML = hasala;
}

function deleteProuduct(proIndex){

    allProducts.splice(proIndex , 1)

    displayProducts()

    localStorage.setItem("item" , JSON.stringify(allProducts));
    

}

function searchProduct(userWord){

    var hasala = ``;

    for(var i = 0 ; i < allProducts.length ; i++) {

        if(allProducts[i].name.toLowerCase().includes(userWord.toLowerCase())){

            hasala += 

            `<tr>
                <td> `+ i + `</td>
                <td> ` +  allProducts[i].name + `</td>
                <td> ` +  allProducts[i].price + `</td>
                <td> ` +  allProducts[i].Category + `</td>
                <td> ` +  allProducts[i].Description + `</td>
                <td> <buuton onclick="updateProducts(`+ i +`)" class="btn btn-outline-warning">Update</button> </td>
                <td> <button onclick="deleteProuduct(`+ i +`)" class="btn btn-outline-danger">Delete</buuton> </td>
            </tr>`

        }
        document.getElementById("tBody").innerHTML = hasala;
    }
}


function updateProducts(proIndex){

    pNameInput.value = allProducts[proIndex].name;
    pPriceInput.value = allProducts[proIndex].price;
    pCatInput.value = allProducts[proIndex].Category;
    pDescInput.value = allProducts[proIndex].Description;

    mainButton.innerHTML = "Update Product";
    mainButton.classList.add("btn-outline-warning")
    mainButton.setAttribute("onclick" , "updateCurrentPro(" + proIndex + ")")

}

function updateCurrentPro(proIndex){

    allProducts[proIndex].name = pNameInput.value
    allProducts[proIndex].price = pPriceInput.value
    allProducts[proIndex].Category = pCatInput.value
    allProducts[proIndex].Description = pDescInput.value

    displayProducts()

    clearInputs()

    localStorage.setItem("item" , JSON.stringify(allProducts))

    mainButton.innerHTML = "Add Product";
    mainButton.classList.remove("btn-outline-warning")
    mainButton.setAttribute("onclick" , "addProduct()")
}