const jwtToken = localStorage.getItem("jwtToken");


// navbar kosam rasam
document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => console.error("Error loading navbar:", error));
});


// login iyna vadu asla manager ahh kada chudali gaa anduke idhi
if (!jwtToken) {
    alert("Access Denied! Please login.");
    window.location.href = "http://127.0.0.1:5500/Pages/index.html";
} else {
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const role = payload.role;

    if (role !== "MANAGER") {
        alert("Access Denied! Managers only.");
        window.location.href = "http://127.0.0.1:5500/Pages/index.html";
    }
}

function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "http://127.0.0.1:5500/Pages/index.html";
}

if (window.location.href.includes("Hotels.html")) {

    fetch("http://localhost:8090/Manager/hotels", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("managerTable");

        data.forEach((e,idx) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idx+1}</td>
                <td>${e.name}</td>
                <td>${e.location}</td>
                <td>${e.managerID}</td>
                <td>${e.amenities}</td>
                <td>${e.rating}</td>
                <td>${e.hotelID}</td>
                <td class="text-success" onclick=(console.log(${e.hotelID}))>Edit</td>
                <td class="text-danger">Delete</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error("Error fetching managers:", error));
    console.log("Code for index page");

    function filterHotels() {
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
        const rows = document.querySelectorAll("#hotelTable tr");
        console.log(searchValue)
        rows.forEach(row => {
            const hotelName = row.cells[1].textContent.toLowerCase();
            row.style.display = hotelName.includes(searchValue) ? "" : "none";
        });
    }

        const hotelData = {
            name: document.getElementByIhoteladdd("name").value,
            location: document.getElementById("location").value,
            managerID: document.getElementById("managerID").value,
            amenities: document.getElementById("amenities").value,
            rating: document.getElementById("rating").value,
            hotelID: document.getElementById("hotelID").value
        };

        // const response = await fetch("http://localhost:8090/Manager/hotels/add", {
        //     method: "POST",
        //     headers: { 
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${jwtToken}`

        // },
        //     body: JSON.stringify(hotelData)
        // });
    
        console.log("Hotel Details:", hotelData);

    
  } else if (window.location.href.includes("about.html")) {
      console.log("Code for about page");
  }