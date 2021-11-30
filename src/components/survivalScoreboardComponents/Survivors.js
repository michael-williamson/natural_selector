import React from "react";
import { IndividualSurvivor } from "./IndividualSurvivor";

const survivorsArray = Array(20);
survivorsArray.fill(0);

export const Survivors = () => {
  return survivorsArray.map((item, index) => (
    <IndividualSurvivor key={index} survivorNumber={index + 1} />
  ));
};
