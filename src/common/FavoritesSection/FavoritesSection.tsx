import "./FavoritesSection.scss";
import RecipeCard from "../RecipeCard/RecipeCard";
import {
  loadFavoritesFromLocalStorage,
  setCurrentRecipe
} from "../../redux-toolkit/slices/recipesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const FavoritesSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);

  const syncFavorites = () => {
    dispatch(loadFavoritesFromLocalStorage());
  };

  useEffect(() => {
    syncFavorites();

    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
    };
  }, [dispatch]);


  return (
    <div className="favorites-section">
      <h1>Favorites</h1>
      <div className="favorites-recipes-cards-container">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              key={recipe.title}
            >
              <RecipeCard
                key={recipe.title}
                title={recipe.title}
                time={recipe.time}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                onClick={() => {
                  dispatch(setCurrentRecipe(recipe));
                  navigate(`/recipe`);
                }}
              />
            </div>
          ))
        ) : (
          <p>No favorites saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;