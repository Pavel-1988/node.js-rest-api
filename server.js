const mongoose = require("mongoose")

const app = require('./app')

const DB_HOST = "mongodb+srv://lllxxxzzz32:vHmMFXWFkGISbTLb@paulo.2zkt14j.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
      console.log("Database connection successful")
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


