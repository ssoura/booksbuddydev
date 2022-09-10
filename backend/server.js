const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const products = require("./src/routers/products.router");
const login = require("./src/routers/login.router");
const signup = require("./src/routers/signup.router");
const cart = require("./src/routers/cart.router");
const wishList = require("./src/routers/wishlist.router");
const payment = require("./src/routers/payment.router");
const user = require("./src/routers/user.router");

const { auth } = require("./src/middlewares/auth");
const { errorHandler } = require("./src/middlewares/error-handler.middleware");
const {
  routeNotFound,
} = require("./src/middlewares/route-not-found.middleware");

const { initializeDBConnection } = require("./src/config/db.connect");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: true, credentials: true }));
} else {
  app.use(cors({ origin: true, credentials: true }));
}

initializeDBConnection();

app.use("/products", products);
app.use("/login", login);
app.use("/signup", signup);
app.use(auth);
app.use("/cart", cart);
app.use("/wishlist", wishList);
app.use("/payment", payment);
app.use("/user", user);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server started on port " + port);
});
