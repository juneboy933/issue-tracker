import React from 'react'
interface IssuesPageProps {
    params: {id: string};
}

const issues = [
    {id:1, title: "Login button not working", description: "The login button on the homepage does not respond when clicked."},
    {id:2, title: "Page crashes on load", description: "The dashboard page crashes with a 500 error when accessed."},
    {id:3, title: "Typo in the homepage", description: "There's a typo in the main headline of the homepage."}
];

const IssuePage = ({params}: IssuesPageProps) => {
    const issue = issues.find((issue) => issue.id === parseInt(params.id));

    if(!issue) {
        return <h1 className='text-red-500'> Issues not found</h1>;
    }

  return (
    <div>
        <h1 className='text-3xl font-bold mb-2'>{issue.title}</h1>
        <p className='text-gray-600'>{issue.description}</p>
    </div>
  )
}

export default IssuePage
