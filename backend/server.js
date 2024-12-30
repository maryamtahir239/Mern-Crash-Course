import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import Product from "./models/product.model.js";
import req from "express/lib/request.js";




dotenv.config();


const app = express();
app.use(cors());
app.get('/',(req,res)=>{
	res.send("welcome")
})

app.get('/api/v1',(req,res)=>{
	res.json({msg:'here'})
})

const PORT = process.env.PORT || 5000;
 

const __dirname = path.resolve();

app.use(express.json());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage
})

app.use('/api/v1/auth',authRoute )

app.post("/uploads",upload.single('image'), (req,res) => {
	
	Product.create({image: req.file.filename})
	.then(result => res.json(result))
	.catch(err => console.log(err))
});


app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}else{
	app.use(morgan('dev'))
}


app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});