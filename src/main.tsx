import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
