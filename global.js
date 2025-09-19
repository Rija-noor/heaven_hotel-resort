function handleScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 70) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
}

function checkScreenSize() {
    if (window.innerWidth > 1024) {
        window.addEventListener('scroll', handleScroll);
    } else {
        window.removeEventListener('scroll', handleScroll);
        const navbar = document.querySelector('nav');
        navbar.classList.remove('fixed');
    }
}
checkScreenSize();

window.addEventListener('resize', checkScreenSize);



let openSideNav = () => {
    let sideNav = document.getElementById("sideNavbar");
    sideNav.style.transform = "translateY(0px)"
    sideNav.style.opacity = "1"
}
let closeSideNav = () => {
    let sideNav = document.getElementById("sideNavbar");
    sideNav.style.transform = "translateY(0px)"
    sideNav.style.opacity = "0"
}

let openWishlist = () => {
    document.getElementById("wishlist").style.transform = "translateX(0px)";
    document.getElementById("wishlist").style.opacity = "1";
    document.getElementById("wishlist").style.transition = "all ease .4s";
    document.getElementById("shade").style.display = "block";
}
let closeWishlist = () => {
    document.getElementById("wishlist").style.transform = "translateX(100%)";
    document.getElementById("wishlist").style.opacity = "0";
    document.getElementById("wishlist").style.transition = "all ease .4s";
    document.getElementById("shade").style.display = "none";
}
let deleteRoom = (roomId) => {
    let addRoomMsg = document.getElementById("wishlist-remove-msg");
    addRoomMsg.style.visibility = "visible";
    addRoomMsg.style.opacity = "1";
    setTimeout(function () {
        addRoomMsg.style.visibility = "hidden";
        addRoomMsg.style.opacity = "0";
    }, 800);

    let wishlistArr = JSON.parse(localStorage.getItem("wishlist"));
    wishlistArr = wishlistArr.filter(room => room.id != roomId);
    localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
    displayWishlistData();
}

let clearWishlistBtn = document.querySelector(".clear-wishlist");
let clearWishlist = () => {
    localStorage.removeItem("wishlist");
    let count = document.getElementById("whishlist-count");
    count.innerHTML = 0;
    displayWishlistData();
}
clearWishlistBtn.addEventListener("click", clearWishlist)

window.onload = displayWishlistData();

function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function goToAbout() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToAbout', 'true');
        window.location.pathname = "../index.html";

    } 
    else {
       scrollToAbout();
    }
}
function goToServices() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToServices', 'true');
        window.location.pathname = "../index.html";
    }
    else{
        scrollToServices();
    }
}
function goToRooms() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToRooms', 'true');
        window.location.pathname = "../index.html";
    }
    else{
        scrollToRooms();
    }
}
function goToTeam() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToTeam', 'true');
        window.location.pathname = "../index.html";
    }
    else{
        scrollToTeam();
    }
}
function goToTestimonials() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToTestimonials', 'true');
        window.location.pathname = "../index.html";
    }
    else{
        scrollToTestimonials();
    }
}
function goToContact() {
    if (window.location.pathname !== "/index.html") {
        sessionStorage.setItem('scrollToContact', 'true');
        window.location.pathname = "../index.html";
    }
    else{
        scrollToContacts();
    }
}





function bookRoom(id) {
    let loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));
    
    if (loggedInUser) {
        window.location.href = `../All HTML/booking.html?id=${id}`;
    } else {
        // Store the booking page URL with the room ID in sessionStorage
        sessionStorage.setItem("redirectAfterLogin", `../All HTML/booking.html?id=${id}`);
        window.location.href = '../All HTML/login-page.html';
    }
}


let navLogo = document.querySelector("nav .left img")
navLogo.addEventListener('click', function () {
    if (window.location.pathname != 'index.html') {
        window.location.href = "../index.html";
    }
    else {
        window.location.href = "./index.html";
    }

})

let signupUsers = JSON.parse(localStorage.getItem("users"));
let loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));

if (signupUsers && loggedInUser) {

    let profile = document.querySelector("#right #profile");    
    let avatarPic = "../images/no-img2.jpg";
    let username = document.getElementById("username");    
    let logOutLink = document.getElementById("logout-link");
    let loginLink = document.getElementById("login-link");
    let sureMsg = document.getElementById("logout-msg");
    let shade = document.getElementById("shade");
    let sureMsgNoBtn = document.getElementById("no-btn");
    let sureMsgYesBtn = document.getElementById("yes-btn");

    loginLink.style.display = "none";
    logOutLink.style.display = "block";

    logOutLink.onclick = function () {
        sureMsg.style.display = "flex";
        shade.style.display = "block";
    }

    sureMsgNoBtn.onclick = function () {
        sureMsg.style.display = "none";
        shade.style.display = "none";
    }

    sureMsgYesBtn.onclick = function () {
        localStorage.removeItem("logged-in-user");
        loginLink.style.display = "block";
        logOutLink.style.display = "none";
        profile.src = avatarPic;
        sureMsg.style.display = "none";
        shade.style.display = "none";
        username.innerHTML = "";
    }

    let fullUserData = signupUsers.find(user => user.id === loggedInUser.id);
    

    if (fullUserData) {
        profile.src = fullUserData.image || avatarPic;
        username.innerHTML = fullUserData.name || "";
    } else {
        profile.src = avatarPic;
        username.innerHTML = "";
    }
}

function viewFullImage(viewBtn) {
    let bigImageDiv = document.querySelector(".view-big-image");
    bigImageDiv.style.display = "block";
    let bigImage = document.querySelector(".big-image");
    let closeIcon = document.querySelector(".view-big-image i");
    let imageSrc = viewBtn.parentElement.querySelector("img").src;
    bigImage.src = imageSrc;
    closeIcon.addEventListener("click", function () {
        bigImageDiv.style.display = "none";
    });
}