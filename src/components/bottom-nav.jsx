"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Grid3x3, Calendar, User, Home } from "lucide-react";

const tabs = [
    { id: "home", href: "/home", icon: Home, label: "Home" },
    { id: "closet", href: "/closet", icon: Grid3x3, label: "Closet" },
    { id: "outfits", href: "/outfits", icon: Sparkles, label: "Outfits" },
    { id: "profile", href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="max-w-2xl mx-auto px-4 pb-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-white/50 px-2 py-2">
                    <div className="flex justify-around items-center">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = pathname.startsWith(tab.href);
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={`flex flex-col items-center gap-1 py-3 px-6 rounded-xl transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon className="size-5" />
                                    <span className="text-xs font-medium">{tab.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
