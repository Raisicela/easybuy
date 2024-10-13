import React, {
  useState,
  useEffect,
  FormEvent,
  MouseEventHandler,
} from "react";
import { Category } from "../entities/category.entity";

type Props = {
  category?: Category;
  onEdit: Function;
  onCreate: Function;
  onCancel: MouseEventHandler<HTMLButtonElement>;
};

const EditCategoryForm = (props: Props) => {
  const [formData, setFormData] = useState<Category>({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (props.category) {
      setFormData({
        id: props.category.id,
        name: props.category.name,
        image: props.category.image,
      });
    }
  }, [props.category]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const category = {
      ...formData,
    };
    if (props.category) {
      props.onEdit(category);
    } else {
      props.onCreate(category);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] h-[40%] justify-between  bg-white  shadow-md rounded-xl px-8 py-4 "
    >
      <div className="flex flex-row justify-between">
        <div></div>
        <h1 className=" font-bold justify">
          {props.category ? "Edit Category" : "Create Category"}
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
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-100 text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className=" mb-4 items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-start">
          Image:
        </label>
        <input
          type="text"
          name="images"
          value={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.value,
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

export default EditCategoryForm;
