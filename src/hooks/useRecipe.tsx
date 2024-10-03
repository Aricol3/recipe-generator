import { useDispatch, useSelector } from "react-redux";
import { callOpenAI } from "../redux-toolkit/slices/recipesSlice";
import { useEffect, useState } from "react";
import { useFavorites } from "./useFavorites";

export const useRecipe = () => {
  const currentRecipe = useSelector((state: any) => state.recipes.currentRecipe);
  const { favorites, handleAddFavorite, handleRemoveFavorite } = useFavorites();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsFavorite((prevActive) => {
      prevActive ? handleRemoveFavorite(currentRecipe.title) : handleAddFavorite(currentRecipe);
      return !prevActive;
    });
  };

  useEffect(() => {
    const isFavorite = favorites.some((recipe) => recipe.title === currentRecipe.title);
    setIsFavorite(isFavorite);
  }, [favorites, currentRecipe.title]);


  return {
    currentRecipe,
    isFavorite,
    handleHeartClick
  };
};
