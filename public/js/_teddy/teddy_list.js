/* Appel fonction "getUrl" (../request.js) pour récupérer les données des produits
Appel fonction "displayElements" (../displayItemBox.js) pour mettre en place les différents élements dans le bloc parent*/
getUrl("http://localhost:3000/api/teddies").then((data) => {
    displayElements(data, "productsList", "Ours en pelluche", "./teddy_item.html");
}).catch(error => console.log('Une erreur est survenue:', error));

cartIconNotification_Ori("teddy");