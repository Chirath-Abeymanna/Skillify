import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  const handleClickOutside = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    // If clicked inside the drawer, don't close
    if (target.closest(".drawer-content")) return;

    setIsOpen(false);
  };

  return (
    <main
      className={
        "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
      onClick={handleClickOutside} // Closes drawer when clicking outside
    >
      <section
        className={
          " mb-6 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <article
          className="relative w-340px max-w-lg pb-10 flex flex-col space-y-6 h-full drawer-content"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <header className="px-4 py-4 flex items-center ">
            <div className="flex flex-shrink-0 items-center border-right">
              <Link href="/" className="text-2xl font-semibold text-black">
                SKILLIFY
              </Link>
            </div>

            <XMarkIcon
              className="block h-6 w-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </header>
          <div>{children}</div>
        </article>
      </section>
    </main>
  );
};

export default Drawer;
