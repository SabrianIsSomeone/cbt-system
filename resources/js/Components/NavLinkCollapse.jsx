import { Link } from "@inertiajs/react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { CollapsedLink } from "@/Components";

export default function NavLinkCollapse({
    active = false,
    className = "",
    children,
    submenu,
    routes,

    ...props
}) {
    return (
        <li className="text-base  active:text-primary">
            <details open>
                <summary>{children}</summary>
                <ul>
                {submenu.map((data, i) => (
                    <CollapsedLink key={i} submenu={data} href={route(routes[i])} active={route().current(routes[i]) && !route().current("home")} />
                ))}
                </ul>
            </details>
        </li>
    );
}
