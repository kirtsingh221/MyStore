"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // ✅ Add this
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ProductView({ product }: { product: any }) {

  const router = useRouter() // ✅ Now works fine
  const [qty, setQty] = useState(1)
  const [related, setRelated] = useState<any[]>([]) // ✅ store related products
  const dispatch = useDispatch()
  const { toast } = useToast()

  // ✅ Fetch related products (same category or random)
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products")
        const data = await res.json()

        // Filter by category (if available) and exclude current product
        const relatedItems = data
          .filter((p: any) => p.category === product.category && p.id !== product.id)
          .slice(0, 4) // limit to 4 related products

        setRelated(relatedItems)
      } catch (error) {
        console.error("Failed to fetch related products:", error)
      }
    }

    fetchRelated()
  }, [product])

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: qty,
        // qty: 0
      })
      
    )
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full h-[400px] object-contain shadow-md"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <p><span className="font-medium">Brand:</span> Levi’s</p>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-green-600 font-medium">15% Off</span>
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-1 mt-3 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating?.rate)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-3">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </Button>
              <input
                type="number"
                value={qty}
                readOnly
                className="w-14 text-center border rounded-md py-1 no-spinner"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQty(qty + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-4 mb-8">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Buy Now
            </Button>
          </div>

          <Separator />
        </div>
      </div>

      {/* ✅ Related Products Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        {related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                <p className="text-primary font-semibold mt-1">₹{item.price}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => router.push(`/shop/${item.id}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No related products found.</p>
        )}
      </div>
    </div>
  )
}
