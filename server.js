const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv/config");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const connection_uri = process.env.DATABASE;

mongoose
  .connect(connection_uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has successfully connected!"))
  .catch(() => console.log("MongoDB has failed to successfully connect!"));

const PORT = process.env.PORT || process.env.PORT_PATH;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
