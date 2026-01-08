"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Upload, Sparkles, Check, Loader2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const styles = ["Casual", "Business", "Formal", "Sporty", "Chic", "Boho", "Vintage", "Streetwear"];
const colors = ["Black", "White", "Gray", "Beige", "Blue", "Red", "Pink", "Green", "Yellow", "Purple"];

export default function AddItemPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [capturedImage, setCapturedImage] = useState(null);

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        category: "Tops",
        color: "Black",
        styles: []
    });

    const handleCapture = () => {
        // Simulate capturing/uploading an image - go directly to form
        setCapturedImage("https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1000&auto=format&fit=crop");
        setStep(3); // Skip scanning, go straight to form
    };

    const handleSave = () => {
        // In a real app, this would save to DB
        router.push("/closet");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="size-6" />
                </Button>
                <h1 className="text-lg font-bold ml-2">Add New Item</h1>
            </div>

            <div className="flex-1 p-6 max-w-2xl mx-auto w-full">
                {step === 1 && (
                    <div className="flex flex-col h-full justify-center gap-6">
                        <div className="aspect-[3/4] bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-300 transition-colors cursor-pointer" onClick={handleCapture}>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                            <div className="size-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                                <Camera className="size-8 text-purple-600" />
                            </div>
                            <p className="font-medium text-gray-900">Take a Photo</p>
                            <p className="text-sm text-gray-500 mt-1">Tap camera to scan</p>
                        </div>

                        <div className="text-center text-gray-400 text-sm font-medium">OR</div>

                        <Button variant="outline" className="h-14 border-2 border-dashed" onClick={handleCapture}>
                            <Upload className="size-5 mr-2" />
                            Upload from Gallery
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
                            <img src={capturedImage} className="size-full object-cover" alt="Captured" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Item Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1.5"
                                    placeholder="e.g., Denim Jacket"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tops">Tops</SelectItem>
                                            <SelectItem value="Bottoms">Bottoms</SelectItem>
                                            <SelectItem value="Outerwear">Outerwear</SelectItem>
                                            <SelectItem value="Dresses">Dresses</SelectItem>
                                            <SelectItem value="Shoes">Shoes</SelectItem>
                                            <SelectItem value="Accessories">Accessories</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Color</Label>
                                    <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                                        <SelectTrigger className="mt-1.5">
                                            <div className="flex items-center gap-2">
                                                <SelectValue />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colors.map(c => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label>Styles</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {styles.map(style => {
                                        const isSelected = formData.styles.includes(style);
                                        return (
                                            <button
                                                key={style}
                                                type="button"
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setFormData({ ...formData, styles: formData.styles.filter(s => s !== style) });
                                                    } else {
                                                        setFormData({ ...formData, styles: [...formData.styles, style] });
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected
                                                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                                                    : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                                                    }`}
                                            >
                                                {style}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button onClick={handleSave} className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/20">
                                Save to Closet
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
