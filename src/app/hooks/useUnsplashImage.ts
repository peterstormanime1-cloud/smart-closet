import { useState, useEffect } from "react";

export function useUnsplashImage(query: string) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // Mock image URL for now - in real app would call unsplash API
    setImageUrl(`https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`);
  }, [query]);

  return imageUrl;
}
