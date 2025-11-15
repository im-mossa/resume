'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/">
                    <a className="text-xl font-bold">Resume Project</a>
                </Link>
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <Link href="/about">
                                <a>درباره</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <a>تماس</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}