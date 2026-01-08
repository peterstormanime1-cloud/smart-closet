/**
 * Gemini AI Service
 * Handles image generation using Google's Gemini AI
 */

const FALLBACK_IMAGES = {
    outfit: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    casual: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop',
    formal: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    sportswear: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    accessories: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    shoes: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop',
};

/**
 * Generate an image using Gemini AI
 * @param {string} prompt - Text description for image generation
 * @param {string} category - Optional category for better fallback selection
 * @returns {Promise<{url: string, isAiGenerated: boolean, error?: string}>}
 */
export async function generateImage(prompt, category = 'outfit') {
    try {
        // Call our Next.js API route (keeps API key server-side)
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, category }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate image');
        }

        return {
            url: data.imageUrl,
            isAiGenerated: true,
        };
    } catch (error) {
        console.warn('Gemini image generation failed, using fallback:', error.message);

        // Return fallback image
        return {
            url: FALLBACK_IMAGES[category] || FALLBACK_IMAGES.outfit,
            isAiGenerated: false,
            error: error.message,
        };
    }
}

/**
 * Get a fallback image for a category
 * @param {string} category 
 * @returns {string}
 */
export function getFallbackImage(category = 'outfit') {
    return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.outfit;
}
