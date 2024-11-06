import axios, { AxiosResponse } from "axios";

interface ApiResponse<T = any> {
    message: string;
    data?: T;
}

// Create the Axios instance
const API = axios.create({
    //   baseURL: "https://bookstore-backend-a3mw.onrender.com",
    baseURL: "https://localhost:9001/api",

});

export const postBookApi = (bookData: FormData): Promise<AxiosResponse<ApiResponse>> => {
    return API.post<ApiResponse>("/books/add-new-book", bookData);
};

export const getBookApi = (): Promise<AxiosResponse<ApiResponse>> => {
    return API.get<ApiResponse>("/books/all-books");
};
