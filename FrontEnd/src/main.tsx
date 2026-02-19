import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { persist, store } from "./app/store.ts";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "./components/ui/spinner.tsx";
import "./i18n.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    }
  >
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.Suspense>,
);
