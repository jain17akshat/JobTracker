const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MONGODB IS NOT CONNECTED");
    console.error(err);
    process.exit(1); // Stop the server
  }
};

module.exports = connectDB;
