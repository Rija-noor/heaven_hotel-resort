// Navbar links
let loginLnk = document.getElementById("login-link");
let signupLink = document.getElementById("signup-link");

// Signup fields
let signupName = document.getElementById("name");
let signupEmail = document.getElementById("signup-email");
let signupPass = document.getElementById("signup-password");

// Signup error messages
let nameErr = document.querySelector(".name-error");
let emailErr = document.querySelector(".email-error");
let passErr = document.querySelector(".pass-error");

// Profile picture elements
let profilePic = document.getElementById("profile-img");
let imgFile = document.getElementById("img-file");

// Profile picture preview
imgFile.onchange = function () {
    var file = imgFile.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
        profilePic.src = fileReader.result;
    });
};

// Get users from localStorage or initialize empty array
let usersArr = JSON.parse(localStorage.getItem("users")) || [];
let forEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;

function signup() {
    // Validate input fields
    if (signupName.value.trim() == "") {
        signupName.style.border = "1px solid #960018";
        nameErr.innerHTML = "Please enter name!";
        nameErr.style.visibility = "visible";
        return;
    }
    else if (signupEmail.value.trim() == "") {
        signupEmail.style.border = "1px solid #960018";
        emailErr.innerHTML = "Please enter email!";
        emailErr.style.visibility = "visible";
        return;
    }
    else if (!forEmail.test(signupEmail.value.trim())) {
        signupEmail.style.border = "1px solid #960018";
        emailErr.innerHTML = "Enter valid email address!";
        emailErr.style.visibility = "visible";
        return;
    }
    else if (signupPass.value.trim() == "") {
        signupPass.style.border = "1px solid #960018";
        passErr.innerHTML = "Please enter password!";
        passErr.style.visibility = "visible";
        return;
    }
    else if (signupPass.value.length <= 7) {
        signupPass.style.border = "1px solid #960018";
        passErr.innerHTML = "Password must be at least 8 characters!";
        passErr.style.visibility = "visible";
        return;
    }
    else {
        // Check for duplicate email
        let existingUser = usersArr.find(user => user.email === signupEmail.value.trim());
        if (existingUser) {
            emailErr.innerHTML = "Email already registered!";
            emailErr.style.visibility = "visible";
            return;
        }

        // Generate unique ID for the new user
        let userId = localStorage.getItem("userIdCounter") || 0;
        userId++;
        localStorage.setItem("userIdCounter", userId);

        // Store user data
        let newUser = {
            id: userId,
            name: signupName.value.trim(),
            email: signupEmail.value.trim(),
            password: signupPass.value.trim(),
            image: profilePic.src,
        };

        usersArr.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersArr));
        localStorage.setItem("logged-in-user", JSON.stringify({ id: newUser.id }));

        // Redirect after signup
        let redirectUrl = sessionStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
            sessionStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectUrl;
        } else {
            let referrerUrl = document.referrer || "../index.html";
            window.location.href = referrerUrl;
        }
    }
}

// Reset errors on input
signupName.oninput = function () {
    signupName.style.border = "1px solid silver";
    nameErr.style.visibility = "hidden";
};
signupEmail.oninput = function () {
    signupEmail.style.border = "1px solid silver";
    emailErr.style.visibility = "hidden";
};
signupPass.oninput = function () {
    if (signupPass.value.length <= 7) {
        signupPass.style.border = "1px solid #960018";
        passErr.innerHTML = "Poor password";
        passErr.style.visibility = "visible";
        passErr.style.color = "#960018";
    }
    else if (signupPass.value.length <= 10) {
        signupPass.style.border = "1px solid green";
        passErr.innerHTML = "Good password";
        passErr.style.visibility = "visible";
        passErr.style.color = "green";
    }
    else {
        signupPass.style.border = "1px solid green";
        passErr.innerHTML = "Excellent";
        passErr.style.visibility = "visible";
        passErr.style.color = "green";
    }
};

// Toggle password visibility
let signupOpenEye = document.getElementById("signup-open-eye");
let signupCloseEye = document.getElementById("signup-close-eye");

function seePass() {
    signupPass.type = "text";
    signupCloseEye.style.display = "block";
    signupOpenEye.style.display = "none";
}

function hidePass() {
    signupPass.type = "password";
    signupCloseEye.style.display = "none";
    signupOpenEye.style.display = "block";
}
function alphabet(e) {
    let alphabets = e.keyCode;
    return ((alphabets >= 65 && alphabets <= 90) || (alphabets >= 97 && alphabets <= 122) || alphabets == 32)
}