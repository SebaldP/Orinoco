/* Appel fonction "getUrl" (../request.js) pour récupérer les données des produits
Appel fonction "displayElements" (../displayItemBox.js) pour mettre en place les différents élements dans le bloc parent*/
getUrl("http://localhost:3000/api/furniture").then((data) => {
    displayElements(data, "productsList", "Meubles en chêne", "./furniture_item.html");
}).catch(error => console.log('Une erreur est survenue:', error));

cartIconNotification_Ori("furniture");