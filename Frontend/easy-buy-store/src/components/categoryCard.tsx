import React, { MouseEventHandler } from "react";

type Props = {
  name: string;
  image: string;
  onEditCategory: MouseEventHandler<HTMLButtonElement>;
  onDeleteCategory: MouseEventHandler<HTMLButtonElement>;
};

const CategoryCard = (props: Props) => {
  const style = {
    backgroundImage: `linear-gradient(90deg, rgba(26, 141, 202, 1), rgba(34, 60, 80, 0)), url(${props.image})`,
    backgroundSize: "cover",
  };
  return (
    <div
      className="flex flex-col justify-between w-80 h-80 mx-auto bg-gradient-to-r rounded-tr-[24px] rounded-tl-[96px] rounded-bl-[24px] rounded-br-[96px] p-6"
      style={style}
    >
      {/* Header Text */}
      <h2 className="text-white text-center text-xl font-bold">{props.name}</h2>

      {/* Button */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          className="bg-black text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-gray-800"
          onClick={props.onEditCategory}
        >
          EDIT
        </button>
        <button
          className="bg-black text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-gray-800"
          onClick={props.onDeleteCategory}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
