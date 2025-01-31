import Link from "next/link";
import { usePathname } from "next/navigation";

function LinkHeader({ href, title }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`hover:text-primary ${
        path === href
          ? "text-primary border-b-2 border-primary"
          : "text-gray-600"
      }`}
    >
      {title}
    </Link>
  );
}

export default LinkHeader;
