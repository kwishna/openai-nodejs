import OpenAI from 'openai';
import {config} from 'dotenv'

config()

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Just say OK!' }],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion;
}

main().then(compl => {
    console.log(compl.choices[0].message.content);
});