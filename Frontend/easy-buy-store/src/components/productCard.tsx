import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  price: number;
  description: string;
  image: string;
  categoryName: string;
  onEditProduct: MouseEventHandler<HTMLButtonElement>;
  onDeleteProduct: MouseEventHandler<HTMLButtonElement>;
};

const ProductCard = (props: Props) => {
  const regexUrl = (url: string) => {
    const regex = /https?:\/\/[^\s"]+/g;
    const matches = url.match(regex);
    return matches ? matches[0] : "";
  };

  return (
    <div className="max-w-xs mx-auto bg-gradient-to-r from-[#223C50] to-[#1A8DCA] rounded-tr-[24px] rounded-tl-[96px] rounded-bl-[24px] rounded-br-[96px] p-6">
      {/* Product Image */}
      <div className="flex justify-center my-4 ">
        <img
          src={regexUrl(props.image)} // Puedes reemplazar este link con la imagen del producto
          alt={props.title}
          className="w-40 h-40 rounded-md"
        />
      </div>

      {/* Header Text */}
      <h2 className="text-white text-center text-xl font-bold">
        {props.title}
      </h2>

      <p className="text-white text-center text-sm mt-1 truncate">
        {props.description}
      </p>

      {/* Price */}
      <div className="flex justify-center items-center bg-yellow-400 rounded-full text-black font-bold px-4 py-1 mx-auto w-[60%] mt-5 text-base">
        USD. {props.price}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          className="bg-black text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-gray-800"
          onClick={props.onEditProduct}
        >
          EDIT
        </button>
        <button
          className="bg-black text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-gray-800"
          onClick={props.onDeleteProduct}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
