import "./RecipeCard.scss";
import { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import placeholderIMG from "../../assets/placeholder-image.jpg";

const RecipeCard = ({ title, time, ingredients, instructions, onClick, isActive = false, onHeartClick }) => {
  const [active, setActive] = useState(isActive);

  const saveRecipeToLocalStorage = () => {
    const recipe = {
      title,
      time,
      ingredients,
      instructions,
    };
    localStorage.setItem(`recipe_${title}`, JSON.stringify(recipe));
    console.log(`Recipe '${title}' saved to localStorage`);
  };

  const removeRecipeFromLocalStorage = () => {
    localStorage.removeItem(`recipe_${title}`);
    console.log(`Recipe '${title}' removed from localStorage`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setActive((prevActive) => {
      if (prevActive) {
        removeRecipeFromLocalStorage();
        onHeartClick && onHeartClick();
      } else {
        saveRecipeToLocalStorage();
      }
      return !prevActive;
    });
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="image-container">
        <img className="card-image" src={placeholderIMG} alt="recipe image" />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{time}</p>
      </div>
      <div className="heart-container">
        <HeartButton isActive={active} onClick={handleHeartClick} />
      </div>
    </div>
  );
};

export default RecipeCard;
