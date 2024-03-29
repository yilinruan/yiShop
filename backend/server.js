const app = require('./app');
const connectDatabase = require('./config/database')
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Handle Uncaught exception
process.on('uncaughtException', err => {
    // console.log(`ERROR: ${err.message}`)
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

// dotenv.config({ path: 'backend/config/config.env' })

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise Rejections - Mongodb
process.on('unhandledRejection', err => {
    console.log(`${err.stack}`)
    console.log('Shutting down the server due to Unhandled Promise Rejection')
    server.close(()=> {
        process.exit(1)
    })
})

