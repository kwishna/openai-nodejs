import { fetch } from 'undici'; // as one example
import OpenAI from 'openai';

const client = new OpenAI({
  fetch: async (reqInfo: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('About to make a request', reqInfo, init);
    const response = await fetch(reqInfo, init);
    console.log('Got response', response);
    return response;
  },
});