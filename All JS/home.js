

let openTrailer = () => {
    document.querySelector(".trailer-our-hotel").style.display = "flex";
    document.querySelector(".trailer-our-hotel video").play();
}
let closeTrailer = () => {
    document.querySelector(".trailer-our-hotel").style.display = "none";
    document.querySelector(".trailer-our-hotel video").pause();
    document.querySelector(".trailer-our-hotel video").currentTime = 0;
}


let crousel = document.getElementById("crousel");
let slides = document.querySelectorAll(".slide");
let counter = 0;
let sliderNum = 1;
let sliderLength = slides.length;

let sliderDots = document.querySelector(".slider-dots");
for (let i = 0; i < sliderLength; i++) {
    var dotsDiv = document.createElement("div");
    dotsDiv.className = "dot";
    sliderDots.appendChild(dotsDiv);
}

let resetBg = () => {
    allDot.forEach((eachDot) => {
        eachDot.style.backgroundColor = "#9b9999"
    })
}

let allDot = document.querySelectorAll(".dot");
allDot[0].style.backgroundColor = "#c4a676"

allDot.forEach((eachDot, i) => {
    eachDot.addEventListener("click", () => {
        resetBg();
        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${i * 100}%)`
            sliderNum = i + 1;
            eachDot.style.backgroundColor = "#c4a676"
        })
    })
})

let changeBg = () => {
    resetBg();
    allDot[sliderNum - 1].style.backgroundColor = "#c4a676";
}


slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`;
    })

setInterval(() => {
    if (sliderNum < sliderLength) {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(-${sliderNum * 100}%)`;
            }
        );
        sliderNum++;
    } else {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(0%)`;
            }
        );
        sliderNum = 1;
    }
    changeBg();
}, 3000);


let goNext = () => {

    if (sliderNum < sliderLength) {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(-${sliderNum * 100}%)`
            }
        )
        sliderNum++;
    }
    else {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(0%)`
            }
        )
        sliderNum = 1;
    }
    changeBg();
}
let goPrev = () => {
    if (sliderNum > 1) {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(-${(sliderNum - 2) * 100}%)`
            }
        )
        sliderNum--;
    }
    else {
        slides.forEach(
            (slide) => {
                slide.style.transform = `translateX(-${(sliderLength - 1) * 100}%)`
            }
        )
        sliderNum = sliderLength;
    }
    changeBg();
}

// for special rooms slider section
fetch('./roomsData.json')
    .then(res => res.json())
    .then(roomsData => {
        let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || []

        roomsData.slice(0, 4).forEach((room) => {
            let roomSlider = document.querySelector("#special-rooms-section .room-slider");
            let isBooked = bookedRooms.find(rooms => rooms.id == room.id);
            roomSlider.innerHTML += `
            <div class="room">
                <img src="${room.image}" alt="room-image">
                <div id="content">
                    <p class="booked-text" style="${isBooked ? 'display: block;' : 'display: none;'}">Booked</p>
                    <div class="msg">add wishlist</div>
                    <button id="whishlist-btn" onclick="addToWishlist(${room.id})"
                    onmouseover="overOnWishlistBtn(this)" onmouseleave="leaveOnWishlistBtn(this)"><i class="fa-regular fa-heart"></i></button>
                    <h1>${room.name}</h1>
                    <p>${room.description}</p>
                    <div class="about-room">
                        <div class="for-guest">
                            <i class="fa-regular fa-user"></i>
                            <p>${room.guest} guest</p>
                        </div>
                        <div class="for-bed">
                            <i class="fa-solid fa-bed"></i>
                            <p>${room.bed} bed</p>
                        </div>
                        <div class="for-bath">
                            <i class="fa-solid fa-bath"></i>
                            <p>${room.bath} bath</p>
                        </div>
                    </div>
                    <h3>$${room.price}/Night</h3>
                </div>`

        })
    })

let currentIndex = 0;

const updateSlider = () => {
    document.querySelector('#rooms-section .room-slider').style.transform = `translateX(-${currentIndex * 100 / 4}%)`;
}

document.querySelector('#rooms-section .next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 4; // Assuming there are 3 rooms
    updateSlider();
});

document.querySelector('#rooms-section .prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 4) % 4; // Ensuring the index is positive and wraps around correctly
    updateSlider();
});

updateSlider(); // Initialize slider position


fetch("../roomsData.json")
    .then(res => res.json())
    .then(allRooms => {
        let rooms_and_suites = document.querySelector(".rooms-and-suites");
        let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || [];

        allRooms.slice(2, 8).forEach(eachRoom => {

            let isBooked = bookedRooms.find(rooms => rooms.id == eachRoom.id);

            rooms_and_suites.innerHTML += `<div class="each-room" data-aos="flip-left" data-aos-duration="1000">
                <div class="image" onmouseover="overRoomImage(this)" onmouseleave="leaveRoomImage(this)">
                    <img src="${eachRoom.image}" alt="${eachRoom.name}">
                     <p id="booked-text" style="${isBooked ? 'display: block;' : 'display: none;'}">Booked</p>
                    <div class="msg">add wishlist</div>
                    <button class="view-image" onclick="viewFullImage(this)"><i class="fa-solid fa-expand"></i></button>
                    <button class="whishlist-btn" id="wishlist-btn" onclick="addToWishlist(${eachRoom.id})"
                    onmouseover="overOnWishlistBtn(this)" onmouseleave="leaveOnWishlistBtn(this)"><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="each-room-content">
                <h1>${eachRoom.name}</h1>
                <p>
                   ${eachRoom.description}
                </p>
                <div class="about-room">
                    <div class="for-guest">
                        <i class="fa-regular fa-user"></i>
                        <span>${eachRoom.guest} guest</span>
                    </div>
                    <div class="for-bed">
                        <i class="fa-solid fa-bed"></i>
                        <span>${eachRoom.bed} bed</span>
                    </div>
                    <div class="for-bath">
                        <i class="fa-solid fa-bath"></i>
                        <span>${eachRoom.bath} bath</span>
                    </div>
                </div>
                <div class="price-and-link">
                    <h3>$${eachRoom.price}/night</h3>
                    <button onclick="viewDetail(${eachRoom.id})">view details <i class="fa-solid fa-arrow-right"></i></button>
                </div>
                </div>
            </div>`
        })
    })

let addToWishlist = (roomId) => {
    let addRoomMsg = document.getElementById("wishlist-add-msg");
    addRoomMsg.style.visibility = "visible";
    addRoomMsg.style.opacity = "1";
    setTimeout(function () {
        addRoomMsg.style.visibility = "hidden";
        addRoomMsg.style.opacity = "0";
    }, 800);
    fetch("./roomsData.json")
        .then(res => res.json())
        .then(roomsData => {
            let whishlistArr = JSON.parse(localStorage.getItem("wishlist")) || [];
            let filteredRoom = roomsData.find(data => data.id == roomId);
            if (!whishlistArr.find(data => data.id == roomId)) {
                whishlistArr.push(filteredRoom);
                localStorage.setItem("wishlist", JSON.stringify(whishlistArr));
                displayWishlistData();
            }
            else {
                addRoomMsg.innerHTML =
                    `
                    <div class="left-design"></div>
                    <i class="fa-regular fa-face-smile-beam"></i>
                    <p>already added!</p>
                    `
            }
        })
}
let displayWishlistData = () => {
    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistRooms = document.querySelector(".main-content-rooms");
    let count = document.getElementById("whishlist-count");
    let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || [];
    let emptyMsg = document.getElementById("wishlist-empty-msg");

    // Ensure wishlistRooms and count elements exist
    if (wishlistRooms) {
        if (wishlistData.length === 0) {
            emptyMsg.innerHTML = "empty Wishlist";
            wishlistRooms.innerHTML = ""; // Clear room content if empty
        } else {
            emptyMsg.innerHTML = "Your Wishlist";
            wishlistRooms.innerHTML = "";
            wishlistData.forEach(rooms => {
                let isBooked = bookedRooms.find(room => room.id == rooms.id);

                wishlistRooms.innerHTML += `
                    <div class="room">
                        <div class="image">
                            <img src="${rooms.image}" alt="${rooms.name}" onclick="viewFullImage(this)">
                        </div>
                        <div class="room-content">
                            <div class="name-and-price">
                                <p class="name">${rooms.name}</p>
                                <p class="price">$${rooms.price}/Night</p>
                            </div>
                            <button class="book-now-btn" onclick="bookRoom(${rooms.id})" 
                            style="${!isBooked ? 'display: block;' : 'display: none;'}">book now</button>
                            <button class="booked-btn" 
                            style="${isBooked ? 'display: block;' : 'display: none;'}">booked</button>
                        </div>
                        <i class="fa-regular fa-trash-can" id="delete-icon" onclick="deleteRoom(${rooms.id})"></i>
                    </div>`;
            });
        }
    } else {
        console.error('Element with class "main-content-rooms" not found.');
    }

    // Ensure count element exists
    if (count) {
        count.innerHTML = wishlistData.length;
    } else {
        console.error('Element with id "whishlist-count" not found.');
    }

}


let overOnWishlistBtn = (a) => {
    a.parentElement.querySelector(".msg").style.transform = "translateY(0px)";
    a.parentElement.querySelector(".msg").style.visibility = "visible";
    a.parentElement.querySelector(".msg").style.opacity = "1";
}

let leaveOnWishlistBtn = (a) => {
    a.parentElement.querySelector(".msg").style.transform = "translateY(25px)";
    a.parentElement.querySelector(".msg").style.visibility = "hidden";
    a.parentElement.querySelector(".msg").style.opacity = "0";
}

function overRoomImage(imageDiv) {
    let viewImageButton = imageDiv.querySelector(".view-image");
    viewImageButton.style.transform = "translate(0px)";
    viewImageButton.style.visibility = "visible";
    viewImageButton.style.opacity = "1"
}
function leaveRoomImage(imageDiv) {
    let viewImageButton = imageDiv.querySelector(".view-image");
    viewImageButton.style.transform = "translate(100%)";
    viewImageButton.style.visibility = "hidden";
    viewImageButton.style.opacity = "0"
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
let viewDetail = (roomId) => {
    window.location.href = `./All HTML/room-detail.html?id=${roomId}`;
}

const countValues = document.querySelectorAll('#counting-section span');
const interval = 2000; // total duration for the count (in milliseconds)
let countersStarted = new Set(); // Track which counters have started

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const startCounting = (countValue) => {
    if (countersStarted.has(countValue)) return; // Skip if already started

    let startCount = parseInt(countValue.textContent);
    let endCount = parseInt(countValue.getAttribute("count-value"));
    let duration = Math.floor(interval / endCount);
    countersStarted.add(countValue); // Mark as started
    let counter = setInterval(() => {
        startCount += 1;
        countValue.textContent = startCount;
        if (startCount == endCount) {
            clearInterval(counter);
        }
    }, duration);
};

const checkCounters = () => {
    countValues.forEach(countValue => {
        if (isInViewport(countValue)) {
            startCounting(countValue);
        }
    });
};

window.addEventListener('scroll', checkCounters);
window.addEventListener('resize', checkCounters);

// Initial check in case elements are already in view on page load
checkCounters();

function onlyAlphabet(e) {
    let alphabet = e.which;
    if (alphabet != 32 && (alphabet < 65 || alphabet > 90) && (alphabet < 97 || alphabet > 122)) {
        return false;
    }
}

let email = document.getElementById("email");
let emailErr = document.querySelector(".email .email-error");
let Name = document.getElementById("name");
let nameErr = document.querySelector(".name .name-error");
let msg = document.getElementById("message");
let msgErr = document.querySelector(".msg .msg-error");

function checkFoam(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;
    ;
    let succesMsg = document.querySelector("#wishlist-add-msg p");

    if (Name.value == "") {
        Name.style.border = "1px solid red";
        nameErr.innerHTML = "Please enter name!"
        nameErr.style.visibility = "visible";
    }
    else if (email.value == "") {
        email.style.border = "1px solid red";
        emailErr.innerHTML = "Please enter email!"
        emailErr.style.visibility = "visible";
    }
    else if (!emailRegex.test(email.value)) {
        email.style.border = "1px solid red";
        emailErr.innerHTML = "Please enter valid email!"
        emailErr.style.visibility = "visible";
    }
    else if (msg.value == "") {
        msg.style.border = "1px solid red";
        msgErr.innerHTML = "Please write your msg!"
        msgErr.style.visibility = "visible";
    }
    else {
        let addRoomMsg = document.getElementById("wishlist-add-msg");
        addRoomMsg.style.visibility = "visible";
        addRoomMsg.style.opacity = "1";
        succesMsg.innerHTML = "Msg Successfully Sent!"
        setTimeout(function () {
            addRoomMsg.style.visibility = "hidden";
            addRoomMsg.style.opacity = "0";
        }, 800);

        Name.value = "";
        email.value = "";
        msg.value = "";
    }
}


function fillInputsFields() {
    Name.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    nameErr.style.visibility = "hidden";
    nameErr.innerHTML = ".";

    email.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    emailErr.style.visibility = "hidden";
    emailErr.innerHTML = ".";

    msg.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    msgErr.style.visibility = "hidden";
    msgErr.innerHTML = ".";
}


function showFollowDiv(a) {
    a.querySelector('.social-media').style.visibility = 'visible';
    a.querySelector('.social-media').style.opacity = '1';
}
function hideFollowDiv(a) {
    a.querySelector('.social-media').style.visibility = 'hidden';
    a.querySelector('.social-media').style.opacity = '0';
}


function scrollToAbout() {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToServices() {
    const servicesSection = document.getElementById('extra-services-section');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToRooms() {
    const roomsSection = document.getElementById('rooms-and-suites-section');
    if (roomsSection) {
        roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToTeam() {
    const teamSection = document.getElementById('meat-team-section');
    if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToTestimonials() {
    const testimonialsSection = document.getElementById('clients-review-section');
    if (testimonialsSection) {
        testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToContacts() {
    const contactSection = document.getElementById('contact-us-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


window.addEventListener('load', () => {
    const scrollToAboutSec = sessionStorage.getItem('scrollToAbout');
    const scrollToServicesSec = sessionStorage.getItem('scrollToServices');
    const scrollToRoomsSec = sessionStorage.getItem('scrollToRooms');
    const scrollToTeamSec = sessionStorage.getItem('scrollToTeam');
    const scrollToTestimonialsSec = sessionStorage.getItem('scrollToTestimonials');
    const scrollToContactSec = sessionStorage.getItem('scrollToContact');

    if (scrollToAboutSec === 'true') {
        setTimeout(() => {
            scrollToAbout();
            sessionStorage.removeItem('scrollToAbout');
        }, 300)
    }
    else if (scrollToServicesSec === 'true') {
        setTimeout(() => {
            scrollToServices();
            sessionStorage.removeItem('scrollToServices');
        }, 300)
    }
    else if (scrollToRoomsSec === 'true') {
        setTimeout(() => {
            scrollToRooms();
            sessionStorage.removeItem('scrollToRooms');
        }, 300)
    }
    else if (scrollToTeamSec === 'true') {
        setTimeout(() => {
            scrollToTeam();
            sessionStorage.removeItem('scrollToTeam');
        }, 300)
    }
    else if (scrollToTestimonialsSec === 'true') {
        setTimeout(() => {
            scrollToTestimonials();
            sessionStorage.removeItem('scrollToTestimonials');
        }, 300)
    }
    else if (scrollToContactSec === 'true') {
        setTimeout(() => {
            scrollToContacts();
            sessionStorage.removeItem('scrollToContact');
        }, 300)
    }
});