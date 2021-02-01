function cartIconNotification_Ori(App) {
    const CartNotificationItems = JSON.parse(localStorage.getItem(`Ori${App}Cart`));
    if (localStorage.getItem(`Ori${App}Cart`)){
        const NavLinkCart = document.getElementById("CartIcon");
        NavLinkCart.innerHTML = `<i class="fas fa-shopping-cart mr-1"></i><span id="CartNotification" aria-describedby="Nombre d'éléments différents dans le panier">${CartNotificationItems.length}</span>Panier`;
    }
}