import "./SearchBar.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux-toolkit/slices/recipesSlice";

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      dispatch(setSearchQuery(query) as any);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="What do you feel like eating?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        type="button"
        onMouseDown={handleMouseDown}
        onClick={isFocused ? () => setQuery("") : query ? () => onSearch(query) : null}
        className="search-icon"
      >
        {isFocused ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faSearch} />}
      </button>
    </form>
  );
};

export default SearchBar;
