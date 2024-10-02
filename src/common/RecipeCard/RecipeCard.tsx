import "./RecipeCard.scss";
import { useEffect, useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import placeholderIMG from "../../assets/placeholder-image.jpg";
import { useFavorites } from "../../hooks/useFavorites";
import { useSelector } from "react-redux";

const RecipeCard = ({ title, time, ingredients, instructions, onClick, isActive = false}) => {
  const favorites = useSelector((state) => state.recipes.favorites);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFavorite = favorites.some((recipe) => recipe.title === title);
    setActive(isFavorite);
  }, [favorites, title]);

  const { handleAddFavorite, handleRemoveFavorite } = useFavorites();

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setActive((prevActive) => {
      if (prevActive) {
        handleRemoveFavorite(title);
      } else {
        const recipe = { title, time, ingredients, instructions };
        handleAddFavorite(recipe);
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
