import { NextResponse } from 'next/server';

export async function POST(request) {
    let category = 'outfit';

    try {
        const body = await request.json();
        const { prompt, category: bodyCategory } = body;
        category = bodyCategory || 'outfit';

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        console.log(`🎨 Generating Pollinations Image for: ${prompt}`);

        /**
         * FASHION OPTIMIZATION:
         * To ensure you get a PERSON wearing the clothes (not just a flat shirt),
         * we wrap the user's prompt with high-end photography keywords.
         */
        const enhancedPrompt = `High-end professional fashion editorial, full body shot of a professional model wearing ${prompt}, studio lighting, 8k resolution, photorealistic, cinematic background.`;

        // Pollinations requires the prompt to be URL-encoded
        const encodedPrompt = encodeURIComponent(enhancedPrompt);

        /**
         * POLLINATIONS PARAMETERS (2026):
         * - model: 'flux' is the best for photorealism.
         * - width/height: 1024x1024 is standard.
         * - seed: Using a random number ensures a fresh image every time.
         * - nologo: true removes the watermark.
         */
        const seed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

        // Note: Unlike Gemini, we don't wait for a "fetch" here. 
        // We return the URL immediately, and the browser loads it.
        return NextResponse.json({
            imageUrl,
            isAiGenerated: true,
            searchQuery: prompt,
            originalPrompt: prompt,
            engine: "Pollinations (Flux)"
        });

    } catch (error) {
        console.error('API Error:', error);

        // Return a reliable fallback if something goes wrong
        return NextResponse.json({
            imageUrl: getFallbackUrl(category),
            isAiGenerated: false,
            error: 'AI currently busy'
        }, { status: 200 });
    }
}

function getFallbackUrl(category) {
    const fallbacks = {
        outfit: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
        casual: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
        formal: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    };
    return fallbacks[category] || fallbacks.outfit;
}