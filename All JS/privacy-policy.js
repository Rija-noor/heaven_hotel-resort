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