import React from "react";

interface WalletListProps {
  wallets: string[];
  onSelect: (address: string) => void;
}

const WalletList: React.FC<WalletListProps> = ({ wallets, onSelect }) => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {wallets.map((wallet, index) => (
        <button
          key={index}
          onClick={() => onSelect(wallet)}
          className="w-full px-4 py-3 rounded-xl gradient-card shadow-card text-foreground font-medium
                     hover:shadow-primary hover:scale-[1.02] focus:outline-none focus:ring-2 
                     focus:ring-primary transition-smooth text-sm tracking-wide text-left"
        >
          {wallet}
        </button>
      ))}
    </div>
  );
};

export default WalletList;
