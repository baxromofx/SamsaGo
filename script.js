const products = [
    {
        nameRu: "Говяжья самса",
        nameUz: "Mol go'shtli somsa",
        price: 25000,
        qty: 0
    },
    {
        nameRu: "Куриная самса",
        nameUz: "Tovuqli somsa",
        price: 22000,
        qty: 0
    },
    {
        nameRu: "Картофельная самса",
        nameUz: "Kartoshkali somsa",
        price: 18000,
        qty: 0
    }
];

let lang = "ru";

const plusBtns = document.querySelectorAll(".plus");
console.log("Кнопок плюс найдено:", plusBtns.length);
const minusBtns = document.querySelectorAll(".minus");
const qtys = document.querySelectorAll(".qty");

const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const language = document.getElementById("language");

function updateCart(){

    let count = 0;
    let total = 0;

    products.forEach((p,i)=>{

        qtys[i].textContent = p.qty;

        count += p.qty;

        total += p.qty * p.price;

    });

    cartCount.textContent = count;

    cartBtn.innerHTML = 🛒 ${count} | ${total.toLocaleString()} сум <span id="cartCount"></span>;
}

plusBtns.forEach((btn,index)=>{
console.log("Кнопка плюс работает", index);
    btn.onclick=()=>{

        products[index].qty++;

        updateCart();

    }

});

minusBtns.forEach((btn,index)=>{

    btn.onclick=()=>{

        if(products[index].qty>0){

            products[index].qty--;

            updateCart();

        }

    }

});

cartBtn.onclick=()=>{

    let message="";

    let total=0;

    products.forEach(p=>{

        if(p.qty>0){

            message += ${lang==="ru"?p.nameRu:p.nameUz} × ${p.qty}\n;

            total += p.qty*p.price;

        }

    });

    if(total===0){

        alert(lang==="ru"?"Корзина пустая":"Savat bo'sh");

        return;

    }

    alert(message+"\n\n"+(lang==="ru"?"Итого: ":"Jami: ")+total.toLocaleString()+" сум");

}

language.onchange=()=>{

    lang=language.value;

    const h2=document.querySelectorAll(".card h2");

    if(lang==="ru"){

        h2[0].textContent="🥩 Говяжья самса";
        h2[1].textContent="🍗 Куриная самса";
        h2[2].textContent="🥔 Картофельная самса";

        document.getElementById("orderBtn").textContent="✅ Оформить заказ";

    }else{

        h2[0].textContent="🥩 Mol go'shtli somsa";
        h2[1].textContent="🍗 Tovuqli somsa";
        h2[2].textContent="🥔 Kartoshkali somsa";

        document.getElementById("orderBtn").textContent="✅ Buyurtma berish";

    }

}

document.getElementById("orderBtn").onclick = async () => {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const comment = document.getElementById("comment").value;

    if (!name  !phone  !address) {
        alert("Заполните все обязательные поля!");
        return;
    }

    const items = [];

    let total = 0;

    products.forEach(product => {

        if (product.qty > 0) {

            items.push({
                name: lang === "ru" ? product.nameRu : product.nameUz,
                qty: product.qty,
                price: product.price
            });

            total += product.qty * product.price;
        }

    });

    if (items.length === 0) {
        alert("Корзина пустая!");
        return;
    }

    try {

        const response = await fetch("https://samsago.onrender.com/order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                phone,
                address,
                comment,
                items,
                total
            })

        });

        const result = await response.json();

        if (result.success) {

            alert("✅ Заказ успешно отправлен!");

        } else {

            alert("❌ Ошибка отправки заказа.");

        }

    } catch (e) {

        alert("❌ Сервер недоступен.");

        console.error(e);

    }

};

updateCart();

const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    products.forEach(product => {

        if (product.qty > 0) {

            const row = document.createElement("div");
            row.className = "cartRow";

            row.innerHTML = 
                <span>${lang === "ru" ? product.nameRu : product.nameUz} × ${product.qty}</span>
                <span>${(product.qty * product.price).toLocaleString()} сум</span>
            ;

            cartItems.appendChild(row);

            total += product.qty * product.price;
        }

    });

    cartTotal.textContent =
        (lang === "ru" ? "Итого: " : "Jami: ") +
        total.toLocaleString() + " сум";
}

cartBtn.onclick = () => {

    renderCart();

    cartModal.style.display = "flex";

};

closeCart.onclick = () => {

    cartModal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target === cartModal) {

        cartModal.style.display = "none";

    }

};

document.getElementById("checkoutBtn").onclick = () => {

    cartModal.style.display = "none";

    document.querySelector(".order").scrollIntoView({
        behavior: "smooth"
    });

};
