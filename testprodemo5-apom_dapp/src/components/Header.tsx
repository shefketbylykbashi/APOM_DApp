import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useWallet } from "@/context/WalletContext";
import { useWalletModal } from "@/context/WalletModalContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { address, disconnect } = useWallet();
  const { open: openWalletModal } = useWalletModal();

  const shortenAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            APOM DApp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { path: "/gaming", label: "Gaming", color: "text-gaming" },
            { path: "/defi", label: "DeFi", color: "text-defi" },
            { path: "/nft-marketplace", label: "NFT Marketplace", color: "text-nft" },
            { path: "/launchpad", label: "Launchpad", color: "text-primary" },
            { path: "/governance", label: "Governance", color: "text-accent" },
          ].map(({ path, label, color }) => (
            <Link
              key={path}
              to={path}
              className={`transition-smooth ${
                location.pathname === path
                  ? color
                  : "text-foreground hover:" + color
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Wallet & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {address ? (
            <Button variant="wallet" size="lg" className="hidden md:flex text-sm" onClick={disconnect}>
              <Wallet className="w-4 h-4 mr-1" />
              {shortenAddress(address)} – Disconnect
            </Button>
          ) : (
            <Button variant="wallet" size="lg" className="hidden md:flex" onClick={openWalletModal}>
              <Wallet className="w-4 h-4 mr-1" />
              Connect Wallet
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {[
              { path: "/gaming", label: "Gaming", color: "text-gaming" },
              { path: "/defi", label: "DeFi", color: "text-defi" },
              { path: "/nft-marketplace", label: "NFT Marketplace", color: "text-nft" },
              { path: "/launchpad", label: "Launchpad", color: "text-primary" },
              { path: "/governance", label: "Governance", color: "text-accent" },
            ].map(({ path, label, color }) => (
              <Link
                key={path}
                to={path}
                className={`block transition-smooth ${
                  location.pathname === path
                    ? color
                    : "text-foreground hover:" + color
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {address ? (
              <Button variant="wallet" size="lg" className="w-full mt-4" onClick={disconnect}>
                <Wallet className="w-4 h-4 mr-1" />
                {shortenAddress(address)} – Disconnect
              </Button>
            ) : (
              <Button variant="wallet" size="lg" className="w-full mt-4" onClick={openWalletModal}>
                <Wallet className="w-4 h-4 mr-1" />
                Connect Wallet
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
