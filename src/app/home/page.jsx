"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cloud, Sparkles, Camera, Grid3x3, Calendar, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { recentItems, mockOutfits } from "@/lib/mock-data";

export default function HomePage() {
    const [todaysOutfit, setTodaysOutfit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading AI curation
        const timer = setTimeout(() => {
            // Pick a random outfit based on the day of the year or just random
            // For now, just random to show variety on refresh
            const randomOutfit = mockOutfits[Math.floor(Math.random() * mockOutfits.length)];
            setTodaysOutfit(randomOutfit);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

                <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                    <Cloud className="size-4" />
                                    <span>23°C, Partly cloudy · Karachi</span>
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                                Good morning! 👋
                            </h1>
                            <p className="text-xl text-white/80 max-w-lg">
                                Your AI stylist is ready. Let's find the perfect outfit for today.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex gap-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white text-center min-w-[120px]">
                                <div className="text-3xl font-bold">145</div>
                                <div className="text-sm text-white/80">Items</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white text-center min-w-[120px]">
                                <div className="text-3xl font-bold">23</div>
                                <div className="text-sm text-white/80">Outfits</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white text-center min-w-[120px]">
                                <div className="text-3xl font-bold">89%</div>
                                <div className="text-sm text-white/80">Style Match</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Today's Outfit - Featured */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/10 overflow-hidden border border-purple-100">
                            <div className="p-6 lg:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Today's Outfit</h2>
                                        <p className="text-gray-500">AI-curated for your schedule</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-sm font-medium">
                                        <Sparkles className="size-4" />
                                        AI Pick
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden relative">
                                        {isLoading ? (
                                            <div className="size-full flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="size-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                                                    <p className="text-sm text-purple-600 font-medium">Generating with AI...</p>
                                                </div>
                                            </div>
                                        ) : todaysOutfit ? (
                                            <>
                                                <img
                                                    src={todaysOutfit.image}
                                                    alt="Today's outfit suggestion"
                                                    className="size-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                                                    <Sparkles className="size-3" />
                                                    AI Generated
                                                </div>
                                            </>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{todaysOutfit?.name || "Casual Chic"}</h3>
                                            <p className="text-gray-600 mb-4">
                                                {todaysOutfit?.style
                                                    ? `Perfect for a ${todaysOutfit.style.toLowerCase()} day. Selected based on your preferences.`
                                                    : "Perfect for your meeting at 2 PM. This outfit combines comfort with style."}
                                            </p>

                                            <div className="space-y-3 mb-6">
                                                {/* Use mock items if available in the outfit, else generic fallback or loop */}
                                                {/* For now, let's just show some generic items or try to map IDs if complex. 
                                                    Since mockOutfits has item IDs, and we have mockItems, we could map them 
                                                    but for simplicity in this view, let's just show a static list or mapped list if easy.
                                                    The original code hardcoded. I'll stick to hardcoded or simple mapping if undefined.
                                                */}
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                    <div className="size-12 bg-pink-100 rounded-lg" />
                                                    <div>
                                                        <div className="font-medium">Top</div>
                                                        <div className="text-sm text-gray-500">Tops</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                    <div className="size-12 bg-blue-100 rounded-lg" />
                                                    <div>
                                                        <div className="font-medium">Bottom</div>
                                                        <div className="text-sm text-gray-500">Bottoms</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="outline" className="flex-1" asChild>
                                                <Link href="/outfits">Customize</Link>
                                            </Button>
                                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 hover:opacity-90" asChild>
                                                <Link href="/outfits">Wear This</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>

                        <Link href="/closet/add" className="block group">
                            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-pink-500/5 border border-pink-100 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                                        <Camera className="size-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Add Clothes</h4>
                                        <p className="text-sm text-gray-500">Scan or upload items</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/closet" className="block group">
                            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-500/5 border border-purple-100 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                        <Grid3x3 className="size-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">My Closet</h4>
                                        <p className="text-sm text-gray-500">145 items organized</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/planner" className="block group">
                            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-500/5 border border-blue-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                        <Calendar className="size-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Plan Week</h4>
                                        <p className="text-sm text-gray-500">7 days ahead</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/outfits" className="block group">
                            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-cyan-500/5 border border-cyan-100 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                                        <Zap className="size-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Get Styled</h4>
                                        <p className="text-sm text-gray-500">AI suggestions</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recently Added Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Recently Added</h3>
                        <Link href="/closet" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                            View All
                            <TrendingUp className="size-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {recentItems.map(item => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="aspect-square bg-white rounded-2xl mb-3 overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 relative border border-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="size-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <span className="text-white text-xs font-medium truncate w-full">{item.category}</span>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-700 text-center truncate px-1">{item.name}</p>
                                <p className="text-xs text-gray-500 text-center">Added today</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <BottomNav />
        </div>
    );
}
