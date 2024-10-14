import React, {
  useState,
  useEffect,
  FormEvent,
  MouseEventHandler,
} from "react";
import { CreateUpdateProduct, Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";

type Props = {
  product?: Product;
  categories: Category[];
  onEdit: Function;
  onCreate: Function;
  onCancel: MouseEventHandler<HTMLButtonElement>;
};

const EditProductForm = (props: Props) => {
  const [formData, setFormData] = useState<CreateUpdateProduct>({
    title: "",
    price: 0,
    description: "",
    images: [],
    categoryId: 0,
  });

  useEffect(() => {
    if (props.product) {
      setFormData({
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        description: props.product.description,
        images: props.product.images,
        categoryId: props.product.category.id!,
      });
    }
  }, [props.product]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      ...formData,
      price: +formData.price,
      categoryId: +formData.categoryId,
    };
    if (props.product) {
      props.onEdit(product);
    } else {
      props.onCreate(product);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[90%] md:w-[80%] lg:w-[50%] h-[90%] sm:h-[70%] justify-between  bg-white  shadow-md rounded-xl px-8 py-4 "
    >
      <div className="flex flex-row justify-between">
        <div></div>
        <h1 className=" font-bold justify">
          {props.product ? "Edit Product" : "Create Product"}
        </h1>
        <button
          onClick={props.onCancel}
          className="text-gray-700 hover:text-gray-400"
        >
          x
        </button>
      </div>
      <hr />
      <div className=" mb-4 items-center">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-start"
          htmlFor="name"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-slate-100 text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="  mb-4 items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="bg-slate-100 text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="  mb-4 items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
          Category:
        </label>
        <select
          className="bg-slate-100 text-base block shadow appearance-none border rounded w-full  px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline"
          name="categoryId"
          id=""
          value={formData.categoryId}
          onChange={handleChange}
        >
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" mb-4 items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-slate-100 text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className=" mb-4 items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
          Images:
        </label>
        <input
          type="text"
          name="images"
          value={formData.images.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              images: e.target.value.split(",").map((img) => img.trim()),
            })
          }
          className="bg-slate-100 text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex flex-row justify-center gap-24 md:gap-40 my-4">
        <button
          type="submit"
          className="bg-sky-600 text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-sky-800"
        >
          Save
        </button>
        <button
          className="bg-red-700 text-white font-bold text-[14px] py-2 px-6 rounded-full hover:bg-red-800"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
