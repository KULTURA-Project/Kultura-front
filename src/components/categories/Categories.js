// Categories.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './Categories.css';
import Category from '../category/Category';

const Categories = ({ categories }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          // <div key={category.id} className="category-card">
          //   <Link to={`/category-products/${category.id}`}>
          //     <div className="category-image-wrapper">
          //       <img src={category.image} alt={category.name} className="category-image" />
          //     </div>
          //     <h3 className="category-name">{category.name}</h3>
          //   </Link>
          // </div>

          <div className='category-card' key={category.id}>
            <Link to={`/category-products/${category.id}`}>
              <Category label={category.name} form="full" />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Categories;
