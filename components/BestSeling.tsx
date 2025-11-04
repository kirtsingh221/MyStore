"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Bestsell from "@/public/Bestsell.jpg"
import BestSellingSlider from "@/components/ui/BestSelling-slider"

export default function BestSelling() {
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]
  const categorizedProducts = categories.map((cat) => ({
    category: cat,
    items: products.filter((p) => p.category === cat).slice(0, 4),
  }))

  return (
    <div className="py-10 px-4 md:px-10 bg-muted/10">
      <h1 className="text-4xl font-bold text-center mb-12">Best Selling Store</h1>

      <div className="flex w-full gap-8 flex-col lg:flex-row">
        {/* 🖼️ Left Side (Banner) */}
        <div className="lg:w-[35%] w-full relative rounded-xl overflow-hidden">
          <Image
            src={Bestsell}
            alt="Best Selling Banner"
            className="rounded-xl object-cover w-full h-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-xl"></div>
          <div className="absolute bottom-10 left-0 right-0 text-center text-white px-6">
            <h1 className="text-3xl font-semibold">BeliBeli Mall</h1>
            <p className="opacity-80 text-sm">
              Shop, explore, and experience the magic of the Mall!
            </p>
          </div>
        </div>

        {/* 🛍️ Right Side (Categories) */}
        <div className="lg:w-[65%] w-full flex flex-col gap-6">
          {categorizedProducts.map((cat) => (
            <div key={cat.category} className="border rounded-lg bg-gray-50 p-5">
              <h1 className="text-lg font-semibold capitalize">{cat.category}</h1>
              <p className="text-sm text-gray-400 mb-4">Best Selling</p>

              {/* Products Row */}
              <div className="flex flex-wrap gap-4">
                {cat.items.length > 0 ? (
                  cat.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/shop/${item.id}`)}
                      className="w-[22%] sm:w-[23%] md:w-[22%] flex flex-col text-left cursor-pointer hover:scale-[1.03] transition-transform duration-200"
                    >
                      <div className="w-full h-[100px] bg-gray-200 rounded-md shadow-sm flex justify-center items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-contain w-[80px] h-[80px]"
                        />
                      </div>
                      <p className="text-sm mt-2 line-clamp-1">{item.title}</p>
                      <p className="text-md font-bold mt-1">₹{Math.round(item.price * 85)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">Loading...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
