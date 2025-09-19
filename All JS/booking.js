
let url = new URLSearchParams(window.location.search);
let roomId = url.get("id");
let bookBtn = document.getElementById("bookBtn");

// inputs and testarea
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("user-email");
let phoneNum = document.getElementById("phone");
let city = document.getElementById("city-input");
let address = document.getElementById("address-input");

let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;


// errors
let fnameErr = document.getElementById("fname-err");
let lnameErr = document.getElementById("lname-err");
let emailErr = document.getElementById("email-err");
let phoneErr = document.getElementById("phone-err");
let cityErr = document.getElementById("city-err");
let addressErr = document.getElementById("address-err");

let inputs = document.querySelectorAll("input");
let errors = document.querySelectorAll(".error-msg");
let textarea = document.querySelector("textarea")

bookBtn.addEventListener("click", () => {

    if (fname.value == "") {
        fname.classList.add("border-red");
        fnameErr.innerHTML = "Please Enter First Name!";
        fnameErr.style.visibility = "visible";
    }
    else if (lname.value == "") {
        lname.classList.add("border-red");
        lnameErr.innerHTML = "Please Enter Last Name!";
        lnameErr.style.visibility = "visible";
    }
    else if (email.value == "") {
        email.classList.add("border-red");
        emailErr.innerHTML = "Please Enter Email!";
        emailErr.style.visibility = "visible";
    }
    else if (!emailReg.test(email.value)) {
        email.classList.add("border-red");
        emailErr.innerHTML = "Please Enter Valid Email!";
        emailErr.style.visibility = "visible";
    }

    else if (phoneNum.value == "") {
        phoneNum.classList.add("border-red");
        phoneErr.innerHTML = "Please Enter Phone Number!";
        phoneErr.style.visibility = "visible";
    }
    else if (city.value == "") {
        city.classList.add("border-red");
        cityErr.innerHTML = "Please Enter city!";
        cityErr.style.visibility = "visible";
    }
    else if (address.value == "") {
        address.classList.add("border-red");
        addressErr.innerHTML = "Please Enter Address!";
        addressErr.style.visibility = "visible";
    }
    else {
        fetch("../roomsData.json")
            .then(res => res.json())
            .then(roomsData => {
                let filteredRoom = roomsData.find((room => room.id == roomId));
                let bookedRoomArr = JSON.parse(localStorage.getItem("booked-rooms")) || [];
                let roomExists = bookedRoomArr.some(room => room.id == filteredRoom.id);
                if (!roomExists) {
                    bookedRoomArr.push(filteredRoom)
                    localStorage.setItem("booked-rooms", JSON.stringify(bookedRoomArr));
                }
            })

        let shade = document.getElementById("shade")
        let loader = document.querySelector(".loader")
        let bookedMsg = document.querySelector(".booked-msg")
        shade.style.display = "block";
        loader.style.visibility = "visible";
        loader.style.opacity = "1";
        let progressBar = document.querySelector(".loader .progress")
        setTimeout(() => {
            progressBar.style.width = "100%";
        }, 0);
        setTimeout(() => {
            loader.style.opacity = "0"
            loader.style.visibility = "hidden";
            bookedMsg.style.opacity = "1"
            bookedMsg.style.visibility = "visible";
        }, 6200);


    }
})

function clearErrors() {
    inputs.forEach(input => {
        input.classList.remove("border-red");
    })
    errors.forEach(err => {
        err.style.visibility = "hidden";
    })
    textarea.classList.remove("border-red");
}

function fillInput() {
    clearErrors();
}


fetch("../roomsData.json")
    .then(res => res.json())
    .then(roomsData => {
        let filteredRoom = roomsData.filter((room => room.id == roomId));

        filteredRoom.forEach(eachRoom => {
            let roomsParent = document.querySelector("aside")
            roomsParent.innerHTML = ""
            roomsParent.innerHTML = ` <div class="room">
                    <div class="image" onmouseover="overRoomImage(this)" onmouseleave="leaveRoomImage(this)">
                        <div id="booked-msg">Booked</div>
                        <img src=".${eachRoom.image}" alt="${eachRoom.name}">
                        <div class="msg">add wishlist</div>
                        <button class="view-image" onclick="viewFullImage(this)"><i class="fa-solid fa-expand"></i></button>
                        <button class="whishlist-btn" id="wishlist-btn" onclick="addToWishlist(${eachRoom.id})"
                        onmouseover="overOnWishlistBtn(this)" onmouseleave="leaveOnWishlistBtn(this)"><i class="fa-regular fa-heart"></i></button>
                    </div>
                    <div class="room-content">
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
                        <button onclick="viewDetail(${eachRoom.id})" id="detail-btn">view details <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    </div>
                </div>`

        })
    })


function alphabet(e) {
    let alphabets = e.keyCode;
    return ((alphabets >= 65 && alphabets <= 90) || (alphabets >= 97 && alphabets <= 122) || alphabets == 32)
}
function numbers(e) {
    let num = e.keyCode;
    return (num >= 47 && num <= 57);
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
    window.location.href = `../All HTML/room-detail.html?id=${roomId}`;
}
let addToWishlist = (roomId) => {
    let addRoomMsg = document.getElementById("wishlist-add-msg");
    addRoomMsg.style.visibility = "visible";
    addRoomMsg.style.opacity = "1";
    setTimeout(function () {
        addRoomMsg.style.visibility = "hidden";
        addRoomMsg.style.opacity = "0";
    }, 800);
    fetch("../roomsData.json")
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
                        <img src=".${rooms.image}" alt="${rooms.name}" onclick="viewFullImage(this)">
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

