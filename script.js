// 3. put alcohol
// 4. add css animation - "magic"
// 5. fix width
// 6. change the order on the  + fix nav:hover
// 7. make it go to footer one kontakt is pressed


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

        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        a.textContent = oneCat;
        document.querySelector("#wrapper>header>nav").appendChild(a);


        const section = document.createElement("section");
        section.id = oneCat;
        section.classList.add("menu-section");
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;

        document.querySelector("main").appendChild(h2);
        document.querySelector("main").appendChild(section);

    })
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

    if (data.vegetarian) {
        modal.querySelector(".modal-vegetarian").style.display = "block";
    }

    else {
        modal.querySelector(".modal-vegetarian").style.display = "none";
    }


 if (data.allergens.some(function(allergen)  {
                          return allergen == "laktose";
                          }))
 {
     modal.querySelector(".modal-dairy").style.display ="block";

 } else {
     modal.querySelector(".modal-dairy").style.display = "none";
 }


    modal.classList.remove("hide");

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
