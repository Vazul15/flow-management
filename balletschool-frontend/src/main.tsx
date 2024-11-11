import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter} from "react-router-dom";

import App from "./App.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                    <App />
            </AuthProvider>
        </BrowserRouter>
  </StrictMode>
);
