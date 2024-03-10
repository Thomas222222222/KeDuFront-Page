/**
 * Function to add name of product
 * @param {string} name - Name of product
 */
function addValuesContainerTop(name) {
    const nameText = document.querySelector('.titleProduct');
    const iconClosed = document.querySelector('.fa-solid.fa-xmark');

    nameText.textContent = name;
    iconClosed.addEventListener('click', function() {
        const specificProduct = document.querySelector('.specificProduct');
        const specificProductContent = document.querySelector('.specificProductContent');
        const specificProductBottom = document.querySelector('.specificProductBottom');
        const blurBackground = document.querySelector('.blurBackground');

        blurBackground.style.display = 'none';
        specificProduct.style.display = 'none';
        while (specificProductContent.firstChild) {
            specificProductContent.removeChild(specificProductContent.firstChild);
        }
        while (specificProductBottom.firstChild) {
            specificProductBottom.removeChild(specificProductBottom.firstChild);
        }
    });
}

/**
 * Function to add image of the product
 * @param {number} imageID - Id of correct image
 */
function addValuesContainerContent(imageID) {
    const containerContent = document.querySelector('.specificProductContent');
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageID;

    containerContent.appendChild(imgPlush);
}

/**
 * Function to add information of the product in the div
 * @param {string} description - Description of the product
 * @param {number} price - Price of the product
 * @param {number} id - Id of the product
 * @param {string} name - Name of the product
 */
function addValuesContainerBottom(description, price, id, name) {
    const containerBottom = document.querySelector('.specificProductBottom');
    const textDescription = document.createElement('p');
    const purchaseDiv = document.createElement('div');
    const textPrice = document.createElement('p');
    const addButton = document.createElement('button');

    textDescription.textContent = description;
    purchaseDiv.style.display = 'flex';
    purchaseDiv.style.flexDirection = 'row';
    purchaseDiv.style.alignItems = 'center';
    purchaseDiv.style.paddingTop = '15px';
    textPrice.textContent = `${price.toFixed(2)} €`;
    addButton.textContent = 'Ajouter au panier';
    addButton.addEventListener('click', function() {
        alert(`${name} ajouté au panier`);
        addProductToCart(id);
    });

    purchaseDiv.appendChild(textPrice);
    purchaseDiv.appendChild(addButton);
    containerBottom.appendChild(textDescription);
    containerBottom.appendChild(purchaseDiv);
}

/**
 * Function to set information of specifice product
 * @param {Object} item - Data of the product
 */
function specificsDetailsProduct(item) {
    const specificProductDiv = document.querySelector('.specificProduct');
    const blurBackgroundDiv = document.querySelector('.blurBackground');

    blurBackgroundDiv.style.display = 'block';
    specificProductDiv.style.display = 'flex';
    specificProductDiv.style.placeContent = 'center';
    specificProductDiv.style.flexDirection = 'column';

    addValuesContainerTop(item.name);
    addValuesContainerContent(item.image);
    addValuesContainerBottom(item.description, item.price, item._id, item.name);
}
