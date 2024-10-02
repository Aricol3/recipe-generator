import "./SearchBar.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux-toolkit/slices/recipesSlice";

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      dispatch(setSearchQuery(query) as any);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you feel like eating?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button
        type="button"
        onClick={query ? () => setQuery("") : null}
        className="search-icon"
      >
        {query ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faSearch} />
        }
      </button>
    </form>
  );
};

export default SearchBar;
