import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux-toolkit/slices/recipesSlice";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);

  const handleAddFavorite = (recipe) => {
    dispatch(addFavorite(recipe));
  };

  const handleRemoveFavorite = (title) => {
    dispatch(removeFavorite(title));
  };

  return {
    favorites,
    handleAddFavorite,
    handleRemoveFavorite
  };
};
