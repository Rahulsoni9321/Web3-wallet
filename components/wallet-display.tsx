import { Copy, Delete, Trash, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface WalletListProps {
  wallets: { publicKey: string; privateKey: string }[];
  onDeleted: (index: number) => void;
  walletType: "solana" | "ethereum";
}

export function WalletList({  wallets, onDeleted,walletType }: WalletListProps) {
  const copyToClipboard = (text: string, type: "public" | "private") => {
    navigator.clipboard.writeText(text);
    toast.success(`${type === "public" ? "Public" : "Private"} key copied to clipboard`);
  };

 

  if (wallets.length==0 ) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="bg-card border rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold flex gap-2 items-center"> <img src={walletType==="solana" ?"/solana-sol-logo-12828AD23D-seeklogo.com.png":"/ethereum-eth-logo.png"} className="w-6 h-6"></img>Wallet {index + 1}</h3>
            <Trash onClick={() => onDeleted(index) } className="cursor-pointer hover:bg-red-400/60 ease-in-out duration-300 rounded-sm p-1 text-red-500"></Trash>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-serif">Public Key</p>
                <p className="font-inter text-muted-foreground tracking-wide text-sm truncate  max-w-[400px]">
                  {wallet.publicKey}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(wallet.publicKey, "public")}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center  tracking-wide justify-between bg-muted p-3 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-serif ">Private Key</p>
                <p className=" text-muted-foreground text-sm truncate max-w-[400px]">
                  {wallet.privateKey}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(wallet.privateKey, "private")}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}