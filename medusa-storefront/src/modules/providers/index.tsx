"use client"

import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { CartProvider, MedusaProvider } from "medusa-react"
import { ThemeProvider } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <MedusaProvider
        baseUrl={MEDUSA_BACKEND_URL}
        queryClientProviderProps={{
          client: queryClient,
        }}
      >
        <CartDropdownProvider>
          <MobileMenuProvider>
            <CartProvider>
              <StoreProvider>
                <AccountProvider>{children}</AccountProvider>
              </StoreProvider>
            </CartProvider>
          </MobileMenuProvider>
        </CartDropdownProvider>
      </MedusaProvider>
    </ThemeProvider>
  )
}
