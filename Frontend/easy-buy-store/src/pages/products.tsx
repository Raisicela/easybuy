import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { CreateUpdateProduct, Product } from "../entities/product.entity";
import Modal from "../components/modal";
import EditProductForm from "../components/editProductForm";
import AddButton from "../components/AddButton";
import ProductService from "../services/ProductService";
import { Category } from "../entities/category.entity";
import CategoryService from "../services/CategoryService";
import SearchBar from "../components/SearchBar";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editProduct, setEditProduct] = useState<Product | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  let productService: ProductService = new ProductService();

  const fetchProducts = async () => {
    // Products
    const products = await productService.getAll("");
    setProducts(products);
  };

  const fetchCategories = async () => {
    // Categories
    const categoryService = new CategoryService();
    const categories = await categoryService.getAll();
    setCategories(categories);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const onEditProduct = (product: Product) => {
    setEditProduct(product);
    setOpenModal(true);
  };

  const onNewProduct = () => {
    setEditProduct(undefined);
    setOpenModal(true);
  };

  const onDeleteProduct = async (product: Product) => {
    const result = await Swal.fire({
      title: "Are you sure about this?",
      text: "Once deleted, you will not be able to recover this product.",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`,
    });

    if (result.isConfirmed) {
      await productService.delete(product.id);
      fetchProducts();
      Swal.fire("The product was successfully removed!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("The product was not removed", "", "info");
    }
  };

  const onConfirmEditProduct = async (product: CreateUpdateProduct) => {
    const regexUrl = (url: string) => {
      const regex = /https?:\/\/[^\s"]+/g;
      const matches = url.match(regex);
      return matches ? matches[0] : "";
    };

    product.images = product.images.map((image) => regexUrl(image));
    await productService.update(product);
    fetchProducts();
    setEditProduct(undefined);
    setOpenModal(false);
  };

  const onConfirmCreateProduct = async (product: CreateUpdateProduct) => {
    await productService.create(product);
    fetchProducts();
    setEditProduct(undefined);
    setOpenModal(false);
  };

  const onCancelEditProduct = () => {
    setEditProduct(undefined);
    setOpenModal(false);
  };

  const handlerSearch = async (query: string) => {
    const products = await productService.getAll(query);
    setProducts(products);
  };

  return (
    <>
      <div className="w-[90%] mt-2 md:mt-24 ">
        <SearchBar onSearch={handlerSearch}></SearchBar>
      </div>
      <div className="h-screen overflow-scroll">
        {openModal && (
          <Modal open={openModal}>
            <EditProductForm
              product={editProduct}
              categories={categories}
              onEdit={onConfirmEditProduct}
              onCreate={onConfirmCreateProduct}
              onCancel={onCancelEditProduct}
            />
          </Modal>
        )}

        <div className="flex flex-wrap gap-x-8 gap-y-12 p-10 justify-around ">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.images[0]}
                categoryName={product.category!.name}
                onEditProduct={() => onEditProduct(product)}
                onDeleteProduct={() => onDeleteProduct(product)}
              />
            </div>
          ))}
        </div>

        <AddButton text="Add New Product" onClick={() => onNewProduct()} />
      </div>
    </>
  );
}

export default Products;
