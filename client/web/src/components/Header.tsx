import React from "react";

type HeaderProps = {
  text: string;
};

export const Header = (props: HeaderProps) => (
  <div className="store__header">
    <h1>{props.text}</h1>
  </div>
);
