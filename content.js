// This script will interact with WhatsApp Web to automate input

// Function to add the "Upload New Products" button
function addUploadButton() {
    const addButton = document.querySelector('button[title="Add new item"]'); // Adjusted selector based on provided HTML
    if (addButton) {
        const uploadButton = document.createElement('button');
        uploadButton.innerText = 'Upload new products';
        uploadButton.style.marginRight = '10px'; // Add some spacing
        uploadButton.onclick = function() {
            // Implement the upload functionality here
            alert('Upload New Products button clicked!');
        };
        addButton.parentNode.insertBefore(uploadButton, addButton); // Insert the new button before the existing one
    }
}

// MutationObserver to listen for changes in the WhatsApp Web interface
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            addUploadButton(); // Call the function to add the button when the DOM changes
        }
    });
});

// Start observing the WhatsApp Web container
const targetNode = document.querySelector('div[role="main"]'); // Adjust the selector as needed
if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
}

// Initial call to add the button if it already exists
addUploadButton();
