import React, { useRef, useState } from "react";

export default function refStateHook(value) {
  const ref = useRef(value);
  const [, dummyState] = useState(false);
  const updateStateRef = (newstate) => {
    ref.current = newstate;
    dummyState((s) => !s);
  };
  return [ref.current, updateStateRef];
}
