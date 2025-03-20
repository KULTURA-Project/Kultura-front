// FeaturedProducts.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductCard from '../components/ProductCard'; // Import ProductCard component
import './FeaturedProducts.css';

const FeaturedProducts = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides visible at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="featured-products-section">
      <h2>Featured Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-card-wrapper">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '50%',
        fontSize: '20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '50%',
        fontSize: '20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

export default FeaturedProducts;
