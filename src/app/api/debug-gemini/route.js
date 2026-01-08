import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'No API key' }, { status: 500 });
        }

        // Log the key length for debugging (don't log the full key)
        console.log('API Key length:', apiKey.length);
        console.log('API Key starts with:', apiKey.substring(0, 4));

        const genAI = new GoogleGenerativeAI(apiKey);

        // There isn't a direct "listModels" on the client instance in some versions,
        // but typically it's available via the API.
        // Actually, the Node SDK usually exposes it differently. 
        // Let's try to just instantiate a few common models and see if we can get metadata?
        // No, the SDK does not strictly expose listModels in the main `GoogleGenerativeAI` class in all versions.
        // But checking the docs for 0.21.0+:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // If we want to test connectivity, let's just try to run a simple prompt on 'gemini-pro'

        const modelsToTest = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
        const results = {};

        for (const modelName of modelsToTest) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you there?");
                results[modelName] = "Success";
            } catch (e) {
                results[modelName] = e.message;
            }
        }

        return NextResponse.json({ results });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
