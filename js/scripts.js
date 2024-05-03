// Sample launch data (replace with actual data)
const launches = [
    { flightNumber: 1, name: "Falcon 1", launchDate: "2006-03-24", details: "Sample details for Falcon 1." },
    { flightNumber: 2, name: "Falcon 9 Flight 1", launchDate: "2010-06-04", details: "Sample details for Falcon 9 Flight 1." },
    // Add more launch data here
];

// Function to display launches
function displayLaunches(launches) {
    const launchList = document.getElementById("launchList");
    launchList.innerHTML = ""; // Clear previous content

    // Loop through launches and create launch items
    launches.forEach(launch => {
        const launchItem = document.createElement("div");
        launchItem.classList.add("launch-item");
        launchItem.innerHTML = `
            <h2>${launch.name}</h2>
            <p>Flight Number: ${launch.flightNumber}</p>
            <p>Launch Date: ${launch.launchDate}</p>
            <button class="details-btn">View Details</button>
        `;
        launchList.appendChild(launchItem);
    });

    // Add event listeners to launch items for showing details
    const detailsButtons = document.querySelectorAll(".details-btn");
    detailsButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            displayLaunchDetails(launches[index]);
        });
    });
}

// Function to display launch details
function displayLaunchDetails(launch) {
    const launchDetails = document.getElementById("launchDetails");
    launchDetails.innerHTML = ""; // Clear previous content

    const modal = document.getElementById("launchDetailsModal");
    modal.style.display = "block";

    const launchItem = document.createElement("div");
    launchItem.classList.add("launch-details");
    launchItem.innerHTML = `
        <h2>${launch.name}</h2>
        <p>${launch.details}</p>
        <p>Flight Number: ${launch.flightNumber}</p>
        <p>Launch Date: ${launch.launchDate}</p>
        <button class="close-btn">Close</button>
    `;
    launchDetails.appendChild(launchItem);

    // Add event listener to close button
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Functions to fetch data from the SpaceX APi
async function fetchLaunches() {
    try {
        const response = await fetch("https://api.spacexdata.com/v4/launches/");
        const data = await response.json();
        return data; // Return the array of past launches
    } catch (error) {
        console.error("Error fetching launches:", error);
        return []; // Return an empty array if there's an error
    }
}

// Function to fetch and display past launches
async function displayLaunches() {
    const pastLaunches = await fetchLaunches();
    displayLaunches(pastLaunches);
}

// Initial display of launches
displayLaunches(launches);