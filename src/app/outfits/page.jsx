"use client";

import { useState } from "react";
import { Sparkles, Wand2, X, Loader2 } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/bottom-nav";
import { WardrobeSelector } from "@/components/wardrobe-selector";
import { AiBadge } from "@/components/ai-badge";
import { mockOutfits } from "@/lib/mock-data";

export default function OutfitsPage() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showSelector, setShowSelector] = useState(false);

    // State for mock generation
    const [currentOutfitIndex, setCurrentOutfitIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedOutfit, setDisplayedOutfit] = useState(null);

    const handleGenerate = () => {
        // Simulate loading
        setIsLoading(true);
        setShowSelector(false);

        setTimeout(() => {
            // Cycle through outfits one by one
            const nextIndex = (currentOutfitIndex + 1) % mockOutfits.length;
            setCurrentOutfitIndex(nextIndex);
            setDisplayedOutfit(mockOutfits[nextIndex]);
            setIsLoading(false);
        }, 1500); // 1.5s delay for effect
    };

    const removeItem = (itemId) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white px-6 py-12">
                <h1 className="text-3xl font-bold mb-2">Outfit Builder</h1>
                <p className="text-white/80">Select items and generate AI outfit combinations</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Selected Items Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">
                            Selected Items ({selectedItems.length})
                        </h2>
                        <Button
                            onClick={() => setShowSelector(!showSelector)}
                            variant={showSelector ? "outline" : "default"}
                            className={!showSelector ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""}
                        >
                            {showSelector ? "Hide Wardrobe" : "Select from Wardrobe"}
                        </Button>
                    </div>

                    {selectedItems.length > 0 ? (
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
                            {selectedItems.map(item => (
                                <div key={item.id} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-purple-200 bg-gray-50">
                                        <img src={item.image} alt={item.name} className="size-full object-cover" />
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute -top-2 -right-2 size-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <X className="size-4" />
                                    </button>
                                    <p className="text-xs text-center mt-1 truncate">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <Wand2 className="size-12 mx-auto mb-3 opacity-50" />
                            <p>No items selected. Click "Select from Wardrobe" to start.</p>
                        </div>
                    )}

                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl disabled:opacity-70 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="size-5 mr-2 animate-spin" />
                                Styling Profile...
                            </>
                        ) : (
                            <>
                                <Sparkles className="size-5 mr-2" />
                                Generate Outfit Idea
                            </>
                        )}
                    </Button>
                </div>

                {/* Wardrobe Selector */}
                {showSelector && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in slide-in-from-top duration-300">
                        <h3 className="text-lg font-bold mb-4">Your Wardrobe</h3>
                        <WardrobeSelector
                            selectedItems={selectedItems}
                            onSelectionChange={setSelectedItems}
                        />
                    </div>
                )}

                {/* Generated Outfit Display */}
                {(displayedOutfit || isLoading) && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">Generated Outfit</h2>
                                {displayedOutfit && <p className="text-sm text-gray-500">{displayedOutfit.name} • {displayedOutfit.style}</p>}
                            </div>
                            <AiBadge size="sm" />
                        </div>

                        <div className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-slate-100 relative group">
                            {isLoading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 animate-pulse">
                                    <Loader2 className="size-10 text-purple-600 animate-spin mb-4" />
                                    <p className="text-sm font-medium text-purple-800">Analyzing wardrobe combinations...</p>
                                </div>
                            ) : (
                                displayedOutfit && (
                                    <Image
                                        src={displayedOutfit.image}
                                        alt={displayedOutfit.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                )
                            )}
                        </div>

                        {!isLoading && displayedOutfit && (
                            <div className="flex gap-3 mt-6">
                                <Button variant="outline" className="flex-1 h-12">
                                    Save Outfit
                                </Button>
                                <Button
                                    onClick={handleGenerate}
                                    className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                >
                                    Next Outfit
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}