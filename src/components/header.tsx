"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { href:"/", label:"Notre Histoire"},
    { href: "/collectif-felr", label: "Collectif Felr"},
    { href: "/osez-felr", label: "Osez Felr"},
];

export function Header() {

    const pathname = usePathname();

    return (
        <nav className="flex justify-end items-center w-full gap-x-8">
            {
                LINKS.map(({href, label}) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                        <Link
                        key={href}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={`text-4xl pb-1 border-b-2 --font-mono
                            ${isActive ? "border-amber-400" : "border-transparent hover:border-amber-400/70"}`}
                        >
                            {label}
                        </Link>
                        );
                })
            }
        </nav>
    );
}
