import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { ReactQueryProvider } from "./context/QueryClientContext";

import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
