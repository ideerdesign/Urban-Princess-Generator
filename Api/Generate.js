import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await client.images.generate({
      model: "gpt-image-3",
      prompt,
      size: "1024x1024",
      background: "transparent"
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      return res.status(500).json({ error: "No image returned" });
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image generation failed" });
  }
}
