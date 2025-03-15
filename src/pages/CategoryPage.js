// pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FeatureProduct from '../components/FeatureProduct';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/products/?category__name=${categoryName}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Error fetching products');
        }
 
    };

    const fetchSubCategories = async () => {
      try {
        const categoryId = await getCategoryID(categoryName);
        if (!categoryId) {
          setError('Error getting category ID');
          return;
        }
        const response = await fetch(`http://127.0.0.1:8000/api/subcategories/${categoryId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Error fetching subcategories');
      }
    };

    fetchProducts();
    fetchSubCategories();
  }, [categoryName]);

  const getCategoryID = async (categoryName) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/categories/?name=${categoryName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data[0].id; // Assuming the first result is the correct category
    } catch (error) {
      console.error('Error getting category ID:', error);
      return null;
    }
  };

  return (
    <div>
      <h1>Products in {categoryName}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Subcategories:</h2>
      <ul>
        {subCategories && subCategories.map((subCategory) => (
          <li key={subCategory.id}>
            <Link to={`/category/${categoryName}/${subCategory.name.toLowerCase()}`}>
              {subCategory.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Products:</h2>
      {Array.isArray(products) && products.map((product) => (
        <FeatureProduct key={product.id} product={product} />
      ))}
      {!Array.isArray(products) && <p>No products found.</p>}
    </div>
  );
};

export default CategoryPage;
