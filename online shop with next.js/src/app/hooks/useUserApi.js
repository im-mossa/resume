// src/hooks/useUserApi.js
import { useCallback } from "react";
import { useBaseApi } from "../api/baseApi";

export default function useUserApi() {
    const { postData, putDataWithToken } = useBaseApi();

    const login = useCallback(
        (userData, onSuccess) => postData("user/login", userData, onSuccess),
        [postData]
    );

    const signUp = useCallback(
        (userData, onSuccess) => postData("user/register", userData, onSuccess),
        [postData]
    );

    const changePassword = useCallback(
        (userData, token, onSuccess) =>
            putDataWithToken("user/changePassword", userData, token, onSuccess),
        [putDataWithToken]
    );

    return { login, signUp, changePassword };
}
