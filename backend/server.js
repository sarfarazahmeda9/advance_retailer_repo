import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brand.route.js";
import productRoutes from "./routes/product.route.js";
import path from "path";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//const MONGO_URI = process.env.MONGO_URI;

const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin: "http://localhost:5173",
    }
    ));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("API is running...");
// })

app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    
});