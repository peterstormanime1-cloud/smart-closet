import { Cloud, Sparkles, Camera, Grid3x3, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUnsplashImage } from "../hooks/useUnsplashImage";

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
  userName: string;
}

export function HomeDashboard({ onNavigate, activeTab, userName }: HomeDashboardProps) {
  const outfitImage = useUnsplashImage("fashion outfit");

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-1">Good morning, {userName || "there"} 👋</h1>
        <div className="flex items-center gap-2 text-white/90">
          <Cloud className="size-4" />
          <span className="text-sm">23°C, Partly cloudy · Karachi</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Today's Outfit */}
        <Card className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Today's Outfit</h2>
              <Sparkles className="size-5 text-purple-600" />
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mb-3 overflow-hidden">
              {outfitImage && (
                <ImageWithFallback
                  src={outfitImage}
                  alt="Today's outfit suggestion"
                  className="size-full object-cover"
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for your meeting at 2 PM
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate("outfits")}
              >
                View Details
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
                onClick={() => onNavigate("outfits")}
              >
                See More
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("add-item")}
            >
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-3 rounded-xl w-fit mb-2">
                <Camera className="size-6 text-pink-600" />
              </div>
              <h4 className="font-medium mb-1">Add Clothes</h4>
              <p className="text-xs text-gray-600">Scan new items</p>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("closet")}
            >
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl w-fit mb-2">
                <Grid3x3 className="size-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-1">My Closet</h4>
              <p className="text-xs text-gray-600">145 items</p>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("planner")}
            >
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl w-fit mb-2">
                <Calendar className="size-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-1">Plan Week</h4>
              <p className="text-xs text-gray-600">7 days ahead</p>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("outfits")}
            >
              <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-3 rounded-xl w-fit mb-2">
                <Sparkles className="size-6 text-cyan-600" />
              </div>
              <h4 className="font-medium mb-1">Get Styled</h4>
              <p className="text-xs text-gray-600">AI suggestions</p>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold mb-3">Recently Added</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex-shrink-0 w-24">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-2" />
                <p className="text-xs text-gray-600 text-center truncate">Item {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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