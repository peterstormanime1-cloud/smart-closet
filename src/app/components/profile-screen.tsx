import { Settings, ChevronRight, User, Grid3x3, Calendar, Sparkles, Heart, Share2, Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import exampleImage from "figma:asset/7d5148c5e347efff5a7b2b59116d92ea10d7c91d.png";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
  userName: string;
}

const menuItems = [
  { icon: User, label: "Edit Profile", screen: "edit-profile" },
  { icon: Sparkles, label: "Style Preferences", screen: "style-preferences" },
  { icon: Heart, label: "Saved Outfits", screen: "saved-outfits" },
  { icon: Share2, label: "Share & Invite", screen: "share" },
  { icon: Bell, label: "Notifications", screen: "notifications" },
  { icon: Settings, label: "Settings", screen: "settings" },
];

export function ProfileScreen({ onNavigate, activeTab, userName }: ProfileScreenProps) {
  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 pt-12 pb-20">
        <div className="flex items-center justify-between text-white mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button onClick={() => onNavigate("settings")}>
            <Settings className="size-6" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-12 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 overflow-hidden flex-shrink-0 relative">
              <Image
                src={exampleImage}
                alt="Profile"
                className="size-full object-cover"
                fill
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{userName || "User"}</h2>
              <p className="text-gray-600 mb-2">@{userName ? userName.toLowerCase().replace(/\s+/g, '') : "user"}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                  Chic
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Casual
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">145</div>
              <div className="text-sm text-gray-600">Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Outfits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-600">Lookbooks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-auto px-6 space-y-2 pb-6">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="size-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <Icon className="size-5 text-purple-600" />
              </div>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          );
        })}

        {/* Upgrade Card */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-6 text-white mt-4">
          <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
          <p className="text-white/90 text-sm mb-4">
            Get unlimited outfit suggestions, advanced AI styling, and more!
          </p>
          <Button
            className="bg-white text-purple-600 hover:bg-white/90 border-0 w-full"
          >
            Upgrade Now
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
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${isActive ? "text-purple-600" : "text-gray-400"
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