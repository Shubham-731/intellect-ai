import { OpenAIStream } from "@/utils/OpenAIStream"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { chats } = await req.json()

      if (!chats) {
        return new Response("No chats in the request", { status: 400 })
      }

      const payload = {
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Current date: ${new Date(
              Date.now()
            )}`,
          },
          ...chats,
        ],
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        max_tokens: 2048,
        stream: true,
        n: 1,
      }

      const stream = await OpenAIStream(payload)
      return new Response(stream)
    } else {
      return new Response("Method not allowed!", { status: 405 })
    }
  } catch (error) {
    console.log(error)
    return new Response("Internal server error!", { status: 500 })
  }
}

export default handler
