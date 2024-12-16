// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";
import { NextResponse } from "next/server";
export const runtime = 'edge';

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST() {

    try {
        
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we recieve as part of the request body
        const data =  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        // Define a prompt varibale
        const prompt = data

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        if (error instanceof GoogleGenerativeAIError) {
          // OpenAI API error handling
          console.error("G AI ERROR",error);
          
          const { message } = error;
          return NextResponse.json({ message}, { status:400 });
        } else {
          // General error handling
          console.error('An unexpected error occurred:', error);
          throw error;
        }
      }
    }