"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export function Nav({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(searchQuery) router.push(`/products?q=${searchQuery}`);
    if(!searchQuery) router.push('/products')
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-primary text-primary-foreground flex flex-col md:flex-row md:justify-between items-center px-4 py-2 relative">
      <div className="flex w-full justify-between md:w-auto items-center">
        <button onClick={toggleMenu} className="p-2 md:hidden">
          {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <Link href="/" className="flex flex-col items-center md:items-start space-x-2 md:flex-row md:space-x-4">
          <img src="/path/to/logo.png" alt="Brand Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">LeafyLand</span>
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 md:hidden w-full mt-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-500 "
          />
          <button type="submit" className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-dark focus:outline-none focus:ring">
            Search
          </button>
        </form>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {children}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-gray-500 "
          />
          <button type="submit" className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-dark focus:outline-none focus:ring">
            Search
          </button>
        </form>
      </div>
      {menuOpen && (
        <div className="absolute top-0 left-0 bg-primary text-primary-foreground w-full h-screen z-50 md:hidden flex flex-col items-center">
          <button onClick={toggleMenu} className="self-end p-4">
            <XIcon className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center space-y-4 p-4 w-full">
            {children}
          </div>
          <form onSubmit={handleSearchSubmit} className="flex flex-col items-center space-y-2 p-4 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
            <button type="submit" className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-dark focus:outline-none focus:ring w-full">
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
