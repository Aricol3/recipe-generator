import "./Home.scss";
import SearchBar from "../../common/SearchBar/SearchBar";
import Spinner from "../../common/Spinner/Spinner"
import FavoritesSection from "../../common/FavoritesSection/FavoritesSection";
import SuggestedRecipesSection from "../../common/SuggestedRecipesSection/SuggestedRecipesSection";
import { useHome } from "../../hooks/useHome";

const Home = () => {
  const { recipesList, isLoading, onSearch } = useHome();

  const renderContent = () => {
    if ((!recipesList || recipesList.length === 0) && !isLoading) {
      return <FavoritesSection />;
    } else {
      return <SuggestedRecipesSection />;
    }
  };

  return (
    <>
      <div className="content-container fade-in">
        <SearchBar onSearch={onSearch} />
        {renderContent()}
      </div>

    </>
  );
};

export default Home;
