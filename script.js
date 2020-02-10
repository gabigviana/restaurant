fetch("https://kea-alt-del.dk/t5/api/productlist")

    .then(function (response) {
        return response.json()
    })

    .then(function (data) {
        showData(data)
    })

function showData(jsonData) {
    jsonData.forEach(showSingleDish)
}


function showSingleDish(dish) {

    const template = document.querySelector("#dishTemplate").content;

    const copy = template.cloneNode(true);

    copy.querySelector("h3").textContent = dish.name;



    if (dish.discount) {
        copy.querySelector(".price-full span").textContent = dish.price;
        const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);

        copy.querySelector(".price-full span").textContent = newPrice;
    } else {
        copy.querySelector(".price.discount").remove()
        copy.querySelector(".price-full span").textContent = dish.price
    }


    const whoIsYourDaddy = document.querySelector("#starters")
    whoIsYourDaddy.appendChild(copy)
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
