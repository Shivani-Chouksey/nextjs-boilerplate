// components/Navbar.tsx
import React from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

function Navbar() {
  const navItems = [
    {
      title: "React-Query",
      href: "/react-query",
      description: "",
    },
    {
      title: "Redux",
      href: "/redux",
      description: "",
    },
    {
      title: "Dynamice Routing",
      href: "/product",
      description: "Dynamic Routing and Hide Folder inside App Directory",
    },
    {
      title: "SSG",
      href: "/ssg",
      // description: "Dynamic Routing and Hide Folder inside App Directory",
    },
    {
      title: "SSR",
      href: "/ssr",
    },
    {
      title: "Internationalization And Localization",
      href: "/language-convert/en",
      description:
        "Internationalization And Localization ---- Convert Language ",
    },
    {
      title: "CURD",
      href: "/curd-operation",
    },
  ];

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        Logo
        {/* <Logo /> */}
        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {/* Call to Action Button */}
        <DropdownMenu>
          <DropdownMenuTrigger>Custom Hooks</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;
