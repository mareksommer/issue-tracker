"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoBug } from "react-icons/go";
import classnames from "classnames";

function NavBar() {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GoBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={classnames({
                  "text-zinc-900": href === currentPath,
                  "text-zinc-500": href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
