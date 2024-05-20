// onclick menu 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// login alert 
function submitForm(event) {
    event.preventDefault(); 
    swal("Success!", "You have successfully logged in!", "success");
}