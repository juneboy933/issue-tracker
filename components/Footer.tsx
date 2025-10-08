import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-100 py-4 mt-8'>
      <div className='container mx-auto text-center text-gray-500 text-sm'>
        &copy; {new Date().getFullYear()} IssueTracker. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
