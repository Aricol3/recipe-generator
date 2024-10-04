import { useDispatch, useSelector } from "react-redux";
import { callOpenAI, setIsLoading } from "../redux-toolkit/slices/recipesSlice";
import { useEffect } from "react";

export const useHome = () => {
  const dispatch = useDispatch();
  const recipesList = useSelector((state: any) => state.recipes.recipesList);
  const isLoading = useSelector((state: any) => state.recipes.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

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
