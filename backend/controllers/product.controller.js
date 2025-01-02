import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


export const createProduct = async (req, res) => {
	const { name, price } = req.body;
	const image = req.file ? `/images/${req.file.filename}` : null; // Relative path for frontend
  
	if (!name || !price || !image) {
	  console.error("Missing fields:", { name, price, image });
	  return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
  
	const newProduct = new Product({ name, price, image });
  
	try {
	  await newProduct.save();
	  res.status(201).json({ success: true, data: newProduct, message: "Product created successfully" });
	} catch (error) {
	  console.error("Error in creating product:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  
  export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, price } = req.body;
	const image = req.file ? req.file.path : null; // Get new image if uploaded

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	const updatedData = { name, price };
	if (image) updatedData.image = image; // Only add image if a new one is provided

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in updating product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};