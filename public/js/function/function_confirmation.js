function confirmation_Ori(App, PostAdress){
    let calcTotal = 0; //variable pour stocker le coût total de l'achat (X100).
    /* Stockage des id des produits présents dans le panier dans un array nommé 'products' */
    const cartContent = JSON.parse(localStorage.getItem(`Ori${App}Cart`));
    const products = [];

    cartContent.forEach((product) => {
        for (let i = 0; i < product.quantity; i++) {
        products.push(product.id);
        }
    });

    /* récupération des infos de contact dans le stockage local */
    const contact = JSON.parse(localStorage.getItem(`Ori${App}ClientContact`));

    /* création d'une variable qui regroupe les infos de contact et les id des produits commandés */
    const order = {contact, products};

    /* appel de la fonction post qui envoie les infos à l'API et récupère les infos de la commande */
    const promisePost = fetch(PostAdress, {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(order)});
    promisePost.then(async (response) => {
        const OrderContent = await response.json();
        document.getElementById("order-id").innerHTML = "Commande n° " + await OrderContent.orderId;
        document.getElementById("name").innerHTML = contact.lastName + " " + contact.firstName;
        document.getElementById("address").innerHTML = contact.address + " à " + contact.city;
        document.getElementById("email").innerHTML = contact.email;
        /* calcul du coût total de la commande */
        for (let i = 0; i < cartContent.length; i++) {
            calcTotal += cartContent[i].price * cartContent[i].quantity
        }
        document.getElementById("order-price").innerHTML = "Total de la commande: " + (calcTotal/100) + "€";
    }).catch(error => console.log('Une erreur est survenue:', error));

    /* vide les infos stockés en local concernant la commande */
    localStorage.removeItem(`Ori${App}Cart`);
    localStorage.removeItem(`Ori${App}ClientContact`);
}