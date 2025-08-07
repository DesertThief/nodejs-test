// server.js

// 1. Import the built-in 'http' and 'path' modules
// 'http' is used to create the server and handle requests.
// 'path' is not strictly needed here but is good practice for file paths.
const http = require('http');

// --- Website Content ---
// In a real project, these would be in separate files (e.g., index.html, style.css).
// For this self-contained example, we'll define them as string constants.

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Node.js Website</title>
    <!-- This link points to the CSS route we will create on our server -->
    <link rel="stylesheet" href="/css/style.css">
</head>
<body style="background-color: #1a1a1a; color: #f0f0f0; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
    <div style="text-align: center; background-color: #2c2c2c; padding: 50px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);">
        <h1 style="color: #00aaff; margin-bottom: 1rem;">Welcome to My Node.js Server!</h1>
        <p style="font-size: 1.1rem; max-width: 500px; line-height: 1.6;">
            This entire page, including its CSS and JavaScript, is being delivered by a single Node.js script.
        </p>
        <button id="myButton" style="background: linear-gradient(90deg, #00aaff, #0077cc); color: white; border: none; padding: 12px 24px; font-size: 1rem; border-radius: 8px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; margin-top: 20px;">
            Click Me!
        </button>
    </div>

    <!-- This script tag points to the JavaScript route on our server -->
    <script src="/js/script.js"></script>
</body>
</html>
`;

const cssContent = `
/* This CSS is served from our Node.js server, not a file */
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(0, 170, 255, 0.2);
}
`;

const jsContent = `
// This client-side JavaScript is served from our Node.js server
document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('myButton');

    if (myButton) {
        myButton.addEventListener('click', () => {
            alert('Hello! This alert is from the client-side JavaScript file served by Node.js!');
        });
    }
});
`;


// 2. Define the server and port
const PORT = 3000;

// 3. Create the HTTP Server
// The createServer method takes a callback function that runs for every single request.
// This function receives two arguments: 'req' (the request object) and 'res' (the response object).
const server = http.createServer((req, res) => {
    // Log the requested URL to the console
    console.log(`Request received for: ${req.url}`);

    // 4. Basic Routing
    // We check the 'req.url' to determine what content to send back.
    switch (req.url) {
        // If the request is for the root path '/', serve the HTML
        case '/':
            // 'writeHead' sends the status code and content type in the response header
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // 'end' sends the response body and signals the server that the response is complete
            res.end(htmlContent);
            break;

        // If the request is for the CSS file
        case '/css/style.css':
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
            break;

        // If the request is for the JavaScript file
        case '/js/script.js':
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(jsContent);
            break;

        // If the URL is not found, send a 404 response
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
            break;
    }
});

// 5. Start the server and listen for connections
// The server will listen for requests on the specified port.
// The callback function is executed once the server starts successfully.
server.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
    console.log('Open your browser and navigate to the address above.');
    console.log('Press Ctrl+C to stop the server.');
});
