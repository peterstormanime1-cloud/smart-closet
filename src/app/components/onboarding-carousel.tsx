import { useState } from "react";
import { Camera, Cloud, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Camera,
    title: "Scan your closet, get outfits.",
    description: "Take photos of your clothes and build your digital wardrobe in seconds.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Cloud,
    title: "AI suggests looks by weather & events.",
    description: "Get personalized outfit recommendations based on your schedule and forecast.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Sparkles,
    title: "Reuse what you own, dress smarter.",
    description: "Discover new combinations and make the most of your existing wardrobe.",
    color: "from-blue-500 to-cyan-500"
  }
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="size-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className={`bg-gradient-to-br ${slide.color} p-8 rounded-3xl mb-8 shadow-xl`}>
          <Icon className="size-20 text-white" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
          {slide.title}
        </h2>
        
        <p className="text-center text-gray-600 max-w-sm">
          {slide.description}
        </p>
      </div>

      <div className="pb-8 px-8 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "w-8 bg-gradient-to-r " + slide.color
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleSkip}
          >
            Skip
          </Button>
          <Button
            className={`flex-1 bg-gradient-to-r ${slide.color} text-white border-0`}
            onClick={handleNext}
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
