let url = new URLSearchParams(window.location.search);
let room_id = url.get('id');

function displayDetail(id) {
    room_id = id;
    window.history.pushState({}, '', `?id=${id}`); 
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    fetch('../roomsData.json')
        .then(res => res.json())
        .then(roomData => {
            let singleRoomData = roomData.filter(data => data.id == id);
            let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || [];

            singleRoomData.forEach(singleRoomDetail => {

                let isBooked = bookedRooms.find(room => room.id == singleRoomDetail.id);

                let banner = document.getElementById("banner")
                banner_image = document.createElement("div");
                banner_image.className = "banner-image";
                banner_image.innerHTML = `<img src=".${singleRoomDetail.image}" alt="${singleRoomDetail.name}-image" class="banner-img">
                    <div class="banner-content">
                        <p>Enjoy your time in Our Hotel with pleasure</p>
                        <h1>${singleRoomDetail.name}</h1>
                        <div class="lines-with-logo">
                            <div class="left-line"></div>
                            <img src="../images/only-logo.png" alt="logo-image">
                            <div class="right-line"></div>
                        </div>
                    </div>`
                banner.appendChild(banner_image);
                let roomDetail = document.getElementById("room-detail");
                roomDetail.innerHTML = `   <div class="top">
                    <div class="left" data-aos="fade-right" data=aos-duration="1000">
                        <h1>About Accommodation</h1>
                        <div class="about-room">
                            <div class="for-guest">
                                <i class="fa-regular fa-user"></i>
                                <span>${singleRoomDetail.guest} guest</span>
                            </div>
                            <div class="for-bed">
                                <i class="fa-solid fa-bed"></i>
                                <span>${singleRoomDetail.bed} bed</span>
                            </div>
                            <div class="for-bath">
                                <i class="fa-solid fa-bath"></i>
                                <span>${singleRoomDetail.bath} bath</span>
                            </div>
                        </div>
                    </div>
                    <div class="right" data-aos="fade-left" data=aos-duration="1000">
                        <h1>$${singleRoomDetail.price}/Night</h1>
                        <button class="add-wishlist-btn" onclick="addToWishlist(${singleRoomDetail.id})">add to wishlist</button>
                    </div>
                </div>
                <div class="mid" data-aos="fade-right" data=aos-duration="1000">
                    <p>
                        ${singleRoomDetail.long_description}
                    </p>
                </div>
                <div class="bottom" data-aos="fade-down" data=aos-duration="1000">
                    <h2>room amenities</h2>
                    <div class="amenities">
                        <div class="for-all">
                            <img src="../images/swimming-pool.png" alt="pool-ladder">
                            <p>free swimming pool</p>
                        </div>
                        <div class="for-all">
                            <img src="../images/stroller.png" alt="baby-stroller">
                            <p>extra baby bed</p>
                        </div>
                        <div class="for-all">
                            <img src="../images/washing-machine.png" alt="washing-machine">
                            <p>washing machine</p>
                        </div>
                        <div class="for-all">
                            <img src="../images/wifi.png" alt="wifi">
                            <p>free wifi</p>
                        </div>
                        <div class="for-all">
                            <img src="../images/air-conditioner.png" alt="air-conditioner">
                            <p>air conditioned</p>
                        </div>
                        <div class="for-all">
                            <img src="../images/refrigerator.png" alt="refrigerator">
                            <p>in-room refrigerator</p>
                        </div>
                    </div>
                    <button style="${!isBooked ? 'display: block;' : 'display: none;'}" onclick="bookRoom(${singleRoomDetail.id})">Book Now</button>
                    <div style="${isBooked ? 'display: block;' : 'display: none;'}" class='booked-msg'>Booked</div>
                </div>`
                displaySimilarRooms(room_id);
            });
        })
}
displayDetail(room_id);


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

let displaySimilarRooms = (id) => {
    fetch('../roomsData.json')
        .then(res => res.json())
        .then(roomData => {
            let similarRooms = roomData.filter(data => data.id != id);
            let similar_rooms = document.querySelector(".rooms");
            let bookedRooms = JSON.parse(localStorage.getItem("booked-rooms")) || [];

            similar_rooms.innerHTML = "";
            similarRooms.slice(2, 5).forEach(rooms => { 

                let isBooked = bookedRooms.find(room => room.id == rooms.id);

                similar_rooms.innerHTML += `<div class="each-room" data-aos="flip-left" data-aos-duration="1500">
                    <div class="image" onmouseover="showDetailBtn(this)" onmouseleave="hideDetailBtn(this)">
                        <img src=".${rooms.image}" alt="${rooms.name}-image">
                        <div class="view-detail-box" onclick="displayDetail(${rooms.id})">
                            <p>view detail</p>
                        </div>
                        <p id="booked-text" style="${isBooked ? 'display: block;' : 'display: none;'}">Booked</p>
                    </div>
                    <div class="room-content">
                        <h2>${rooms.name}</h2>
                        <p>$${rooms.price}/Night</p>
                        <div class="about-room">
                            <div class="for-guest">
                                <i class="fa-regular fa-user"></i>
                                <span>${rooms.guest} guest</span>
                            </div>
                            <div class="for-bed">
                                <i class="fa-solid fa-bed"></i>
                                <span>${rooms.bed} bed</span>
                            </div>
                            <div class="for-bath">
                                <i class="fa-solid fa-bath"></i>
                                <span>${rooms.bath} bath</span>
                            </div>
                        </div>
                    </div>
                </div>`
            })
        })
}

displaySimilarRooms(room_id);

let showDetailBtn = (a) => {
    a.querySelector(".view-detail-box").style.opacity = "1";
}
let hideDetailBtn = (a) => {
    a.querySelector(".view-detail-box").style.opacity = "0";
}

