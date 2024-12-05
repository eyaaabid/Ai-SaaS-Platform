import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Configuration,OpenAIApi } from "openai"; // Import OpenAI SDK from the correct path

// Initialize OpenAI API with API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the environment variable is correctly named
});
const openai = new OpenAIApi(configuration) 

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!configuration.apiKey) {
      return NextResponse.json(
        { error: "OpenAI API Key not configured" },
        { status: 500 }
      );
    }

    if (!messages) {
      return NextResponse.json(
        { error: "Messages are required and must be an array" },
        { status: 400 }
      );
    }

    // Call OpenAI's API (GPT-4 example)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages, // Pass the messages to the API
    });

    // Return the AI response
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
