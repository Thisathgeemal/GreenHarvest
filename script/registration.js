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

// subscribe conform alert 
function subscribe(scheme) {
    // Set the scheme input value
    document.getElementById('scheme').value = scheme;
    swal("Success!", "You have successfully subscribed to the " + scheme+ "  Scheme!", "success");
}

// submission conform alert 
function submitForm(event) {
    event.preventDefault(); 
    swal("Success!", "Registration Successful!", "success");
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
