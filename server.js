// Import required modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Port number
const PORT = 3000;

// Helper function to serve HTML files
function serveFile(res, filePath, statusCode = 200, contentType = "text/html") {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 - Internal Server Error");
        } else {
            res.writeHead(statusCode, { "Content-Type": contentType });
            res.end(data);
        }
    });
}

// Create server
const server = http.createServer((req, res) => {

    let filePath = "";
    let contentType = "text/html";

    // Routing logic
    if (req.url === "/" || req.url === "/home") {
        filePath = path.join(__dirname, "pages", "home.html");
        serveFile(res, filePath, 200);

    } else if (req.url === "/about") {
        filePath = path.join(__dirname, "pages", "about.html");
        serveFile(res, filePath, 200);

    } else if (req.url === "/contact") {
        filePath = path.join(__dirname, "pages", "contact.html");
        serveFile(res, filePath, 200);

    }
    // Serve CSS file
    else if (req.url === "/style.css") {
        filePath = path.join(__dirname, "public", "style.css");
        contentType = "text/css";
        serveFile(res, filePath, 200, contentType);

    }
    // Invalid route - 404 page
    else {
        filePath = path.join(__dirname, "pages", "404.html");
        serveFile(res, filePath, 404);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT}`);
});
