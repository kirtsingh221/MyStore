'use client'

import { useState } from "react"
import { Menu, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Button,
} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    )

    const pathname = usePathname()

    const links = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/about-us", label: "About Us" },
        { href: "/categories", label: "Categories" },
        { href: "/contact-us", label: "Contact Us" },
    ]


    return (
        <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-[99]">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight">
                <Link href="/">MyStore</Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center mx-[auto] my-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-10">
                <Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
                {/* Shop Dropdown */}
                <Link href="/shop" className="hover:text-primary transition-colors font-semibold">Shop</Link>
                <Link href="/about-us" className="hover:text-primary transition-colors font-semibold">About Us</Link>
                <Link href="/categories" className="hover:text-primary transition-colors font-semibold">Categories</Link>
                <Link href="/contact-us" className="hover:text-primary transition-colors font-semibold">Contact Us</Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <Link href="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Button variant="outline" className="hidden sm:flex">Login</Button>
                <Button className="hidden sm:flex">Sign Up</Button>

                {/* Mobile Menu Button */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64">
                        <div className="flex flex-col space-y-4 mt-6 px-5">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`transition-colors ${pathname === link.href
                                            ? "text-primary font-semibold"
                                            : "hover:text-primary text-gray-700"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="flex flex-col space-y-2">
                                <Button variant="outline" onClick={() => setOpen(false)}>Login</Button>
                                <Button onClick={() => setOpen(false)}>Sign Up</Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
