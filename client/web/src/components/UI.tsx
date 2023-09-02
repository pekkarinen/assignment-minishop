import React from "react";

export function Button(props: { text: string; cb: Function }) {
  return (
    <button
      className="store__button"
      onClick={props.cb()}>
      {props.text}
    </button>
  );
}
