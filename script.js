let cart = [];
let cartCount = 0;

const cartBtn = document.getElementById("cartBtn");
const buttons = document.querySelectorAll(".card button");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {

        const products = [
            {
                name: "Говяжья самса",
                price: 25000
            },
            {
                name: "Куриная самса",
                price: 22000
            },
            {
                name: "Картофельная самса",
                price: 18000
            }
        ];

        cart.push(products[index]);
        cartCount++;

        cartBtn.innerHTML = 🛒 Корзина (${cartCount});
    });
});

cartBtn.addEventListener("click", () => {

    if(cart.length===0){
        alert("Корзина пуста");
        return;
    }

    let text = "Ваш заказ:\n\n";
    let total = 0;

    cart.forEach(item=>{
        text += ${item.name} - ${item.price} сум\n;
        total += item.price;
    });

    text += \nИтого: ${total} сум;

    alert(text);
});
