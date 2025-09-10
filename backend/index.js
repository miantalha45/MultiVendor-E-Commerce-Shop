const app = require('./app');
const connectDatabase = require('./db/Database');

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