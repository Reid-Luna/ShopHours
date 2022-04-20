import "../CSS/Home.css";
import { useSearch, SearchProvider } from "../CPA";
import { useState } from "react";

export const Home = () => {
  const { doSearch, results } = useSearch();
  const [iS, cIS] = useState("");

  const handleSearch = () => {
    console.log("search");
    doSearch(iS);
    console.log(results);
  };

  return (
    <div className="Home">
      <header>
        <div className="QR"></div>
      </header>

      <div className="Main">
        <div className="Search">
          <input
            type="text"
            className="SearchTerm"
            placeholder="Search"
            onChange={(e) => cIS(e.target.value)}
          />
          <button type="submit" className="SearchButton" onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <footer>
        <div className="Stat">
          <div className="title">Hours</div>
          <div className="text">30</div>
        </div>
        <div className="Stat">
          <div className="title">Frontlined</div>
          <div className="text">7</div>
        </div>
        <div className="Stat">
          <div className="title">Returned</div>
          <div className="text">1</div>
        </div>
      </footer>
    </div>
  );
};
