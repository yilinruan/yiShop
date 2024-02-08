const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
    .connect(process.env.DB)
    .then(con => console.log(`connected to database with HOST: ${con.connection.host}`))
}

module.exports = connectDatabase;