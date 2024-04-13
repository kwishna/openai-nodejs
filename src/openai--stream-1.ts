import OpenAI from 'openai';
import {config} from 'dotenv'

config()

const openai = new OpenAI();

openai.apiKey = process.env['OPENAI_API_KEY'] ?? "";

async function main() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Just say OK!' }],
    stream: true,
  });
  
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();