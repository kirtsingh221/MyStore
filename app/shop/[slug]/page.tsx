// app/shop/[slug]/page.tsx
import { ProductView } from "@/components/ProductView"

// Simulated fetch (replace with real API)
async function getProduct(slug: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${slug}`, {
    cache: "no-store", // ✅ Always get fresh data
  })
  if (!res.ok) throw new Error("Product not found")
  return res.json()
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  return <ProductView product={product} />
}

// ✅ Optional: Add SEO metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  return {
    title: `${product.title} | MyStore`,
    description: product.description,
    rating: product.rating?.rate || 0,
    ratingCount: product.rating?.count || 0,
  }
}
