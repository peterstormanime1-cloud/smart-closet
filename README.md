# StyleSync - AI-Powered Wardrobe Manager

A modern, AI-enhanced wardrobe management application built with Next.js and Google Gemini AI. Upload your clothing items, organize your digital closet, and generate AI-powered outfit combinations.

![StyleSync Banner](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop)

## 🌟 Features

### 📸 Digital Wardrobe
- **Simple Upload**: Add clothing items with photo, category, color, and style tags
- **Smart Organization**: Filter by category (Tops, Bottoms, Dresses, Outerwear, Shoes, Accessories)
- **Visual Gallery**: Browse your entire wardrobe in a beautiful grid layout

### ✨ AI Outfit Generator
- **Multi-Select Interface**: Choose multiple items from your wardrobe
- **AI Visualization**: Generate outfit images showing selected items combined
- **Smart Prompts**: Gemini AI creates enhanced image search queries
- **Fallback System**: Graceful fallback to curated placeholder images

### 🎨 Beautiful UI
- Modern gradient design with glassmorphism
- Smooth animations and micro-interactions
- Responsive layout (mobile, tablet, desktop)
- Dark mode inspired colors

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or pnpm
- Google Gemini API key (optional - app works without it)

### Installation

1. **Clone and install dependencies**
```bash
cd cloths
pnpm install
```

2. **Environment Setup**

Create `.env.local` file in project root:

```bash
# Optional: For AI-powered outfit generation
GEMINI_API_KEY=your_api_key_here
```

> **Note**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Run Development Server**

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
cloths/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/
│   │   │   └── generate-image/ # Gemini API endpoint
│   │   ├── closet/            # Wardrobe management
│   │   │   ├── add/           # Add new item
│   │   │   └── page.jsx       # Browse wardrobe
│   │   ├── outfits/           # Outfit builder
│   │   ├── home/              # Dashboard
│   │   ├── profile/           # User profile
│   │   ├── planner/           # Weekly planner
│   │   └── onboarding/        # Welcome flow
│   ├── components/
│   │   ├── ui/                # Radix UI components
│   │   ├── wardrobe-selector.jsx  # Multi-select component
│   │   ├── ai-badge.jsx       # AI generation indicator
│   │   └── bottom-nav.jsx     # Tab navigation
│   ├── hooks/
│   │   ├── use-unsplash-image.js  # Image generation hook
│   │   └── use-gemini-outfit.js   # Outfit generation hook
│   ├── lib/
│   │   ├── gemini-service.js  # Gemini API service
│   │   └── mock-data.js       # Sample wardrobe data
│   └── styles/
│       └── globals.css        # Global styles
├── .env.local                 # Environment variables (create this)
└── package.json
```

---

## 🎯 Key Pages

### `/closet` - Your Wardrobe
- Browse all clothing items
- Filter by category
- Search functionality
- Grid/List view toggle

### `/closet/add` - Add Item
- Upload photo (camera or file)
- Fill in details (name, category, color, styles)
- **No AI analysis** - simple and fast

### `/outfits` - Outfit Builder ⭐
- Select multiple items from wardrobe
- Generate AI outfit visualization
- Save favorite combinations

### `/home` - Dashboard
- Today's outfit suggestion
- Quick actions
- Recently added items

---

## 🤖 How AI Works

### Outfit Generation Flow

1. **User selects items** (e.g., Pink Sweater, Blue Jeans, White Sneakers)
2. **Hook creates prompt**: 
   ```
   "full body fashion photography of woman wearing pink sweater, 
   blue jeans, white sneakers, professional studio lighting"
   ```
3. **Gemini enhances prompt** → optimized search query
4. **Returns image URL** from Unsplash
5. **Displays with AI badge**

### Without API Key

- App works normally
- Uses curated placeholder images
- No AI generation, but full functionality

---

## 🔧 Troubleshooting

### Gemini API 404 Error

**Symptom**: `models/gemini-1.5-pro is not found`

**Solutions**:

1. **Check API Key Permissions**
   - Ensure your API key has access to Generative Language API
   - Regenerate key if needed

2. **Use Different Model** (if available to your key):
   ```javascript
   // In src/app/api/generate-image/route.js
   const model = genAI.getGenerativeModel({ 
     model: 'gemini-pro'  // or 'gemini-1.0-pro'
   });
   ```

3. **Disable AI (Use Fallbacks)**:
   - Don't add `GEMINI_API_KEY` to `.env.local`
   - App will use placeholder images automatically

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -- -p 3001
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

---

## 📱 Usage Guide

### Adding Clothing Items

1. Navigate to `/closet/add`
2. Tap camera icon or "Upload from Gallery"
3. Photo appears in form
4. Fill details:
   - **Name**: e.g., "Denim Jacket"
   - **Category**: Tops, Bottoms, etc.
   - **Color**: Select from dropdown
   - **Styles**: Multi-select tags (Casual, Business, etc.)
5. Click "Save to Closet"

### Creating AI Outfits

1. Go to `/outfits`
2. Click "Select from Wardrobe"
3. Choose category (Tops, Bottoms, Shoes, etc.)
4. Click items to select (checkmarks appear)
5. Click "Generate AI Outfit"
6. Wait for AI generation (2-3 seconds)
7. View combined outfit image
8. Save or regenerate

### Browsing Wardrobe

1. Go to `/closet`
2. Use category tabs to filter
3. Search by name
4. Click item for details
5. Toggle grid/list view

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library |
| **Tailwind CSS 4** | Utility-first CSS |
| **Radix UI** | Accessible component primitives |
| **Google Gemini AI** | AI prompt enhancement |
| **Lucide React** | Icon library |

---

## 🎨 Design System

### Colors

- **Primary**: Purple to Pink gradient (`from-purple-600 to-pink-600`)
- **Background**: Soft gradients (`from-slate-50 via-purple-50 to-pink-50`)
- **Accents**: Blue, Cyan, Orange for different features

### Components

All UI components use Radix UI for accessibility:
- `Button` - Primary actions
- `Input` - Text fields
- `Select` - Dropdowns
- `Badge` - Tags and labels
- `Card` - Content containers

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features |

---

## 📊 Mock Data

Sample wardrobe items included in `src/lib/mock-data.js`:

- 12 clothing items across all categories
- Unsplash placeholder images
- `isAiGenerated` flag for each item
- Sample prompts for AI generation

---

## 🚢 Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

### Manual Build

```bash
pnpm build
pnpm start
```

---

## 🐛 Known Issues

### 1. Gemini Model Not Found (404)

**Issue**: Some API keys don't have access to `gemini-1.5-pro`

**Workaround**: App falls back to placeholder images automatically

### 2. Hydration Warnings

**Issue**: Minor React hydration mismatches in console

**Impact**: Visual only, doesn't affect functionality

**Fix**: Can be ignored or will be resolved in future updates

---

## 🔮 Future Enhancements

- [ ] Save generated outfits to favorites
- [ ] Outfit history and recommendations
- [ ] Weather-based outfit suggestions
- [ ] Occasion tagging (work, party, casual)
- [ ] Wardrobe analytics
- [ ] Social sharing
- [ ] Real AI vision for clothing analysis

---

## 📝 API Endpoints

### POST `/api/generate-image`

Generate outfit visualization from text prompt.

**Request**:
```json
{
  "prompt": "woman wearing pink sweater, blue jeans",
  "category": "outfit",
  "items": [
    { "id": 1, "name": "Pink Sweater", "color": "Pink" },
    { "id": 2, "name": "Blue Jeans", "color": "Blue" }
  ]
}
```

**Response**:
```json
{
  "imageUrl": "https://source.unsplash.com/800x600/?...",
  "isAiGenerated": true,
  "searchQuery": "casual outfit pink sweater jeans",
  "originalPrompt": "..."
}
```

**Error Response**:
```json
{
  "error": "Failed to generate image",
  "imageUrl": "https://fallback-image-url.com"
}
```

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## 📄 License

MIT License - free to use and modify

---

## 💡 Tips

1. **Optimize Images**: Compress uploaded images for better performance
2. **Regular Backups**: Export wardrobe data periodically
3. **Experiment**: Try different combinations in outfit builder
4. **Organize**: Use consistent naming and tagging

---

## 🆘 Support

### Getting Help

1. Check this README
2. Review `GEMINI_SETUP.md` for API setup
3. Check browser console for errors
4. Review `walkthrough.md` for feature details

### Common Questions

**Q: Do I need Gemini API key?**  
A: No, app works without it using placeholder images.

**Q: How many items can I select for outfits?**  
A: No limit, but 3-5 items work best visually.

**Q: Can I edit items after adding?**  
A: Currently view-only, edit feature coming soon.

**Q: Does it work offline?**  
A: No, requires internet for images and API.

---

## 🎉 Acknowledgments

- **Next.js** team for amazing framework
- **Radix UI** for accessible components
- **Unsplash** for placeholder images
- **Google** for Gemini AI

---

**Built with ❤️ using Next.js and Gemini AI**

Version: 0.1.0  
Last Updated: January 2026
