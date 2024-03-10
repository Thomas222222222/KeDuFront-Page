/**
 * Function to check validity of email
 * @param {string} email - Client email
 * @returns {number}
 */
function checkValidityAddress(email) {
    var i = 0;

    for (; i < email.length; i++) {
        if (email[i] === '.')
            return 0;
    }
    return -1;
}

/**
 * Function to submit data of user and cart
 * @param {event} event - Event of submit order
 * @returns
 */
function validateCart(event) {
    var storedCartInfo;
    const email = document.getElementById('email');
    const name = document.getElementById('nom');
    const address = document.getElementById('adresse');
    const storedProducts = JSON.parse(localStorage.getItem('cart'));

    if (checkValidityAddress(email.value) === -1) {
        alert('Email invalid !');
        return;
    }
    if (address.value.length < 5) {
        alert('Adresse invalid !');
        return;
    }
    event.preventDefault();
    storedCartInfo = {
        "email": email.value,
        "name": name.value,
        "address": address.value,
        "cart": storedProducts
    }
    sendOrder(storedCartInfo);
}
