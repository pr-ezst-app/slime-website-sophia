import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "Ocean Dream",
    type: "Glitter Slime",
    price: 8.99,
    color: "blue",
    emoji: "💙",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/a8df0f49-6664-461e-b5da-11814b0c9e64.jpg",
    desc: "Sparkly blue glitter slime — stretchy & satisfying!",
    tag: "Best Seller",
    tagColor: "bg-blue-400",
  },
  {
    id: 2,
    name: "Minty Fresh",
    type: "Fluffy Slime",
    price: 7.99,
    color: "green",
    emoji: "💚",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/4e9cb100-8b40-41b7-b1b7-bec7242a7c40.jpg",
    desc: "Super fluffy & cloud-like mint green slime!",
    tag: "Fan Fave",
    tagColor: "bg-green-400",
  },
  {
    id: 3,
    name: "Cotton Candy",
    type: "Butter Slime",
    price: 9.99,
    color: "pink",
    emoji: "🩷",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/505c40b7-94b5-4711-a98f-ea83d49f3ab1.jpg",
    desc: "Smooth butter slime in dreamy pink — so squishy!",
    tag: "New Drop",
    tagColor: "bg-pink-400",
  },
  {
    id: 4,
    name: "Galaxy Swirl",
    type: "Clear Slime",
    price: 10.99,
    color: "blue",
    emoji: "✨",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/a8df0f49-6664-461e-b5da-11814b0c9e64.jpg",
    desc: "Swirly galaxy slime with blue & pink glitter mix!",
    tag: "Limited",
    tagColor: "bg-purple-400",
  },
  {
    id: 5,
    name: "Watermelon Pop",
    type: "Crunchy Slime",
    price: 8.49,
    color: "green",
    emoji: "🍉",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/4e9cb100-8b40-41b7-b1b7-bec7242a7c40.jpg",
    desc: "Green crunchy slime — pop pop pop all day!",
    tag: "Satisfying",
    tagColor: "bg-green-500",
  },
  {
    id: 6,
    name: "Bubblegum Bliss",
    type: "Foam Slime",
    price: 7.49,
    color: "pink",
    emoji: "🫧",
    img: "https://cdn.ezst.app/projects/0e0e4841-765c-4695-83b6-0e5f4a71e3a0/files/505c40b7-94b5-4711-a98f-ea83d49f3ab1.jpg",
    desc: "Foamy bubblegum pink — airy & super fun!",
    tag: "Cute",
    tagColor: "bg-pink-500",
  },
];

// Custom slime builder options
const BASES = [
  { id: "butter", label: "Butter", emoji: "🧈", desc: "Smooth & spreadable", color: "bg-yellow-100 border-yellow-300", price: 0 },
  { id: "fluffy", label: "Fluffy", emoji: "☁️", desc: "Light & cloud-like", color: "bg-blue-100 border-blue-300", price: 0 },
  { id: "glitter", label: "Glitter", emoji: "✨", desc: "Sparkly & stretchy", color: "bg-purple-100 border-purple-300", price: 1 },
  { id: "crunchy", label: "Crunchy", emoji: "🫧", desc: "Pop pop satisfying", color: "bg-green-100 border-green-300", price: 0.5 },
  { id: "clear", label: "Clear", emoji: "💎", desc: "Glossy & transparent", color: "bg-sky-100 border-sky-300", price: 1 },
];

const COLORS = [
  { id: "pink", label: "Pink", hex: "#f9a8d4", emoji: "🩷" },
  { id: "blue", label: "Blue", hex: "#93c5fd", emoji: "💙" },
  { id: "green", label: "Green", hex: "#86efac", emoji: "💚" },
  { id: "purple", label: "Purple", hex: "#c4b5fd", emoji: "💜" },
  { id: "yellow", label: "Yellow", hex: "#fde68a", emoji: "💛" },
  { id: "red", label: "Red", hex: "#fca5a5", emoji: "❤️" },
  { id: "white", label: "White", hex: "#f1f5f9", emoji: "🤍" },
  { id: "teal", label: "Teal", hex: "#5eead4", emoji: "🩵" },
];

const ADDINS = [
  { id: "glitter", label: "Glitter", emoji: "✨", price: 0.5 },
  { id: "foam_beads", label: "Foam Beads", emoji: "🫧", price: 0.5 },
  { id: "confetti", label: "Confetti", emoji: "🎊", price: 0.5 },
  { id: "charms", label: "Charms", emoji: "🌸", price: 1 },
  { id: "fishbowl", label: "Fishbowl Beads", emoji: "🐠", price: 0.75 },
  { id: "slime_chunks", label: "Slime Chunks", emoji: "🍬", price: 1 },
  { id: "stars", label: "Star Confetti", emoji: "⭐", price: 0.5 },
  { id: "hearts", label: "Heart Glitter", emoji: "💖", price: 0.75 },
];

const SCENTS = [
  { id: "none", label: "No Scent", emoji: "🚫", price: 0 },
  { id: "strawberry", label: "Strawberry", emoji: "🍓", price: 0.5 },
  { id: "vanilla", label: "Vanilla", emoji: "🍦", price: 0.5 },
  { id: "watermelon", label: "Watermelon", emoji: "🍉", price: 0.5 },
  { id: "bubblegum", label: "Bubblegum", emoji: "🫧", price: 0.5 },
  { id: "blueberry", label: "Blueberry", emoji: "🫐", price: 0.5 },
];

type CartItem = { id: number; name: string; price: number; emoji: string; qty: number };
type Section = "shop" | "build" | "cart" | "about";

interface CustomSlime {
  base: string;
  color: string;
  addins: string[];
  scent: string;
  name: string;
}

const BASE_CUSTOM_PRICE = 8.99;

export default function Index() {
  const [section, setSection] = useState<Section>("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [customAdded, setCustomAdded] = useState(false);

  // Builder state
  const [step, setStep] = useState(0);
  const [custom, setCustom] = useState<CustomSlime>({
    base: "",
    color: "",
    addins: [],
    scent: "none",
    name: "",
  });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const customPrice = (() => {
    let p = BASE_CUSTOM_PRICE;
    const base = BASES.find((b) => b.id === custom.base);
    if (base) p += base.price;
    custom.addins.forEach((a) => {
      const ai = ADDINS.find((x) => x.id === a);
      if (ai) p += ai.price;
    });
    const scent = SCENTS.find((s) => s.id === custom.scent);
    if (scent) p += scent.price;
    return p;
  })();

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }];
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const addCustomToCart = () => {
    const baseName = BASES.find((b) => b.id === custom.base)?.label || "Custom";
    const colorName = COLORS.find((c) => c.id === custom.color)?.emoji || "🫧";
    const displayName = custom.name.trim() || `${colorName} ${baseName} Slime`;
    setCart((prev) => [
      ...prev,
      { id: Date.now(), name: displayName, price: customPrice, emoji: colorName, qty: 1 },
    ]);
    setCustomAdded(true);
    setTimeout(() => {
      setCustomAdded(false);
      setSection("cart");
    }, 1200);
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const toggleAddin = (id: string) => {
    setCustom((prev) => ({
      ...prev,
      addins: prev.addins.includes(id)
        ? prev.addins.filter((a) => a !== id)
        : [...prev.addins, id],
    }));
  };

  const colorMap: Record<string, { border: string; text: string }> = {
    blue: { border: "border-blue-200", text: "text-blue-600" },
    pink: { border: "border-pink-200", text: "text-pink-600" },
    green: { border: "border-green-200", text: "text-green-600" },
  };

  const steps = ["Base", "Color", "Add-ins", "Scent", "Name"];
  const canNext = [
    custom.base !== "",
    custom.color !== "",
    true,
    custom.scent !== "",
    true,
  ];

  // Live preview color
  const previewColor = COLORS.find((c) => c.id === custom.color)?.hex || "#e2e8f0";
  const previewEmoji = COLORS.find((c) => c.id === custom.color)?.emoji || "🫧";
  const previewBase = BASES.find((b) => b.id === custom.base);

  const resetBuilder = () => {
    setStep(0);
    setCustom({ base: "", color: "", addins: [], scent: "none", name: "" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 opacity-40 slime-blob" />
        <div className="absolute top-1/3 -right-16 w-56 h-56 bg-blue-200 opacity-40 slime-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-green-200 opacity-40 slime-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <nav className="relative z-10 sticky top-0 backdrop-blur-md bg-white/70 border-b border-pink-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl float">🫧</span>
            <span style={{ fontFamily: "'Pacifico', cursive" }} className="text-xl shimmer-text">
              Sophia Jayde
            </span>
          </div>

          <div className="flex items-center gap-1 flex-wrap justify-end">
            {(["shop", "build", "cart", "about"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => { setSection(s); if (s === "build") resetBuilder(); }}
                className={`relative px-3 py-1.5 rounded-full text-sm font-bold transition-all btn-slime ${
                  section === s
                    ? "bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white shadow-md"
                    : "text-gray-500 hover:text-pink-500"
                }`}
              >
                {s === "cart" ? (
                  <span className="flex items-center gap-1">
                    🛒 Cart
                    {totalItems > 0 && (
                      <span className="cart-badge inline-flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white text-xs font-black">
                        {totalItems}
                      </span>
                    )}
                  </span>
                ) : s === "shop" ? "🛍️ Shop"
                  : s === "build" ? "🎨 Build"
                  : "💌 About"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── SHOP ─── */}
      {section === "shop" && (
        <>
          <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-pink-100 text-pink-500 text-sm font-bold wiggle">
              ✨ Handmade with love ✨
            </div>
            <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-5xl sm:text-6xl mb-4 leading-tight">
              <span className="shimmer-text">SQUISHALISH</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto font-semibold mb-6">
              Squishy, stretchy, satisfying slimes made by <span className="text-pink-400">Sophia Jayde</span> 💕
            </p>
            <button
              onClick={() => { setSection("build"); resetBuilder(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-black text-base btn-slime shadow-lg"
            >
              🎨 Build Your Own Slime!
            </button>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((p, i) => {
                const c = colorMap[p.color];
                const isAdded = addedId === p.id;
                return (
                  <div
                    key={p.id}
                    className={`bg-white rounded-3xl overflow-hidden border-2 ${c.border} card-hover shadow-sm`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <span className={`absolute top-3 left-3 ${p.tagColor} text-white text-xs font-black px-3 py-1 rounded-full shadow`}>
                        {p.tag}
                      </span>
                      <span className="absolute top-3 right-3 text-2xl float" style={{ animationDelay: `${i * 0.3}s` }}>
                        {p.emoji}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-black text-gray-800 text-lg leading-tight">{p.name}</h3>
                          <span className={`text-xs font-bold ${c.text}`}>{p.type}</span>
                        </div>
                        <span className="text-xl font-black text-gray-800">${p.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 font-semibold">{p.desc}</p>
                      <button
                        onClick={() => addToCart(p)}
                        className={`w-full py-2.5 rounded-2xl font-black text-white btn-slime shadow-md transition-all ${
                          isAdded
                            ? "bg-green-400"
                            : p.color === "blue"
                            ? "bg-gradient-to-r from-blue-400 to-blue-500"
                            : p.color === "green"
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : "bg-gradient-to-r from-pink-400 to-pink-500"
                        }`}
                      >
                        {isAdded ? "✓ Added!" : "Add to Cart 🛒"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ─── BUILD YOUR OWN ─── */}
      {section === "build" && (
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-2 px-4 py-1 rounded-full bg-purple-100 text-purple-500 text-sm font-bold">
              🎨 Custom Creator
            </div>
            <h2 style={{ fontFamily: "'Pacifico', cursive" }} className="text-4xl shimmer-text">
              Build Your Slime!
            </h2>
            <p className="text-gray-400 font-semibold mt-1">Design your perfect slime from scratch ✨</p>
          </div>

          <div className="flex gap-4 flex-col lg:flex-row">
            {/* Steps sidebar */}
            <div className="lg:w-48 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => i < step || canNext[step] ? setStep(i) : null}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-black transition-all ${
                    i === step
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                      : i < step
                      ? "bg-green-100 text-green-600 border border-green-200"
                      : "bg-white text-gray-300 border border-gray-100"
                  }`}
                >
                  <span className="text-base">
                    {i < step ? "✓" : i === 0 ? "🧈" : i === 1 ? "🎨" : i === 2 ? "✨" : i === 3 ? "🌸" : "💌"}
                  </span>
                  <span className="whitespace-nowrap">{s}</span>
                </button>
              ))}
            </div>

            {/* Main builder panel */}
            <div className="flex-1">
              {/* Live preview jar */}
              <div
                className="relative mb-5 rounded-3xl p-5 flex items-center gap-4 border-2 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${previewColor}55, ${previewColor}22)`,
                  borderColor: previewColor,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl slime-blob flex items-center justify-center text-3xl shadow-md transition-all duration-500"
                  style={{ background: previewColor }}
                >
                  {previewEmoji}
                </div>
                <div>
                  <p className="font-black text-gray-700 text-lg">
                    {custom.name.trim() || (custom.color && custom.base
                      ? `${COLORS.find((c) => c.id === custom.color)?.label} ${previewBase?.label} Slime`
                      : "Your Custom Slime")}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {custom.base && (
                      <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full font-bold text-gray-500">
                        {previewBase?.emoji} {previewBase?.label}
                      </span>
                    )}
                    {custom.addins.map((a) => {
                      const ai = ADDINS.find((x) => x.id === a);
                      return (
                        <span key={a} className="text-xs bg-white/60 px-2 py-0.5 rounded-full font-bold text-gray-500">
                          {ai?.emoji} {ai?.label}
                        </span>
                      );
                    })}
                    {custom.scent && custom.scent !== "none" && (
                      <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full font-bold text-gray-500">
                        {SCENTS.find((s) => s.id === custom.scent)?.emoji} {SCENTS.find((s) => s.id === custom.scent)?.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-black text-gray-800">${customPrice.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 font-bold">total</p>
                </div>
              </div>

              {/* Step 0: Base */}
              {step === 0 && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
                  <h3 className="font-black text-gray-700 mb-4 text-lg">Choose your base 🧈</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BASES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setCustom((p) => ({ ...p, base: b.id }))}
                        className={`p-3 rounded-2xl border-2 text-left transition-all btn-slime ${
                          custom.base === b.id
                            ? "border-pink-400 bg-pink-50 shadow-md scale-105"
                            : `${b.color} hover:scale-105`
                        }`}
                      >
                        <div className="text-2xl mb-1">{b.emoji}</div>
                        <p className="font-black text-gray-800 text-sm">{b.label}</p>
                        <p className="text-xs text-gray-400 font-semibold">{b.desc}</p>
                        {b.price > 0 && (
                          <p className="text-xs text-pink-400 font-black mt-1">+${b.price}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Color */}
              {step === 1 && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
                  <h3 className="font-black text-gray-700 mb-4 text-lg">Pick your color 🎨</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCustom((p) => ({ ...p, color: c.id }))}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center transition-all btn-slime ${
                          custom.color === c.id
                            ? "border-pink-400 shadow-md scale-110"
                            : "border-transparent hover:border-gray-200"
                        }`}
                        style={{ background: c.hex + "66" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full mb-1 slime-blob shadow-sm"
                          style={{ background: c.hex }}
                        />
                        <p className="text-xs font-black text-gray-700">{c.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Add-ins */}
              {step === 2 && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
                  <h3 className="font-black text-gray-700 mb-1 text-lg">Add your extras ✨</h3>
                  <p className="text-xs text-gray-400 font-bold mb-4">Pick as many as you want!</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ADDINS.map((a) => {
                      const selected = custom.addins.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddin(a.id)}
                          className={`p-3 rounded-2xl border-2 flex flex-col items-center transition-all btn-slime ${
                            selected
                              ? "border-purple-400 bg-purple-50 shadow-md scale-105"
                              : "border-gray-100 bg-gray-50 hover:scale-105"
                          }`}
                        >
                          <div className="text-2xl mb-1">{a.emoji}</div>
                          <p className="text-xs font-black text-gray-700 text-center">{a.label}</p>
                          <p className="text-xs text-pink-400 font-black">+${a.price}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Scent */}
              {step === 3 && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
                  <h3 className="font-black text-gray-700 mb-4 text-lg">Choose a scent 🌸</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SCENTS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setCustom((p) => ({ ...p, scent: s.id }))}
                        className={`p-3 rounded-2xl border-2 flex items-center gap-2 transition-all btn-slime ${
                          custom.scent === s.id
                            ? "border-pink-400 bg-pink-50 shadow-md"
                            : "border-gray-100 bg-gray-50 hover:border-pink-200"
                        }`}
                      >
                        <span className="text-xl">{s.emoji}</span>
                        <div className="text-left">
                          <p className="text-sm font-black text-gray-700">{s.label}</p>
                          {s.price > 0 && <p className="text-xs text-pink-400 font-black">+${s.price}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Name + summary */}
              {step === 4 && (
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
                  <h3 className="font-black text-gray-700 mb-1 text-lg">Name your slime 💌</h3>
                  <p className="text-xs text-gray-400 font-bold mb-4">Give your creation a cute name (optional!)</p>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="e.g. Unicorn Dream..."
                    value={custom.name}
                    onChange={(e) => setCustom((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 text-gray-700 font-bold text-base focus:outline-none focus:border-pink-400 bg-pink-50 mb-5"
                  />

                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-bold">Base ({previewBase?.label})</span>
                      <span className="font-black text-gray-700">${(BASE_CUSTOM_PRICE + (previewBase?.price ?? 0)).toFixed(2)}</span>
                    </div>
                    {custom.addins.map((a) => {
                      const ai = ADDINS.find((x) => x.id === a);
                      return (
                        <div key={a} className="flex justify-between text-sm">
                          <span className="text-gray-400 font-bold">{ai?.emoji} {ai?.label}</span>
                          <span className="font-black text-gray-700">+${ai?.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                    {custom.scent !== "none" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">
                          {SCENTS.find((s) => s.id === custom.scent)?.emoji} Scent
                        </span>
                        <span className="font-black text-gray-700">+${SCENTS.find((s) => s.id === custom.scent)?.price.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base pt-2 border-t border-pink-100">
                      <span className="font-black text-gray-700">Total</span>
                      <span className="font-black text-pink-500 text-lg">${customPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={addCustomToCart}
                    disabled={customAdded}
                    className={`w-full py-3 rounded-2xl font-black text-white text-lg btn-slime shadow-lg transition-all ${
                      customAdded
                        ? "bg-green-400 scale-95"
                        : "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
                    }`}
                  >
                    {customAdded ? "✓ Added to Cart!" : "Add to Cart 🛒"}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-2xl font-black text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all flex items-center gap-1"
                >
                  <Icon name="ChevronLeft" size={16} /> Back
                </button>
                {step < steps.length - 1 && (
                  <button
                    onClick={() => canNext[step] && setStep((s) => s + 1)}
                    disabled={!canNext[step]}
                    className={`px-6 py-2 rounded-2xl font-black text-white btn-slime shadow-md transition-all ${
                      canNext[step]
                        ? "bg-gradient-to-r from-pink-400 to-purple-400"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next <Icon name="ChevronRight" size={16} className="inline" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CART ─── */}
      {section === "cart" && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          <h2 style={{ fontFamily: "'Pacifico', cursive" }} className="text-4xl text-center mb-8 shimmer-text">
            Your Cart 🛒
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 float">🫧</div>
              <p className="text-gray-400 font-bold text-lg">Your cart is empty!</p>
              <button
                onClick={() => setSection("shop")}
                className="mt-4 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 to-blue-400 text-white font-black btn-slime shadow-md"
              >
                Shop Now ✨
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-pink-100">
                    <span className="text-3xl float">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-gray-800">{item.name}</p>
                      <p className="text-pink-400 font-bold">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-pink-100 text-pink-500 font-black hover:bg-pink-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="font-black text-gray-800 w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-green-100 text-green-600 font-black hover:bg-green-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors ml-2"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-pink-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 font-bold">Items</span>
                  <span className="font-bold text-gray-700">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-pink-50">
                  <span className="text-gray-400 font-bold">Subtotal</span>
                  <span className="font-black text-gray-800 text-xl">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white font-black text-lg btn-slime shadow-lg">
                  Checkout 💳
                </button>
                <p className="text-center text-xs text-gray-300 mt-2 font-semibold">Free shipping on orders over $25!</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── ABOUT ─── */}
      {section === "about" && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 via-blue-300 to-green-300 text-5xl mb-4 float shadow-xl">
              🫧
            </div>
            <h2 style={{ fontFamily: "'Pacifico', cursive" }} className="text-4xl shimmer-text mb-2">
              Hi, I'm Sophia!
            </h2>
            <p className="text-pink-400 font-bold">Slime maker & lover 💕</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-pink-100 mb-6">
            <p className="text-gray-600 font-semibold leading-relaxed text-center text-lg">
              Welcome to{" "}
              <span style={{ fontFamily: "'Pacifico', cursive" }} className="text-pink-400">
                Sophia Jayde Slimes!
              </span>{" "}
              🌈
            </p>
            <p className="text-gray-500 font-semibold leading-relaxed mt-4 text-center">
              I make every single slime by hand with lots of love and care.
              Each jar is packed with satisfying textures, glittery sparkles,
              and so much fun. Whether you love fluffy, crunchy, butter, or
              glitter slime — I've got something for you! ✨
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { emoji: "💙", label: "Glitter", color: "bg-blue-50 border-blue-200" },
              { emoji: "🩷", label: "Butter", color: "bg-pink-50 border-pink-200" },
              { emoji: "💚", label: "Fluffy", color: "bg-green-50 border-green-200" },
            ].map((item) => (
              <div key={item.label} className={`${item.color} border-2 rounded-2xl p-4 text-center card-hover`}>
                <div className="text-3xl mb-1 float">{item.emoji}</div>
                <p className="font-black text-gray-700 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-100 via-blue-100 to-green-100 rounded-3xl p-6 text-center border-2 border-white shadow-sm mb-8">
            <p className="font-black text-gray-700 mb-1">📦 Ships in 3–5 business days</p>
            <p className="font-black text-gray-700 mb-1">🌟 All slimes made fresh to order</p>
            <p className="font-black text-gray-700">💌 Questions? DM me on Instagram!</p>
          </div>

          <div className="text-center">
            <button
              onClick={() => setSection("shop")}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white font-black text-lg btn-slime shadow-lg"
            >
              Shop the Slimes! ✨
            </button>
          </div>
        </div>
      )}

      <footer className="relative z-10 text-center py-8 text-gray-400 font-bold text-sm">
        <p>
          Made with 💕 by{" "}
          <span style={{ fontFamily: "'Pacifico', cursive" }} className="text-pink-400">
            Sophia Jayde
          </span>
        </p>
      </footer>
    </div>
  );
}