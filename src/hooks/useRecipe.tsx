import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFavorites } from "./useFavorites";
import { normalizeTitle } from "../utils/normalizeTitle";

export const useRecipe = () => {
  const currentRecipe = useSelector((state: any) => state.recipes.currentRecipe);
  const normalizedTitle = normalizeTitle(currentRecipe.title);
  const photo = useSelector((state) => state.recipes.photos[normalizedTitle]);
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
    photo,
    isFavorite,
    handleHeartClick
  };
};
