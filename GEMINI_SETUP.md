# Gemini AI Image Generation - Setup Instructions

## 1. Get your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

**Important:** Replace `your_api_key_here` with your actual Gemini API key.

## 3. Restart Development Server

After creating the `.env.local` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
pnpm run dev
```

## 4. How It Works

- **Text-to-Image Generation**: The app uses Gemini to create enhanced search queries from your text prompts, then generates images via Unsplash
- **Fallback System**: If Gemini API fails or API key is missing, the app automatically falls back to curated placeholder images
- **Loading States**: Beautiful loading animations show while images are being generated
- **AI Badges**: Generated images display an "AI Generated" badge to distinguish them from static placeholders

## 5. Testing

Navigate to the home page (`/home`) to see the AI-generated outfit image. The system will:
- Show a loading spinner while generating
- Display the AI-generated image with a purple "AI Generated" badge
- Fall back to placeholder images if there's an error

## 6. Customizing Prompts

Edit prompts in the code to generate different types of images:

```javascript
const { imageUrl, isLoading, isAiGenerated } = useGeminiImage(
  "elegant evening dress on mannequin, studio lighting",
  "outfit"
);
```

## 7. Adding More AI-Generated Content

You can use the `useGeminiImage` hook anywhere in your app:

```javascript
import { useGeminiImage } from "@/hooks/use-unsplash-image";

function MyComponent() {
  const { imageUrl, isLoading, isAiGenerated } = useGeminiImage(
    "casual summer outfit with denim jacket",
    "outfit"
  );
  
  return (
    <div>
      {isLoading ? <Spinner /> : <img src={imageUrl} alt="Outfit" />}
    </div>
  );
}
```

## Notes

- **API Limits**: Free tier has rate limits. The app handles this gracefully with fallbacks.
- **Security**: API key is stored server-side and never exposed to the browser
- **Performance**: Images are generated on-demand and can be cached for better performance
