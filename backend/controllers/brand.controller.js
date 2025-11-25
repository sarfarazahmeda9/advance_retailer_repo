import Brand from "../models/brand.model.js";
import mongoose from "mongoose";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchBrand = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Query parameter `q` is required' });
    }

    // Case-insensitive partial match on brandname or description
    const regex = new RegExp(q, 'i');
    const results = await Brand.find({ $or: [{ brandname: regex }, { description: regex }] });
    res.json(results);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const addBrand = async (req, res) => {
  try {
    const { brandname, description } = req.body;
    if (!brandname) {
      return res.status(400).json({ success: false, message: "Brand name is required" });
    }

    const brand = new Brand({ brandname: brandname.trim(), description });
    const newBrand = await brand.save();
    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const brandData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ success: false, message: "Invalid brand id" });
  }
  if (!brandData.brandname) {
    return res.status(400).send({ success: false, message: "Brand data is required" });
  }

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, brandData, { new: true });
    res.status(200).json({ success: true, data: updatedBrand });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ success: false, message: "Invalid brand id" });
    }
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
