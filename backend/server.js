import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import morgan from "morgan";
import cors from "cors";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "public/images" directory
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));


// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Here" });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/products", productRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
