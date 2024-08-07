// document.getElementById('domainForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent the default form submission

//     const domainName = document.getElementById('domainName').value;  // Get the domain name from the input field
    
//     // Make a POST request to the backend API
//     fetch('http://localhost:5000/monitor', {
//         method: 'POST',  // Specify the request method
//         headers: {
//             'Content-Type': 'application/json'  // Specify the content type as JSON
//         },
//         body: JSON.stringify({ domain: domainName })  // Send the domain name in the request body
//     })
//     .then(response => response.json())  // Parse the JSON response from the backend
//     .then(data => {
//         if (data.alert) {  // If the backend indicates an alert
//             displayAlert(data.message);  // Display the alert message on the frontend
//         } else {
//             console.log(data.message);  // Otherwise, log the message (no suspicious activity)
//         }
//     })
//     .catch(error => console.error('Error:', error));  // Handle any errors
// });

// function displayAlert(message) {
//     const alertMessage = document.getElementById('alertMessage');
//     alertMessage.textContent = message;  // Update the alert message content
//     alertMessage.classList.remove('hidden');  // Display the alert message by removing the 'hidden' class
// }
document.getElementById('domainForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const domainName = document.getElementById('domainName').value; // Get the domain name from the input field

    // Make a POST request to the backend API
    fetch('http://localhost:5000/monitor', {
        method: 'POST', // Specify the request method
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify({ domain: domainName }) // Send the domain name in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if response status is not OK
        }
        return response.json(); // Parse the JSON response from the backend
    })
    .then(data => {
        console.log('Response data:', data); // Debug log

        if (data.alert) { // If the backend indicates an alert
            displayAlert(data.message); // Display the alert message on the frontend
        } else {
            console.log(data.message); // Otherwise, log the message (no suspicious activity)
        }
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
});

function displayAlert(message) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message; // Update the alert message content
    alertMessage.classList.remove('hidden'); // Display the alert message by removing the 'hidden' class
}
