import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
            <Link href="/" className='text-xl font-bold text-blue-600'>
                IssueTracker
            </Link>
            <div className='space-x-4'>
                <Link href="/" className='hover:text-blue-600'>Home</Link>
                <Link href="/issues" className='hover:text-blue-600'>Issues</Link>
                <Link href="/issues/new" className="hover:text-blue-600">New Issue</Link>
            </div>

        </div>
    
    </nav>
  )
}

export default Navbar