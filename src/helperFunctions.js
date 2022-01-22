import {
  caveIcon,
  meatIcon,
  grassIcon,
  treeShelterIcon,
  waterIcon,
  snowflakeIcon,
  orangeIcon,
  raindropIcon,
  camelIcon,
  furIcon,
  toucanIcon,
} from "./media";

// survivor object architecture to maintain consistency

export const survivorStateFN = (num) => {
  const survivorObjectArray = [];

  for (let i = 0; i < num; i++) {
    survivorObjectArray.push({
      foodCount: 0,
      waterCount: 0,
      shelterCount: 0,
      adaptation: 0,
      eliminated: false,
    });
  }
  return survivorObjectArray;
};

export const environmentPathObject = {
  desert: "desert",
  mountain: "mountain",
  rainForest: "rainForest",
};

export const environmentIconObject = {
  desert: {
    food: grassIcon,
    water: waterIcon,
    shelter: treeShelterIcon,
    adaptation: camelIcon,
  },
  mountain: {
    food: meatIcon,
    water: snowflakeIcon,
    shelter: caveIcon,
    adaptation: furIcon,
  },
  rainForest: {
    food: orangeIcon,
    water: raindropIcon,
    shelter: treeShelterIcon,
    adaptation: toucanIcon,
  },
};

const imageObjectJavaScriptFN = (environment, resource) => {
  const image = new Image();
  image.src = environmentIconObject[environment][resource];
  return image;
};

export const environmentIconsObjectFN = () => {
  const obj = {
    desert: {
      food: imageObjectJavaScriptFN("desert", "food"),
      water: imageObjectJavaScriptFN("desert", "water"),
      shelter: imageObjectJavaScriptFN("desert", "shelter"),
    },
    mountain: {
      food: imageObjectJavaScriptFN("mountain", "food"),
      water: imageObjectJavaScriptFN("mountain", "water"),
      shelter: imageObjectJavaScriptFN("mountain", "shelter"),
    },
    rainForest: {
      food: imageObjectJavaScriptFN("rainForest", "food"),
      water: imageObjectJavaScriptFN("rainForest", "water"),
      shelter: imageObjectJavaScriptFN("rainForest", "shelter"),
    },
  };

  return obj;
};
