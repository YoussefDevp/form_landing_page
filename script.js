function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name === "" || email === "") {
        alert("Name and Email must be filled out");
        return false;
    }

    if (!email.includes('@')) {
        alert("Invalid email address");
        return false;
    }

    return true;
}