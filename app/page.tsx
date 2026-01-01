"use client";

import React, { useState } from 'react';
import { Camera, Shirt, Sparkles, LayoutGrid, User, Plus, Trash2, CheckCircle2, Heart, Filter, Search } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('wardrobe');
  const [loading, setLoading] = useState(false);
  const [outfit, setOutfit] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Expanded Mock Data for Variety
  const categories = ["All", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories", "Activewear"];

  const [wardrobeItems, setWardrobeItems] = useState([
    { id: 1, name: "Linen Shirt", cat: "Tops", img: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?w=300&h=300&fit=crop" },
    { id: 2, name: "Blue Chinos", cat: "Bottoms", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop" },
    { id: 3, name: "White Sneakers", cat: "Shoes", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop" },
    { id: 4, name: "Leather Watch", cat: "Accessories", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop" },
    { id: 5, name: "Denim Jacket", cat: "Outerwear", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=300&fit=crop" },
    { id: 6, name: "Black Hoodie", cat: "Tops", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop" },
    { id: 7, name: "Cargo Pants", cat: "Bottoms", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop" },
    { id: 8, name: "Chelsea Boots", cat: "Shoes", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=300&h=300&fit=crop" },
    { id: 9, name: "Graphic Tee", cat: "Tops", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop" },
    { id: 10, name: "Gym Shorts", cat: "Activewear", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop" },
    { id: 11, name: "Performance Tee", cat: "Activewear", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop" },
    { id: 12, name: "Aviator Shades", cat: "Accessories", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=300&fit=crop" },
  ]);

  const filteredItems = activeCategory === "All"
    ? wardrobeItems
    : wardrobeItems.filter(item => item.cat === activeCategory);

  const generateOutfit = () => {
    setLoading(true);

    // Logic to simulate "AI" picking random valid combinations
    setTimeout(() => {
      const tops = wardrobeItems.filter(i => i.cat === "Tops" || i.cat === "Activewear");
      const bottoms = wardrobeItems.filter(i => i.cat === "Bottoms" || i.cat === "Activewear");
      const shoes = wardrobeItems.filter(i => i.cat === "Shoes");

      const randomTop = tops[Math.floor(Math.random() * tops.length)];
      const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      const randomShoe = shoes[Math.floor(Math.random() * shoes.length)];

      const styles = [
        { title: "Urban Explorer", desc: "A rugged yet clean look for city navigation.", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop" },
        { title: "Minimalist Daily", desc: "Simple tones and comfortable fabrics for a productive day.", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=600&fit=crop" },
        { title: "Street Style Pro", desc: "Layered textures focused on modern silhouettes.", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&h=600&fit=crop" }
      ];

      const randomStyle = styles[Math.floor(Math.random() * styles.length)];

      setOutfit({
        ...randomStyle,
        items: [randomTop.id, randomBottom.id, randomShoe.id],
        aiVisual: randomStyle.img
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 font-sans pb-24">
      {/* Top Navigation */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1.5 rounded-xl shadow-md">
            <Shirt size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-indigo-950">Smart Closet</span>
        </div>
        <div className="flex gap-3">
          <button className="p-2 text-neutral-400 hover:text-black transition-colors"><Search size={20} /></button>
          <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/10">
            <Plus size={16} /> ADD ITEM
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6">
        {view === 'wardrobe' ? (
          <section className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-black text-neutral-900">Wardrobe</h2>
                <p className="text-neutral-500 text-sm font-medium">You have {wardrobeItems.length} items cataloged</p>
              </div>
              <button className="p-2 bg-white border rounded-lg text-neutral-500 hover:bg-neutral-50"><Filter size={18} /></button>
            </div>

            {/* Scrollable Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === c
                    ? 'bg-black text-white border-black shadow-lg shadow-black/20'
                    : 'bg-white text-neutral-400 border-neutral-100 hover:border-neutral-300'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Wardrobe Grid */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {filteredItems.map(item => (
                <div key={item.id} className="group bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-sm truncate">{item.name}</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{item.cat}</p>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center aspect-square text-neutral-300 hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all">
                <Camera size={28} strokeWidth={1.5} />
                <span className="text-[10px] mt-3 font-black uppercase tracking-widest">Snap Photo</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-neutral-900 leading-tight">Your AI<br />Daily Pick</h2>
              <p className="text-neutral-500 text-sm font-medium mt-1">Analyzing weather, trends, and your closet...</p>
            </div>

            {!outfit && !loading && (
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl shadow-indigo-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="bg-white/20 backdrop-blur-md text-white w-16 h-16 rounded-3xl flex items-center justify-center mx-auto border border-white/30 shadow-inner">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-black leading-tight">Ready for a<br />Fresh Look?</h3>
                  <p className="text-indigo-100 text-sm mt-3 leading-relaxed">Let our AI mix and match your pieces to create a professional look in seconds.</p>
                </div>
                <button
                  onClick={generateOutfit}
                  className="w-full bg-white text-indigo-600 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all hover:bg-indigo-50"
                >
                  Generate Outfit
                </button>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-8 border-indigo-100 rounded-full"></div>
                  <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 animate-pulse" size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black uppercase tracking-widest text-neutral-400">AI Stylist at work</p>
                  <p className="text-xs text-neutral-400 mt-1 italic">"Matching textures and colors..."</p>
                </div>
              </div>
            )}

            {outfit && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl mb-8 group">
                  <img src={outfit.aiVisual} alt="AI Recommendation" className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl text-indigo-600">
                      <Sparkles size={12} /> AI Visualized
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-3xl font-black mb-2 leading-tight uppercase italic">{outfit.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed max-w-[280px]">{outfit.description}</p>
                  </div>
                </div>

                <div className="space-y-6 px-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Components used</h4>
                      <span className="text-[10px] bg-neutral-100 px-2 py-1 rounded-md font-bold text-neutral-500 uppercase">3 Items Match</span>
                    </div>
                    <div className="flex gap-4">
                      {outfit.items.map(itemId => {
                        const item = wardrobeItems.find(i => i.id === itemId);
                        return (
                          <div key={itemId} className="group relative">
                            <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-white shadow-lg ring-1 ring-neutral-200 transition-transform group-hover:-translate-y-1">
                              <img src={item.img} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-2 text-center">
                              <p className="text-[10px] font-bold text-neutral-800 truncate w-20">{item.name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { setOutfit(null); setView('wardrobe'); }}
                      className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                    >
                      Wear This Today
                    </button>
                    <button
                      onClick={generateOutfit}
                      className="w-16 bg-white border border-neutral-200 flex items-center justify-center rounded-2xl text-neutral-400 hover:text-indigo-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Futuristic Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] bg-white/80 backdrop-blur-xl border border-white/20 px-8 py-3 flex justify-between items-center rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 ring-1 ring-black/5">
        <button onClick={() => setView('wardrobe')} className={`flex flex-col items-center gap-1 transition-all ${view === 'wardrobe' ? 'text-indigo-600 scale-110' : 'text-neutral-400 hover:text-neutral-600'}`}>
          <LayoutGrid size={22} strokeWidth={view === 'wardrobe' ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-tighter">Closet</span>
        </button>

        <div className="relative -top-1">
          <button
            onClick={() => { setView('recommend'); setOutfit(null); }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${view === 'recommend' ? 'bg-indigo-600 text-white rotate-[360deg] shadow-indigo-400' : 'bg-black text-white hover:bg-neutral-800'}`}
          >
            <Sparkles size={24} />
          </button>
        </div>

        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600">
          <User size={22} />
          <span className="text-[9px] font-black uppercase tracking-tighter">Me</span>
        </button>
      </nav>
    </div>
  );
};

export default App;