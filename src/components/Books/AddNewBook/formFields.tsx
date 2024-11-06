import { bookCategoryOptions, languageOptions } from "../selectOptionData";

export const formFields = [
    { name: "title", label: "Book Title", type: "text", placeholder: "Enter Book Title" },
    { name: "author", label: "Author Name", type: "text", placeholder: "Enter Author Name" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter Description" },
    { name: "price", label: "Price", type: "number", placeholder: "Enter Price" },
    { name: "category", label: "Category", type: "select", options: bookCategoryOptions, isMulti: true },
    { name: "languages", label: "Languages", type: "select", options: languageOptions, isMulti: true },
    { name: "pdf", label: "Upload PDF File", type: "file", accept: ".pdf" },
    { name: "images", label: "Upload Images", type: "file", accept: "image/*", multiple: true }
  ];
  