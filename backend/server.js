const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logger");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//database connection
connectDB();

app.use(logger);
app.use(cors());
//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 100,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "welcome to car.com" });
});

//user routes
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", carRoutes);
app.use("/api/v1", userRoutes);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
