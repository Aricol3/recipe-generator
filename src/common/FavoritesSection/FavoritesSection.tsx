import "./FavoritesSection.scss"
import RecipeCard from "../RecipeCard/RecipeCard";
import { setCurrentRecipe } from "../../redux-toolkit/slices/recipesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const FavoritesSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavoritesFromLocalStorage();
  }, []);

  const loadFavoritesFromLocalStorage = () => {
    const savedRecipes = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith("recipe_")) {
        const recipe = JSON.parse(localStorage.getItem(key));

        if (recipe && recipe.title && recipe.time) {
          savedRecipes.push(recipe);
        }
      }
    }

    setFavorites(savedRecipes);
  };

  const handleRemoveFavorite = (title) => {
    localStorage.removeItem(`recipe_${title}`);

    const updatedFavorites = favorites.filter((recipe) => recipe.title !== title);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-section">
      <h1>Favorites</h1>
      <div className="favorites-recipes-cards-container">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.title + recipe.time + recipe.ingredients[0]}`}
              title={recipe.title}
              time={recipe.time}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              onClick={() => {
                console.log(`${recipe.title} clicked`);
                dispatch(setCurrentRecipe(recipe));
                navigate("recipe");
              }}
              isActive={true}
              onHeartClick={() => handleRemoveFavorite(recipe.title)}
            />
          ))
        ) : (
          <p>No favorites saved yet.</p>
        )}
      </div>
    </div>
  )
}

export default FavoritesSection