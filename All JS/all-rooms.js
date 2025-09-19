fetch("../roomsData.json")
    .then(res => res.json())
    .then(rooms => {
        let allRooms = document.querySelector(".all-rooms");
        let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || [];
        rooms.forEach(eachRoom => {

            let isBooked = bookedRooms.find(bRooms => bRooms.id == eachRoom.id)

            allRooms.innerHTML += `<div class="each-room" data-aos="flip-left" data-aos-duration="1500">
                <div class="image" onmouseover="overRoomImage(this)" onmouseleave="leaveRoomImage(this)">
                    <img src=".${eachRoom.image}" alt="${eachRoom.name}">
                    <p id="booked-text" style="${isBooked ? 'display: block' : 'display: none'}">Booked</p>
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


