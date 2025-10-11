import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ✅ PATCH route
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 

  try {
    const { title, description, status } = await request.json();
    const issueCollection = await getCollection("issues");

    const updatedIssue = await issueCollection?.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, description, status } },
      { returnDocument: "after" }
    );

    if (updatedIssue?.lastErrorObject?.updatedExisting === false) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  return NextResponse.json(
    updatedIssue?.value || { message: "Issue updated successfully" },
    { status: 200 }
  );
} catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ GET route
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const issueCollection = await getCollection("issues");
    const issue = await issueCollection?.findOne({ _id: new ObjectId(id) });

    if (!issue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
