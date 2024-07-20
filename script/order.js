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
    event.preventDefault(); 

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
        // Refresh the page
        window.location.reload();
    });

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
});
