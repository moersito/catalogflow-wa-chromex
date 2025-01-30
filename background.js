// Background script to manage tasks and notifications

// Event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("CatalogFlow WhatsApp extension installed or updated.");
});

// Function to handle OAuth token storage
function storeOAuthToken(token) {
    chrome.storage.local.set({ oauthToken: token }, () => {
        console.log("OAuth token stored.");
    });
}

// Function to retrieve OAuth token
function getOAuthToken(callback) {
    chrome.storage.local.get(['oauthToken'], (result) => {
        callback(result.oauthToken);
    });
}
