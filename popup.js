document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    for (let file of files) {
        if (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            // Handle CSV/XLS file parsing
            const reader = new FileReader();
            reader.onload = function(event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                console.log(jsonData); // Process the parsed data here
                inputData.push(...jsonData); // Store parsed data for automation
            };
            reader.readAsArrayBuffer(file);
        } else if (file.type === "application/zip") {
            // Handle ZIP file extraction
            const reader = new FileReader();
            reader.onload = function(event) {
                const zip = new JSZip();
                zip.loadAsync(event.target.result).then(function(contents) {
                    // Process the extracted images here
                });
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert("Unsupported file type. Please upload a CSV/XLS or ZIP file.");
        }
    }
});

// Google OAuth for user authentication (commented out for now)
/*
function authenticateUser() {
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your Google Client ID
    const redirectUri = 'YOUR_REDIRECT_URI'; // Replace with your redirect URI
    const scope = 'https://www.googleapis.com/auth/userinfo.email';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    window.open(authUrl, '_blank');
}

// Call authenticateUser when the extension is opened
authenticateUser();
*/

// Feedback mechanism
function sendFeedback(feedback) {
    const adminEmail = 'admin@example.com'; // Replace with the admin's email
    const subject = 'User Feedback';
    const body = encodeURIComponent(feedback);
    const mailtoLink = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
}

// Example usage of sendFeedback
sendFeedback("This is a test feedback message.");
