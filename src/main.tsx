import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import { AppProvider } from './contexts/app.context.tsx'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import i18n from './constants/i18n.ts'
import { I18nextProvider } from 'react-i18next'
import { StrictMode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <I18nextProvider i18n={i18n}>
              <AppProvider>
                <App />
              </AppProvider>
            </I18nextProvider>
          </HelmetProvider>
          <Toaster richColors closeButton />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  </ErrorBoundary>
)
