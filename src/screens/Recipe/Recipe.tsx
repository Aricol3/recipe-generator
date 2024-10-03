import "./Recipe.scss";
import { useSelector } from "react-redux";
import HeartButton from "../../common/HeartButton/HeartButton";
import { useFavorites } from "../../hooks/useFavorites";
import { useEffect, useState } from "react";
import { useRecipe } from "../../hooks/useRecipe";

const Recipe = () => {
  const {currentRecipe, isFavorite, handleHeartClick} = useRecipe();

  return (
    <div className="recipe-container fade-in">
      <div className="recipe-left">
        <div className="left-container">
        <div className="recipe-image-placeholder">Image</div>
        <div className="recipe-title-time">
          <div>
            <h1>{currentRecipe.title}</h1>
            <p>{currentRecipe.time} min.</p>
          </div>
          <div className="recipe-heart-container">
            <HeartButton isActive={isFavorite} onClick={handleHeartClick} />
          </div>
        </div>
        </div>

      </div>
      <div className="recipe-right">
        <div className="recipe-ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h2>Instructions:</h2>
          <ol>
            {currentRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Recipe;