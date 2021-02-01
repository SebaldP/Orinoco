/* Récupération de l'identifiant du produit sélectionné */

const idProduct = window.location.search.substr(1);

/* Appel de la fonction "getUrl" (../request.js) pour afficher les caractéristiques du produit sélectionné */

getUrl("http://localhost:3000/api/furniture/" + idProduct)
    .then((data) => displayProduct(data, "furnitureProduct", "Orifurniture"))
    .catch(error => console.log('Une erreur est survenue:', error));

cartIconNotification_Ori("furniture");

getUrl("http://localhost:3000/api/furniture/" + idProduct)
    .then((data) => itemCartAddItemButton_Ori("furniture", data))
    .catch(error => console.log('Une erreur est survenue:', error));