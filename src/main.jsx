import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./context/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
AOS.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist max-w-8xl mx-auto ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
