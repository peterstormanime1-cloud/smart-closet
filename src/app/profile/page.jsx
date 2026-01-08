"use client";

import Link from "next/link";
import { Settings, ChevronRight, User, Sparkles, Heart, Share2, Bell, Crown, Camera, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/bottom-nav";

const menuItems = [
    { icon: User, label: "Edit Profile", description: "Update your information", href: "/profile", color: "from-blue-400 to-blue-600" },
    { icon: Palette, label: "Style Preferences", description: "Customize your style", href: "/profile", color: "from-purple-400 to-purple-600" },
    { icon: Heart, label: "Saved Outfits", description: "Your favorites", href: "/outfits", color: "from-pink-400 to-pink-600" },
    { icon: Share2, label: "Share & Invite", description: "Invite friends", href: "/profile", color: "from-green-400 to-green-600" },
    { icon: Bell, label: "Notifications", description: "Manage alerts", href: "/settings", color: "from-orange-400 to-orange-600" },
    { icon: Settings, label: "Settings", description: "App preferences", href: "/settings", color: "from-gray-400 to-gray-600" },
];

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600" />

                <div className="relative px-6 pt-12 pb-32">
                    <div className="flex items-center justify-between text-white mb-8">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <Link href="/settings" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                            <Settings className="size-6" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl shadow-purple-500/10 overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                            {/* Avatar */}
                            <div className="relative mx-auto lg:mx-0">
                                <div className="size-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-1">
                                    <div className="size-full rounded-full overflow-hidden border-4 border-white">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
                                            alt="Profile"
                                            className="size-full object-cover"
                                        />
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 size-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-purple-100 hover:scale-110 transition-transform">
                                    <Camera className="size-5 text-purple-600" />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="text-center lg:text-left flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">StyleSync User</h2>
                                <p className="text-gray-500 mb-4">@stylesyncuser</p>
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 rounded-full text-sm font-medium">
                                        ✨ Chic
                                    </span>
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-sm font-medium">
                                        🎯 Casual
                                    </span>
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                        💼 Professional
                                    </span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 lg:gap-8">
                                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-gray-900">145</div>
                                    <div className="text-sm text-gray-500">Items</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-gray-900">23</div>
                                    <div className="text-sm text-gray-500">Outfits</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-gray-900">15</div>
                                    <div className="text-sm text-gray-500">Lookbooks</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="mt-8 space-y-3 pb-8">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block group"
                            >
                                <div className="bg-white rounded-2xl p-5 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                                    <div className={`size-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <Icon className="size-7" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{item.label}</h4>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <ChevronRight className="size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Premium Card */}
                <div className="mb-24 relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />

                    <div className="relative p-8 text-white">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <Crown className="size-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Upgrade to Premium</h3>
                                <p className="text-white/80">Unlock unlimited AI styling and advanced features</p>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-6 text-white/90">
                            <li className="flex items-center gap-2">
                                <Sparkles className="size-4" />
                                Unlimited outfit suggestions
                            </li>
                            <li className="flex items-center gap-2">
                                <Sparkles className="size-4" />
                                Advanced wardrobe analytics
                            </li>
                            <li className="flex items-center gap-2">
                                <Sparkles className="size-4" />
                                Priority style support
                            </li>
                        </ul>

                        <Button className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold py-6 text-lg shadow-xl">
                            Upgrade Now - $9.99/month
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <BottomNav />
        </div>
    );
}
