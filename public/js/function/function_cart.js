function cart_Ori(App){
    /* Contenu du localStorage pour afficher le panier */
    const OriAppLocalStorageContent = JSON.parse(localStorage.getItem(`Ori${App}Cart`));
    /* Afficher #EmptyCart quand le localStorage est vide et afficher #CartContent et #Form quand il y a des éléments dans le localStorage*/
    if (localStorage.getItem(`Ori${App}Cart`) === null || OriAppLocalStorageContent.length == 0) {
        document.getElementById(`Ori${App}EmptyCart`).style.display = "block";
        document.getElementById(`Ori${App}CartContent`).style.display = "none";
        document.getElementById(`Ori${App}Form`).style.display = "none";
    } else {
        document.getElementById(`Ori${App}CartContent`).style.display = "block";
        document.getElementById(`Ori${App}Form`).style.display = "block";
        document.getElementById(`Ori${App}EmptyCart`).style.display = "none";
    }
    const tableCartContainer = document.getElementById(`Ori${App}CartItems`);
    let calcTotal = 0;
    /* Boucle qui itère chaque contenu du panier dans un tableau */
    /* Ne s'enclenche que si élément(s) présent(s) dans le panier */
    if (localStorage.getItem(`Ori${App}Cart`)) {
        for (let i = 0; i < OriAppLocalStorageContent.length; i++) {
            const tableCartItem = document.createElement("tr");
            tableCartContainer.appendChild(tableCartItem);
            /* Affichage de l'image du produit qui est un lien pour retourner à sa page produit */
            const tdImage = document.createElement("td");
            tdImage.classList.add("d-none", "d-sm-table-cell");
            tableCartItem.appendChild(tdImage);
            const tdImagelink = document.createElement("a");
            const tdImageimg = document.createElement("img");
            tdImage.appendChild(tdImagelink);
            tdImagelink.appendChild(tdImageimg);
            tdImagelink.setAttribute("href", "teddy_item.html?" + OriAppLocalStorageContent[i].id);
            tdImageimg.setAttribute("src", OriAppLocalStorageContent[i].image);
            tdImageimg.style.width = "8rem";
            /* Affichage du nom du produit */
            const tdName = document.createElement("td");
            tableCartItem.appendChild(tdName);
            tdName.innerHTML = OriAppLocalStorageContent[i].name;
            /* Affichage de la personnification du produit (par défaut) */
            const tdOption = document.createElement("td");
            tdOption.classList.add("d-none", "d-sm-table-cell");
            tableCartItem.appendChild(tdOption);
            tdOption.innerHTML = OriAppLocalStorageContent[i].option;
            /* Affichage du prix du produit multiplié par sa quantité */
            const tdPrice = document.createElement("td");
            tableCartItem.appendChild(tdPrice);
            tdPrice.innerHTML = OriAppLocalStorageContent[i].price / 100 + "€";
            /* Affichage de la quantité du produit */
            const tdQty = document.createElement("td");
            tableCartItem.appendChild(tdQty);
            tdQty.classList.add("text-center");
            tdQty.innerHTML = OriAppLocalStorageContent[i].quantity;
            if (tdQty.innerHTML == 1){
                tdQty.innerHTML += `<button id="plusButton${i+1}" class="btn btn-outline-dark border-0 btn-sm ml-2"><i class="fas fa-plus"></i></button>`;
            } else {
                tdQty.innerHTML += `<button id="plusButton${i+1}" class="btn btn-outline-dark border-0 btn-sm ml-2"><i class="fas fa-plus"></i></button>`;
                tdQty.innerHTML += `<button id="minusButton${i+1}" class="btn btn-outline-dark border-0 btn-sm"><i class="fas fa-minus"></i></button>`;
            };
            /* Icone pour suppression du produit */
            const tdRemove = document.createElement("td");
            tableCartItem.appendChild(tdRemove);
            tdRemove.classList.add("text-center");
            const tdRemoveIconLink = document.createElement("a");
            tdRemove.appendChild(tdRemoveIconLink);
            const tdRemoveIcon = document.createElement("i");
            tdRemoveIconLink.appendChild(tdRemoveIcon);
            tdRemoveIconLink.classList.add("btn", "btn-outline-dark");
            tdRemoveIconLink.setAttribute("href", `${App}_cart.html`);
            tdRemoveIcon.classList.add("far", "fa-trash-alt");
            tdRemoveIcon.setAttribute("title", "Supprimer");
            tdRemoveIconLink.addEventListener("click", function () {
                if (OriAppLocalStorageContent.length==1){
                    localStorage.removeItem(`Ori${App}Cart`);
                } else {
                    OriAppLocalStorageContent.splice(i, 1);
                    localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppLocalStorageContent));
                }
                window.location.reload();
            });
            /* Affichage du prix total du panier */
            calcTotal += OriAppLocalStorageContent[i].price * OriAppLocalStorageContent[i].quantity
        }
    }
    for (let i = 0; i < OriAppLocalStorageContent.length; i++) {
        document.getElementById(`plusButton${i+1}`).addEventListener("click", function(){
            OriAppLocalStorageContent[i].quantity +=1;
            localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppLocalStorageContent));
            window.location.reload();
        });
        if ((OriAppLocalStorageContent[i].quantity)> 1) {
            document.getElementById(`minusButton${i+1}`).addEventListener("click", function(){
                OriAppLocalStorageContent[i].quantity -=1;
                localStorage.setItem(`Ori${App}Cart`, JSON.stringify(OriAppLocalStorageContent));
                window.location.reload();
            });
        }
    }
    /* Afficher le prix total du panier */
    const OriAppTotalPrice = document.getElementById(`Ori${App}TotalPrice`);
    OriAppTotalPrice.innerHTML = calcTotal/100 + "€";
    /* Bouton de suppression de tout le contenu du panier */
    const ClearCartButton = document.getElementById(`Ori${App}ClearCart`);
    ClearCartButton.addEventListener("click", function clearStorage() {
        localStorage.removeItem(`Ori${App}Cart`);
        window.location.reload();
    });
    /* au clique sur le bouton de commande, si tous les champs sont correctement complétés alors
    création d'un objet contact avec les infos fournis et redirection vers la page de confirmation 
    sinon alert avec message invitant à remplir le formulaire */
    const SubmitOrderButton = document.getElementById("SubmitOrder");
    SubmitOrderButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (
            document.getElementById("inputClientLastName").validity.valid &&
            document.getElementById("inputClientFirstName").validity.valid &&
            document.getElementById("inputClientEmail").validity.valid &&
            document.getElementById("inputClientAddress").validity.valid &&
            document.getElementById("inputClientCity").validity.valid) {
                const currentHost = window.location.origin;
                if( confirm("ATTENTION: Etant donné l'état actuel de notre application, les OPTIONS choisies NE seront PAS prises en compte à votre commande. Tout article dans votre panier sera 'Sans Option'. Veuillez nous en excusez!")){
                    const contact = {
                        firstName: document.getElementById("inputClientFirstName").value,
                        lastName: document.getElementById("inputClientLastName").value,
                        address: document.getElementById("inputClientAddress").value,
                        city: document.getElementById("inputClientCity").value,
                        email: document.getElementById("inputClientEmail").value
                    };
                    localStorage.setItem(`Ori${App}ClientContact`, JSON.stringify(contact));
                    window.location.href = currentHost + `/public/page/${App}/${App}_confirmation.html`;
                } else {
                    localStorage.removeItem(`Ori${App}Cart`);
                    window.location.href = currentHost + '/index.html';
                }
        } else {
            alert("Champs requis non complétés!");
        }
    });
}