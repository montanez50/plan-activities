import React from 'react'
import { Link, usePage } from '@inertiajs/react'
export default function LinkItem({ link, isSidebarOpen }) {

    // destruct props
    const { url } = usePage();

    return (
        <>
            {isSidebarOpen ?
                <Link
                    href={link.href}
                    className={`${url.startsWith(link.href) ? ' border-l-2 border-l-sky-300  text-sky-600 bg-sky-100' : '' } flex items-center font-medium gap-x-3.5 py-2 px-2.5 text-gray-500 hover:border-l-2 hover:border-l-sky-200 hover:text-sky-500 capitalize hover:cursor-pointer text-sm`}>
                    {link.icon} {link.title}
                </Link>
                :
                <Link
                    href={link.href}
                    className={`border px-3 py-1 rounded-md ${url.startsWith(link.href) ? 'bg-sky-100 border-sky-200' : ''} hover:bg-sky-100 hover:border-sky-200`}
                >
                    {link.icon}
                </Link>
            }
        </>

    )
}
