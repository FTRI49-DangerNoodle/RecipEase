import React, { useState } from 'react';
import SearchAppBar from '../components/navbar.jsx';

const HomeScreen = () => {
  // dummy menu to load on screen before recipes are populated
  // const recipeOptions = [
  //   //dummy data
  //   { idMeal: 1, strMeal: 'Pizza' },
  //   { idMeal: 2, strMeal: 'Spaghetti' },
  //   { idMeal: 3, strMeal: 'Mac and Cheese' },
  //   { idMeal: 4, strMeal: 'egg' },
  // ];

  //mealNames is going to be an array of the options in the autocomplete/dropdown menu
  // const mealNames = recipeOptions.map((option) => option.strMeal);

  // console.log('The search term is: ', searchTerm);
  // const recipeObj = recipeOptions.find(
  //   (element) =>
  //     //should try inserting conditional if searchTerm is null
  //     element.strMeal === searchTerm
  // );

  // console.log('The recipe object is: ', recipeObj);

  // change for commit

  return (
    <div className="home-screen-outer">
      <SearchAppBar />
      Welcome to RecipEase !
      <div className="carousel-container">
        <div className="carousel fade">
          <div className="numbertext">1 / 3</div>
          <img src="./frontend/src/assets/chickendish.png" style="width:100%" />
          <div className="text">Chicken</div>
        </div>

        <div className="carousel fade">
          <div className="numbertext">2 / 3</div>
          <img src="./frontend/src/assets/pasta.png" style="width:100%" />
          <div className="text">Pasta</div>
        </div>

        <div className="carousel fade">
          <div className="numbertext">3 / 3</div>
          <img src="./frontend/src/assets/pizza.png" style="width:100%" />
          <div className="text">Pizza</div>
        </div>

        <a className="carousel-prev" onClick="plusSlides(-1)">
          &#10094;
        </a>
        <a className="carousel-next" onClick="plusSlides(1)">
          &#10095;
        </a>
      </div>
      <br />
      <div style="text-align:center">
        <span className="dot" onClick="currentSlide(1)"></span>
        <span className="dot" onClick="currentSlide(2)"></span>
        <span className="dot" onClick="currentSlide(3)"></span>
      </div>
    </div>
  );
};

export default HomeScreen;
