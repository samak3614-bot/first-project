let productsInCart = localStorage.getItem("productsInCart")
let allProducts = document.querySelector(".products")
let favoritesDiv = document.querySelector(".favorites");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
drawFavorites(favorites);

if(productsInCart){
    let item = JSON.parse(productsInCart)
    drawCartProducts(item);
}

function drawCartProducts(products){

        let finalPrice = 0;

        let x = products.map((item) => {
            let quantity = item.quantity || 1;

            let price = parseFloat(item.price.replace("$", ""));

            let totalPrice = price * quantity;

            finalPrice += totalPrice; 

            return `<div class ="carts-div">
                        <div class="carts-img">
                            <img src="${item.img}">
                        </div>
                        <div class ="carts-desc">
                            <h2>${item.title}</h2>
                            <p>price: ${totalPrice}</p>
                            <p>categoty: ${item.category}</p>
                            <div class="adding">
                                <i class="fa-solid fa-minus" onclick="decrease(${item.id})"></i>
                                <span>${item.quantity || 1}</span>
                                <i class="fa-solid fa-plus" onclick="increase(${item.id})"></i>
                            </div>
                        </div>
                        <div class="product-item-action">
                            <button class="remove" onClick ="remove(${item.id})" >Remove from cart</button>
                        </div>
                    </div>
                `
    })
    allProducts.innerHTML = x.join("");
    allProducts.innerHTML += `<div class="total-price">
                                <p>Total Price: $${finalPrice}</p>
                                <div></div>
                            </div>` 
}

function increase(id) {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    let item = productsInCart.find(item => item.id === id);

    if (item) {
        item.quantity = (item.quantity || 1) + 1;
    }

    localStorage.setItem("productsInCart",JSON.stringify(productsInCart));

    drawCartProducts(productsInCart);
}


function decrease(id) {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    let item = productsInCart.find(item => item.id === id);

    if (item && item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("productsInCart",JSON.stringify(productsInCart));
    
    drawCartProducts(productsInCart);
}

function remove(id) {
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    productsInCart = productsInCart.filter(item => item.id !== id);

    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

    drawCartProducts(productsInCart);
}

function drawFavorites(products) {

    let y = products.map((item) => {

        return `
            <div class="fav-div">
                <img src="${item.img}">
                <div class="fav-desc">
                    <h2>${item.title}</h2>
                    <p>category: ${item.category}</p>
                    <i class="fa-solid fa-heart" onclick="removeFavorite(${item.id})"></i>
                </div>
            </div>
        `;
    });

    favoritesDiv.innerHTML = y.join("");
}

function removeFavorite(id) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(item => item.id !== id);

    localStorage.setItem("favorites",JSON.stringify(favorites));

    drawFavorites(favorites);
}