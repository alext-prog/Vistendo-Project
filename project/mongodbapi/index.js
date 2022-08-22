const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const feedRoute = require("./routes/feed")
const multer = require("multer")
const path= require("path");
const router = express.Router();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Running")
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
});

// Post image storage in the public folder

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try{
        return res.status(200).json("upload good");
    }catch(err){
        console.log(err)
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/feed", feedRoute);

app.listen(8800,()=>{
    console.log("Running")
})