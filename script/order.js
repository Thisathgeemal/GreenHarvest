// onclick menu 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// onclick searchbar 
function toggleSearch() {
    const searchBar = document.getElementById('search_bar');
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
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


// Create function
function ready() {
    // Remove items from cart
    var removeCartIcons = document.getElementsByClassName('remove_item');
    for (var i = 0; i < removeCartIcons.length; i++) {
        var icon = removeCartIcons[i];
        icon.addEventListener('click', removeCartItem);
    }

    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart_quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    var addCartButtons = document.getElementsByClassName('btn');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }

    // Load cart info from localStorage
    loadCart();

    // Update cart icon quantity
    updateCartIconQuantity();
}


// Remove items from cart
function removeCartItem(event) {
    var iconClicked = event.target.closest('.remove_item');
    var cartRow = iconClicked.closest('tr');
    var title = cartRow.getElementsByClassName('cart_name')[0].innerText;

    // Update localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart();
    updateCartIconQuantity();
    updateTotal();
}


// Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    var cartRow = input.closest('tr');
    var title = cartRow.getElementsByClassName('cart_name')[0].innerText;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var item = cart.find(item => item.title === title);
    if (item) {
        item.quantity = parseFloat(input.value);
        localStorage.setItem('cart', JSON.stringify(cart));
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


// Load cart info on cart page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItems = document.getElementsByClassName('cart_content')[0];

    // Clear any existing content
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

        cartShopBox.getElementsByClassName('remove_item')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart_quantity')[0].addEventListener('change', quantityChanged);
    });

    updateCartIconQuantity();
    updateTotal();
}


// Update total price
function updateTotal() {
    let cartContent = document.querySelector('.cart_content');
    let rows = cartContent.getElementsByTagName('tr');
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let priceElement = row.querySelector('.cart_price');
        let quantityElement = row.querySelector('.cart_quantity');
        let price = parseFloat(priceElement.innerText.replace('Rs.', ''));
        let quantity = parseFloat(quantityElement.value);
        total += price * quantity;
    }

    document.getElementsByClassName('total_price')[0].innerText = 'Rs.' + total.toFixed(2);
}


// Function to update the cart icon quantity
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


// Add to favorites
function addToFavorites() {
    let products = [];
    var cartItems = document.querySelectorAll('.cart_content tr');
  
    // check if there are any products in the cart
    if (cartItems.length === 0) {
      swal("Error!", "No products in the cart to add to favorites.", "error");
      return;
    }
  
    cartItems.forEach(row => {
      let product = {
        image: row.querySelector('img').src,
        name: row.querySelector('.cart_name').innerText,
        price: row.querySelector('.cart_price').innerText,
        quantity: row.querySelector('.cart_quantity').value
      };
      products.push(product);
    });
  
    // Store in local storage
    localStorage.setItem('favorites', JSON.stringify(products));
  
    // Confirmation
    swal("Success!", "Favorites have been saved.", "success");
}


// Apply favorites 
function applyFavorites() {
    // retrieve from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    // check any favorites are saved
    if (favorites) {
        let cartContent = document.querySelector('.cart_content');
        cartContent.innerHTML = '';

        // create a table row for favorite items
        favorites.forEach(product => {
            let row = `<tr>
                            <td>
                                <img src="${product.image}" alt="${product.name}">
                            </td>
                            <td>
                                <section class="cart_info">
                                    <h4 class="cart_name">${product.name}</h4>
                                    <span class="cart_price">${product.price}</span><br>
                                    <span>Quantity :</span><input type="number" value="${product.quantity}" min="1" class="cart_quantity" name="quantity">                                     
                                </section>
                            </td>
                            <td>
                                <section class="remove_item">
                                    <i class="fa-sharp fa-solid fa-heart"></i>
                                </section>
                            </td>
                        </tr>`;
            cartContent.insertAdjacentHTML('beforeend', row);

            // update the product quantity to the product box
            updateProductQuantityInBox(product.name, product.quantity);
        });
        
        updateTotal()

        // confirmation
        swal("Success!", "Favorites have been applied.", "success");
    } else {
        swal("Error!", "You have not saved any favorites yet.", "error");
    }
}


// Apply favorites for checkOut 
function applyFavoritesForCheckOut() {
    // retrieve from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    // check any favorites are saved
    if (favorites) {
        let cartContent = document.querySelector('.cart_content');
        cartContent.innerHTML = '';

        // create a table row for favorite items
        favorites.forEach(product => {
            let row = `<tr>
                            <td>
                                <img src="${product.image}" alt="${product.name}">
                            </td>
                            <td>
                                <section class="cart_info">
                                    <h4 class="cart_name">${product.name}</h4>
                                    <span class="cart_price">${product.price}</span><br>
                                    <span>Quantity :</span><input type="number" value="${product.quantity}" min="1" class="cart_quantity" name="quantity">                                     
                                </section>
                            </td>
                            <td>
                                <section class="remove_item">
                                    <i class="fa-sharp fa-solid fa-heart"></i>
                                </section>
                            </td>
                        </tr>`;
            cartContent.insertAdjacentHTML('beforeend', row);
        });
        
        updateTotal()

        // confirmation
        swal("Success!", "Favorites have been applied.", "success");
    } else {
        swal("Error!", "You have not saved any favorites yet.", "error");
    }
}


// Function to update product quantity in product box
function updateProductQuantityInBox(productName, quantity) {
    // select product box using data attribute matching
    let productBox = document.querySelector(`.box[data-product-name="${productName}"]`);
  
    // If the product box is found
    if (productBox) {
        let productQuantityDisplay = productBox.querySelector('.pquantity');

        // update quantity display element value
        if (productQuantityDisplay) {
        productQuantityDisplay.value = quantity;

        } else {
            console.warn(`Could not find quantity display element for product Name: ${productName}`);
        }

    } else {
        console.warn(`Could not find product box element for product Name: ${productName}`);
    }
}


// submission conform alert 
function submitForm(event) {
    event.preventDefault();
    localStorage.removeItem('cart');
    
    // calculate the dilivery date
    let today = new Date();
    let deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4);

    // format of dilivery date
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);
    
    // display the alert
    swal("Success!", `Your order has been successfully submitted! Your items will arrive on ${formattedDeliveryDate}.`, "success")
    .then(() => {
        // refresh the page
        window.location.reload();
    });
}


// Back to top button
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
