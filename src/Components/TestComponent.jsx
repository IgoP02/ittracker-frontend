// This component is meant to be used as testing ground for stuff, since you're still learning

import React, { useEffect } from "react";

const getData = async () => {
  const productResponse = await fetch("https://dummyjson.com/products/1");
  const ProductJson = await productResponse.json();
  console.log(ProductJson);
};

export default function TestComponent() {
  useEffect(() => {
    getData();
  }, []);

  return <div>TestComponent</div>;
}
