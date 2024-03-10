/**
 * Function to create container of element
 * @param {Object} item - JSON data
 * @param {number} item._id - Id of object
 * @param {string} item.createdIn - Object creation date
 * @param {string} item.description - Description of object
 * @param {string} item.image - Id of image
 * @param {string} item.name - Object name
 * @param {number} item.price - Object price
 * @returns {HTMLDivElement}
 */
function createContainer(item) {
    const containerDiv = document.createElement('div');

    containerDiv.classList.add(`item${item._id}`);
    containerDiv.addEventListener('click', function() {
        specificsDetailsProduct(item);
    });
    return containerDiv;
}

/**
 * Function to create image element
 * @param {number} imageNumber - Id of image linked to the element
 * @returns {HTMLImageElement}
 */
function createImg(imageNumber) {
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageNumber;
    return imgPlush;
}

/**
 * Create container of info element
 * @returns {HTMLDivElement}
 */
function createContainerInfo() {
    const containerInfo = document.createElement('div');

    containerInfo.classList.add('info');
    return containerInfo;
}

/**
 * Create paragraphs of element
 * @param {string} name - Name of element
 * @param {number} price - Price of element
 * @returns {HTMLParagraphElement}
 */
function createParagraph(name, price) {
    const containerParagraph = document.createElement('div');
    const nameParagraph = document.createElement('p');
    const priceParagraph = document.createElement('p');

    containerParagraph.classList.add('description');
    nameParagraph.textContent = name;
    priceParagraph.textContent = `${price.toFixed(2)} €`;
    containerParagraph.appendChild(nameParagraph);
    containerParagraph.appendChild(priceParagraph);
    return containerParagraph;
}

/**
 * Check if popUp is active
 * @constructor
 * @param {number} id
 */
function hidePopUp(id) {
    const popUp = document.querySelector(`.popup${id}`);

    if (popUp) {
        popUp.remove();
    }
}

/**
 * Display popup with the item creation date
 * @constructor
 * @param {Object} item - JSON data
 * @param {number} item._id - Id of object
 * @param {string} item.createdIn - Object creation date
 * @param {string} item.description - Description of object
 * @param {string} item.image - Id of image
 * @param {string} item.name - Object name
 * @param {number} item.price - Object price
 */
function showPopUp(item) {
    const popup = document.createElement('div');
    var icon;
    var iconRect;
    var popupRect;

    popup.classList.add(`popup${item._id}`);
    popup.textContent = `Créé le ${item.createdIn}`;

    document.body.appendChild(popup);

    icon = document.querySelector(`.info-icon${item._id}`);
    iconRect = icon.getBoundingClientRect();
    popupRect = popup.getBoundingClientRect();

    popup.style.top = `${iconRect.bottom + 10}px`;
    popup.style.left = `${iconRect.left - (popupRect.width / 2)}px`;

    popup.remove();

    document.body.appendChild(popup);
}

/**
 * Create block of item
 * @param {Object} item - JSON data
 * @param {number} item._id - Id of object
 * @param {string} item.createdIn - Object creation date
 * @param {string} item.description - Description of object
 * @param {string} item.image - Id of image
 * @param {string} item.name - Object name
 * @param {number} item.price - Object price
 * @returns {HTMLDivElement}
 */
function createBubbleInfo(item) {
    const bubbleInfo = document.createElement('div');
    const Info = document.createElement('i');

    bubbleInfo.classList.add('bubble');
    Info.classList.add('fa-solid', 'fa-info', `info-icon${item._id}`);
    bubbleInfo.appendChild(Info);

    bubbleInfo.addEventListener('mouseenter', () => {
        showPopUp(item);
    });
    bubbleInfo.addEventListener('mouseleave', () => {
        hidePopUp(item._id);
    });
    return bubbleInfo;
}

/**
 * Function to display data get with api
 * @param {Object} items - JSON data
 * @param {number} item._id - Id of object
 * @param {string} item.createdIn - Object creation date
 * @param {string} item.description - Description of object
 * @param {string} item.image - Id of image
 * @param {string} item.name - Object name
 * @param {number} item.price - Object price
 */
function displayData(items) {
    const contentPage = document.querySelector('.productsPage');

    items.forEach(item => {
        const containerDiv = createContainer(item);
        const imgPlush = createImg(item.image);
        const containerInfo = createContainerInfo();
        const containerParagraph = createParagraph(item.name, item.price);
        const bubbleInfo = createBubbleInfo(item);

        containerInfo.appendChild(containerParagraph);
        containerInfo.appendChild(bubbleInfo);
        containerDiv.appendChild(imgPlush);
        containerDiv.appendChild(containerInfo);
        contentPage.appendChild(containerDiv);
    });
}
