import "./Recipe.scss"
import { useSelector } from "react-redux";

const Recipe = () => {
  const currentRecipe = useSelector((state:any)=> state.recipes.currentRecipe);

  return (
    <div className="recipe-container">
      <div className="recipe-left">
        {/* Placeholder for the image */}
        <div className="recipe-image-placeholder">Image</div>
        <div className="recipe-title-time">
          <h1>{currentRecipe.title}</h1>
          <p>{currentRecipe.time} min.</p>
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
}

export default Recipe