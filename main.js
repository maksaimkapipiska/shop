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
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="carrtimg.png" class="rounded me-2" alt="...">
                <strong class="me-auto"></strong>
                <small>Только что</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Товар добавлен в корзину!
            </div>
        </div>
    </div>
`;
    }
}


function renderCartItems() { // декларируем функцию
    cartDropdown.innerHTML = "";
    for (const item of cart) { // перебирает элементы массива корзины
        cartDropdown.innerHTML += `
         <li><button type="button" class="btn btn-success" id="card-delete-${item.id}">${item.name}</button>
         <spam>${item.quantity}</spam>
         </li>`;
    }
    cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // TODO: улучшить этот момент чтобы учитовать количество всех элементов корзины
}
function addEventClickToBuyButtons() { // декларируем функцию
    for (const product of products) { // перебирает элементы массива products
        const buyButtonElement = document.getElementById(`product-buy-${product.id}`); // получаем кнопку купить из id
        buyButtonElement.addEventListener("click", function () { // оброботчик event click
            let indexProductInCart = -1; // отслежование находится ли товар в корзине
            for (const index in cart) {
                if (cart[index].id === product.id) {
                    indexProductInCart = index;
                }
            }
            if (indexProductInCart === -1) {
                cart.push({...product, quantity: 1});
            } else {
             cart[indexProductInCart].quantity = cart[indexProductInCart].quantity + 1;

            }
            renderCartItems();
            addEventClickToCartButtons();

            const toastElement = document.getElementById("liveToast");
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        });

            console.log("cart: ", cart)



    }
}
function addEventClickToCartButtons() { // декларируем функцию
    for (const item of cart) { // перебирает элементы массива корзины
        const cardDeleteButtonElement = document.getElementById(`card-delete-${item.id}`);
        cardDeleteButtonElement.addEventListener("click", function () { // навешиваем event на кнопку TODO: улучшить удаление из корзины с проверкой количества продукта
            const index = cart.findIndex(cartItem => cartItem.id === item.id);
            if (index !== -1) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--; // Уменьшаем количество
                } else {
                    cart.splice(index, 1); // Удаляем полностью, если 1 шт.
                }
            }
            renderCartItems();
            addEventClickToCartButtons(); // Заново вешаем обработчики
        });
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


