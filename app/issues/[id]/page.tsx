import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react'
interface IssuesPageProps {
    params: {id: string};
}

const IssuePage = async({params}: IssuesPageProps) => {
    const issueCollection = await getCollection("issues");
    const issue = await issueCollection?.findOne({_id: new ObjectId(params.id)});

    if(!issue) {
        return <h1 className='text-red-500'> Issues not found</h1>;
    }

  return (
    <div>
        <h1 className='text-3xl font-bold mb-2'>{issue.title}</h1>
        <p className='text-gray-600 text-lg'>{issue.description}</p>
        <p className='text-gray-500'>{new Date(issue.createdAt).toLocaleString()}</p>
    </div>
  )
}

export default IssuePage
