import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ProductProvider>
                <App />
            </ProductProvider>
        </BrowserRouter>
    </StrictMode>
);
