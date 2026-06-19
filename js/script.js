// Selected Cafe
function selectCafe(cafeName)
{
    localStorage.setItem("selectedCafe", cafeName);
    window.location.href = "menu.html";
}

// Display Selected Cafe
function loadCafeName()
{
    const cafe = localStorage.getItem("selectedCafe");

    if(document.getElementById("cafeName"))
    {
        document.getElementById("cafeName").innerHTML = cafe;
    }
}

// Dummy Total Price
function calculateTotal()
{
    let total = 0;

    const items = document.querySelectorAll(".foodQty");

    items.forEach(item =>
    {
        total += Number(item.value);
    });

    document.getElementById("totalPrice").innerHTML =
    "RM " + total.toFixed(2);
}

// Order Submission
function submitOrder()
{
    alert("Order Successfully Submitted!");

    window.location.href="confirmation.html";
}

// Load when page starts
window.onload = function()
{
    loadCafeName();
    displayMenu();
    loadCart();
    generatePickupTimes();
}

// UPDATE 11111111111111111111111111111111111

// MENU DATA

const menus =
{
    "Cafe Apple":
    [
        {name:"Nasi Goreng Ayam", price:7},
        {name:"Nasi Pataya", price:6},
        {name:"Waffle", price:5},
        {name:"Air Kosong", price:0.50}
    ],

    "Cafe Mangga":
    [
        {name:"Jagung Dessert", price:5},
        {name:"Mee Goreng", price:6},
        {name:"Teh O Ice", price:2}
    ],

    "Cafe Kesinai":
    [
        {name:"Nasi Lemak", price:7},
        {name:"Nasi Ayam Gepuk", price:8},
        {name:"Ice Tea Float", price:4},
        {name:"Sirap Ice", price:2}
    ],

    "Anjung Siswi":
    [
        {name:"Nasi Goreng", price:8},
        {name:"Roti Canai", price:3},
        {name:"Nasi Ayam Geprek", price:6},
        {name:"Teh Ais", price:3},
    ],

    "Anjung Siswa":
    [
        {name:"Nuggets", price:5},
        {name:"Fries", price:4},
        {name:"Nasi Bujang", price:4},
        {name:"Ice Cream", price:2},
        {name:"Milo Ice", price:3}
    ]
};

// DISPLAY MENU

function displayMenu()
{
    const cafe =
    localStorage.getItem("selectedCafe");

    const container =
    document.getElementById("menuContainer");

    if(!container) return;

    menus[cafe].forEach(item =>
    {
        container.innerHTML +=
        `
        <div class="card">

            <h3>${item.name}</h3>

            <p>RM ${item.price}</p>

            <br>

            Quantity:

            <input
                type="number"
                id="${item.name.replace(/\s/g,'')}"
                min="1"
                value="1"
                style="width:60px;padding:5px;">

            <br><br>

            <button class="btn"
            onclick="addToCart(
                '${item.name}',
                ${item.price},
                document.getElementById('${item.name.replace(/\s/g,'')}').value
            )">

            Add To Cart

            </button>

        </div>
        `;
    });
}

// ADD TO CART

function addToCart(name, price, quantity)
{
    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name,
        price,
        quantity: parseInt(quantity)
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(quantity + " x " + name + " added to cart!");
}

// LOAD CART

function loadCart()
{
    const table =
    document.getElementById("cartTable");

    if(!table) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    table.innerHTML = "";

    cart.forEach((item,index) =>
    {
        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        table.innerHTML +=
        `
        <tr>

            <td>${item.name}</td>

            <td>${item.quantity}</td>

            <td>RM ${subtotal.toFixed(2)}</td>

            <td>

                <button
                onclick="removeItem(${index})">

                Remove

                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById(
        "cartTotal"
    ).innerHTML =
        "RM " + total.toFixed(2);
}

//REMOVE ITEM

function removeItem(index)
{
    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

function generatePickupTimes()
{
    const select =
        document.getElementById("pickupTime");

    if(!select) return;

    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    minute = Math.ceil(minute / 30) * 30;

    if(minute === 60)
    {
        minute = 0;
        hour++;
    }

    for(let i = 0; i < 12; i++)
    {
        const time =
            `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`;

        select.innerHTML +=
            `<option>${time}</option>`;

        minute += 30;

        if(minute >= 60)
        {
            minute = 0;
            hour++;
        }
    }
}
