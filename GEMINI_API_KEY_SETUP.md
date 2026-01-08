# ⚠️ IMPORTANT: Setup Required

## Gemini API Key Configuration

To use AI image generation, you need to:

1. **Get your Gemini API key** from: https://makersuite.google.com/app/apikey

2. **Create `.env.local` file** in the project root:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Restart your dev server**:
   ```bash
   pnpm run dev
   ```

## What happens without the API key?

Don't worry! The app works perfectly without the key:
- ✅ App runs normally
- ✅ Automatically uses beautiful placeholder images
- ✅ All features work (just without AI generation)

See **GEMINI_SETUP.md** for detailed instructions.
