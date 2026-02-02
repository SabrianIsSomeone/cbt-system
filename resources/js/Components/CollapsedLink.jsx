import { Link } from "@inertiajs/react";

export default function CollapsedLink({ active = false, submenu, className = "", ...props }) {
    return (
        <li  className="hover:text-primary active:text-primary">
            <Link
                {...props}
                className={
                    "font-bold flex text-base" +
                    (active
                        ? "border-primary/70 text-primary focus:border-primary "
                        : "border-transparent  hover:text-primary hover:border-gray-300 focus:text-secondary active:text-secondary focus:border-gray-300 ") +
                    className
                }
            >
                {submenu}
            </Link>
        </li>
    );
}
