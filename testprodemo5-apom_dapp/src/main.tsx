import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from "@/context/WalletContext";
import { WalletModalProvider } from "@/context/WalletModalContext";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <WalletModalProvider>
      <App />
    </WalletModalProvider>
  </WalletProvider>
  );
