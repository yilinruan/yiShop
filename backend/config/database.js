const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(con => console.log(`connected to database with HOST: ${con.connection.host}`))
}

module.exports = connectDatabase;