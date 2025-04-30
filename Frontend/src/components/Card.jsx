import React from "react";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <Link
      to={`/video/${item._id}`}
      className="card bg-base-100 w-full shadow-sm group relative"
    >
      <figure className="relative">
        <img
          src={item.image}
          alt="Shoes"
          className="w-full h-56  object-top object-cover"
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="btn btn-circle btn-primary">▶️</button>
        </div>
      </figure>

      <div className="px-2">
        <h2 className="">{item.title}</h2>
      </div>
    </Link>
  );
};

export default Card;
