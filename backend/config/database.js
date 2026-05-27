const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Connected to MongoDB: ${con.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDatabase;