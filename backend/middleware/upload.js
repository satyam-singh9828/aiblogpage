
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import path from "path";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary , 
  params: {
    folder: "blogs",          
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer({ storage });