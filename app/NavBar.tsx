import Link from "next/link";
import { GoBug } from "react-icons/go";

function NavBar() {
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
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
