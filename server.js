require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const upload = require("./routes/upload");
const form = require("./routes/formRoutes");

const cors = require("cors");

const app = express();
const source = process.env.MONGO_URI;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/upload", upload);
app.use("/api/form", form);

mongoose
  .connect(source)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
