const express = require("express");

const app = express();

const morgan = require("morgan");

const bodyParser = require("body-parser");
// routes  to handle requests
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const meetUpRoutes = require("./api/routes/meetUp");

app.use("/meetUp", meetUpRoutes);

app.use((req, res, next) => {
  const error = new Error("not found ");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 200);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
