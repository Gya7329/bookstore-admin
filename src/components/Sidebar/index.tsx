"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import { FiHome, FiBook, FiUser, FiShoppingCart, FiSettings } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <FiHome size={24} />,
        label: "Dashboard",
        route: "/",
      },
      {
        icon: <FiBook size={24} />,
        label: "Books",
        route: "#",
        children: [
          { label: "All Books", route: "/books/all" },
          { label: "Add New Book", route: "/books/add" },
          { label: "Categories", route: "/books/categories" },
        ],
      },
      {
        icon: <FiUser size={24} />,
        label: "Authors",
        route: "/authors",
      },
      {
        icon: <FiShoppingCart size={24} />,
        label: "Orders",
        route: "/orders",
      },
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      {
        icon: <FaChartLine size={24} />,
        label: "Reports",
        route: "#",
        children: [
          { label: "Sales Report", route: "/reports/sales" },
          { label: "Inventory Report", route: "/reports/inventory" },
        ],
      },
      {
        icon: <FiSettings size={24} />,
        label: "Settings",
        route: "/settings",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 duration-300 ease-linear" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center gap-2 px-6 lg:py-6.5">
          <Link href="/">
            <Image
              width={164}
              height={35}
              src={"/images/logo/bookstore.png"}
              alt="Logo"
              priority
            />
          </Link>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
