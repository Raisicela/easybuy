import React, { useEffect, useState } from "react";
import CategoryCard from "../components/categoryCard";
import { Category } from "../entities/category.entity";
import CategoryService from "../services/CategoryService";
import Modal from "../components/modal";
import EditCategoryForm from "../components/editCategoryForm";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Swal from "sweetalert2";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  let categoryService: CategoryService = new CategoryService();

  const fetchCategories = async () => {
    const categoryService = new CategoryService();
    const categories = await categoryService.getAll();
    setCategories(categories);
  };

  useEffect(() => {
    console.log("use effect");
    fetchCategories();
  }, []);

  const onEditCategory = (category: Category) => {
    setEditCategory(category);
    setOpenModal(true);
  };

  const onNewCategory = () => {
    setEditCategory(undefined);
    setOpenModal(true);
  };

  const onDeleteCategory = async (category: Category) => {
    const result = await Swal.fire({
      title: "Are you sure about this?",
      text: "Once deleted, you will not be able to recover this category.",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`,
    });

    if (result.isConfirmed) {
      await categoryService.delete(category.id!);
      setCategories([...categories.filter((p) => p.id !== category.id)]);
      Swal.fire("The category was successfully removed!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("The category was not removed", "", "info");
    }
  };

  const onConfirmEditCategory = async (category: Category) => {
    await categoryService.update(category);
    console.log("on confirm");
    fetchCategories();
    setEditCategory(undefined);
    setOpenModal(false);
  };

  const onConfirmCreateCategory = async (category: Category) => {
    await categoryService.create(category);
    console.log("on create");
    fetchCategories();
    setEditCategory(undefined);
    setOpenModal(false);
  };

  const onCancelEditCategory = () => {
    setEditCategory(undefined);
    setOpenModal(false);
  };

  const handlerSearch = async (query: string) => {
    const categories = (await categoryService.getAll()).filter((category) =>
      category.name.toLowerCase().includes(query)
    );
    setCategories(categories);
  };

  return (
    <div className="h-screen w-screen overflow-scroll">
      <div>
        {openModal && (
          <Modal open={openModal}>
            <EditCategoryForm
              category={editCategory}
              onEdit={onConfirmEditCategory}
              onCreate={onConfirmCreateCategory}
              onCancel={onCancelEditCategory}
            />
          </Modal>
        )}
      </div>
      <div className="w-[90%] mt-2 md:mt-24 ">
        <SearchBar onSearch={handlerSearch}></SearchBar>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-12 p-10 justify-around mt-2">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard
              name={category.name}
              image={category.image}
              onEditCategory={() => onEditCategory(category)}
              onDeleteCategory={() => onDeleteCategory(category)}
            />
          </div>
        ))}
      </div>
      <AddButton text="Add New Category" onClick={() => onNewCategory()} />
    </div>
  );
}

export default Categories;
