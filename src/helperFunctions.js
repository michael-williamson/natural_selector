export const survivorStateFN = (num) => {
  const survivorObjectArray = [];

  for (let i = 0; i < num; i++) {
    survivorObjectArray.push({
      survivorPosition: i,
      foodCount: 0,
      shelterCount: 0,
      furCount: 0,
      eliminated: false,
    });
  }
  return survivorObjectArray;
};
