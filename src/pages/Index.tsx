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

type CartItem = { id: number; name: string; price: number; emoji: string; qty: number };
type Section = "shop" | "cart" | "about";

export default function Index() {
  const [section, setSection] = useState<Section>("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }];
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const colorMap: Record<string, { border: string; text: string }> = {
    blue: { border: "border-blue-200", text: "text-blue-600" },
    pink: { border: "border-pink-200", text: "text-pink-600" },
    green: { border: "border-green-200", text: "text-green-600" },
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

          <div className="flex items-center gap-1 sm:gap-2">
            {(["shop", "cart", "about"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
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
                ) : s === "shop" ? "🛍️ Shop" : "💌 About"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      {section === "shop" && (
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-pink-100 text-pink-500 text-sm font-bold wiggle">
            ✨ Handmade with love ✨
          </div>
          <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-5xl sm:text-6xl mb-4 leading-tight">
            <span className="shimmer-text">Slime Shop</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto font-semibold">
            Squishy, stretchy, satisfying slimes made by <span className="text-pink-400">Sophia Jayde</span> 💕
          </p>
        </div>
      )}

      {/* SHOP */}
      {section === "shop" && (
        <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => {
              const c = colorMap[p.color];
              const isAdded = addedId === p.id;
              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-3xl overflow-hidden border-2 ${c.border} card-hover shadow-sm`}
                  style={{ animationDelay: `${i * 0.1}s` }}
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
      )}

      {/* CART */}
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

      {/* ABOUT */}
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

      {/* FOOTER */}
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
