import Link from 'next/link';
import React from 'react'

const issues = [
    {id:1, title: "Login button not working"},
    {id:2, title: "Page crashes on load"},
    {id:3, title: "Typo in the homepage"}
];

const IssuesPage = () => {
  return (
    <div>
        <h1 className='text-3xl font-bold mb-4'>
            All Issues
        </h1>
        <ul className='space-y-3'>
            {issues.map((issue) => (
                <li key={issue.id} className='p-4 bg-white shadow rounded-lg'>
                    <Link 
                        href={`/issues/${issue.id}`}
                        className='text-blue-600 hover:underline'>
                        {issue.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default IssuesPage