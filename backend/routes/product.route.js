import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const __dirname = path.resolve();
      const dir = path.join(__dirname, "public/images");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage });

router.post("/", upload.single("file"), createProduct); // Handle file uploads
router.get("/", getProducts);
router.put("/:id", upload.single("file"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
