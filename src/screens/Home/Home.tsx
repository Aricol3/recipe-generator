import "./Home.scss";
import SearchBar from "../../common/SearchBar/SearchBar";
import RecipeCard from "../../common/RecipeCard/RecipeCard";
import OpenAI from "openai";
import { sleep } from "openai/core";
import { useEffect, useState } from "react";
import Spinner from "../../common/Spinner/Spinner";
import { callOpenAI, setCurrentRecipe } from "../../redux-toolkit/slices/recipesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoritesSection from "../../common/FavoritesSection/FavoritesSection";
import SuggestedRecipesSection from "../../common/SuggestedRecipesSection/SuggestedRecipesSection";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipesList = useSelector((state: any) => state.recipes.recipesList);
  const isLoading = useSelector((state: any) => state.recipes.isLoading);


  const onSearch = (query) => {
    console.log("call openai");
    dispatch(callOpenAI(query) as any);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="spinner-container">
          <Spinner shouldSpin={isLoading} />
        </div>
      );
    }

    if (!recipesList) {
      return <FavoritesSection />;
    } else {
      return <SuggestedRecipesSection />;
    }
  };

  return (
    <>
      <div className="content-container">
        <SearchBar onSearch={onSearch} />
        {renderContent()}
      </div>

    </>
  );
};

export default Home;
