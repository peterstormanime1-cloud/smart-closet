"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shirt, Sparkles } from "lucide-react";

export default function SplashPage() {
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            router.push("/onboarding");
        }, 2500);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className={`relative z-10 text-center transition-all duration-1000 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl scale-150" />
                    <div className="relative bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
                        <div className="bg-gradient-to-br from-white to-pink-100 p-8 rounded-2xl shadow-inner">
                            <Shirt className="size-20 text-purple-600" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Floating sparkles */}
                    <Sparkles className="absolute -top-4 -right-4 size-8 text-yellow-300 animate-bounce" style={{ animationDuration: '2s' }} />
                    <Sparkles className="absolute -bottom-2 -left-4 size-6 text-pink-300 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                    StyleSync
                </h1>
                <p className="text-xl text-white/80 mb-8">
                    Your Smart Closet Companion
                </p>

                {/* Loading indicator */}
                <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}
