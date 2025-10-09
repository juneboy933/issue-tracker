'use client';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch('/api/issues');
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

  if (loading) return <p className="text-center mt-10">Loading issues...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">All Issues</h1>
      {issues.length === 0 ? (
        <p className="text-gray-500 text-center">No issues yet.</p>
      ) : (
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
              key={issue._id}
              className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition"
            >
              <h2 className="text-lg font-semibold text-blue-600">
                {issue.title}
              </h2>
              <p className="text-gray-700">{issue.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(issue.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
