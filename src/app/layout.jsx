import "./globals.css";

export const metadata = {
    title: "StyleSync - Your Smart Closet Companion",
    description: "AI-powered wardrobe management and outfit suggestions",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
