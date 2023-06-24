import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

//getting all data
export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

//deleting existing data on ID
export async function DELETE(req: Request) {
  const { id }: Partial<Todo> = await req.json();

  try {
    if (!id) {
      return NextResponse.json({ message: "Todo id is required!" });
    }

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
    });

    return NextResponse.json({ message: `Todo ID ${id} has been deleted!` });
  } catch (error) {
    return NextResponse.json(error);
  }
}

//creating new data
export async function POST(req: Request) {
  const { userId, title }: Partial<Todo> = await req.json();

  try {
    if (!userId || !title) {
      return NextResponse.json({ message: "Missing required data!" });
    }

    const res = await fetch(`${DATA_SOURCE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({
        userId,
        title,
        completed: false,
      }),
    });

    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json(error);
  }
}

//updating data
export async function PUT(req: Request) {
  const { userId, title, id, completed }: Todo = await req.json();

  try {
    if (!userId || !title || !id || typeof completed !== "boolean") {
      return NextResponse.json({ message: "Missing required data!" });
    }

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({
        userId,
        title,
        completed,
      }),
    });

    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error);
  }
}
