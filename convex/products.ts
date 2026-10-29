import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Récupérer tous les produits
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").order("desc").collect();
  },
});

// Récupérer par catégorie
export const getByCategory = query({
  args: { category: v.union(v.literal("vetements"), v.literal("cosmetiques")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Produits en vedette
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
  },
});

// Ajouter un produit (admin)
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.union(v.literal("vetements"), v.literal("cosmetiques")),
    subcategory: v.optional(v.string()),
    images: v.array(v.string()),
    stock: v.number(),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    isFeatured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
