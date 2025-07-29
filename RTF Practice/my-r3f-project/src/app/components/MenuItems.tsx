// src/components/MenuItems.tsx
import Link from 'next/link';

type NavItem = {
    name: string;
    path: string;
};

export default function MenuItems() {
  const navItems: NavItem[] = [
    { name: "Page1", path: "/" },
    { name: "Page2", path: "/page2" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[10%]">
      <ul className="flex flex-row gap-6 justify-evenly">
        {navItems.map((item) => (
          <li key={item.path} className="hover:font-bold">
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}