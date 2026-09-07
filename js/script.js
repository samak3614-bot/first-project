let userInfo = document.querySelector("#user-info")

let userData = document.querySelector("#user")

let link = document.querySelector("#link")

if (localStorage.getItem("firstname")){
    link.remove()
    userInfo.style.display = "flex"
    userData.innerHTML = localStorage.getItem("firstname")
}

let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 500)
})

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let allProducts = document.querySelector(".products")
let products = [
    {
        id: 1,
        title: "Timeless Pearl",
        price: "$150",
        category: "jacket",
        img: "images/du.jfif"
    },
    {
        id: 2,
        title: "Antique Rose",
        price: "$80",
        category: "belt",
        img: "images/ov.jfif"
    },
    {
        id: 3,
        title: "Velvet Charm",
        price: "$75",
        category: "shoes",
        img: "images/fo.jfif"
    },
    {
        id: 4,
        title: "Old Soul",
        price: "$120",
        category: "pants",
        img: "images/hp.jfif"
    },
    {
        id: 5,
        title: "Ivory Heritage",
        price: "$180",
        category: "jacket",
        img: "images/ae.jfif"
    },
    {
        id: 6,
        title: "Royal Relic",
        price: "$200",
        category: "skirt",
        img: "images/kf.jfif"
    },
    {
        id: 7,
        title: "Classic Belle",
        price: "$75",
        category: "bag",
        img: "images/px.jfif"
    },
    {
        id: 8,
        title: "Retro Elegance",
        price: "$170",
        category: "watch",
        img: "images/lw.jfif"
    },
    {
        id: 9,
        title: "Pearl Dust",
        price: "$60",
        category: "shoes",
        img: "images/re.jfif"
    }
]

function addingItems(){
    let x = products.map((item) => {
        return `
            <div class="products-div">
                <img src="${item.img}">
                <div class="product-item">
                    <h2 class="product-title">${item.title}</h2>
                    <p class="product-text">price: ${item.price}</p>
                    <p class="product-text">categoty: ${item.category}</p>
                </div>
                <div class="product-btn">
                    <i class="fa-solid fa-heart" id ="heart-${item.id}" onClick ="addToFav(${item.id})" ></i>
                    <button id= "add-to-cart${item.id}" onClick ="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>`
    })
    allProducts.innerHTML += x.join("")
}

addingItems()

let cartsdiv = document.querySelector(".carts-products div")

let badge = document.querySelector(".badge")

let addedItem = localStorage.getItem("productsInCart")? JSON.parse(localStorage.getItem("productsInCart")): [];
 
function drawCart(){
    cartsdiv.innerHTML = "";
    let totalItems = 0;
    addedItem.forEach(item => {
        let quantity = item.quantity || 1;

        let price = parseFloat(item.price.replace("$", ""));

        let totalPrice = price * quantity;

        cartsdiv.innerHTML += `
                            <div class ="cart-item">
                                <ul>
                                    <li>${item.title}</li>
                                    <li>price: ${totalPrice}</li>
                                </ul>
                                 <div class="adding">
                                    <i class="fa-solid fa-minus" onclick="decrease(${item.id})"></i>
                                    <span>${quantity || 1}</span>
                                    <i class="fa-solid fa-plus" onclick="increase(${item.id})"></i>
                                </div>
                            </div>`;
                                
                                totalItems += quantity || 1;

                            });

    badge.innerHTML = totalItems;

    if (totalItems > 0) {
        badge.style.display = "block";
    } else {
        badge.style.display = "none";
    }
    
}

drawCart();

if (localStorage.getItem ("firstname")){
    function addToCart(id){

    let choosenItem = products.find((item) => item.id === id);

    let existingItem = addedItem.find((item) => item.id === id);

    let addingToCart = document.querySelector(`#add-to-cart${id}`);

    if (existingItem) {

        addedItem = addedItem.filter((item) => item.id !== id);

        addingToCart.style.backgroundColor = "";
        addingToCart.innerHTML = "Add to Cart";

    } else {
        addedItem.push({...choosenItem, quantity: 1});

        addingToCart.style.backgroundColor = "rgba(161, 34, 34, 0.75)";
        addingToCart.innerHTML = "Remove from Cart";

    }
    localStorage.setItem("productsInCart", JSON.stringify(addedItem))
    
    drawCart();

    }
}else{
    window.location = "login.html";
}

function increase(id) {
    let item = addedItem.find((item) => item.id === id);

    item.quantity++;
    localStorage.setItem("productsInCart",JSON.stringify(addedItem));

    drawCart();
}

function decrease(id) {
    let item = addedItem.find((item) => item.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("productsInCart",JSON.stringify(addedItem));

    drawCart();
}

function addToFav(id) {

    let chosenItem = products.find(item => item.id === id);
    let existingItem = favorites.find(item => item.id === id);

    let heart = document.querySelector(`#heart-${id}`);

    if (existingItem) {

        favorites = favorites.filter(item => item.id !== id);
        heart.style.color = "";
    } else {

        favorites.push({...chosenItem, quantity: 1});
        heart.style.color = "rgb(146, 21, 27)";
    }

    localStorage.setItem("favorites",JSON.stringify(favorites));
}

let cartsProducts = document.querySelector(".carts-products")
let shoppingIcon = document.querySelector(".shopping-cart")
shoppingIcon.addEventListener("click" , opencart)

function opencart(){
    if (cartsdiv.innerHTML != ""){
        if(cartsProducts.style.display == "block"){
            cartsProducts.style.display = "none"
        }else{
            cartsProducts.style.display = "block"
        }
    }
}

let searchInput = document.querySelector("#product-search");

searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(function (item) {
        return item.title.toLowerCase().includes(searchValue);
    });

    allProducts.innerHTML = "";

    filteredProducts.forEach(function (item) {
        allProducts.innerHTML += `
            <div class="products-div">
                <img src="${item.img}">
                <div class="product-item">
                    <h2 class="product-title">${item.title}</h2>
                    <p class="product-text">price: ${item.price}</p>
                    <p class="product-text">categoty: ${item.category}</p>
                </div>
                <div class="product-btn">
                    <i class="fa-solid fa-heart" id ="heart-${item.id}" onClick ="addToFav(${item.id})" ></i>
                    <button id= "add-to-cart${item.id}" onClick ="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>`;
    });
});