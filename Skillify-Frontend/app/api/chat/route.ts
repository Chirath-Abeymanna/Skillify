import { type ChatGPTMessage } from '@/components/Chatbot/ChatLine';
import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream';

// Throw an error if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

export const config = {
  runtime: 'nodejs',
};

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `You are Sally, a chatbot on the Skillify platform, helping users enhance their 
      skills for different job roles. Your task is to interact with users and guide them by asking 
      relevant questions, recommending resources, and providing insights based on their answers. 
      Focus on offering personalized recommendations that will help the user grow in their desired 
      job role. Limit your questions to 5, and once you have enough information, provide a tailored 
      roadmap or resources to help them enhance their skills for their dream job.`,
    },
  ]

  messages.push(...body?.messages);

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
