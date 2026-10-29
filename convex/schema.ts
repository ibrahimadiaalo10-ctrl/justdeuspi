import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["isFeatured"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    role: v.union(v.literal("customer"), v.literal("admin")),
  }).index("by_email", ["email"]),

  carts: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        size: v.optional(v.string()),
        color: v.optional(v.string()),
      })
    ),
  }).index("by_user", ["userId"]),

  orders: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        size: v.optional(v.string()),
        color: v.optional(v.string()),
      })
    ),
    total: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
