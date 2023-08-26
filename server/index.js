import express from "express";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import productsRoutes from "./routes/Products.js";
import cartRoutes from "./routes/Cart.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3001;

app.use(cookieParser());

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on PORT ${PORT}`);
  }
});
