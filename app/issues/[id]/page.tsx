import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';
import IssueActions from '@/app/components/IssueAction';

const IssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const issueCollection = await getCollection('issues');
  const issue = await issueCollection?.findOne({ _id: new ObjectId(id) });

  if (!issue) {
    return <h1 className="text-red-500">Issue not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>
      <p className="text-gray-600 text-lg">{issue.description}</p>
      <p className="text-gray-500 mb-4">
        {new Date(issue.createdAt).toLocaleString()}
      </p>

      <IssueActions id={id} />
    </div>
  );
};

export default IssuePage;
