const path = require("path");
const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Blog API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the blog Desk API' })
  })
}

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on ${port}`));
