"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { Spinner } from "@/components/ui/spinner"

export default function ProductCarousel() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products")
                const data = await res.json()
                const formatted = data.map((item: any) => ({
                    id: item.id,
                    name: item.title,
                    image: item.image,
                    price: Math.round(item.price * 85), // convert USD → INR
                    description: item.description,
                    brand: item.category,
                    rating: item.rating?.rate || 0,
                    ratingCount: item.rating?.count || 0,
                    discount: `${Math.floor(Math.random() * 30) + 10}% Off`,
                    inStock: Math.random() > 0.2,
                }))
                setProducts(formatted)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])


    useEffect(() => {
        if (emblaApi) emblaApi.reInit()
    }, [emblaApi, products])

    if (loading) {
        return <div className="relative h-[300px]">
            <Spinner className="size-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
        </div>
    }

    const handleAddToCart = (product: any) => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.name,
                image: product.image,
                price: product.price,
                quantity: 1,

            })
        )

        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        })
    }

    return (
        <div className="relative w-full py-12">
            {/* 🔹 Navigation Buttons */}
            <div className="flex justify-between justify-items-center pb-8">
                <h2 className="text-4xl font-bold text-center mb-4">Todays For You!</h2>
                <div>
                    <Button
                        onClick={scrollPrev}
                        variant="outline"
                        size="lg"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button
                        onClick={scrollNext}
                        variant="outline"
                        size="lg"
                        className="ml-2"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </Button>
                </div>
            </div>
            {/* 🔹 Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-5">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#fff] flex-[0_0_98%] sm:flex-[0_0_98%] md:flex-[0_0_30%] lg:flex-[0_0_24%] border rounded-xl p-3 hover:shadow-md transition"
                        >

                            {/* Image */}
                            <div className="w-full text-center flex justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded-md mb-3 object-contain w-40 h-40"
                                />
                            </div>

                            {/* Brand + Name */}
                            <h5 className="text-muted-foreground text-sm">{product.brand}</h5>
                            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>

                            {/* ⭐ Rating */}
                            <div className="flex items-center gap-1 mt-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.round(product.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">
                                    ({product.ratingCount})
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Price + Discount */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-primary">₹{product.price}</span>
                                <span className="text-sm text-green-600 font-medium">
                                    {product.discount}
                                </span>
                            </div>

                            {/* Stock */}
                            <p
                                className={`text-sm mb-3 ${product.inStock ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-between w-full">
                                <Button
                                    disabled={!product.inStock}
                                    className="w-[49%]"
                                    onClick={() => router.push(`/shop/${product.id}`)}
                                >
                                    View
                                </Button>
                                <Button
                                    disabled={!product.inStock}
                                    className="w-[49%]"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

