import React, { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const AddButton = (props: Props) => {
  return (
    <div className="z-0 fixed bottom-8 right-8">
      <button
        className="bg-sky-900 px-5 py-2 text-white text-sm font-bold  rounded-full "
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default AddButton;
