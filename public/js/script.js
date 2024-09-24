// JavaScript for CSE Motors Page

// Highlight active navigation button when clicked
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        this.classList.add('active');

        // Update the displayed content based on the selected category
        let vehicleType = this.textContent;
        updateVehicleContent(vehicleType);
    });
});

// Update vehicle content dynamically based on the selected vehicle type
function updateVehicleContent(type) {
    const vehicleTitle = document.getElementById('vehicle-title');
    const vehicleDetails = document.getElementById('vehicle-details');
    const vehicleImage = document.getElementById('vehicle-image');

    // Change content based on the selected vehicle type
    if (type === 'Custom') {
        vehicleTitle.textContent = 'Custom DMC Delorean';
        vehicleDetails.innerHTML = `
            <ul>
                <li>3 Cup holders</li>
                <li>Superman doors</li>
                <li>Fuzzy dice!</li>
            </ul>`;
        vehicleImage.src = 'path/to/custom-delorean-image.png';
    } else if (type === 'Sedan') {
        vehicleTitle.textContent = 'Sedan Model';
        vehicleDetails.innerHTML = `
            <ul>
                <li>Luxury seats</li>
                <li>Automatic doors</li>
                <li>Touchscreen dashboard</li>
            </ul>`;
        vehicleImage.src = 'path/to/sedan-image.png';
    } else if (type === 'SUV') {
        vehicleTitle.textContent = 'SUV Model';
        vehicleDetails.innerHTML = `
            <ul>
                <li>All-terrain tires</li>
                <li>Advanced safety features</li>
                <li>Powerful engine</li>
            </ul>`;
        vehicleImage.src = 'path/to/suv-image.png';
    } else if (type === 'Truck') {
        vehicleTitle.textContent = 'Truck Model';
        vehicleDetails.innerHTML = `
            <ul>
                <li>Large cargo space</li>
                <li>Off-road capabilities</li>
                <li>Power steering</li>
            </ul>`;
        vehicleImage.src = 'path/to/truck-image.png';
    }
}

// Simple alert function for the "Own Today" button
const ownButton = document.getElementById('own-button');
ownButton.addEventListener('click', function() {
    alert('Thank you for your interest! We will contact you soon.');
});
