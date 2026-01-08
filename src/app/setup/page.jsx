"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const styleOptions = [
    "Casual", "Chic", "Desi", "Street", "Formal", "Modest",
    "Sporty", "Bohemian", "Minimalist", "Vintage"
];

export default function SetupPage() {
    const router = useRouter();
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");

    const toggleStyle = (style) => {
        setSelectedStyles(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
        );
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {
            router.push("/home");
        }
    };

    return (
        <div className="size-full bg-white flex flex-col">
            <div className="p-6 border-b">
                <div className="flex gap-2 mb-2">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-gray-200'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
                </div>
                <p className="text-sm text-gray-600">Step {step} of 2</p>
            </div>

            <div className="flex-1 overflow-auto px-6 py-8">
                {step === 1 ? (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
                            <p className="text-gray-600">Help us personalize your experience</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Your city (for weather)" />
                            </div>

                            <div className="space-y-2">
                                <Label>Gender / Preferred Style</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Women", "Men", "Unisex"].map(option => (
                                        <Button
                                            key={option}
                                            variant="outline"
                                            className="h-12"
                                            type="button"
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Choose your style tags</h2>
                            <p className="text-gray-600">Select all that apply (you can change this later)</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {styleOptions.map(style => (
                                <Badge
                                    key={style}
                                    variant={selectedStyles.includes(style) ? "default" : "outline"}
                                    className={`cursor-pointer px-4 py-2 text-sm ${selectedStyles.includes(style)
                                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
                                            : "hover:border-purple-300"
                                        }`}
                                    onClick={() => toggleStyle(style)}
                                >
                                    {style}
                                </Badge>
                            ))}
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label>Additional Preferences (Optional)</Label>
                            <div className="space-y-2">
                                {["Modest wear", "Hijab-friendly", "Plus size"].map(option => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border-t">
                <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
                >
                    {step === 1 ? "Next" : "Complete Setup"}
                </Button>
            </div>
        </div>
    );
}
