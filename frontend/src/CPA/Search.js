import { createContext, useContext, useState } from "react";
import a from "axios";

const Search = (term) =>
  new Promise((r, j) =>
    a
      .get(`http://localhost:6969/vehicle/${term}`, {
        headers: { origin: null },
      })
      .then((d) => r(d.data))
      .catch((e) => j(e))
  );

const DefaultContext = {
  results: null,
  doSearch: null,
};

export const SearchContext = createContext(DefaultContext);

export const SearchProvider = ({ children }) => {
  const [results, sResults] = useState(null);

  const doSearch = async (term) => {
    console.log("search");
    const results = await Search(term);
    sResults(results);
    console.log(results);
  };

  const value = {
    results,
    doSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
