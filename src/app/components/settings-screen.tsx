import { ArrowLeft, Bell, Globe, Lock, HelpCircle, LogOut, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b flex items-center gap-3">
        <button onClick={() => onNavigate("profile")}>
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Bell className="size-5 text-purple-600" />
            </div>
            <h2 className="font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-outfit">Daily Outfit Suggestions</Label>
                <p className="text-sm text-gray-600">Get outfit ideas every morning</p>
              </div>
              <Switch id="daily-outfit" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weather-alerts">Weather Alerts</Label>
                <p className="text-sm text-gray-600">Outfit tips based on weather</p>
              </div>
              <Switch id="weather-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="event-reminders">Event Reminders</Label>
                <p className="text-sm text-gray-600">Outfit planning reminders</p>
              </div>
              <Switch id="event-reminders" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Globe className="size-5 text-blue-600" />
            </div>
            <h2 className="font-semibold">Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="modest-wear">Modest Wear</Label>
                <p className="text-sm text-gray-600">Show modest outfit options</p>
              </div>
              <Switch id="modest-wear" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hijab-friendly">Hijab-Friendly</Label>
                <p className="text-sm text-gray-600">Include hijab styling</p>
              </div>
              <Switch id="hijab-friendly" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Language</Label>
                <p className="text-sm text-gray-600">English</p>
              </div>
              <button className="text-purple-600 text-sm font-medium">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Lock className="size-5 text-green-600" />
            </div>
            <h2 className="font-semibold">Privacy & Security</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">Linked Accounts</span>
              <span className="text-sm text-gray-500">Google, Apple</span>
            </button>
            
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">Change Password</span>
              <span className="text-purple-600 text-sm">Update</span>
            </button>
            
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">Data & Privacy</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <HelpCircle className="size-5 text-orange-600" />
            </div>
            <h2 className="font-semibold">Help & Support</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">FAQs</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">Contact Us</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full flex items-center justify-between py-2">
              <span className="text-gray-700">About StyleSync</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3 pb-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-gray-700 border-gray-300"
            onClick={() => onNavigate("auth")}
          >
            <LogOut className="size-5" />
            Log Out
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="size-5" />
            Delete Account
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 pb-6">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
