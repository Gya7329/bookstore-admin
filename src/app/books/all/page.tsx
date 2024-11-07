// BookTable


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BookTable from "@/components/Books/AllBooks";

export const metadata: Metadata = {
    title: "All Books | Bookstore Admin Dashboard",
    description:
        "All book in bookstore inventory. ",
}

const AllBookPage = () => {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-7xl">
                <Breadcrumb pageName="All Books" />
                <BookTable />
            </div>
        </DefaultLayout>
    );
};

export default AllBookPage;
