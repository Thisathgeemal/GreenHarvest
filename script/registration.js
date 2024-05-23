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
    swal("Success!", "Registration Successful!", "success");
}

// subscribe conform alert 
document.querySelectorAll('.subscribeButton').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        if (!isUserLoggedIn()) {
            swal("Error", "First, you have to log in to subscribe to this scheme!", "error");
        } else {
            swal("Success!", "You have successfully subscribed to the Scheme!", "success");
        }
    });
});

function isUserLoggedIn() {
    return false; 
}

