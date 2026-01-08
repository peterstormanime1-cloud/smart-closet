"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Grid3x3, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/bottom-nav";
import { mockItems } from "@/lib/mock-data";

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];

export default function ClosetPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid");

    const filteredItems = mockItems.filter(
        item => selectedCategory === "All" || item.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Hero Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="text-white">
                            <h1 className="text-3xl lg:text-5xl font-bold mb-2">My Closet</h1>
                            <p className="text-white/80 text-lg">Your complete digital wardrobe</p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 lg:gap-10">
                            <div className="text-center text-white">
                                <div className="text-4xl font-bold">{mockItems.length}</div>
                                <div className="text-sm text-white/70">Items</div>
                            </div>
                            <div className="text-center text-white">
                                <div className="text-4xl font-bold">{categories.length - 1}</div>
                                <div className="text-sm text-white/70">Categories</div>
                            </div>
                            <div className="text-center text-white">
                                <div className="text-4xl font-bold">12</div>
                                <div className="text-sm text-white/70">New this month</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="bg-white rounded-2xl shadow-lg shadow-purple-500/5 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <Input
                                placeholder="Search your wardrobe..."
                                className="pl-12 h-12 border-gray-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-12 px-4">
                                <SlidersHorizontal className="size-5 mr-2" />
                                Filters
                            </Button>
                            <div className="flex border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-3 ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "bg-white text-gray-400"}`}
                                >
                                    <LayoutGrid className="size-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-3 ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "bg-white text-gray-400"}`}
                                >
                                    <List className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                                    : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 pb-24">
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-square bg-white rounded-2xl mb-3 overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 relative border border-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <Button size="sm" className="w-full bg-white/90 text-gray-900 hover:bg-white text-xs font-semibold backdrop-blur-sm">
                                        Quick View
                                    </Button>
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                                        <div className={`size-2 rounded-full ${item.color === 'Pink' ? 'bg-pink-500' : item.color === 'Blue' ? 'bg-blue-500' : 'bg-gray-500'}`} />
                                    </div>
                                </div>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{item.name}</h4>
                            <p className="text-xs lg:text-sm text-gray-500">{item.category} • {item.color}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Add Button */}
            <Link
                href="/closet/add"
                className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 size-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl shadow-purple-500/40 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 z-40"
            >
                <Plus className="size-8" />
            </Link>

            {/* Bottom Tab Bar */}
            <BottomNav />
        </div>
    );
}
