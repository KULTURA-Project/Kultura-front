import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryProductsPage.css';

const CategoryProductsPage = () => {
    const { category_id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState({});
    const [variants, setVariants] = useState({});
    const [selectedVariants, setSelectedVariants] = useState({});
    const [specifications, setSpecifications] = useState({});
    const [selectedSpecifications, setSelectedSpecifications] = useState({});
    const [maxPrice, setMaxPrice] = useState(10000);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [minPriceInput, setMinPriceInput] = useState(0);
    const [maxPriceInput, setMaxPriceInput] = useState(10000);

    // Memoize the resetFilters function using useCallback
    const resetFilters = useCallback(() => {
        setSelectedProductTypes({});
        setSelectedVariants({});
        setSelectedSpecifications({});
        setPriceRange([0, maxPrice]);
        setMinPriceInput(0);
        setMaxPriceInput(maxPrice);
    }, [maxPrice]);

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
                console.log('Products data:', data);

                setProducts(data);

                // Find the maximum price in the category
                const maxProductPrice = data.reduce((max, product) => {
                    const price = parseFloat(product.price);
                    return (!isNaN(price) && price > max) ? price : max;
                }, 0);

                // Set the maxPrice to 100 more than the maximum product price
                const newMaxPrice = maxProductPrice + 100;
                setMaxPrice(newMaxPrice);
                setPriceRange([0, newMaxPrice]);
                setMinPriceInput(0);
                setMaxPriceInput(newMaxPrice);

                const uniqueProductTypes = [...new Set(data.map(product => product.product_type?.name).filter(Boolean))];
                setProductTypes(uniqueProductTypes);

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

        resetFilters();
        fetchCategoryName();
        fetchProducts();
    }, [category_id, resetFilters]); // Added resetFilters to the dependency array

    const handlePriceRangeChange = (event) => {
        const newValue = parseInt(event.target.value);
        setPriceRange([0, newValue]);
        setMaxPriceInput(newValue);
    };

    const handleMinPriceInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        setMinPriceInput(newValue);
        setPriceRange([newValue, priceRange[1]]);
    };

    const handleMaxPriceInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        setMaxPriceInput(newValue);
        setPriceRange([priceRange[0], newValue]);
    };

    const handleProductTypeChange = (type) => {
        setSelectedProductTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleVariantChange = (variantName, value) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variantName]: {
                ...prev[variantName],
                [value]: !prev[variantName]?.[value]
            }
        }));
    };

    const handleSpecificationChange = (specName, value) => {
        setSelectedSpecifications(prev => ({
            ...prev,
            [specName]: {
                ...prev[specName],
                [value]: !prev[specName]?.[value]
            }
        }));
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

        const isProductTypeSelected = Object.keys(selectedProductTypes).filter(type => selectedProductTypes[type]);
        if (isProductTypeSelected.length > 0 && !isProductTypeSelected.includes(product.product_type?.name)) {
            return false;
        }

        for (const variantName in selectedVariants) {
            if (selectedVariants.hasOwnProperty(variantName)) {
                const selectedValues = Object.keys(selectedVariants[variantName]).filter(value => selectedVariants[variantName][value]);
                if (selectedValues.length > 0 && !product.variants?.some(variant => variant.name === variantName && selectedValues.includes(variant.value))) {
                    return false;
                }
            }
        }

        for (const specName in selectedSpecifications) {
            if (selectedSpecifications.hasOwnProperty(specName)) {
                const selectedValues = Object.keys(selectedSpecifications[specName]).filter(value => selectedSpecifications[specName][value]);
                if (selectedValues.length > 0 && !product.specifications?.some(spec => spec.name === specName && selectedValues.includes(spec.value))) {
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
                    <label>Price Range:</label>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={handlePriceRangeChange}
                    />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        
                        <input
                            type="number"
                            value={minPriceInput}
                            onChange={handleMinPriceInputChange}
                            placeholder="Min"
                            style={{ width: '70px' }}
                        />
                        <input
                            type="number"
                            value={maxPriceInput}
                            onChange={handleMaxPriceInputChange}
                            placeholder="Max"
                            style={{ width: '70px' }}
                        />
                       
                    </div>
                </div>

                <div className="filter-group">
                    <label>Product Type:</label>
                    <div className="checkbox-list">
                        {productTypes.map(type => (
                            <div key={type}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={selectedProductTypes[type] || false}
                                        onChange={() => handleProductTypeChange(type)}
                                    />
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {Object.keys(variants).length > 0 && (
                    Object.keys(variants).map(variantName => (
                        <div className="filter-group" key={variantName}>
                            <label>{variantName}:</label>
                            <div className="checkbox-list">
                                {variants[variantName]?.map(value => (
                                    <div key={value}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={value}
                                                checked={selectedVariants[variantName]?.[value] || false}
                                                onChange={() => handleVariantChange(variantName, value)}
                                            />
                                            {value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {Object.keys(specifications).length > 0 && (
                    Object.keys(specifications).map(specName => (
                        <div className="filter-group" key={specName}>
                            <label>{specName}:</label>
                            <div className="checkbox-list">
                                {specifications[specName]?.map(value => (
                                    <div key={value}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={value}
                                                checked={selectedSpecifications[specName]?.[value] || false}
                                                onChange={() => handleSpecificationChange(specName, value)}
                                            />
                                            {value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </aside>

            <main className="product-grid-container">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span> &gt; </span>
                    <span>{categoryName}</span>
                </div>
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
