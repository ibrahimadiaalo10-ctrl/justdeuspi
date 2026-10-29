"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";

export default function Home() {
  const featured = useQuery(api.products.getFeatured);
  const allProducts = useQuery(api.products.getAll);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          JUSTDEUSPI
        </h1>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-purple-300">Accueil</Link>
          <Link href="/?cat=vetements" className="hover:text-purple-300">Vêtements</Link>
          <Link href="/?cat=cosmetiques" className="hover:text-purple-300">Cosmétiques</Link>
          <Link href="/cart" className="hover:text-purple-300">Panier</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
          Luxe. Style. Vous.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-8">
          Découvrez notre sélection exclusive de vêtements et cosmétiques haut de gamme.
        </p>
        <Link
          href="#produits"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          Explorer la collection
        </Link>
      </section>

      {/* Featured */}
      <section id="produits" className="px-6 py-12">
        <h3 className="text-xl font-medium mb-8 tracking-wide text-zinc-300">
          Sélection
        </h3>

        {!featured && !allProducts && (
          <p className="text-zinc-500">Chargement des produits...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(featured && featured.length > 0 ? featured : allProducts || []).map((product: any) => (
            <div
              key={product._id}
              className="group border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition"
            >
              <div className="aspect-[3/4] bg-zinc-900 flex items-center justify-center">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <span className="text-zinc-600 text-sm">Image</span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-purple-400 mb-1">
                  {product.category}
                </p>
                <h4 className="font-medium mb-1">{product.name}</h4>
                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-light">
                    {product.price.toLocaleString("fr-FR")} €
                  </span>
                  <button className="text-xs px-4 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allProducts && allProducts.length === 0 && (
          <p className="text-zinc-500 text-center py-12">
            Aucun produit pour le moment. Ajoutez-en depuis le dashboard Convex.
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-10 text-center text-zinc-500 text-sm">
        © 2026 Justdeuspi — Luxe & Élégance
      </footer>
    </div>
  );
}
