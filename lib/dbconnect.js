const mongoose = require("mongoose");

function dbconnect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const conn = mongoose.connection;
  conn.on("connected", () => {
    console.log("Connected to database");
  });
  conn.on("error", (error) =>
    console.log("Mongoose connection error: ", error)
  );
}

module.exports.dbconnect = dbconnect;
