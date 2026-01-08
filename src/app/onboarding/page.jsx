"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Cloud, Sparkles, ChevronRight, ChevronLeft, Shirt, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
    {
        icon: Camera,
        title: "Scan your closet, get outfits",
        description: "Take photos of your clothes and build your digital wardrobe in seconds. Our AI automatically categorizes and tags everything.",
        gradient: "from-pink-500 via-rose-500 to-red-500",
        bgGradient: "from-pink-50 to-rose-50",
    },
    {
        icon: Cloud,
        title: "Smart suggestions for any weather",
        description: "Get personalized outfit recommendations based on your schedule, local weather, and personal style preferences.",
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
        bgGradient: "from-purple-50 to-indigo-50",
    },
    {
        icon: Wand2,
        title: "Dress smarter, not harder",
        description: "Discover new combinations and make the most of your existing wardrobe. Never wonder what to wear again.",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        bgGradient: "from-blue-50 to-cyan-50",
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            router.push("/auth");
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        router.push("/auth");
    };

    const slide = slides[currentSlide];
    const Icon = slide.icon;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${slide.bgGradient} transition-all duration-500`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-2">
                    <Shirt className="size-8 text-purple-600" />
                    <span className="font-bold text-xl text-gray-800">StyleSync</span>
                </div>
                <button
                    onClick={handleSkip}
                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    Skip
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Icon Section */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} rounded-[3rem] blur-3xl opacity-30 scale-110`} />

                            {/* Main icon container */}
                            <div className={`relative bg-gradient-to-br ${slide.gradient} p-16 lg:p-24 rounded-[3rem] shadow-2xl`}>
                                <Icon className="size-32 lg:size-40 text-white" strokeWidth={1} />
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                                <Sparkles className="size-8 text-yellow-500" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {slide.title}
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {slide.description}
                        </p>

                        {/* Progress Dots */}
                        <div className="flex justify-center lg:justify-start gap-3 mb-10">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? `w-10 bg-gradient-to-r ${slide.gradient}`
                                            : "w-3 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 justify-center lg:justify-start">
                            {currentSlide > 0 && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handlePrev}
                                    className="px-6"
                                >
                                    <ChevronLeft className="size-5 mr-1" />
                                    Back
                                </Button>
                            )}
                            <Button
                                size="lg"
                                onClick={handleNext}
                                className={`px-8 bg-gradient-to-r ${slide.gradient} text-white border-0 hover:opacity-90 shadow-lg hover:shadow-xl transition-all`}
                            >
                                {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
                                <ChevronRight className="size-5 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
