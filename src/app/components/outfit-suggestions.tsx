import { useState } from "react";
import { Heart, X, RefreshCw, Calendar as CalendarIcon, Edit, Cloud, User, Grid3x3, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUnsplashImage } from "../hooks/useUnsplashImage";

interface OutfitSuggestionsProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const occasions = ["Everyday", "Work", "Uni", "Party", "Wedding", "Prayer"];

export function OutfitSuggestions({ onNavigate, activeTab }: OutfitSuggestionsProps) {
  const [selectedOccasion, setSelectedOccasion] = useState("Everyday");
  const [currentOutfit, setCurrentOutfit] = useState(0);
  
  const outfitImage = useUnsplashImage("fashion outfit woman");

  const outfits = [
    { id: 1, name: "Casual Chic", items: ["Pink Sweater", "Blue Jeans", "White Sneakers"] },
    { id: 2, name: "Office Ready", items: ["Black Blazer", "White Shirt", "Gray Pants"] },
    { id: 3, name: "Weekend Vibes", items: ["Green Jacket", "Denim Skirt", "Boots"] },
  ];

  const handleNext = () => {
    setCurrentOutfit((prev) => (prev + 1) % outfits.length);
  };

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Outfit Suggestions</h1>
        
        {/* Weather Info */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Cloud className="size-4" />
          <span className="text-sm">23°C, Partly cloudy · Karachi</span>
        </div>

        {/* Occasion Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {occasions.map(occasion => (
            <Badge
              key={occasion}
              variant={selectedOccasion === occasion ? "default" : "outline"}
              className={`cursor-pointer flex-shrink-0 ${
                selectedOccasion === occasion
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
                  : ""
              }`}
              onClick={() => setSelectedOccasion(occasion)}
            >
              {occasion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Outfit Card */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 mb-6">
          {/* Outfit Image */}
          <div className="aspect-[3/4] bg-white rounded-2xl mb-4 overflow-hidden shadow-lg">
            {outfitImage && (
              <ImageWithFallback
                src={outfitImage}
                alt="Outfit suggestion"
                className="size-full object-cover"
              />
            )}
          </div>

          {/* Outfit Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">{outfits[currentOutfit].name}</h3>
            <p className="text-gray-600 text-sm">Perfect for {selectedOccasion.toLowerCase()}</p>
          </div>

          {/* Items in Outfit */}
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium text-gray-700">Items in this outfit:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {outfits[currentOutfit].items.map((item, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="size-16 bg-white rounded-lg border-2 border-purple-200" />
                  <p className="text-xs text-center mt-1 w-16 truncate">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate("outfit-detail")}
            >
              <Edit className="size-4 mr-2" />
              Customize
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
              onClick={() => onNavigate("planner")}
            >
              <CalendarIcon className="size-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>

        {/* More Suggestions */}
        <div>
          <h3 className="font-semibold mb-3">More Suggestions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                <div className="size-full flex items-center justify-center text-gray-400">
                  <Sparkles className="size-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 py-4 border-t flex gap-3">
        <button
          className="size-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
        >
          <X className="size-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full py-4 flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
        >
          <RefreshCw className="size-5" />
          Next Outfit
        </button>
        
        <button
          className="size-14 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center hover:bg-pink-100 transition-colors"
        >
          <Heart className="size-6" />
        </button>
      </div>

      {/* Bottom Tab Bar */}
      <div className="bg-white border-t px-6 py-3 flex justify-around items-center">
        {[
          { id: "home", icon: Sparkles, label: "Home" },
          { id: "closet", icon: Grid3x3, label: "Closet" },
          { id: "outfits", icon: CalendarIcon, label: "Outfits" },
          { id: "profile", icon: User, label: "Profile" }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
