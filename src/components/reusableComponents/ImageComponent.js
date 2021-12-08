import React from "react";

const imgStyle = {
  width: "20px",
  height: "20px",
};

export const ImageComponent = (props) => {
  const { image } = props;
  const { alt } = props;
  const { iterations } = props;

  return Array(iterations)
    .fill(0)
    .map((item, index) => (
      <img src={image} alt={alt} key={`${alt}${index}`} style={imgStyle} />
    ));
};
