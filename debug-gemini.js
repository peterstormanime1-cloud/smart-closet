const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModels() {
    console.log("Testing Gemini Models...");

    // Get key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY not found in environment.");
        return;
    }
    console.log(`API Key found (length: ${apiKey.length})`);

    const genAI = new GoogleGenerativeAI(apiKey);

    // List of models to test
    const models = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-1.0-pro',
        'gemini-pro',
        'gemini-1.5-flash-latest'
    ];

    for (const modelName of models) {
        process.stdout.write(`Testing model: ${modelName} ... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test.");
            console.log("SUCCESS ✅");
        } catch (error) {
            console.log("FAILED ❌");
            console.log(`  -> ${error.message.split('\n')[0]}`); // Print first line of error
        }
    }
}

testModels();
