import { ChevronLeft, ChevronRight, Plus, User, Grid3x3, Calendar, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface OutfitPlannerProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mockOutfits = [
  { day: 0, name: "Casual Monday" },
  { day: 2, name: "Office Look" },
  { day: 4, name: "Party Ready" },
];

export function OutfitPlanner({ onNavigate, activeTab }: OutfitPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Outfit Planner</h1>
          <Button
            onClick={() => onNavigate("outfits")}
            variant="outline"
            size="sm"
          >
            <Plus className="size-4 mr-1" />
            Plan Week
          </Button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentWeek(prev => prev - 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          <div className="text-center">
            <p className="font-medium">This Week</p>
            <p className="text-sm text-gray-600">Jan 1 - Jan 7, 2026</p>
          </div>
          
          <button
            onClick={() => setCurrentWeek(prev => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="space-y-4">
          {days.map((day, index) => {
            const hasOutfit = mockOutfits.some(o => o.day === index);
            const outfit = mockOutfits.find(o => o.day === index);
            
            return (
              <div
                key={day}
                className={`rounded-2xl border-2 p-4 transition-colors ${
                  hasOutfit
                    ? "border-purple-300 bg-gradient-to-r from-pink-50 to-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Day Info */}
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day}</div>
                    <div className={`size-12 rounded-full flex items-center justify-center font-bold ${
                      hasOutfit
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Outfit Preview */}
                  {hasOutfit ? (
                    <div className="flex-1">
                      <p className="font-medium mb-2">{outfit?.name}</p>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                          <div
                            key={i}
                            className="size-12 bg-white rounded-lg border-2 border-purple-200"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="text-gray-500">No outfit planned</p>
                    </div>
                  )}

                  {/* Action */}
                  <button
                    onClick={() => onNavigate("outfits")}
                    className={`size-10 rounded-full flex items-center justify-center ${
                      hasOutfit
                        ? "bg-white text-purple-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {hasOutfit ? (
                      <Sparkles className="size-5" />
                    ) : (
                      <Plus className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Plan Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
          <h3 className="font-semibold mb-2">Need help planning?</h3>
          <p className="text-sm text-gray-700 mb-4">
            Let AI suggest outfits for your entire week based on your schedule and weather.
          </p>
          <Button
            onClick={() => onNavigate("outfits")}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
          >
            <Sparkles className="size-4 mr-2" />
            Auto-Plan My Week
          </Button>
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
