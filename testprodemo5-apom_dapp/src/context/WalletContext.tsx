import { createContext, useContext, useState } from "react";

type WalletContextType = {
  address: string | null;
  connect: (address: string) => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = (addr: string) => setAddress(addr);
  const disconnect = () => setAddress(null);

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};
