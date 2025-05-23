// Home.js  <MostWishedProduct product={mostWishedProduct} />       <Promotions promotions={promotions} />
import axios from 'axios';
import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import HeroSection from '../components/HeroSection';
import Recommendations from '../components/Recommendations';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [mostWishedProduct, setMostWishedProduct] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/home/api/featured-products/');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/home/api/promotions/');
        setPromotions(response.data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    const fetchMostWishedProduct = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/most-wished-product/');
        setMostWishedProduct(response.data);
      } catch (error) {
        console.error('Error fetching most wished product:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recommendations/');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchCategories();
    fetchFeaturedProducts();
    fetchPromotions();
    fetchMostWishedProduct();
    fetchRecommendations();
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <Categories categories={categories} />
      <FeaturedProducts products={featuredProducts} />

  
      <Recommendations products={recommendations} />
    </div>
  );
};

export default Home;
