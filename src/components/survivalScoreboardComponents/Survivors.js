import React from "react";
import { environmentIconObject } from "../../helperFunctions";
import { IndividualSurvivor } from "./IndividualSurvivor";

export const Survivors = (props) => {
  const { survivorState } = props;
  const { environmentsPath } = props;

  return survivorState.map((item, index) => (
    <IndividualSurvivor
      key={index}
      survivorNumber={index + 1}
      foodCount={item.foodCount}
      waterCount={item.waterCount}
      adaptation={item.adaptation}
      shelterCount={item.shelterCount}
      survived={!item.eliminated}
      environmentIconObject={environmentIconObject[environmentsPath]}
    />
  ));
};
