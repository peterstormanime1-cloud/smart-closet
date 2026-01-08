import { useState, useEffect } from "react";
import { SplashScreen } from "./components/splash-screen";
import { OnboardingCarousel } from "./components/onboarding-carousel";
import { AuthScreen } from "./components/auth-screen";
import { ProfileSetup } from "./components/profile-setup";
import { HomeDashboard } from "./components/home-dashboard";
import { ClosetScreen } from "./components/closet-screen";
import { AddItemScreen } from "./components/add-item-screen";
import { OutfitSuggestions } from "./components/outfit-suggestions";
import { OutfitPlanner } from "./components/outfit-planner";
import { ProfileScreen } from "./components/profile-screen";
import { SettingsScreen } from "./components/settings-screen";

type Screen = 
  | "splash"
  | "onboarding"
  | "auth"
  | "profile-setup"
  | "home"
  | "closet"
  | "add-item"
  | "item-detail"
  | "outfits"
  | "outfit-detail"
  | "planner"
  | "profile"
  | "settings"
  | "edit-profile"
  | "style-preferences"
  | "saved-outfits"
  | "share"
  | "notifications";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
    
    // Update active tab if navigating to a main screen
    if (["home", "closet", "outfits", "profile"].includes(screen)) {
      setActiveTab(screen);
    }
  };

  const handleAuthComplete = (email: string) => {
    setUserEmail(email);
    setCurrentScreen("profile-setup");
  };

  const handleProfileSetupComplete = (name: string) => {
    setUserName(name);
    setCurrentScreen("home");
  };

  // Simulate initial app flow (remove in production to test individual screens)
  useEffect(() => {
    // Uncomment to skip onboarding in development
    // setUserName("Guest User");
    // setCurrentScreen("home");
  }, []);

  return (
    <div className="size-full bg-gray-50 flex items-center justify-center">
      {/* Mobile Frame */}
      <div className="w-full max-w-md h-full max-h-[900px] bg-white shadow-2xl rounded-[3rem] overflow-hidden relative">
        {/* Screen Content */}
        {currentScreen === "splash" && (
          <SplashScreen onComplete={() => setCurrentScreen("onboarding")} />
        )}
        
        {currentScreen === "onboarding" && (
          <OnboardingCarousel onComplete={() => setCurrentScreen("auth")} />
        )}
        
        {currentScreen === "auth" && (
          <AuthScreen onComplete={handleAuthComplete} />
        )}
        
        {currentScreen === "profile-setup" && (
          <ProfileSetup onComplete={handleProfileSetupComplete} />
        )}
        
        {currentScreen === "home" && (
          <HomeDashboard onNavigate={handleNavigate} activeTab={activeTab} userName={userName} />
        )}
        
        {currentScreen === "closet" && (
          <ClosetScreen onNavigate={handleNavigate} activeTab={activeTab} userName={userName} />
        )}
        
        {currentScreen === "add-item" && (
          <AddItemScreen onNavigate={handleNavigate} />
        )}
        
        {currentScreen === "outfits" && (
          <OutfitSuggestions onNavigate={handleNavigate} activeTab={activeTab} />
        )}
        
        {currentScreen === "planner" && (
          <OutfitPlanner onNavigate={handleNavigate} activeTab={activeTab} />
        )}
        
        {currentScreen === "profile" && (
          <ProfileScreen onNavigate={handleNavigate} activeTab={activeTab} userName={userName} />
        )}
        
        {currentScreen === "settings" && (
          <SettingsScreen onNavigate={handleNavigate} />
        )}

        {/* Placeholder screens for incomplete sections */}
        {["item-detail", "outfit-detail", "edit-profile", "style-preferences", "saved-outfits", "share", "notifications"].includes(currentScreen) && (
          <div className="size-full bg-white flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-gray-600 mb-6">This feature is under development</p>
              <button
                onClick={() => handleNavigate("profile")}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}