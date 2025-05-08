// src/hooks/useCategoryApi.js
import { useBaseApi } from "../hooks/baseApi";

export default function useCategoryApi() {
  const { getData } = useBaseApi();

  const getAllCategories = (onSuccess) => {
    getData("productCategory", onSuccess);
  };

  const getCategoryById = (id, onSuccess) => {
    getData(`productCategory/${id}`, onSuccess);
  };

  return { getAllCategories, getCategoryById };
}
