import { useState } from "react";
import Image from "next/image";
import { Camera, Upload, ArrowLeft, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import recognitionImage from "figma:asset/954e02231c9dceb5897c662731bef637edff7e17.png";

interface AddItemScreenProps {
  onNavigate: (screen: string) => void;
}

const colors = ["Black", "White", "Pink", "Blue", "Green", "Red", "Yellow", "Purple", "Gray", "Brown"];
const seasons = ["All Season", "Summer", "Winter", "Spring", "Fall"];
const occasions = ["Casual", "Formal", "Party", "Work", "Sport"];

export function AddItemScreen({ onNavigate }: AddItemScreenProps) {
  const [step, setStep] = useState<"intro" | "camera" | "tagging">("camera");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions(prev =>
      prev.includes(occasion) ? prev.filter(o => o !== occasion) : [...prev, occasion]
    );
  };

  if (step === "intro") {
    return (
      <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-8">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-3xl mb-6">
          <Camera className="size-16 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">Let's build your digital closet</h1>
        <p className="text-gray-600 text-center mb-8 max-w-sm">
          Take photos of your clothes or upload from your gallery to get started
        </p>
        <Button
          onClick={() => setStep("camera")}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 px-8"
        >
          Start Adding Items
        </Button>
      </div>
    );
  }

  if (step === "camera") {
    return (
      <div className="size-full bg-black flex flex-col">
        {/* Camera View */}
        <div className="relative flex-1">
          <Image
            src={recognitionImage}
            alt="Camera view"
            className="size-full object-cover"
            fill
          />

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
            <button
              onClick={() => onNavigate("closet")}
              className="size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
            >
              <ArrowLeft className="size-5" />
            </button>
          </div>

          {/* Overlay Text */}
          <div className="absolute top-20 left-6 right-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Item Recognition</h2>
            <p className="text-white/90 text-sm">
              Please look directly at the camera and keep your phone steady as we process your information.
            </p>
          </div>

          {/* Detection Frame */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full max-w-sm aspect-[3/4] border-4 border-white rounded-3xl" />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-black/90 backdrop-blur-sm p-6 flex items-center justify-around">
          <button className="size-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Upload className="size-6 text-white" />
          </button>

          <button
            onClick={() => setStep("tagging")}
            className="size-20 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            <div className="size-16 rounded-full bg-white border-4 border-gray-800" />
          </button>

          <div className="size-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b flex items-center gap-3">
        <button onClick={() => setStep("camera")}>
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-xl font-bold">Tag Your Item</h1>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Item Preview */}
        <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden">
          <div className="size-full flex items-center justify-center text-gray-400">
            <Camera className="size-12" />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select defaultValue="tops">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <Label>Colors</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <Badge
                key={color}
                variant={selectedColors.includes(color) ? "default" : "outline"}
                className={`cursor-pointer ${selectedColors.includes(color)
                    ? "bg-purple-600 text-white"
                    : ""
                  }`}
                onClick={() => toggleColor(color)}
              >
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* Season */}
        <div className="space-y-2">
          <Label>Season</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {seasons.map(season => (
                <SelectItem key={season} value={season.toLowerCase().replace(" ", "-")}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Occasions */}
        <div className="space-y-2">
          <Label>Occasions</Label>
          <div className="flex flex-wrap gap-2">
            {occasions.map(occasion => (
              <Badge
                key={occasion}
                variant={selectedOccasions.includes(occasion) ? "default" : "outline"}
                className={`cursor-pointer ${selectedOccasions.includes(occasion)
                    ? "bg-purple-600 text-white"
                    : ""
                  }`}
                onClick={() => toggleOccasion(occasion)}
              >
                {occasion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notes (Optional)</Label>
          <Input placeholder="e.g., Gift from mom, needs ironing..." />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-6 border-t">
        <Button
          onClick={() => onNavigate("closet")}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
        >
          <Check className="size-4 mr-2" />
          Save to Closet
        </Button>
      </div>
    </div>
  );
}
