import Link from 'next/link';
import React from 'react'

type Issue = {
    id: number;
    title: string;
    description: string;
}

async function getIssues() {
    const res = await fetch("http://localhost:3000/api/issues", {cache: 'no-store'});
    if(!res.ok) throw new Error("Failed to fetch issues");
    
    const data = await res.json();
    return data;
}

const IssuesPage = async () => {
    const issues: Issue[] = await getIssues();
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