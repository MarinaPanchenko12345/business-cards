import React from "react";
import MyCard from "../cards/MyCard";
import BounceHeader from "../tools/BounceHeader";

const MyCards = () => {
  return (
    <div>
      <div>
        <BounceHeader text='My Cards' />
      </div>
      <MyCard />
    </div>
  );
};

export default MyCards;
