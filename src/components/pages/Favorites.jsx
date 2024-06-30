import React from "react";
import FavCard from "../cards/FavCard";
import BounceHeader from "../tools/BounceHeader";

const Favorites = () => {
  return (
    <div>
      <div>
        <BounceHeader text='Favorite Cards' />
      </div>
      <FavCard />
    </div>
  );
};

export default Favorites;
