"use client";
import { useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UploadFile from "./upload";
import { postBookApi } from "../api/Api";

interface BookData {
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  language: string;
  image?: string; // Update to string if the API expects a base64 string or URL
}

const FormElements = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    language: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postBookApi(bookData);
      setBookData({
        title: "",
        author: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        language: "",
      });
      console.log("Book uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Upload Book Details" />

      <div className="flex justify-center items-center min-h-screen">
        <div className="rounded-[10px] w-full border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  placeholder="Enter Book Title"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Category
              </label>
              <select
                name="category"
                value={bookData.category}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="comedy">Comedy</option>
                <option value="love">Love</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Language
              </label>
              <select
                name="language"
                value={bookData.language}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <option value="" disabled>
                  Select Language
                </option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                ref={fileInputRef}

                onChange={handleFileChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-4 rounded-[7px] bg-primary text-white px-5.5 py-3 transition hover:bg-opacity-80"
            >
              Upload Book Details
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormElements;
