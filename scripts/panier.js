// Add product

/**
 * Function to create first value of localStorage
 * @param {number} _id - id of product
 */
function createLocalStorage(_id) {
    var firstObject = [{id: _id, amount: 1}];

    localStorage.setItem('cart', JSON.stringify(firstObject));
}

/**
 * Function to check if a product already exist
 * @param {number} id - id of product
 * @param {Object} storedProducts - All products already stored
 * @returns {Boolean}
 */
function productExist(id, storedProducts) {
    if (storedProducts === null) {
        return false;
    }
    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === id) {
            return true;
        }
    }
    return false;
}

/**
 * Function to add a product in the localStorage
 * @param {number} _id - id of product
 */
function addProduct(_id) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var new_product;

    if (productExist(_id, storedProducts) === true) {
        for (var i = 0; i < storedProducts.length; i++) {
            if (storedProducts[i].id === _id) {
                storedProducts[i].amount = storedProducts[i].amount + 1;
            }
        }
    } else {
        new_product = {id: _id, amount: 1};
        storedProducts.push(new_product);
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

/**
 * Function to create or add a product in the cart
 * @param {number} id - id of product
 */
function addProductToCart(id) {
    if (localStorage.getItem('cart') !== null) {
        addProduct(id);
    } else {
        createLocalStorage(id);
    }
}

// Display cart

/**
 * Function to increase the total price of the cart
 * @param {number} addPrice - total price of product
 */
function increaseTotalPrice(addPrice)
{
    var paragraphTotalPrice = document.querySelectorAll('.totalProductsPrice');
    var actualPrice = parseInt(paragraphTotalPrice[0].textContent);

    paragraphTotalPrice.forEach(paragraph => {
        paragraph.textContent = `${actualPrice + addPrice} €`;
    });
}

/**
 * Function to reduce the total price of the cart
 * @param {number} removedPrice - total price of product
 */
function reduceTotalPrice(removedPrice)
{
    var paragraphTotalPrice = document.querySelectorAll('.totalProductsPrice');
    var actualPrice = parseInt(paragraphTotalPrice[0].textContent);

    paragraphTotalPrice.forEach(paragraph => {
        paragraph.textContent = `${actualPrice - removedPrice} €`;
    });
}

/**
 * Function to remove quantities of specific product
 * @param {Object} productInfo - Object with product information
 */
function removeQuantityOfProduct(productInfo, quantity) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var inputPrice = document.querySelector('.entryQuantity' + productInfo._id);
    var totalPrice = document.querySelector('.priceTotal' + productInfo._id);

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id && storedProducts[i].amount > 0
            && (storedProducts[i].amount - quantity) > 0) {
            storedProducts[i].amount -= quantity;
            inputPrice.value = storedProducts[i].amount;
            reduceTotalPrice(productInfo.price);
            totalPrice.textContent = `${productInfo.price * storedProducts[i].amount} €`;
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

/**
 * Function to add quantities of specific product
 * @param {Object} productInfo - Object with product information
 */
function addQuantityOfProduct(productInfo, quantity) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var inputPrice = document.querySelector('.entryQuantity' + productInfo._id);
    var totalPrice = document.querySelector('.priceTotal' + productInfo._id);

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id) {
            storedProducts[i].amount += quantity;
            inputPrice.value = storedProducts[i].amount;
            increaseTotalPrice(productInfo.price);
            totalPrice.textContent = `${productInfo.price * storedProducts[i].amount} €`;
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

/**
 * Function to remove specific product of the cart
 * @param {Object} productInfo - Object with product information
 */
function removeProductInCart(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var divToDelete = document.querySelector('.product' + productInfo._id);
    var divForm = document.querySelector('.summaryCart');

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id) {
            reduceTotalPrice(productInfo.price * storedProducts[i].amount);
            divToDelete.parentNode.removeChild(divToDelete);
            storedProducts.splice(i, 1);
            break;
        }
    }
    if (storedProducts.length === 0)
        divForm.parentNode.removeChild(divForm);
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

/**
 * Function to creat div of a specific product in the cart
 * @param {Object} productInfo - Object with product information
 * @param {Object} product - Object of localStorage
 * @returns {HTMLDivElement}
 */
function createInfoProduct(productInfo, product) {
    const dataDiv = document.createElement('div');
    const buttonMinus = document.createElement('button');
    const iconMinus = document.createElement('i');
    const entryPrice = document.createElement('input');
    const buttonPlus = document.createElement('button');
    const iconPlus = document.createElement('i');
    const price = document.createElement('p');
    const RemoveIcon = document.createElement('i');

    dataDiv.className = 'price';

    iconMinus.className = 'fa-solid fa-minus';
    buttonMinus.className = 'minus';
    buttonMinus.appendChild(iconMinus);
    buttonMinus.addEventListener('click', function() {
        removeQuantityOfProduct(productInfo, 1);
    });

    entryPrice.className = 'entryQuantity' + productInfo._id;
    entryPrice.type ="number";
    entryPrice.value = product.amount;

    iconPlus.className = 'fa-solid fa-plus';
    buttonPlus.className = 'plus';
    buttonPlus.appendChild(iconPlus);
    buttonPlus.addEventListener('click', function() {
        addQuantityOfProduct(productInfo, 1);
    });

    price.className = 'priceTotal' + productInfo._id;
    price.textContent = `${productInfo.price * product.amount} €`;

    RemoveIcon.className = 'fa-solid fa-xmark';
    RemoveIcon.addEventListener('click', function() {
        removeProductInCart(productInfo);
    });

    dataDiv.appendChild(buttonMinus);
    dataDiv.appendChild(entryPrice);
    dataDiv.appendChild(buttonPlus);
    dataDiv.appendChild(price);
    dataDiv.appendChild(RemoveIcon);
    return dataDiv;
}

/**
 * Function to display a product in the cart
 * @param {Object} productInfo - Object with product information
 * @param {Object} product - Object of localStorage
 * @param {HTMLDivElement} mainContainer - Main div element
 */
function displayProduct(productInfo, product, mainContainer) {
    const containerDiv = document.createElement('div');
    const imgProduct = document.createElement('img');
    const name = document.createElement('p');
    const infoproductDiv = createInfoProduct(productInfo, product);

    containerDiv.className = 'product' + productInfo._id;
    imgProduct.src = url + '/item/picture/' + productInfo.image;
    name.textContent = productInfo.name;

    containerDiv.appendChild(imgProduct);
    containerDiv.appendChild(name);
    containerDiv.appendChild(infoproductDiv);
    mainContainer.appendChild(containerDiv);
}

/**
 * Function to get total price of the cart
 * @param {Object} storedProducts - Object of data in localStorage
 * @returns {number}
 */
async function getTotalPrice(storedProducts)
{
    var price = 0;
    var dataApi;

    for (var i = 0; i < storedProducts.length; i++) {
        dataApi = await getSpecificProduct(storedProducts[i].id);
        price += (dataApi.price * storedProducts[i].amount);
    }
    return price;
}

/**
 * Function to display form
 * @param {Object} storedProducts - Object of data in localStorage
 * @param {HTMLDivElement} mainContainer - Main div element
 * @returns
 */
function displayForm(storedProducts, mainContainer)
{
    const formContainer = document.createElement('div');
    var form;
    var validateButton;
    var totalPrice = 0;

    formContainer.className = 'summaryCart';
    if (storedProducts.length === 0) {
        return;
    }
    getTotalPrice(storedProducts).then(price => {
        totalPrice = price;
        formContainer.innerHTML =
            `<form class="formContact" id="formContact">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" required>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" required>
                <label for="adresse">Adresse</label>
                <input type="text" id="adresse" name="adresse" required>
                <label for="rue">Nom de rue</label>
                <input type="text" id="rue" name="rue" required>
            </form>
            <div class="orderSummary">
                <div class="boxDetails">
                    <p class="cartTitle">Panier</p>
                    <p class="totalProductsPrice">${totalPrice} €</p>
                </div>
                <hr>
                <div class="boxDetails">
                    <i class="fa-solid fa-shop"></i>
                    <p>Gratuit</p>
                </div>
                <div class="boxDetails">
                    <i class="fa-solid fa-truck"></i>
                    <p>Gratuit</p>
                </div>
                <hr>
                <div class="boxDetails">
                    <p class="cartTitle">TOTAL</p>
                    <p class="totalProductsPrice">${totalPrice} €</p>
                </div>
                <button form="formContact" class="validateButton">Validation du panier</button>
            </div>`;
        mainContainer.appendChild(formContainer);
        validateButton = document.querySelector('.validateButton');
        validateButton.addEventListener('click', function(event) {
            form = document.getElementById('formContact');
            if (form.checkValidity()) {
                validateCart(event);
            }
        });
    });
}

/**
 * Function to display all elements of the cart
 * @returns
 */
async function displayCart() {
    const mainContainer = document.querySelector('.cartPage');
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var product;

    if (storedProducts === null || storedProducts.length === 0) {
        return;
    }
    for (var i = 0; i < storedProducts.length; i++) {
        product = await getSpecificProduct(storedProducts[i].id);
        if (product) {
            displayProduct(product, storedProducts[i], mainContainer);
        }
    }
    displayForm(storedProducts, mainContainer);
}
