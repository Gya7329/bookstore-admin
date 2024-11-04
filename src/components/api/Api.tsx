import axios, { AxiosResponse } from "axios";

// interface BookData {
//     title: string;
//     author: string;
//     category: string;
//     description: string;
//     image?: string;
//     price: number;
//     language: string;
// }

interface ApiResponse<T = any> {
    message: string;
    data?: T;
}

// Create the Axios instance
const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const postBookApi = (bookData: FormData): Promise<AxiosResponse<ApiResponse>> => {
    return API.post<ApiResponse>("/books/add-new-book", bookData);
};

export const getBookApi = (): Promise<AxiosResponse<ApiResponse>> => {
    return API.get<ApiResponse>("/books/all-books");
};
