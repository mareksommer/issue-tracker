"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoBug } from "react-icons/go";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex gap="2" justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GoBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return;
  if (status === "unauthenticated")
    return <Link className="nav-link" href="/api/auth/signin">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map(({ label, href }) => {
        return (
          <li key={href}>
            <Link
              href={href}
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": href === currentPath,
              })}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
