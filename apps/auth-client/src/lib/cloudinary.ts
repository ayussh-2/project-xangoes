import axios from "axios";

import { config } from "@/config/environment";

export const uploadToCloudinary = async (image: File) => {
    if (!isImageValid(image))
        throw new Error(
            "Invalid image type. Only JPEG, PNG, and JPG are allowed."
        );

    const cloudName = config.cloudinary.cloudname;
    const uploadPreset = config.cloudinary.uploadpreset;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", uploadPreset);

    try {
        const response = await axios.post(url, form);
        if (response.status !== 200) {
            throw new Error("Failed to upload image!");
        }
        return response.data.url;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

function isImageValid(image: File) {
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    return validImageTypes.includes(image.type);
}
