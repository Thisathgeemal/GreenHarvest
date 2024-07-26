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


// submission conform alert 
function submitForm(event) {

    // calculate the dilivery date
    let today = new Date();
    let deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4);

    // format of dilivery date
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);
    
    // display the alert
    swal("Success!", `Your order has been successfully submitted! Your items will arrive on ${formattedDeliveryDate}.`, "success");

}


// add to favorites 
function addToFavorites() {
    // Validate form inputs
    let isValid = true;
    let formData = {};
    document.querySelectorAll('.order_details input').forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
        formData[input.name] = input.value;
    });

    if (!isValid) {
        swal("Error", "Please fill in all required fields before saving to favorites.", "error");
        return;
    }

    // Get product details
    let products = [];
    document.querySelectorAll('.cart_content tr').forEach(row => {
        let product = {
            image: row.querySelector('img').src,
            name: row.querySelector('.cart_name').innerText,
            price: row.querySelector('.cart_price').innerText,
            quantity: row.querySelector('.cart_quantity').value
        };
        products.push(product);
    });

    // Store in local storage
    localStorage.setItem('favorites', JSON.stringify({ products, formData }));

    // Confirmation
    swal("Success!", "Favorites have been saved.", "success");
}


// apply favorites 
function applyFavorites(){
    // Retrieve from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites) {
        
        let cartContent = document.querySelector('.cart_content');
        cartContent.innerHTML = '';
        favorites.products.forEach(product => {
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
                                    <i class="fa-solid fa-trash"></i>
                                </section>
                            </td>
                    </tr>`;
            cartContent.insertAdjacentHTML('beforeend', row);
        });

        // favorites form fields
        Object.keys(favorites.formData).forEach(key => {
            let input = document.querySelector(`.order_details [name=${key}]`);
            if (input) {
                input.value = favorites.formData[key];
            }
        });

        // confirmation
        swal("Success!", `Favorites have been applied.`, "success");
    } else {
        swal("error!", `You have not saved any favorites yet.`, "error");
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
