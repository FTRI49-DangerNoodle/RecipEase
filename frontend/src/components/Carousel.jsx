import React, { useState, useEffect } from 'react';

/* CSS STYLING SUGGESTIONS FOR CAROUSEL
.carousel {
    position: relative;
    max-width: 100%;
    overflow: hidden;
  }
  .carousel__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    border: none;
    padding: 1rem;
    cursor: pointer;
    z-index: 1;
    transition: background-color 0.3s;
  }
  .carousel__btn:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .carousel__btn--prev {
    left: 0;
  }
  .carousel__btn--next {
    right: 0;
  }
  .carousel__img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease-in-out;
  }
  .carousel__img:hover {
    transform: scale(1.05);
  }
*/

const Carousel = ({ images, interval = 3000 }) => {
  // state for image array index of carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // function to move to next slide of carousel
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // function to move to previous slide of carousel
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // useEffec to autoplay carousel
  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [nextSlide, prevSlide, interval]);

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="carousel__img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
