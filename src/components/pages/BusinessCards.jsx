import React from "react";
import Cards from "./../cards/Cards";
import BounceHeader from "../tools/BounceHeader";

const BusinessCards = () => {
  return (
    <div>
      <div>
        <BounceHeader text='All Business Cards' />
      </div>
      <Cards />
    </div>
  );
};

export default BusinessCards;
