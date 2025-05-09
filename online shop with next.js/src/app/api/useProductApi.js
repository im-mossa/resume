// src/hooks/useProductApi.js
import { useCallback } from "react";
import { useBaseApi } from "../hooks/baseApi";

export function useProductApi() {
  const { getData } = useBaseApi();

  const getAll = useCallback(
    (pageIndex, pageSize, onSuccess) =>
      getData(`product?pageIndex=${pageIndex}&pageSize=${pageSize}`, onSuccess),
    [getData]
  );

  const getByCategoryId = useCallback(
    (catId, pageIndex, pageSize, onSuccess) =>
      getData(`product/cat/${catId}?pageIndex=${pageIndex}&pageSize=${pageSize}`, onSuccess),
    [getData]
  );

  const getNewProducts = useCallback(
    (onSuccess) => getData("product/new", onSuccess),
    [getData]
  );

  const getPopularProducts = useCallback(
    (onSuccess) => getData("product/popular", onSuccess),
    [getData]
  );

  return { getAll, getByCategoryId, getNewProducts, getPopularProducts };
}
