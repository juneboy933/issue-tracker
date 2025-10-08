import { NextResponse } from 'next/server';

const issues = [
    {id:1, title: "Login button not working", description: "The login button on the homepage does not respond when clicked."},
    {id:2, title: "Page crashes on load", description: "The dashboard page crashes with a 500 error when accessed."},
    {id:3, title: "Typo in the homepage", description: "There's a typo in the main headline of the homepage."}
];

export async function GET() {
    return NextResponse.json(issues);
}

