import "./SearchBar.scss";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
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
    </form>
  );
};

export default SearchBar;
