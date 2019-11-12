const express = require("express");
const mongoose = require("mongoose");

//Router variable
const taskRouter = require("./routes/heros");
const villainRouter = require("./routes/villain");

const url = "mongodb://localhost:27017/demodb";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(
    db => {
      console.log("Successfully connected to MongodB server");
    },
    err => console.log(err)
  );

//Route
app.use("/heros", taskRouter);
app.use("/villain", villainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App is running at localhost:${PORT}`);
});
