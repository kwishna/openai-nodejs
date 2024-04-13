import OpenAI from 'openai';
import {config} from 'dotenv'

config()

const openai = new OpenAI();

openai.apiKey = process.env['OPENAI_API_KEY'] ?? "";

async function main() {
  const stream = await openai.beta.chat.completions.stream({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Just say Hi!' }],
    stream: true,
  });

  stream.on('content', (delta, snapshot) => {
    process.stdout.write(delta);
  });

  // or, equivalently:
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }

  const chatCompletion = await stream.finalChatCompletion();
  console.log(chatCompletion); // {id: "…", choices: […], …}
}

main();