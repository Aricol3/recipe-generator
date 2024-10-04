import "./Recipe.scss";
import HeartButton from "../../common/HeartButton/HeartButton";
import { useRecipe } from "../../hooks/useRecipe";
import placeholderIMG from "../../assets/placeholder-image.webp";

const Recipe = () => {
  const {currentRecipe, photo, isFavorite, handleHeartClick} = useRecipe();

  return (
    <div className="recipe-container fade-in">
      <div className="recipe-left">
        <div className="left-container">
        <img className="recipe-image" src={photo ? photo.urls.regular : placeholderIMG} alt="recipe image"/>
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