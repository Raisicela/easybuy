import React, { useEffect, useState } from "react";
import CategoryCard from "../components/categoryCard";
import { Category } from "../entities/category.entity";
import CategoryService from "../services/CategoryService";
import Modal from "../components/modal";
import EditCategoryForm from "../components/editCategoryForm";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";

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
    await categoryService.delete(category.id!);
    fetchCategories();
  };

  const onConfirmEditCategory = async (category: Category) => {
    await categoryService.update(category);
    fetchCategories();
    setEditCategory(undefined);
    setOpenModal(false);
  };

  const onConfirmCreateCategory = async (category: Category) => {
    await categoryService.create(category);
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
    <>
      <div className="w-[90%] mt-2 md:mt-24 ">
        <SearchBar onSearch={handlerSearch}></SearchBar>
      </div>
      <div className="h-screen overflow-scroll">
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
    </>
  );
}

export default Categories;
