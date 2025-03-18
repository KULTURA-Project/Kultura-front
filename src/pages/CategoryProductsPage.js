import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryProductsPage.css';

const CategoryProductsPage = () => {
    const { category_id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [variants, setVariants] = useState({});
    const [selectedVariants, setSelectedVariants] = useState({});
    const [specifications, setSpecifications] = useState({});
    const [selectedSpecifications, setSelectedSpecifications] = useState({});
    const [priceRange, setPriceRange] = useState([0, 1000]); // Initial price range

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${category_id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategoryName(data.name);
            } catch (error) {
                console.error('Error fetching category name:', error);
                setCategoryName('Category');
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/category-products/${category_id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Products data:', data); // ADDED: Check the products data
                setProducts(data);

                // Extract unique product types
                const uniqueProductTypes = [...new Set(data.map(product => product.product_type?.name).filter(Boolean))];
                setProductTypes(uniqueProductTypes);

                // Extract unique variants and specifications
                const allVariants = {};
                const allSpecifications = {};
                data.forEach(product => {
                    if (product && product.variants) {
                        product.variants.forEach(variant => {
                            if (variant && variant.name && variant.value) {
                                if (!allVariants[variant.name]) {
                                    allVariants[variant.name] = new Set();
                                }
                                allVariants[variant.name].add(variant.value);
                            }
                        });
                    }
                    if (product && product.specifications) {
                        product.specifications.forEach(spec => {
                            if (spec && spec.name && spec.value) {
                                if (!allSpecifications[spec.name]) {
                                    allSpecifications[spec.name] = new Set();
                                }
                                allSpecifications[spec.name].add(spec.value);
                            }
                        });
                    }
                });

                // Convert sets to arrays for variants and specifications
                const variantsArray = {};
                for (const key in allVariants) {
                    variantsArray[key] = Array.from(allVariants[key]);
                }
                setVariants(variantsArray);

                const specificationsArray = {};
                for (const key in allSpecifications) {
                    specificationsArray[key] = Array.from(allSpecifications[key]);
                }
                setSpecifications(specificationsArray);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategoryName();
        fetchProducts();
    }, [category_id]);

    const handlePriceRangeChange = (event) => {
        setPriceRange([0, parseInt(event.target.value)]);
    };

    const handleProductTypeChange = (event) => {
        setSelectedProductType(event.target.value);
    };

    const handleVariantChange = (variantName, value) => {
        setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
    };

    const handleSpecificationChange = (specName, value) => {
        setSelectedSpecifications(prev => ({ ...prev, [specName]: value }));
    };

    const filteredProducts = products.filter(product => {
        if (product && isNaN(product.price)) {
            return false;
        }
        const price = parseFloat(product.price);
        if (isNaN(price)) {
            return false;
        }

        if (price < priceRange[0] || price > priceRange[1]) {
            return false;
        }

        if (selectedProductType && product.product_type?.name !== selectedProductType) {
            return false;
        }

        for (const variantName in selectedVariants) {
            if (selectedVariants.hasOwnProperty(variantName)) {
                const selectedValue = selectedVariants[variantName];
                if (selectedValue && !product.variants?.some(variant => variant.name === variantName && variant.value === selectedValue)) {
                    return false;
                }
            }
        }
         for (const specName in selectedSpecifications) {
            if (selectedSpecifications.hasOwnProperty(specName)) {
                const selectedValue = selectedSpecifications[specName];
                if (selectedValue && !product.specifications?.some(spec => spec.name === specName && spec.value === selectedValue)) {
                    return false;
                }
            }
        }

        return true;
    });

    return (
        <div className="category-products-page">
            <aside className="sidebar">
                <h2 className="sidebar-title">Filters</h2>

                <div className="filter-group">
                    <label>Price Range: {priceRange[1]}</label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={handlePriceRangeChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Product Type:</label>
                    <select value={selectedProductType} onChange={handleProductTypeChange}>
                        <option value="">All</option>
                        {productTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {Object.keys(variants).length > 0 && (
                    Object.keys(variants).map(variantName => (
                        <div className="filter-group" key={variantName}>
                            <label>{variantName}:</label>
                            <select
                                value={selectedVariants[variantName] || ''}
                                onChange={(e) => handleVariantChange(variantName, e.target.value)}
                            >
                                <option value="">All</option>
                                {variants[variantName]?.map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    ))
                )}

                {Object.keys(specifications).length > 0 && (
                    Object.keys(specifications).map(specName => (
                        <div className="filter-group" key={specName}>
                            <label>{specName}:</label>
                            <select
                                value={selectedSpecifications[specName] || ''}
                                onChange={(e) => handleSpecificationChange(specName, e.target.value)}
                            >
                                <option value="">All</option>
                                {specifications[specName]?.map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    ))
                )}
            </aside>

            <main className="product-grid-container">
                <h1 className="page-title">Products in {categoryName}</h1>
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CategoryProductsPage;
