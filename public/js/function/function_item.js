function displayProduct(item, ParentBoxId, OriApp){
    let _optionType = "";
    let _productType = "";
    let _productOptionLabelName = "";
    switch (OriApp) {
        case 'Oriteddy':
            _optionType += "colors";
            _productType += "Ours en peluche";
            _productOptionLabelName += "Couleur";
            break;
        case 'Oricamera':
            _optionType += "lenses";
            _productType += "Caméra";
            _productOptionLabelName += "Lentille"
            break;
        case 'Orifurniture':
            _optionType += "varnish";
            _productType += "Meuble en chêne";
            _productOptionLabelName += "Vernis";
            break;
        default:
            _optionType += "Non défini";
            _productType += "Non défini";
            _productOptionLabelName += "Non défini";
    }
    let ProductBox = document.createElement("div");
    document.getElementById(ParentBoxId).appendChild(ProductBox);
    let ProductImage = document.createElement("img");
    ProductBox.appendChild(ProductImage);
    ProductImage.classList.add(
        "card-img-top",
        "mt-4"
    );
    ProductImage.setAttribute("alt", _productType + item.name);
    ProductImage.setAttribute("src", item.imageUrl);
    let ProductBoxBody = document.createElement("div");
    ProductBox.appendChild(ProductBoxBody);
    ProductBoxBody.classList.add(
        "card-body",
        "m-md-2"
    );
    let ProductBoxTextBlock = document.createElement("div");
    ProductBoxBody.appendChild(ProductBoxTextBlock);
    ProductBoxTextBlock.classList.add("text-center");
    let ProductName = document.createElement("h1");
    ProductBoxTextBlock.appendChild(ProductName);
    ProductName.classList.add(
        "card-title",
        "h3",
        "font-weight-bold");
    ProductName.innerHTML = item.name;
    let ProductDescription = document.createElement("p");
    ProductBoxTextBlock.appendChild(ProductDescription);
    ProductDescription.classList.add(
        "h5",
        "text-justify");
    ProductDescription.innerHTML = item.description;
    let ProductPrice = document.createElement("p");
    ProductBoxTextBlock.appendChild(ProductPrice);
    ProductPrice.classList.add(
        "h3",
        "m-5");
    ProductPrice.innerHTML = item.price/100 + "€";
    let ProductOptionBox = document.createElement("div");
    ProductBoxTextBlock.appendChild(ProductOptionBox);
    ProductOptionBox.classList.add("input-group");
    let ProductOptionLabelBox = document.createElement("div");
    ProductOptionBox.appendChild(ProductOptionLabelBox);
    ProductOptionLabelBox.classList.add("input-group-prepend");
    let ProductOptionLabel = document.createElement("label");
    ProductOptionLabelBox.appendChild(ProductOptionLabel);
    ProductOptionLabel.classList.add("input-group-text");
    ProductOptionLabel.setAttribute("for", `${_optionType}Select`);
    ProductOptionLabel.innerHTML = _productOptionLabelName;
    let ProductOptionSelect = document.createElement("select");
    ProductOptionBox.appendChild(ProductOptionSelect);
    ProductOptionSelect.classList.add("custom-select");
    ProductOptionSelect.setAttribute("id", `${_optionType}Select`);
    let ProductOptionSelectValueDefault = document.createElement("option");
    ProductOptionSelect.appendChild(ProductOptionSelectValueDefault);
    ProductOptionSelectValueDefault.innerHTML = "Sans option";

    /* Boucle "for" pour afficher les différentes personnalisations disponibles pour le produit en question */

    for (let i = 0; i < item[_optionType].length; i++) {
        document.getElementById(`${_optionType}Select`).innerHTML += `<option value="${item[_optionType][i]}">${item[_optionType][i]}</option>`;
    }
};

function itemCartAddItemButton_Ori(App, data){
    let typeOption = '';
    let alertText = '';
    switch (App) {
    case 'teddy':
        typeOption += "colorsSelect";
        alertText += "L'ours en peluche";
        break;
    case 'furniture':
        typeOption += "varnishSelect";
        alertText += "Le meuble en chêne";
        break;
    case 'camera':
        typeOption += "lensesSelect";
        alertText += "L'appareil argentique";
        break;
    default:
        console.log(`Désolé, l'application Ori${App} n'existe pas.`);
    }
    /* Fonction - appelée au clic - sur le bouton "Ajouter au panier */
    document
    .getElementById("add-btn")
    .addEventListener("click", function addcart() {
        /* Variable utilisée pour étudier si le produit est déja dans le panier et gérer les différentes conditions */
        let OriAppNewItem = true;
        /* Array pour stocker les produits mis au panier */
        let OriAppClientCart = [];
        /* Variable pour la quantité sélectionnée */
        let quantity = 1;
        /* Variable pour la personnalisation sélectionnée */
        let option = document.getElementById(typeOption).value;
        /* Objet qui récupère les infos du produit et sa quantité */
        let itemSelected = {
            id: data._id,
            name: data.name,
            image: data.imageUrl,
            price: data.price,
            option,
            quantity,
        };
        /* Condition: si panier vide, alors 
        on ajoute un à la quantité,
        on ajoute l'objet sélectionné au tableau et
        on stocke le tableau en local*/
        if (localStorage.getItem(`Ori${App}Cart`) === null) {
            OriAppClientCart.push(itemSelected);
            localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppClientCart));
            OriAppNewItem = false;
            /* Sinon si produit déja au panier, après vérification, on ajoute 1 à la quantité du produit en question */
        } else {
            OriAppClientCart = JSON.parse(localStorage.getItem(`Ori${App}Cart`));
            OriAppClientCart.forEach((product) => {
                if ((product.id === itemSelected.id)&&(product.option === itemSelected.option)) {
                    product.quantity += 1;
                    OriAppNewItem = false; // pour que la dernière condition ne se déclenche pas
                }
                localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppClientCart));
            });
        }
        /* si produit non présent dans le panier alors on ajoute l'objet sélectionné au tableau et on stocke le tableau en local */
        if (OriAppNewItem == true) {
            OriAppClientCart.push(itemSelected);
            localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppClientCart));
        }
        itemCartdisplayAlert(alertText);
    });
}

/*Message d'alerte indiquant la mise au panier du produit*/
function itemCartdisplayAlert(text) {
    let alertBlock = document.createElement("div");
    document.getElementById("item-added").appendChild(alertBlock);
    alertBlock.classList.add(
        "alert",
        "alert-success",
        "alert-dismissible",
        "fade",
        "show",
        "shadow"
    );
    alertBlock.setAttribute("role", "alert");
    let alertTitle = document.createElement("h5");
    alertBlock.appendChild(alertTitle);
    alertTitle.classList.add("alert-heading");
    alertTitle.innerHTML = "Nous vous remercions!";
    let alertCloseButton = document.createElement("button");
    alertBlock.appendChild(alertCloseButton);
    alertCloseButton.classList.add("close");
    alertCloseButton.setAttribute("type", "button");
    alertCloseButton.setAttribute("data-dismiss", "alert");
    alertCloseButton.setAttribute("aria-label", "Fermer la fenêtre");
    let closeIcon = document.createElement("i");
    alertCloseButton.appendChild(closeIcon);
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.classList.add("fas", "fa-times");
    let alertCloseMessage = document.createElement("p");
    alertBlock.appendChild(alertCloseMessage);
    alertCloseMessage.innerHTML = `${text} a été ajouté à votre panier.`;
}