import React from "react";

/**
 *
 * @param {string} color comma separated rgb values to be inserted in style object
 * @param {string} weight font weight, i.e bold, normal
 *
 * @returns
 */
const CustomPara = ({ size, text, opacity = 1, weight = "normal", color = "20,20,20" }) => {
  return (
    <p
      style={{ fontSize: `${size}em`, color: `rgb(${color},${opacity})`, fontWeight: `${weight}` }}>
      {text}
    </p>
  );
};

export { CustomPara };
