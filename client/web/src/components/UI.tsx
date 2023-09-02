import React from "react";

export function Button(props: { text: string }) {
  return <button className="store__button">{props.text}</button>;
}
