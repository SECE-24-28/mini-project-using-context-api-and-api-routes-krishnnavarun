import { NextResponse } from "next/server";

let notes = [
  {
    id: 1,
    title: "My First Note",
  },
];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newNote = {
    id: Date.now(),
    title: body.title,
  };

  notes.push(newNote);

  return NextResponse.json(newNote);
}