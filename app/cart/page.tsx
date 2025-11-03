"use client"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { Trash2 } from "lucide-react"


export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  // ✅ Calculate totals
  const { subtotal, gst, delivery, total } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const gst = subtotal * 0.18 // 18% GST
    const delivery = subtotal > 1000 ? 0 : 49 // Free delivery above ₹1000
    const total = subtotal + gst + delivery
    return { subtotal, gst, delivery, total }
  }, [items])

  if (items.length === 0)
    return <p className="text-center py-10 text-lg">Your cart is empty 🛒</p>

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
      {/* 🛍️ Left side: Cart items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="border w-full h-30 rounded-xl mb-5 flex justify-center items-center">
          <h2 className="text-3xl font-semibold">Your Cart</h2>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap md:flex-nowrap items-center justify-between border p-3 rounded-lg shadow-sm relative"
          >
            <div className="flex items-center gap-5 p-1">
              <img
                src={item.image}
                alt={item.title}
                className="w-25 h-25 object-contain rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="font-medium text-primary py-1">
                  ₹{item.price * item.quantity}
                </p>

                {/* 🔢 Quantity Controls */}

              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </Button>
                <span className="px-3 w-14 text-center border rounded-md py-1 no-spinner">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </Button>

              </div>
              <Button
                className=" mt-2 w-full"
                variant="destructive"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* 💳 Right side: Order summary */}
      <div className="border rounded-xl p-5 shadow-md h-fit sticky top-20">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <Button size="lg" className="w-full mt-6">
          Place Order
        </Button>
      </div>
    </div>
  )

}

