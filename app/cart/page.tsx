"use client";

import Link from "next/link";

export default function CartPage() {
  // Pour l'instant panier vide (on ajoutera la logique plus tard)
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          JUSTDEUSPI
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-purple-300">Accueil</Link>
          <Link href="/cart" className="text-purple-300">Panier</Link>
        </nav>
      </header>

      <main className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-light mb-10 tracking-wide">Votre Panier</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 mb-6">Votre panier est vide</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border border-zinc-800 rounded-xl p-4">
                <div className="w-24 h-24 bg-zinc-900 rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-zinc-400 text-sm">{item.price} €</p>
                </div>
              </div>
            ))}

            <div className="border-t border-zinc-800 pt-6 flex justify-between items-center">
              <span className="text-lg">Total</span>
              <span className="text-2xl font-light">0 €</span>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:opacity-90 transition">
              Passer la commande
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
