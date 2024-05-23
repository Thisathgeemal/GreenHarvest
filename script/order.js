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

function closeSearch() {
    const searchBar = document.getElementById('search_bar');
    searchBar.style.display = 'none';
}

// submission conform alert 
function submitForm(event) {
    event.preventDefault(); 
    swal("Success!", "Your order has been successfully submitted!", "success");
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
