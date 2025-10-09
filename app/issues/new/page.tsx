'use client'

import React, { useState } from 'react'

const IssueForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            if(!res.ok) throw new Error('Failed to create issue');
            setTitle('');
            setDescription('');
            setMessage('Issue created successfully!');
        } catch (error) {
            setMessage('Error creating issue. Please try again.'); 
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Create New Issue</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input 
                    type="text"
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500'
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required />
            </div>

            <button
                type='submit'
                disabled={loading}
                className='w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition'>
                {loading ? 'Creating...' : 'Create Issue'}
            </button>
        </form>

        {message && (
            <p className='mt-4 text-center text-sm font-medium'>{message}</p>
        )}
    </div>
  )
}

export default IssueForm