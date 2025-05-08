import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCpEMdvWcMFMgvAJpuo3Is6TFttC6VCN4M');

async function test() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent('Say hello!');
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

test().catch(console.error);