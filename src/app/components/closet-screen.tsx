import { useState } from "react";
import { Plus, Search, Filter, Grid3x3, User, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import exampleImage from "figma:asset/7d5148c5e347efff5a7b2b59116d92ea10d7c91d.png";

interface ClosetScreenProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
  userName: string;
}

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];

const mockItems = [
  { id: 1, name: "Pink Sweater", category: "Tops", color: "Pink" },
  { id: 2, name: "Blue Jeans", category: "Bottoms", color: "Blue" },
  { id: 3, name: "Black Dress", category: "Dresses", color: "Black" },
  { id: 4, name: "Green Jacket", category: "Outerwear", color: "Green" },
  { id: 5, name: "White Sneakers", category: "Shoes", color: "White" },
  { id: 6, name: "Leather Bag", category: "Accessories", color: "Brown" },
  { id: 7, name: "Orange Top", category: "Tops", color: "Orange" },
  { id: 8, name: "Gray Pants", category: "Bottoms", color: "Gray" },
];

export function ClosetScreen({ onNavigate, activeTab, userName }: ClosetScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "profile">("profile");

  if (viewMode === "profile") {
    return (
      <div className="size-full bg-white flex flex-col">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <div className="size-24 rounded-full border-4 border-white bg-gradient-to-br from-pink-300 to-purple-400 overflow-hidden">
              <img 
                src={exampleImage} 
                alt="Profile"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 px-6 text-center">
          <h2 className="text-xl font-bold">{userName || "User"}</h2>
          <p className="text-gray-600">@{userName ? userName.toLowerCase().replace(/\s+/g, '') : "user"}</p>
          
          <div className="flex justify-center gap-8 mt-4 mb-6">
            <div>
              <div className="font-bold">145</div>
              <div className="text-sm text-gray-600">Items</div>
            </div>
            <div className="border-l border-r px-8">
              <div className="font-bold">23</div>
              <div className="text-sm text-gray-600">Outfits</div>
            </div>
            <div>
              <div className="font-bold">15</div>
              <div className="text-sm text-gray-600">Lookbooks</div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 mb-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full border text-sm transition-colors"
                style={{
                  borderColor: selectedCategory === cat ? "#8b5cf6" : "#e5e7eb",
                  backgroundColor: selectedCategory === cat ? "#8b5cf6" : "white",
                  color: selectedCategory === cat ? "white" : "#6b7280"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        <div className="flex-1 overflow-auto px-6">
          <div className="grid grid-cols-2 gap-4 pb-6">
            {mockItems
              .filter(item => selectedCategory === "All" || item.category === selectedCategory)
              .map(item => (
                <div 
                  key={item.id} 
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onNavigate("item-detail")}
                >
                  <div className="size-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-xs">{item.name}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => onNavigate("add-item")}
          className="absolute bottom-20 right-6 size-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Plus className="size-6" />
        </button>

        {/* Bottom Tab Bar */}
        <div className="bg-white border-t px-6 py-3 flex justify-around items-center">
          {[
            { id: "home", icon: Sparkles, label: "Home" },
            { id: "closet", icon: Grid3x3, label: "Closet" },
            { id: "outfits", icon: Calendar, label: "Outfits" },
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

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b">
        <h1 className="text-2xl font-bold mb-4">My Closet</h1>
        
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input placeholder="Search items..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="size-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          {mockItems
            .filter(item => selectedCategory === "All" || item.category === selectedCategory)
            .map(item => (
              <div 
                key={item.id} 
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => onNavigate("item-detail")}
              />
            ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => onNavigate("add-item")}
        className="absolute bottom-20 right-6 size-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg flex items-center justify-center"
      >
        <Plus className="size-6" />
      </button>

      {/* Bottom Tab Bar */}
      <div className="bg-white border-t px-6 py-3 flex justify-around items-center">
        {[
          { id: "home", icon: Sparkles, label: "Home" },
          { id: "closet", icon: Grid3x3, label: "Closet" },
          { id: "outfits", icon: Calendar, label: "Outfits" },
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