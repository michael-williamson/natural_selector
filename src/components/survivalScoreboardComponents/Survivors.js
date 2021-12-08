import React from "react";
import { IndividualSurvivor } from "./IndividualSurvivor";

export const Survivors = (props) => {
  const { survivorState } = props;
  return survivorState.map((item, index) => (
    <IndividualSurvivor
      key={index}
      survivorNumber={index + 1}
      foodCount={item.foodCount}
      furCount={item.furCount}
      shelterCount={item.shelterCount}
      survived={!item.eliminated}
    />
  ));
};
