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
    image: "https://static.aceomni.cmsaceturtle.com/prod/banner-images/web/Lee%20FW25%20Website%20Banner.jpg",
    title: "",
    subtitle: "",
  },
  {
    id: 2,
    image: "https://static.aceomni.cmsaceturtle.com/prod/banner-images/web/Lee%20FW25%20The%20Best%20Stories%20Happen%20in%20Jeans%20KV%20Web%20Banner.jpg",
    title: "",
    subtitle: "",
  },
  {
    id: 3,
    image: "https://static.aceomni.cmsaceturtle.com/prod/banner-images/web/Lee%20Jeans%20Back%20Shot%20Web%20Banner.jpg",
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
