"use client";

import { useState, useEffect } from "react";
import { generateImage } from "@/lib/gemini-service";

/**
 * Hook for generating images using Gemini AI
 * @param {string} prompt - Text description for image generation
 * @param {string} category - Optional category (outfit, casual, formal, etc.)
 * @returns {{imageUrl: string, isLoading: boolean, error: string|null, isAiGenerated: boolean}}
 */
export function useGeminiImage(prompt, category = "outfit") {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAiGenerated, setIsAiGenerated] = useState(false);

    useEffect(() => {
        if (!prompt) return;

        let isMounted = true;
        setIsLoading(true);
        setError(null);

        generateImage(prompt, category)
            .then((result) => {
                if (isMounted) {
                    setImageUrl(result.url);
                    setIsAiGenerated(result.isAiGenerated);
                    if (result.error) {
                        setError(result.error);
                    }
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [prompt, category]);

    return { imageUrl, isLoading, error, isAiGenerated };
}

// Keep backwards compatibility with old name
export { useGeminiImage as useUnsplashImage };
