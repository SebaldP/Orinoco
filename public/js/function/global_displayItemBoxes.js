function displayElements(items, ParentBoxId, productName, productItemHtml) {
    items.forEach(item => {
        let itemBox = document.createElement("div");
        document.getElementById(ParentBoxId).appendChild(itemBox);
        itemBox.classList.add(
            "col-12",
            "col-lg-4",
            "d-flex",
            "align-items-stretch"
        );
        let itemCardBox = document.createElement("div");
        itemBox.appendChild(itemCardBox);
        itemCardBox.classList.add(
            "card",
            "mb-4"
        );
        let itemCardImage = document.createElement("img");
        itemCardBox.appendChild(itemCardImage);
        itemCardImage.classList.add(
            "card-img-top",
            "h-75",
            "rounded"
        );
        itemCardImage.setAttribute("alt", productName + " " + item.name);
        itemCardImage.setAttribute("src", item.imageUrl);
        let itemCardBodyBox = document.createElement("div");
        itemCardBox.appendChild(itemCardBodyBox);
        itemCardBodyBox.classList.add(
            "card-body"
        );
        let itemButtonBox = document.createElement("div");
        itemCardBodyBox.appendChild(itemButtonBox);
        itemButtonBox.classList.add(
            "text-center",
            "mb-4"
        );
        let itemButton = document.createElement("a");
        itemButtonBox.appendChild(itemButton);
        itemButton.classList.add(
            "btn",
            "btn-light",
            "stretched-link"
        );
        itemButton.setAttribute("role", "button");
        itemButton.setAttribute("href", productItemHtml + "?" + item._id);
        itemButton. innerHTML = "Voir <em>" + item.name + "</em>";
    });
}