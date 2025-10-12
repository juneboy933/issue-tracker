'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch('/api/issues');
        if(!res.ok) return [];
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) || issue.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || issue.status === filter;
    return matchesSearch && matchesFilter;
  })

  if (loading) return <p className="text-center mt-10">Loading issues...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">All Issues</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <input 
          type="text"
          placeholder='Search for issues...'
          onChange={(e) => setSearch(e.target.value)}
          className='border border-gray-300 w-full p-6 rounded sm:w-1/4' 
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 p-2 rounded">
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {filteredIssues.length === 0 ? (
        <p className="text-gray-500 text-center">No issues yet.</p>
      ) : (
        <ul className="space-y-4">
          {filteredIssues.map((issue) => (
            <li
              key={issue._id}
              className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition"
            >
              <Link href={`/issues/${issue._id}`}>
                <h2 className="text-lg font-semibold text-blue-600">
                  {issue.title}
                </h2>
                <p className="text-gray-700">{issue.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
