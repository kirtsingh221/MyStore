"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Fade from 'embla-carousel-fade'

const banners = [
  {
    id: 1,
    image: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS4069-03_1_d0a3d570-5a2f-4053-8e7f-2b7bfe90ab41.jpg?v=1745086509&quality=80",
    title: "",
    subtitle: "",
  },
  {
    id: 2,
    image: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3968-02_1_c16f5e25-e326-4e43-8bfd-91495fe7c93a.jpg?v=1742891009&quality=80",
    title: "",
    subtitle: "",
  },
  {
    id: 3,
    image: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3968-07_1_7df18ffd-d8d4-444a-b4af-9c92f2efcec2.jpg?v=1741767768&quality=80",
    title: "",
    subtitle: "",
  },
]

export default function BannerSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [ Fade(),Autoplay({ delay: 8000 })]
  )

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative w-full overflow-hidden shadow-md">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-[0_0_100%] relative h-[300px] md:h-[400px]"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={scrollPrev}
        variant="secondary"
        size="icon"
        className="absolute right-1/2 bottom-0 -translate-y-1/2 bg-white/70 backdrop-blur-sm mx-1"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        onClick={scrollNext}
        variant="secondary"
        size="icon"
        className="absolute left-1/2 bottom-0 -translate-y-1/2 bg-white/70 backdrop-blur-sm mx-1"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
