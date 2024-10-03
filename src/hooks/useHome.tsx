import { useDispatch, useSelector } from "react-redux";
import { callOpenAI } from "../redux-toolkit/slices/recipesSlice";

export const useHome = () => {
  const dispatch = useDispatch();
  const recipesList = useSelector((state: any) => state.recipes.recipesList);
  const isLoading = useSelector((state: any) => state.recipes.isLoading);


  const onSearch = (query) => {
    console.log("call openai");
    dispatch(callOpenAI(query) as any);
  };

  return {
    recipesList,
    isLoading,
    onSearch,
  };
};
