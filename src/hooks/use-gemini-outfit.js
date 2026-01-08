"use client";

import { useState, useEffect } from "react";

/**
 * Hook for generating outfit images from selected wardrobe items
 * @param {Array} selectedItems - Array of selected wardrobe items
 * @returns {{imageUrl: string, isLoading: boolean, error: string|null, isAiGenerated: boolean, generateOutfit: function}}
 */
export function useGeminiOutfit() {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAiGenerated, setIsAiGenerated] = useState(false);

    const generateOutfit = async (selectedItems) => {
        if (!selectedItems || selectedItems.length === 0) {
            setError("Please select at least one item");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Create outfit description from selected items
            const itemDescriptions = selectedItems.map(item =>
                `${item.color} ${item.name.toLowerCase()}`
            ).join(", ");

            const prompt = `full body fashion photography of woman wearing ${itemDescriptions}, professional studio lighting, white background, fashion catalog style`;

            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    category: 'outfit',
                    items: selectedItems
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate outfit');
            }

            setImageUrl(data.imageUrl);
            setIsAiGenerated(true);
            setIsLoading(false);
        } catch (err) {
            console.error('Outfit generation error:', err);
            setError(err.message);
            // Fallback image
            setImageUrl('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop');
            setIsAiGenerated(false);
            setIsLoading(false);
        }
    };

    return { imageUrl, isLoading, error, isAiGenerated, generateOutfit };
}
