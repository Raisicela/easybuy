import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
};

function Modal(props: Props) {
  return (
    <dialog
      open={props.open}
      className="flex flex-col justify-center items-center h-screen w-screen bg-[#605d73aa] z-10"
    >
      {props.children}
    </dialog>
  );
}

export default Modal;
