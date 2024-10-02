import "./SuggestedRecipesSection.scss";
import RecipeCard from "../RecipeCard/RecipeCard";
import { clearRecipesList, setCurrentRecipe } from "../../redux-toolkit/slices/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuggestedRecipesSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipesList = useSelector((state: any) => state.recipes.recipesList);

  console.log("THE RECIPES", recipesList);


  return (
    <div className="suggested-recipes-section">
      <h1>Suggested recipes</h1>
      <div className="suggested-recipes-cards-container">
        {recipesList.map((recipe) => (
          <RecipeCard
            key={`${recipe.title + recipe.time + recipe.ingredients[0]}`}
            title={recipe.title}
            time={recipe.time}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            onClick={() => {
              dispatch(setCurrentRecipe(recipe));
              navigate("recipe");
            }}
          />
        ))}
      </div>
      <div className="suggested-buttons-container">
        <button className="suggested-button" onClick={() => console.log("REFRESH")}>I don't like these</button>
        <button className="suggested-button" onClick={() => dispatch(clearRecipesList())}>Clear search</button>
      </div>
    </div>
  );
};

export default SuggestedRecipesSection;