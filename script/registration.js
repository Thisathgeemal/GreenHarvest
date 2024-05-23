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

// subscribe conform alert 
function subscribe(scheme) {
    // Set the scheme input value
    document.getElementById('scheme').value = scheme;
    // Display success alert
    swal("Success!", "You have successfully subscribed to the " + scheme+ "  Scheme!", "success");
}

// submission conform alert 
function submitForm(event) {
    event.preventDefault(); 
    swal("Success!", "Registration Successful!", "success");
}
