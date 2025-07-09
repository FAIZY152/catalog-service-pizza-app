import { UploadApiResponse } from "cloudinary";
import logger from "../config/logger";
import cloudinary from "../utils/Cloudinary";

const CloudinaryImage = async (file: Express.Multer.File): Promise<string> => {
    try {
        // Ensure file is defined and typed
        if (!file || !file.buffer || !file.mimetype) {
            throw new Error("Invalid file input");
        }

        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const uploadResponse: UploadApiResponse =
            await cloudinary.uploader.upload(dataUri, {
                folder: "pizza-app",
            });

        return uploadResponse.secure_url;
    } catch (error: unknown) {
        // Safer error handling
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred during Cloudinary upload";
        logger.error(message);
        throw new Error(message);
    }
};

export default CloudinaryImage;
