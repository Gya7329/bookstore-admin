import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddNewBook from "@/components/Books/AddNewBook";

export const metadata: Metadata = {
    title: "Add New Book | Bookstore Admin Dashboard",
    description:
        "Add a new book to the bookstore inventory. Fill in details such as title, author, price, category, language, and upload a book cover image. Manage your bookstore efficiently with the Bookstore Admin Dashboard.",
}

const AddNewBookPage = () => {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-7xl">
                <Breadcrumb pageName="Add New Book" />
                <AddNewBook />
            </div>
        </DefaultLayout>
    );
};

export default AddNewBookPage;
