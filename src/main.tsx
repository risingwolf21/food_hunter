import { QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ApplicationProvider } from "./contexts/application-context.tsx"
import "./index.css"
import DialogsProvider from "./lib/dialogs.tsx"
import queryClient from "./lib/queryclient.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogsProvider>
      <ApplicationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ApplicationProvider>
    </DialogsProvider>
  </StrictMode >
)
