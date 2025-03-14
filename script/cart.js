// onclick menu 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}


// open searchbar 
function toggleSearch() {
    const searchBar = document.getElementById('search_bar');
    searchBar.style.display = searchBar.style.display === 'block'? 'none' : 'block';
}


// close searchbar
function closeSearch() {
    const searchBar = document.getElementById('search_bar');
    searchBar.style.display = 'none';
}


// check if the document is ready 
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}


// create function 
function ready(){
    // remove item from cart
    var removeCartIcons = document.getElementsByClassName('remove_item');
    for (var i = 0; i < removeCartIcons.length; i++){
        var icon = removeCartIcons[i];
        icon.addEventListener('click', removeCartItem);
    }

    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart_quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantitychanged);
    }

    // add to cart
    var addCartButtons = document.getElementsByClassName('btn');
    for (var i = 0; i < addCartButtons.length; i++){
        var button = addCartButtons[i];
        button.addEventListener('click', addCartoClicked);
    }

    // load cart infro form localstorage
    loadCart();

    // update cart icon quantity 
    updateCartIconQuantity();
}


//remove item from cart 
function removeCartItem(event){
    var iconClicked = event.target.closest('.remove_item');
    var cartRow = iconClicked.closest('tr');
    var title = cartRow.getElementsByClassName('cart_name')[0].innerText;
    
    // update localstorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart',JSON.stringify(cart));

    loadCart();
    updateTotal();
}


//quantity changes
function quantitychanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }

    var cartRow = input.closest('tr');
    var title = cartRow.getElementsByClassName('cart_name')[0].innerText;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var item = cart.find(item => item.title ===title);
    if (item){
        item.quantity = parseInt(input.value);
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    updateCartIconQuantity();
    updateTotal();
}


// Add product to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest('.box');

    var title = shopProducts.getElementsByClassName('product_title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product_img')[0].src;
    var quantity = parseFloat(shopProducts.getElementsByClassName('pquantity')[0].value);

    addProductToCart(title, price, productImg, quantity);
    updateCartIconQuantity();
    updateTotal();
}


// Store cart details in localStorage
function addProductToCart(title, price, productImg, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    if (cart.some(item => item.title === title)) {
        swal("You have already added this item to cart");
        return;
    }

    cart.push({ title, price, productImg, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart();
}


// load that cart infro on cart page
function loadCart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItems = document.getElementsByClassName('cart_content')[0];
    
    // clear any existing content
    cartItems.innerHTML = '';

    cart.forEach(item => {
        var cartShopBox = document.createElement('tr');
        cartShopBox.classList.add('cart_box');

        var cartBoxContent = `
                            <td>
                                <img src="${item.productImg}" alt="${item.title}">
                            </td>
                            <td>
                                <section class="cart_info">
                                    <h4 class="cart_name">${item.title}</h4>
                                    <span class="cart_price">${item.price}</span><br>
                                    <span>Quantity :</span><input type="number" value="${item.quantity}" min="1" class="cart_quantity" name="quantity">                                     
                                </section>
                            </td>
                            <td>
                                <section class="remove_item">
                                    <i class="fa-solid fa-trash"></i>
                                </section>
                            </td>`;
        
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);

        cartShopBox
            .getElementsByClassName('remove_item')[0]
            .addEventListener('click', removeCartItem);
        cartShopBox
            .getElementsByClassName('cart_quantity')[0]
            .addEventListener('change', quantitychanged);   
    });

    updateCartIconQuantity();
    updateTotal();
}


// update total price 
function updateTotal(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var total = 0;

    cart.forEach(item => {
        var price = parseFloat(item.price.replace('Rs.', ''));
        total += price *item.quantity;
    });

    document.getElementsByClassName('total_price')[0].innerText = 'Rs.' + total.toFixed(2);
}


// function to update the cart icon quantity
function updateCartIconQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let iconCartSpan = document.getElementsByClassName('cart_icon_quantity');
    let cartIconQuantity = 0;

    cart.forEach(item => {
        cartIconQuantity += item.quantity;
    });

    // Update all cart icon span elements with the new quantity
    for (let i = 0; i < iconCartSpan.length; i++) {
        iconCartSpan[i].innerText = cartIconQuantity;
    }
}


// back to top button 
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back_to_top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { 
            backToTopButton.style.display = 'flex'; 
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

    updateCartIconQuantity();

});
