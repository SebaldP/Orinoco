/* Appel fonction "displayElements" (./public/js/displayItemBox.js) pour mettre en place les différents élements dans le bloc parent correspondant*/

/* Appel fonction getUrl (./public/js/request.js) pour récupérer les données des produits Teddies*/
getUrl("http://localhost:3000/api/teddies").then((data) => {
    displayElements(data, "Oriteddy__list", "Ours en pelluche", "./public/page/teddy/teddy_item.html");
}).catch(error => console.log('Une erreur est survenue:', error));

/* Appel fonction getUrl (./public/js/request.js) pour récupérer les données des produits Furnitures*/
getUrl("http://localhost:3000/api/furniture").then((data) => {
    displayElements(data, "Orifurniture__list", "Meubles en chêne", "./public/page/furniture/furniture_item.html");
}).catch(error => console.log('Une erreur est survenue:', error));

/* Appel fonction getUrl (./public/js/request.js) pour récupérer les données des produits Cameras*/
getUrl("http://localhost:3000/api/cameras").then((data) => {
    displayElements(data, "Oricamera__list", "Caméras vintage", "./public/page/camera/camera_item.html");
}).catch(error => console.log('Une erreur est survenue:', error));