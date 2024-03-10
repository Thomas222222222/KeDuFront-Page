const url = "https://api.kedufront.juniortaker.com";

/**
 * Function to get informations on specific product
 * @param {number} id - Product id
 * @returns {Object}
 */
function getSpecificProduct(id) {
    return axios.get(url + '/item/' + id)
        .then(response => {
            return response.data.item;
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Function to get data of the api with request GET and axios
 */
function getData() {
    var items;

    axios.get(url + "/item/")
    .then(response => {
        items = response.data;
        displayData(items);
    })
    .catch(error => {
        console.error("Error : " + error);
    });
}

/**
 * Send POST request to get order id
 * @param {Object} data - JSON data
 * @param {string} email - Client email
 * @param {string} name - Client name
 * @param {string} address - Client address
 * @param {Object} cart - Client cart
 */
function sendOrder(data) {
    axios.post(url + "/order/", data)
        .then(response => {
            alert(`Votre id de commande : ${response.data.command_id}`);
            localStorage.removeItem('cart');
            location.reload();
        })
        .catch(error => {
            console.error(error);
        });
}
