// src/api/SliderApi.js
import { useBaseApi } from "../hooks/baseApi";

export default function useSliderApi() {
  const baseApi = useBaseApi();

  const getAll = async (onSuccess) => {
    baseApi.getData("slider", onSuccess);
  };

  const getById = async (id, onSuccess) => {
    baseApi.getData(`slider/${id}`, onSuccess);
  };

  return { getAll, getById };
}
