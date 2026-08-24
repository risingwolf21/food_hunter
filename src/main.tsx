import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { AuthProvider } from "./contexts/auth-context.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./lib/queryclient.ts"
import DialogsProvider from "./lib/dialogs.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogsProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </DialogsProvider>
  </StrictMode >
)
