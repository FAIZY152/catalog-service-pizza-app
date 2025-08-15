import { v2 as cloudinary } from "cloudinary";
import config from "config";

cloudinary.config({
    cloud_name: config.get("upload.Cloudinary_NAME"),
    api_key: config.get("upload.Cloudinary_API_KEY"),
    api_secret: config.get("upload.Cloudinary_API_SECRET"),
});

export default cloudinary;
