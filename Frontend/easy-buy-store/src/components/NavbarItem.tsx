import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  link: string;
  selected: boolean;
  onClick: () => void;
};

export const NavbarItem = (props: Props) => {
  return (
    <li className="mx-4">
      <Link
        to={props.link}
        className={`${
          props.selected ? "font-bold" : "font-normal"
        } text-black font-poppins text-[20px] hover:text-blue-500`}
        onClick={props.onClick}
      >
        {props.title}
      </Link>
    </li>
  );
};
