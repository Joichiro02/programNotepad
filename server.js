require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/database");
const PORT = process.env.PORT || 8800;

const app = express();
//Connect to database
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware route
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/notes", require("./routes/noteRoute"));

//Middleware for catching errors
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The Server is running at PORT ${PORT}`);
});
