import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productActions";
import axios from "axios";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const productAdd = useSelector((state) => state.productAdd);
    const { loading, error, success } = productAdd;

    
    const uploadImageToCloudinary = async (file) => {
        if (!file) {
            console.error("No file selected!");
            return null;
        }

        const cloudName = "dxpn319bf"; 
        const uploadPreset = "folder"; 

       
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            setUploading(true);
            const { data } = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
            setUploading(false);
            return data.secure_url; // Cloudinary image URL
        } catch (error) {
            setUploading(false);
            console.error("Image upload failed:", error);
            return null;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image!");
            return;
        }

        const imageUrl = await uploadImageToCloudinary(image);
        if (!imageUrl) {
            alert("Image upload failed. Please try again.");
            return;
        }

       
        const productData = {
            name,
            description,
            price,
            category,
            image: imageUrl, // Use Cloudinary URL
        };

        dispatch(addProduct(productData)); // Dispatch JSON, NOT FormData
    };

    return (
        <div>
            <h2>Add Product</h2>
            {loading && <p>Loading...</p>}
            {uploading && <p>Uploading Image...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Product Added Successfully!</p>}

            <form onSubmit={submitHandler}>
                <div>
                    <label>Product Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div>
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>

                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
