'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Ex1 (Direct API)', href: '/ui/ex1' },
        { name: 'Ex2 (Route Handler)', href: '/ui/ex2' },
        { name: 'Ex3 (SSR)', href: '/ui/ex3' },
        { name: 'Ex4 (SSG)', href: '/ui/ex4' },
    ]

    return (
        <header className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-white">
                            Product Demo
                        </Link>
                    </div>

                    <nav className="flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}