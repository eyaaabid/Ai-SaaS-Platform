import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Replace OpenAI with a fetch request to GroqCloud
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    console.log("User ID:", userId);
    console.log("Received Messages:", messages);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required and must be a non-empty array" },
        { status: 400 }
      );
    }

    // Replace with GroqCloud API call
    const response = await fetch("//api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQCLOUD_API_KEY}`, // Ensure this is set in your environment variables
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      console.error("GroqCloud API Error:", await response.text());
      return NextResponse.json(
        { error: "GroqCloud API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("GroqCloud Response:", data);

    // Assuming `data.reply` contains the response message
    return NextResponse.json(data.reply);
  } catch (error: any) {
    console.error("[CONVERSATION_ERROR]", error.message);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
