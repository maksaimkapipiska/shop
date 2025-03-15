// data
const products = [
    {
        id: 1,
        name: "Молоко",
        price: 4,
        img: "https://cdn-icons-png.flaticon.com/512/112/112431.png"
    },
    {
        id: 2,
        name: "Сыр",
        price: 3,
        img: "https://cdn-icons-png.flaticon.com/512/819/819878.png"
    },
    {
        id: 3,
        name: "Газировка",
        price: 1,
        img: "https://cdn-icons-png.flaticon.com/512/629/629183.png"
    }
];
let cart = [];

// DOM elements
const cartDropdown = document.getElementById("cart");
const productsElement = document.getElementById("products");
const cartCounter = document.getElementById("cartCounter");

// functions

function renderProductList() { // декларируем функцию
    for (const product of products) { //перебирает элементы массива products
        productsElement.innerHTML = `${productsElement.innerHTML}
    <div class="col-md-3">
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="price">${product.price}$</p>
          <button type="button" class="btn btn-success" id="product-buy-${product.id}">Купить</button>
        </div>
      </div>
    </div>`;
    }
}


function renderCartItems() { // декларируем функцию
    cartDropdown.innerHTML = "";
    for (const item of cart) { // перебирает элементы массива корзины
        cartDropdown.innerHTML += `
         <li><button type="button" class="btn btn-success" id="card-delete-${item.id}">${item.name}</button></li>`;
        cartCounter.textContent = cart.length;
    }
}
function addEventClickToBuyButtons() { // декларируем функцию
    for (const product of products) { // перебирает элементы массива products
        const buyButtonElement = document.getElementById(`product-buy-${product.id}`); // получаем кнопку купить из id
        buyButtonElement.addEventListener("click", function () { // оброботчик event click
            // let isInCart = false; // отслежование находится ли товар в корзине
            // for (const item of cart) {
            //     if (item.id === product.id) {
            //         isInCart = true;
            //     }
            // }
            // if (isInCart === false) {
                cart.push(product);
            renderCartItems();
            addEventClickToCartButtons();
            });
            console.log("cart: ", cart)



    }
}
function addEventClickToCartButtons() { // декларируем функцию
    for (const item of cart) { // перебирает элементы массива корзины
        const cardDeleteButtonElement = document.getElementById(`card-delete-${item.id}`);
        cardDeleteButtonElement.addEventListener("click", function () { // навешиваем event на кнопку
            const newCart = [];
            for (const index in cart) {
                if (cart[index].id !== -1) {
                    newCart.push(cart[index]);
                }
            }
            cart=newCart;
            renderCartItems();
            addEventClickToCartButtons();
            cartCounter.textContent = cart.length;
        })
    }
}
// functions call
renderProductList();
renderCartItems();
addEventClickToBuyButtons();
addEventClickToCartButtons();


// document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("buy-button")) return;
//     const productId = product.find(product => product.id === e.target.dataset.id);
//     cart.push(productId);
// });


