const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

// Parse incoming request bodies
app.use(bodyParser.json());

// Log to verify import
if (typeof placesRoutes !== 'function') {
    console.error("placesRoutes is not a function. Check the import.");
}

// Use the placesRoutes for all requests
app.use("/api/places", placesRoutes);

// Error handling for unsupported routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!" });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
