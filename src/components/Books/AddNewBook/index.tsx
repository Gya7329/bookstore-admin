"use client";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { postBookApi } from "@/components/api/Api";
import UploadFile from "../upload";
import { formFields } from "./formFields";

const animatedComponents = makeAnimated();

const AddNewBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    category: [],
    languages: []
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, selectedOptions: any) => {
    setBookData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
    }));
  };

  const handlePdfUpload = (files: File[]) => {
    if (files.length > 0) setPdfFile(files[0]);
  };

  const handleImageUpload = (files: File[]) => {
    setImageFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });
  
    if (pdfFile) formData.append("pdf", pdfFile);
    imageFiles.forEach((file, index) => formData.append(`images[${index}]`, file));
  
    try {
      const response = await postBookApi(formData);
      console.log("Book uploaded successfully:", response.data);
      setBookData({
        title: "",
        author: "",
        description: "",
        price: 0,
        category: [],
        languages: []
      });
      setPdfFile(null);
      setImageFiles([]);
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5.5">
          {formFields.map((field, index) => {
            if (field.type === "text" || field.type === "number" || field.type === "textarea") {
              return (
                <div className="" key={index}>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={bookData[field.name as keyof typeof bookData] || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={bookData[field.name as keyof typeof bookData] || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  )}
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={index}>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {field.label}
                  </label>
                  <Select
                    closeMenuOnSelect={!field.isMulti}
                    components={animatedComponents}
                    isMulti={field.isMulti}
                    options={field.options}
                    onChange={(selectedOptions) => handleSelectChange(field.name, selectedOptions)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              );
            }
          })}

          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Upload PDF
            </label>
            <UploadFile fileType="application/pdf" maxFiles={1} onFilesChange={handlePdfUpload} />
          </div>

          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Upload Images
            </label>
            <UploadFile fileType="image/*" maxFiles={6} onFilesChange={handleImageUpload} />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-[7px] bg-primary px-5.5 py-3 text-white transition hover:bg-opacity-80"
          >
            Upload Book Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
