import { getCollection } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { title, description } = await request.json();
        if(!title || !description) {
            return NextResponse.json({ message: 'Title and description are required.' }, { status: 400 });
        }

        const issueCollection = await getCollection('issues');
        const newIssue = {
            title,
            description,
            status: 'open',
            createdAt: new Date(),
        }
        const result = await issueCollection?.insertOne(newIssue);
        return NextResponse.json({ message: 'Issue created successfully', issueId: result?.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error creating issue:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

