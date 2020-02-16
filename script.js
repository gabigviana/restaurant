// 1. change the order on the  + make nav responsive
// 2. put map pin in footer




const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});



fetch("http://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)



function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCat) {
        const section = document.createElement("section");
        section.id = oneCat;
        section.classList.add("menu-section");
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;

        document.querySelector("main").appendChild(h2);
        document.querySelector("main").appendChild(section);

    });


    // Build the mobile menu

    // Append the contact and mobile menu
    data.push("Kontakt");

    // Put the menu items in the dom
    data.forEach(function (oneCat) {
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat.toLowerCase()}`);
        a.textContent = oneCat.toUpperCase();
        document.querySelector("#wrapper>header>nav>.mobile-navbar").appendChild(a);
    });

    // Build the desktop menu

    // Prepend the Home menu item
    data.unshift("home");

    data.forEach(function (oneCat) {
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat.toLowerCase()}`);
        a.textContent = oneCat.toUpperCase();
        document.querySelector("#wrapper>header>nav>.navbar").appendChild(a);
    });


    const a = document.createElement("a");
    a.setAttribute("href", "#menu");
    a.onclick = openNav;
    a.classList.add("mobile-menu");

    const img = document.createElement("img");
    img.setAttribute("src", "/assets/burger-menu.png");
    img.setAttribute("width", "25px");
    img.setAttribute("height", "25px");


    a.appendChild(img);

    document.querySelector("#wrapper>header>nav>.navbar").appendChild(a);

    getProducts();

}



function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    console.log()
    jsonData.forEach(showSingleDish)
}


function showSingleDish(dish) {

    const template = document.querySelector("#dishTemplate").content;

    const copy = template.cloneNode(true);

    copy.querySelector("h3").textContent = dish.name;

    copy.querySelector(".short-description").textContent = dish.shortdescription;


    if (dish.image) {
        const base = "https://kea-alt-del.dk/t5/site/imgs/";
        const smallImg = base + "small/" + dish.image + "-sm.jpg";

        copy.querySelector("#dishImg").src = smallImg;
    }

    if (dish.soldout) {
        copy.querySelector(".sold-out").style.display = "block";
    } else {
        copy.querySelector(".sold-out").style.display = "none";
    }


    if (dish.discount) {
        copy.querySelector(".price-before span").textContent = dish.price;
        const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);

        copy.querySelector(".price-after span").textContent = newPrice;
    } else {
        copy.querySelector(".price-before").remove()
        copy.querySelector(".price-after span").textContent = dish.price
    }

    copy.querySelector("button").addEventListener("click", () => {
        console.log("click", dish)
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    console.log(`#${dish.category}`)
    document.querySelector(`#${dish.category}`).appendChild(copy);


}



function showDetails(data) {
    console.log(data)
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-price").textContent = data.price;


    // check for vegetarian
    if (data.vegetarian) {
        modal.querySelector(".modal-vegetarian").style.display = "block";
    } else {
        modal.querySelector(".modal-vegetarian").style.display = "none";
    }


    // check for allergens
    if (data.allergens.some(function (allergen) {
            return allergen == "laktose";
        })) {
        modal.querySelector(".modal-dairy").style.display = "block";

    } else {
        modal.querySelector(".modal-dairy").style.display = "none";
    }

    //alcohol
    if (data.alcohol) {
        modal.querySelector(".modal-alcohol").style.display = "block";
        modal.querySelector(".modal-alcohol span").textContent = data.alcohol;
    } else {
        modal.querySelector(".modal-alcohol").style.display = "none";
    }

    // show modal
    modal.classList.remove("hide");



}

function openNav() {
    var navbar = document.querySelector(".mobile-navbar");
    if (navbar.classList.contains("open")) {
        navbar.classList.remove("open");
    } else {
        navbar.classList.add("open");
    }
}


//var modal = document.getElementById("myModal");

//var btn = document.getElementById("myBtn");

//var span = document.getElementsByClassName("close")[0];

//btn.onclick = function () {
//    modal.style.display = "block";
//}

//span.onclick = function () {
//    modal.style.display = "none";
//}

//window.onclick = function (event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}
