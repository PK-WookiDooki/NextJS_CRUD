import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
// const API_KEY: string = process.env.DATA_API_KEY as string;

//getting single data by ID
export async function GET(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
  const todo: Todo = await res.json();

  if (!todo.id) return NextResponse.json({ message: `Todo ${id} not found!` });

  return NextResponse.json(todo);
}
