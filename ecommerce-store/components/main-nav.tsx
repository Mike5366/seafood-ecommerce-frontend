"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MainNavProps {
  storeId: string;
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ storeId, data }) => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  const routes = data.map((route) => ({
    href: `/${storeId}/category/${route.id}`,
    label: route.name,
    hover: hoveredPath === `/${storeId}/category/${route.id}`,
  }));
  return (
    <nav className="mx-6 flex items-center">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in",
            route.hover ? "text-white" : "text-black"
          )}
          onMouseOver={() => setHoveredPath(route.href)}
          onMouseLeave={() => setHoveredPath(pathname)}
        >
          <div>{route.label}</div>
          {route.href === hoveredPath && (
            <motion.div
              className="absolute bottom-0 left-0 h-full bg-black rounded-md -z-10"
              layoutId="navbar"
              aria-hidden="true"
              style={{
                width: "100%",
              }}
              transition={{
                type: "spring",
                bounce: 0.25,
                stiffness: 130,
                damping: 9,
                duration: 0.3,
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
