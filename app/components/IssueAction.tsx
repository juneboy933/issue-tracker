'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const IssueActions = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this issue?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete issue");

      alert("Issue deleted successfully!");
      router.push("/issues");
    } catch (error) {
      alert("Error deleting issue");
      console.error(error);
    }
  };

  return (
    <div className="mt-4 space-x-4">
      <Link
        href={`/issues/${id}/edit`}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Issue
      </Link>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete Issue
      </button>
    </div>
  );
};

export default IssueActions;
