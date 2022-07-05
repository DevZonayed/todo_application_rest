// Import All Important Files
const app = require("./app");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./Config/database");
// All Envairoment Variables
const port = process.env.PORT || 5000;

// Connect Database Connection Invoke
// Aplication listening
connectDB();

app.listen(port, () => {
  console.log(`Application is running in port ${port}`.bgBlue.bold.white);
});
