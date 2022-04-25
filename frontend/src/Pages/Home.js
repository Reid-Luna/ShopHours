import "../CSS/Home.css";
import { useAPI } from "../CPA";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { doSearch, searchResults, getOrders, ordersInProgress } = useAPI();
  const [iS, cIS] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("search");
    doSearch(iS);
    console.log(searchResults);
  };

  useEffect(() => {
    getOrders();
  }, getOrders);

  return (
    <div className="Home">
      <header>
        <div className="SidebarLogo"></div>

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
      </header>

      <div className="Main">
        <div className="RecentOrders">
          {ordersInProgress?.map((o) => (
            <div
              className="result"
              key={o.vehicle.shopmonkeyId}
              onClick={() => navigate(`/order/${o.number}`)}
            >
              {`[${o.number}] ${o.vehicle.year} ${o.vehicle.make} ${o.vehicle.model}`}
            </div>
          ))}
        </div>
        <div className="NewVehicles"></div>
      </div>

      <footer></footer>
    </div>
  );
};

// {results?.length > 0 &&
//   results.map((r) => {
//     let id;
//     if (r.vehicle) {
//       id = r.number;
//       r = r.vehicle;
//     } else {
//       id = r.vin.substr(-6);
//     }
//     return (
//       <div
//         className="result"
//         key={r.shopmonkeyId}
//         onClick={() => navigate(`/order/${id}`)}
//       >
//         {`[${id}] ${r.year} ${r.make} ${r.model}`}
//       </div>
//     );
//   })}
