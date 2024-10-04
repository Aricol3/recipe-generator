import "./SuggestedRecipesSection.scss";
import RecipeCard from "../RecipeCard/RecipeCard";
import { callOpenAI, clearRecipesList, setCurrentRecipe } from "../../redux-toolkit/slices/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeCardSkeleton from "../RecipeCard/RecipeCardSkeleton";

const SuggestedRecipesSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipesList = useSelector((state: any) => state.recipes.recipesList);
  const isLoading = useSelector((state) => state.recipes.isLoading);

  console.log("THE RECIPES", recipesList);

  return (
    <div className="suggested-recipes-section">
      <h1>Suggested recipes</h1>
      <div className="suggested-recipes-cards-container">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              key={index}
            >
              <RecipeCardSkeleton />
            </div>
          ))
        ) : (
          recipesList.map((recipe, index) => (
            <div
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              key={recipe.title}
            >
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
            </div>
          ))
        )}
      </div>
      {!isLoading && (
        <div className="suggested-buttons-container fade-in" style={{ animationDelay: `${5 * 0.1}s` }}>
          <button className="suggested-button"
                  onClick={() => dispatch(callOpenAI("I don't like these, refresh") as any)}>I don't like these
          </button>
          <button className="suggested-button" onClick={() => dispatch(clearRecipesList())}>Clear search</button>
        </div>
      )}
    </div>
  );
};

export default SuggestedRecipesSection;