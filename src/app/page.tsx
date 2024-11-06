import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title: "BookStore",
  description: "Welcome to BookStore - Explore our diverse collection of books!",
  openGraph: {
    title: "BookStore",
    description: "Discover a wide range of books across genres and categories.",
    type: "website",
    images: [
      {
        url: "http://localhost:4400/images/logo/book.png",
        width: 800,
        height: 600,
        alt: "BookStore Cover Image",
      },
    ],
  },
};

export default function MyApp() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
