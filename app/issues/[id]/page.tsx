import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import React from 'react'
import IssueActions from '@/app/components/IssueAction';
interface IssuesPageProps {
    params: {id: string};
}

const IssuePage = async({params}: IssuesPageProps) => {
    const { id } = await params;
    const issueCollection = await getCollection("issues");
    const issue = await issueCollection?.findOne({_id: new ObjectId(id)});

    if(!issue) {
        return <h1 className='text-red-500'> Issues not found</h1>;
    }

  return (
    <div>
        <h1 className='text-3xl font-bold mb-2'>{issue.title}</h1>
        <p className='text-gray-600 text-lg'>{issue.description}</p>
        <p className='text-gray-500'>{new Date(issue.createdAt).toLocaleString()}</p>
        <Link 
            href={`/issues/${issue._id}/edit`}
            className='text-blue-600 hover:underline'>
                Edit Issue
        </Link>
        <IssueActions id={id}/>
    </div>
  )
}

export default IssuePage
