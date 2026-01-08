import { useEffect } from "react";
import { Shirt } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="size-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex flex-col items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-2xl">
          <Shirt className="size-16 text-white" />
        </div>
      </div>
      <h1 className="mt-8 text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        StyleSync
      </h1>
      <p className="mt-2 text-gray-600">Your Smart Closet Companion</p>
    </div>
  );
}
