import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import WalletList from "@/components/ui/wallet/WalletList";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (address: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelectWallet }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const wallets = [
    "0xF1A2...B34E",
    "0xC7B9...E11A",
    "0x9A3F...C89B",
    "0xD4E8...F112",
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6 overflow-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-2xl gradient-card shadow-card focus:outline-none
                   mx-auto bg-background overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold text-primary-foreground mb-2">
          Connect Wallet
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Choose one of the wallets below to connect:
        </p>

        <WalletList wallets={wallets} onSelect={onSelectWallet} />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-primary-foreground 
                     transition-smooth focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default WalletModal;
