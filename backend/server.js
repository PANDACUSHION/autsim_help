const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const PORT = process.env.PORT || 3000; // Add default port
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies
app.use('/api/',routes);

// Middleware to serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Route to serve images dynamically
app.get("/uploads/:id", (req, res) => {
    const imagePath = path.join(__dirname, "uploads", req.params.id + '.png');
    console.log("hello");
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send("Image not found");
        }
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});