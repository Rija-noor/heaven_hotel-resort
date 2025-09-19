// Login elements
let loginEmail = document.getElementById("login-email");
let loginPass = document.getElementById("login-password");
let loginMsg = document.getElementById("login-msg");

// Error elements
let loginEmailErr = document.querySelector(".email-error");
let loginPassErr = document.querySelector(".pass-error");

function login() {
    let email = loginEmail.value.trim();
    let password = loginPass.value.trim();
    let forEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;

    // Validate email and password
    if (email === "") {
        loginEmail.style.border = "1px solid #960018";
        loginEmailErr.innerHTML = "Please enter email!";
        loginEmailErr.style.visibility = "visible";
        return;
    }
    else if (!forEmail.test(email)) {
        loginEmail.style.border = "1px solid #960018";
        loginEmailErr.innerHTML = "Enter valid email address!";
        loginEmailErr.style.visibility = "visible";
        return;
    }
    else if (password === "") {
        loginPass.style.border = "1px solid #960018";
        loginPassErr.innerHTML = "Please enter password!";
        loginPassErr.style.visibility = "visible";
        return;
    }
    else if (password.length <= 7) {
        loginPass.style.border = "1px solid #960018";
        loginPassErr.innerHTML = "Password must be at least 8 characters!";
        loginPassErr.style.visibility = "visible";
        return;
    }

    // Get users from localStorage
    let usersArray = JSON.parse(localStorage.getItem("users")) || [];

    // Handle case where no users are found
    if (usersArray.length === 0) {
        loginMsg.innerHTML = "No user found, please sign up first!";
        loginMsg.style.visibility = "visible";
        return;
    }

    // Find user in usersArray
    let user = usersArray.find(user => user.email === email && user.password === password);

    if (user) {
        // Store logged-in user's ID in localStorage
        localStorage.setItem("logged-in-user", JSON.stringify({ id: user.id }));

        // Redirect based on session or to home page
        let redirectUrl = sessionStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
            sessionStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectUrl;
        } else {
            let referrerUrl = document.referrer || "../index.html";
            window.location.href = referrerUrl;
        }
    } else {
        loginMsg.innerHTML = "Incorrect email or password, please try again!";
        loginMsg.style.visibility = "visible";
    }
}

// Reset errors on input
loginEmail.oninput = function () {
    loginEmail.style.border = "1px solid silver";
    loginEmailErr.style.visibility = "hidden";
};
loginPass.oninput = function () {
    if (loginPass.value.length <= 7) {
        loginPass.style.border = "1px solid #960018";
        loginPassErr.innerHTML = "Poor password";
        loginPassErr.style.visibility = "visible";
        loginPassErr.style.color = "#960018";
    }
    else if (loginPass.value.length <= 10) {
        loginPass.style.border = "1px solid green";
        loginPassErr.innerHTML = "Good password";
        loginPassErr.style.visibility = "visible";
        loginPassErr.style.color = "green";
    }
    else {
        loginPass.style.border = "1px solid green";
        loginPassErr.innerHTML = "Excellent";
        loginPassErr.style.visibility = "visible";
    }
};

// Toggle password visibility
let loginOpenEye = document.getElementById("login-open-eye");
let loginCloseEye = document.getElementById("login-close-eye");

function seePass() {
    loginPass.type = "text";
    loginCloseEye.style.display = "block";
    loginOpenEye.style.display = "none";
}

function hidePass() {
    loginPass.type = "password";
    loginCloseEye.style.display = "none";
    loginOpenEye.style.display = "block";
}
