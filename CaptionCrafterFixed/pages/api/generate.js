import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { topic, tone } = req.body;

  if (!topic || !tone) {
    return res.status(400).json({ error: 'Missing topic or tone' });
  }

  try {
    const prompt = `Write a ${tone.toLowerCase()} Instagram caption about: ${topic}`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
    });

    const caption = completion.data.choices[0].message.content.trim();
    res.status(200).json({ caption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating caption' });
  }
}