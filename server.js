import express from "express";
import dotenv from "dotenv";
import path from "path";
import apiRouter from "./routes/ApiRoutes.js"; // Import updated API routes
import router from "./routes/MakananRoute.js";
import db from "./config/Database.js"; // Sequelize instance

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000;

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(path.resolve(), "public")));

// Use the router for API routes
app.use("/api", apiRouter);

// Use the router for Makanan routes
app.use(router);

// Sync database and authenticate connection
(async () => {
    try {
        await db.authenticate();
        console.log("Database connected...");
        await db.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        error: "The requested resource could not be found on this server.",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
