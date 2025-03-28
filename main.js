// search bar, счетчик предметов в корзине, название товара в тосте,
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
let filteredProducts = [...products]
// DOM elements
const cartDropdown = document.getElementById("cart");
const productsElement = document.getElementById("products");
const cartCounter = document.getElementById("cartCounter");
const cashCounter = document.getElementById("cashCounter");
const searchInput = document.querySelector("#search-form input");


// functions
function updateCartCounter() {
    const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartItems > 0) {
        cartCounter.textContent = cartItems;
    } else {
        cartCounter.textContent = "0";
    }
}
function filterSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // переоброзование текста в нижний регистр, trim - удаление пробелов


    if (searchTerm === "") {
        renderProductList(products); // показываем все товары при пустом поиске
        return;
    }

    for (const product of products) {
        if (product.name.toLowerCase().includes(searchTerm)) { // поиск имя товара
            filteredProducts.push(product);
        }
    }

    renderProductList(filteredProducts);
}
searchInput.addEventListener("input", filterSearch);

function renderProductList(filteredList = products) { // декларируем функцию
    productsElement.innerHTML = "";
    for (const product of filteredList) { //перебирает элементы массива products
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

    
`;
    }
    addEventClickToBuyButtons()
    updateCartCounter()

}




function renderCartItems() {
    cartDropdown.innerHTML = ""; // Очищаем корзину перед рендерингом
    let totalPrice = 0;
    for (const item of cart) { // Перебираем корзину
        const buttonId = `cart-buy-${item.id}`; // Определяем внутри цикла!
        totalPrice += item.price * item.quantity;
        cartDropdown.innerHTML += ` 
            <li>
                <a type="text" class="btn btn-success">${item.name}</a>
                <button class="btn btn-success" id="${buttonId}">+</button>
                <button type="button" class="btn btn-danger" id="card-delete-${item.id}">-</button>
                <span>${item.quantity}</span>
            </li>
        `;

        if (totalPrice > 0) {
            cashCounter.textContent = `${totalPrice}$`;
        }
        else  {
            cashCounter.textContent = "0";
        }

    }

    addEventClickToCart(); // Вешаем обработчики
    addEventClickToCartButtons();
    updateCartCounter()
}



function addEventClickToCart() {


    document.querySelectorAll(".btn-success[id^='cart-buy-']").forEach(button => {
        button.addEventListener("click", function () {
            event.stopImmediatePropagation();
            const itemId = parseInt(button.id.replace("cart-buy-", "")); // Получаем id товара


            const index = cart.findIndex(cartItem => cartItem.id === itemId);
            if (index !== -1) {
                cart[index].quantity += 1; // Увеличиваем количество
                renderCartItems(); // Обновляем корзину
                updateCartCounter()
            }
        });
    });
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
            updateCartCounter()


            const toastElement = document.getElementById("liveToast");
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            const toastMessage = document.getElementById("toastBody");
            toastMessage.textContent = `${product.name} добавлен в корзину!`;
        });


    }
}

function addEventClickToCartButtons() {
    // Перебираем все кнопки удаления в корзине
    document.querySelectorAll(".btn-danger[id^='card-delete-']").forEach(button => {
        button.addEventListener("click", function () {
            event.stopImmediatePropagation();
            const itemId = parseInt(button.id.replace("card-delete-", "")); // Получаем id товара для удаления

            const index = cart.findIndex(cartItem => cartItem.id === itemId); // Находим индекс товара в корзине
            if (index !== -1) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--; // Уменьшаем количество товара на 1
                } else {
                    cart.splice(index, 1); // Если количество товара 1, удаляем товар из корзины
                }
            }
            renderCartItems(); // Обновляем корзину
            updateCartCounter()
        });
    });
}



// functions call
renderProductList();
renderCartItems();
addEventClickToCartButtons();
updateCartCounter()




