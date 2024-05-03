// Function to fetch past launches from the SpaceX API
async function fetchPastLaunches() {
    try {
        const response = await fetch("https://api.spacexdata.com/v4/launches/past");
        const data = await response.json();
        return data; // Return the array of past launches
    } catch (error) {
        console.error("Error fetching past launches:", error);
        return []; // Return an empty array if there's an error
    }
}

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
            <p>Flight Number: ${launch.flight_number}</p>
            <p>Launch Date: ${new Date(launch.date_utc).toLocaleDateString()}</p>
            <button class="details-btn" data-launch-id="${launch.id}">View Details</button>
        `;
        launchList.appendChild(launchItem);
    });

    // Add event listeners to launch items for showing details
    const detailsButtons = document.querySelectorAll(".details-btn");
    detailsButtons.forEach(button => {
        button.addEventListener("click", () => {
            const launchId = button.getAttribute("data-launch-id");
            fetchLaunchDetails(launchId);
        });
    });
}

// Function to fetch and display launch details
async function fetchLaunchDetails(launchId) {
    try {
        const response = await fetch(`https://api.spacexdata.com/v4/launches/${launchId}`);
        const launch = await response.json();
        displayLaunchDetails(launch);
    } catch (error) {
        console.error("Error fetching launch details:", error);
    }
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
        <p>Flight Number: ${launch.flight_number}</p>
        <p>Launch Date: ${new Date(launch.date_utc).toLocaleDateString()}</p>
        <button class="close-btn">Close</button>
    `;
    launchDetails.appendChild(launchItem);

    // Add event listener to close button
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Function to initialize the application
async function initialize() {
    const pastLaunches = await fetchPastLaunches();
    displayLaunches(pastLaunches);
}

// Call the initialize function when the page loads
initialize();