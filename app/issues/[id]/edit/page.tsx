'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditIssuePage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [issue, setIssue] = useState({
        title: '',
        description: '',
        status: 'open',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            const res = await fetch(`/api/issues/${id}`);
            const data = await res.json();
            setIssue(data);
            setLoading(false);
        };
        fetchIssues();
    }, [id]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/issues/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(issue),
        });
        if(res.ok) {
            alert("Issues updated successfully");
            router.push(`/issues`);
        } else {
            alert("Failed to update issue");
        }
    };

    if(loading) return <p>Loading...</p>;

  return (
    <div className='max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Edit Issue</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block mb-1 font-medium'>Title</label>
                <input 
                    type="text"
                    value={issue.title} 
                    onChange={(e) => setIssue({...issue, title: e.target.value})}
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>
         <div>
                <label className='block mb-1 font-medium'>Description</label>
                <textarea
                    value={issue.description} 
                    onChange={(e) => setIssue({...issue, description: e.target.value})}
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>
            <div>
                <label className='block mb-1 font-medium'>Status</label>
                <select
                    value={issue.status}
                    onChange={(e) => setIssue({...issue, status: e.target.value})}
                    className='w-full border border-gray-300 rounded-md p-2'>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                </select>
            </div>
            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>
                Update Issues
            </button>
        </form>
    </div>
  )
}

export default EditIssuePage
