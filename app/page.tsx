"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BannerSlider from "@/components/ui/banner-slider"
import Bestseling from "@/components/BestSeling"

// 🖼️ Import your images
import MensIcon from "@/public/mensIcon.png"
import WomensIcon from "@/public/womenIcon.png"
import JewelryIcon from "@/public/jeweleryicon.png"
import ElectronicsIcon from "@/public/electronicsicon.png"
import Category from "@/public/Categoryicon.png"
import ProductCarousel from "@/components/ProductSlider"


export default function Home() {
  const router = useRouter()

  const categories = [
    { name: "men's clothing", icon: MensIcon },
    { name: "women's clothing", icon: WomensIcon },
    { name: "jewelery", icon: JewelryIcon },
    { name: "electronics", icon: ElectronicsIcon },
  ]

  return (
    <div>
      <BannerSlider />
      {/* 🛍️ Category Section */}
      <div className="py-10 px-4 md:px-10 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-14 my-10">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="customghost"
                size="lg"
                onClick={() =>
                  router.push(`/shop?category=${encodeURIComponent(category.name)}`)
                }
              >
                <div className="text-center mx-[auto] my-0">
                  <div className="w-full flex flex-wrap justify-center items-center mb-2">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={72}
                      height={72}
                      className="rounded-full border object-contain bg-gray-100 p-3"
                    />
                  </div>
                  <span className="capitalize w-full font-medium">{category.name}</span>
                </div>
              </Button>
            ))}
            <Button
              onClick={() => router.push("/shop")}
              variant="customghost"
              size="lg"
            >
              <div className="text-center mx-[auto] my-0">
                <div className="w-full flex flex-wrap justify-center items-center mb-2">
                  <Image
                    src={Category}
                    alt="allViwe"
                    width={72}
                    height={72}
                    className="rounded-full border object-contain bg-[#000] p-3"
                  />

                </div>
                <span className="capitalize w-full font-medium">All Categorys</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-stone-100 py-4">
        <div className="md:px-10">
          <ProductCarousel />
        </div>
      </div>
      <div className="py-4 my-10">
        <div className="md:px-10">
          <Bestseling />
        </div>
      </div>
    </div>
  )
}
