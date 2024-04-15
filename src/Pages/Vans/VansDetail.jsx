import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
//import { useState, useEffect } from "react";
import { getVans } from "../../Api";

//we can't use hooks (useParams()) outside of the component
// but likely we have the media access called => params

export function loader({ params }) {
  return getVans(params.id);
}

const VansDetail = () => {
  const van = useLoaderData();
  /* const params = useParams(); */

  //const [van, setVan] = useState(null);
  const location = useLocation();
  //const data = location.state?.search ? location.state : "..";
  /*      const data = location.state?.search ? "..?" + location.state.search : "..";
   */ const search = location.state?.search || "";

  /* useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]); */

  return (
    <div className="van-detail-container">
      {/* if there are some searches before our type will save them and add them to the new one */}
      <Link to={`..?${search}`} relative="path" className="back-button">
        &larr; <span>Back to {location.state?.type || "all "} vans</span>
      </Link>

      {/* {van ? ( */}
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
      {/*  ) : (
        <h2>Loading...</h2>
      )} */}
    </div>
  );
};

export default VansDetail;
