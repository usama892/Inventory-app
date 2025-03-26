import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import './productlist.css'; // Import external CSS

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.productList);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);


    const categories = ['All', ...new Set(products.map(product => product.category))];

    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    );

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="product-list-container">
            <h2 className="title">Our Products</h2>

           
            <div className="filter-container">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="search-input" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                
                
                <select 
                    className="category-dropdown" 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product._id} className="product-card">
                            {product.imageUrl && (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="product-image"
                                />
                            )}
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">$ {product.price}</p>
                                <p className="product-category">{product.category}</p>
                            </div>
                            <button className="buy-btn">Buy Now</button>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
