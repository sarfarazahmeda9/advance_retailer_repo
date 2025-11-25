import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brand.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("API is running...");
// })

app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    
});