"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"


export default function ShopPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [price, setPrice] = useState([100000])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  
  // ✅ Apply category filter when coming from Home
  useEffect(() => {
    if (categoryParam) {
      // Reset other filters to show only selected category
      setSelectedBrands([])
      setSelectedGenders([])
  
      if (["Men", "Women", "Kids"].includes(categoryParam)) {
        setSelectedGenders([categoryParam])
      } else {
        setSelectedBrands([categoryParam])
      }
    }
  }, [categoryParam])
  
  // ✅ Fetch products from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 85),
          brand: item.category,
          gender: ["Men", "Women", "Kids"][Math.floor(Math.random() * 3)],
          discount: `${Math.floor(Math.random() * 30) + 10}% Off`,
          inStock: Math.random() > 0.2,
          description: item.description,
          rating: item.rating?.rate || 0,
          ratingCount: item.rating?.count || 0,
        }))
        setProducts(formatted)
      })
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  // ✅ Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPrice = p.price <= price[0]
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      const matchesGender =
        selectedGenders.length === 0 || selectedGenders.includes(p.gender)

      return matchesSearch && matchesPrice && matchesBrand && matchesGender
    })
  }, [products, searchTerm, price, selectedBrands, selectedGenders])

  // ✅ Add to Cart Handler
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
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Mobile Sidebar */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <Sidebar
              price={price}
              setPrice={setPrice}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedGenders={selectedGenders}
              setSelectedGenders={setSelectedGenders}
              brands={[...new Set(products.map((p) => p.brand))]}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 p-4 sticky top-15 h-full">
        <Sidebar
          price={price}
          setPrice={setPrice}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedGenders={selectedGenders}
          setSelectedGenders={setSelectedGenders}
          brands={[...new Set(products.map((p) => p.brand))]}
        />
      </div>

      {/* Product Section */}
      <div className="flex-1 p-4">
        <div className="border w-full h-30 rounded-xl mb-5 flex justify-center items-center">
          <h2 className="text-3xl font-semibold">Products</h2>
        </div>

        {filteredProducts.length === 0 ? (
        <div className="relative h-[50vh]">
           <Spinner className="size-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "/>
        </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl shadow-sm p-3 flex flex-col hover:shadow-md transition"
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
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating)
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
                  className={`text-sm mb-3 ${
                    product.inStock ? "text-green-600" : "text-red-500"
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
        )}
      </div>
    </div>
  )
}

function Sidebar({
  price,
  setPrice,
  searchTerm,
  setSearchTerm,
  selectedBrands,
  setSelectedBrands,
  selectedGenders,
  setSelectedGenders,
  brands,
}: {
  price: number[]
  setPrice: (val: number[]) => void
  searchTerm: string
  setSearchTerm: (val: string) => void
  selectedBrands: string[]
  setSelectedBrands: (val: string[]) => void
  selectedGenders: string[]
  setSelectedGenders: (val: string[]) => void
  brands: string[]
}) {
  const genders = ["Men", "Women", "Kids"]

  const toggleSelection = (
    item: string,
    selectedList: string[],
    setList: (val: string[]) => void
  ) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((b) => b !== item))
    } else {
      setList([...selectedList, item])
    }
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <Label>Search</Label>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range: ₹0 - ₹{price[0]}</Label>
        <Slider
          value={price}
          onValueChange={setPrice}
          max={100000}
          step={50}
          className="mt-2"
        />
      </div>

      {/* Brand Filter */}
      <div>
        <Label>Category</Label>
        <div className="flex flex-col space-y-2 mt-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() =>
                  toggleSelection(brand, selectedBrands, setSelectedBrands)
                }
              />
              <Label htmlFor={brand}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <Label>Gender</Label>
        <div className="flex flex-col space-y-2 mt-2">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={gender}
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() =>
                  toggleSelection(gender, selectedGenders, setSelectedGenders)
                }
              />
              <Label htmlFor={gender}>{gender}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
