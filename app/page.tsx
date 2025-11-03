"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shirt, Watch, Gem, Gift } from "lucide-react"
import BannerSlider from "@/components/ui/banner-slider"

export default function Home() {
  const router = useRouter()

  // ✅ Match actual Fake Store API categories
  const categories = [
    { name: "men's clothing", icon: Shirt },
    { name: "women's clothing", icon: Gem },
    { name: "jewelery", icon: Watch },
    { name: "electronics", icon: Gift },
  ]

  return (
    <div>
      <BannerSlider />

      {/* 🛍️ Category Section */}
      <div className="py-10 px-4 md:px-10 bg-muted/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Shop by Category</h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 rounded-xl shadow-sm hover:shadow-md transition-all"
                  onClick={() => router.push(`/shop?category=${encodeURIComponent(category.name)}`)}
                >
                  <Icon className="h-5 w-5" />
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Button>
              )
            })}
          </div>

          {/* 🔗 View All */}
          <Button
            onClick={() => router.push("/shop")}
            className="bg-primary text-white hover:bg-primary/90"
            size="lg"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </div>
  )
}
