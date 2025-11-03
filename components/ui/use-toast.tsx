"use client"
import { createContext, useContext, useState } from "react"

type Toast = { id: string; title?: string; description?: string; type?: "success"|"error"|"info" }

const ToastContext = createContext(null as any)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (t: Omit<Toast, "id">) => {
    const id = Date.now().toString()
    setToasts((s) => [...s, { id, ...t }])
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3500)
    return id
  }

  const remove = (id: string) => setToasts((s) => s.filter((x) => x.id !== id))

  return (
    <ToastContext.Provider value={{ toast, remove, toasts }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`border p-4 rounded-lg shadow ${t.type==="error"?"bg-red-600 text-white":"bg-white text-black"}`}>
            {t.title && <div className="font-semibold pb-1">{t.title}</div>}
            {t.description && <div className="text-sm">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
