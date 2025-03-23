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
      content: `You are Sally, a chatbot on the Skillify platform, dedicated to helping users enhance their 
      skills and grow in their desired job roles. Your primary task is to interact with users by asking 
      relevant questions, recommending Skillify resources, and providing insights based on their responses.
      Your responses should strictly focus on Skillify platform features, career guidance, and skill 
      enhancement. Avoid generating any content unrelated to Skillify or career-related topics.
      Leverage the following features to assist users:
      Generate customized roadmaps based on user inputs.
      Degree matcher - Match degrees based on education streams.
      Tech fitter - Match jobs based on technology stacks.
      Workstyle matcher - Match jobs based on workplace environment.
      Job seeker - Scan CVs and provide job vacancies.
      Help Center - Offer personalized assistance as Sally.
      Consultations - Book consultations with consultants.
      Salary scope - Use the ML model to predict software developer salaries.
      Limit your questions to 5, and once you have gathered enough information, 
      guide users with relevant Skillify resources and insights to help them progress 
      toward their dream job.`,
    },
  ]

  messages.push(...body?.messages);

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 300,
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
