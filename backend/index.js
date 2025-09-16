const app = require('./app');
const connectDatabase = require('./db/Database');
const cloudinary = require('cloudinary');

// handling uncaught exceptions
process.on("uncaughtException", (error) => {
    console.log("Error: ", error.message);
    console.log("shutting down server for handling uncaught exception");
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({
        path: 'config/.env'
    })
}

// connect to database
console.log("Connecting to DB:", process.env.MONGO_URI);
connectDatabase();

console.log("Cloudinary ENV:", {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY ? "loaded" : "missing",
    secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "missing"
});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const server = app.listen(process.env.PORT, () => console.log("Server started on PORT: ", process.env.PORT));

// unhandled promise rejection
process.on('unhandledRejection', (error) => {
    console.log("Shutting down server for error: ", error.message);
    console.log("Shutting down the server for unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    })
})