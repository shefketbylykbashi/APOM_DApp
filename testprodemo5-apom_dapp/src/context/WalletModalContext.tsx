import { createContext, useContext, useState, ReactNode } from "react";
import WalletModal from "@/components/ui/WalletModal";
import { useWallet } from "@/context/WalletContext";

interface WalletModalContextType {
  open: () => void;
  close: () => void;
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined);

export const WalletModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { connect } = useWallet();

  const handleSelectWallet = (address: string) => {
    connect(address);
    setIsOpen(false);
  };

  return (
    <WalletModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <WalletModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectWallet={handleSelectWallet}
      />
    </WalletModalContext.Provider>
  );
};

export const useWalletModal = () => {
  const context = useContext(WalletModalContext);
  if (!context) throw new Error("useWalletModal must be used within WalletModalProvider");
  return context;
};
