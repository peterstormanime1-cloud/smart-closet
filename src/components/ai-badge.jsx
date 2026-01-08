import { Sparkles } from "lucide-react";

/**
 * Badge component to indicate AI-generated content
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Size variant: 'sm' | 'md' | 'lg'
 */
export function AiBadge({ className = "", size = "md" }) {
    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm"
    };

    const iconSizes = {
        sm: "size-2.5",
        md: "size-3",
        lg: "size-4"
    };

    return (
        <div className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-sm ${sizeClasses[size]} ${className}`}>
            <Sparkles className={`${iconSizes[size]} animate-pulse`} />
            <span>AI Generated</span>
        </div>
    );
}
