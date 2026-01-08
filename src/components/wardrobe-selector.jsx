"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { mockItems } from "@/lib/mock-data";

/**
 * Wardrobe item selector component
 * Allows users to select multiple items from their wardrobe
 */
export function WardrobeSelector({ onSelectionChange, selectedItems = [] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];

    const filteredItems = activeCategory === "All"
        ? mockItems
        : mockItems.filter(item => item.category === activeCategory);

    const toggleItem = (item) => {
        const isSelected = selectedItems.some(selected => selected.id === item.id);

        if (isSelected) {
            onSelectionChange(selectedItems.filter(selected => selected.id !== item.id));
        } else {
            onSelectionChange([...selectedItems, item]);
        }
    };

    const isSelected = (itemId) => selectedItems.some(item => item.id === itemId);

    return (
        <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all ${activeCategory === category
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredItems.map(item => {
                    const selected = isSelected(item.id);

                    return (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item)}
                            className="cursor-pointer group relative"
                        >
                            <div className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selected
                                    ? "border-purple-500 ring-2 ring-purple-200 scale-95"
                                    : "border-gray-200 hover:border-purple-300"
                                }`}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="size-full object-cover"
                                />

                                {/* Selection Indicator */}
                                {selected && (
                                    <div className="absolute inset-0 bg-purple-600/30 backdrop-blur-[2px] flex items-center justify-center">
                                        <div className="size-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                                            <Check className="size-6 text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <p className="text-xs font-medium text-gray-700 mt-1.5 truncate">
                                {item.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
