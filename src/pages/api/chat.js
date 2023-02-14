import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const prompt = req.body.prompt;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.7,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      res.status(200).json({
        message: "Got the response!",
        response: response.data.choices[0].text,
      });
    } else {
      res.status(405).json({
        message: "Method not allowed!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error,
    });
  }
}

export default handler;
