import express from "express";
import { getBrands, addBrand, updateBrand, deleteBrand, searchBrand } from "../controllers/brand.controller.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/search", searchBrand);
router.post("/", addBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
