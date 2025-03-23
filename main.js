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

// DOM elements
const cartDropdown = document.getElementById("cart");
const productsElement = document.getElementById("products");
const cartCounter = document.getElementById("cartCounter");
const searchInput = document.querySelector("#search-form input");

// functions
// Фильтрация товаров
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase(); // перевод текста в нижний регистр
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) // проверка содержит ли имя товара введённый текст
    );
    
    renderProductList(filteredProducts); // отоброжание отфильтрованих товаров
}


function renderProductList(filteredList = products) {
    productsElement.innerHTML = ""; // Очищаем контейнер

    for (const product of filteredList) { // перебираем массив отфильтрованных товаров
        productsElement.innerHTML += `
            <div class="col-md-3">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="price">${product.price}$</p>
                        <button type="button" class="btn btn-success buy-button" id="product-buy-${product.id}">Купить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addEventClickToBuyButtons(); 
}

// Слушатель ввода текста
searchInput.addEventListener("input", filterProducts); // слушатель на input, чтобы обновлять список при вводе текста
searchInput.addEventListener("input", filterProducts); // слушатель на input, чтобы обновлять список при вводе текста



function renderCartItems() {
    cartDropdown.innerHTML = ""; // Очищаем корзину перед рендерингом

    for (const item of cart) { // Перебираем корзину
        const buttonId = `cart-buy-${item.id}`; // Определяем внутри цикла!

        cartDropdown.innerHTML += ` 
            <li>
                <a type="text" class="btn btn-success">${item.name}</a>
                <button class="btn btn-success" id="${buttonId}">+</button>
                <button type="button" class="btn btn-danger" id="card-delete-${item.id}">-</button>
                <span>${item.quantity}</span>
            </li>
        `;
        cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log(`Создана кнопка: ${buttonId}`);
    }

    addEventClickToCart(); // Вешаем обработчики
}



function addEventClickToCart() {
    console.log("Вызов addEventClickToCart()"); // Проверяем, вызывается ли функция

    document.querySelectorAll(".btn-success[id^='cart-buy-']").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = parseInt(button.id.replace("cart-buy-", "")); // Получаем id товара
            const index = cart.findIndex(cartItem => cartItem.id === itemId);
            if (index !== -1) {
                cart[index].quantity += 1; // Увеличиваем количество
                renderCartItems(); // Обновляем корзину
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
            console.log("Содержимое корзины:", cart);
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
            const toastMessage = document.getElementById("toastBody");
            toastMessage.textContent = `${product.name} добавлен в корзину!`;
        });


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




