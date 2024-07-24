// @ts-nocheck
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: process.env['OPENAI_ASSISTANT_ID'],
  });

  return new Response(stream.toReadableStream());
}
