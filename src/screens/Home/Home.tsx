import "./Home.scss";
import SearchBar from "../../common/SearchBar/SearchBar";
import RecipeCard from "../../common/RecipeCard/RecipeCard";

const Home = () => {


  return (
    <>
      <div className="content-container">
        <SearchBar />
        <div className="favorites-section">
          <h1>Favorites</h1>
          <div className="recipe-cards-container">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
