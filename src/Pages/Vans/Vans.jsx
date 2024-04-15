import React from "react";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../Api";

export function loader() {
  return getVans();
}

const Vans = () => {
  //const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false); // used with vans state
  //const [error, setError] = useState(null);
  const vans = useLoaderData();

  /* useEffect(() => {
    // used with vans state
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []); */

  // we put in separate file called Api.js instead of repeat the calling over and over
  /* useEffect(() => {
    fetch("./api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []); */

  const typeFilter = searchParams.get("type")?.toLowerCase();
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: searchParams.toString(), type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  /*   if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  } */

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          } `}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "Luxury" })}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          } `}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          } `}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            onClick={() => {
              setSearchParams("");
            }}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};

export default Vans;
