/*import axios from 'axios';

export const addProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_ADD_REQUEST' });
        if (!formData.image) {
            console.error("No file selected!");
            return;
        }
        // Upload the image to Cloudinary first
        const imageData = new FormData();
        imageData.append('file', formData.image);
        imageData.append('upload_preset', 'folder'); // Replace with your Cloudinary preset
        formData.append("allowed_formats", "jpg,png,webp");
        imageData.append('cloud_name', 'dxpn319bf'); // Replace with your Cloudinary cloud name

        const cloudinaryResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dxpn319bf/image/upload',
            imageData
        );

        const imageUrl = cloudinaryResponse.data.secure_url; // Get the image URL from Cloudinary

        // Now send the product data to the backend
        const productData = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            category: formData.category,
            imageUrl: imageUrl, // Store only the URL in MongoDB
        };

        const { data } = await axios.post('http://localhost:5000/api/products/add', productData);

        dispatch({ type: 'PRODUCT_ADD_SUCCESS', payload: data });

    } catch (error) {
        dispatch({
            type: 'PRODUCT_ADD_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' });

        const { data } = await axios.get('http://localhost:5000/api/products/all');

        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
*/
import axios from "axios";

export const addProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_ADD_REQUEST" });

        if (!formData.image) {
            console.error("No file selected!");
            return;
        }

       
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "folder"); 

        const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dxpn319bf/image/upload",
            imageData
        );

        const imageUrl = cloudinaryResponse.data.secure_url; 

        const productData = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            category: formData.category,
            image: imageUrl, 
        };

        const { data } = await axios.post(
            "http://localhost:5000/api/products/add",
            productData
        );

        dispatch({ type: "PRODUCT_ADD_SUCCESS", payload: data });

    } catch (error) {
        dispatch({
            type: "PRODUCT_ADD_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LIST_REQUEST" });

        const { data } = await axios.get("http://localhost:5000/api/products/all");

        dispatch({
            type: "PRODUCT_LIST_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_LIST_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
