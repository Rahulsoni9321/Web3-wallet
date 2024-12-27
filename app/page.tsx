"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MnemonicDisplay } from "@/components/mnemonic-display";
import { WalletList } from "@/components/wallet-display";
import { WalletStepper } from "@/components/wallet-stepper";
import { Wallet } from "lucide-react";
import { createWallet, generateSecretPhrase } from "@/lib/create-wallet";
import { ModeToggle } from "@/components/toggle";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {useLocalStorage} from "usehooks-ts";

const steps = [
  {
    title: "Generate Phrase",
    description: "Create recovery phrase",
  },
  {
    title: "Backup",
    description: "Save your phrase",
  },
  {
    title: "Create Wallet",
    description: "Generate your wallet",
  },
];

export default function Home() {
  const [mnemonic, setMnemonic] = useLocalStorage("mnemonic", "");
  const [walletType, setWalletType] = useState<"solana" | "ethereum">("solana");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [walletDetails, setWalletDetails] = useState<
    { Solana: { publicKey: string; privateKey: string }[], Ethereum: { publicKey: string; privateKey: string }[] }
  >({
    Solana: [],
    Ethereum: [],
  });
  const [checked, setChecked] = useState<boolean>(false);


   useEffect(()=>{
     if (mnemonic.trim().length>0) setCurrentStep(2);
   },[])
  const generateMnemonic = () => {
    const mnemonic = generateSecretPhrase();
    setMnemonic(mnemonic);
    setCurrentStep(2);
  };

  const deleteWallet = (index: number) => {
 
      if (walletType=="solana") 
      setWalletDetails({...walletDetails, Solana: walletDetails.Solana.filter((_: { publicKey: string; privateKey: string }, i: number) => i !== index)})
      else
      setWalletDetails({...walletDetails, Ethereum: walletDetails.Ethereum.filter((_: { publicKey: string; privateKey: string }, i: number) => i !== index)})
  }

  const handleCreateWallet = () => {
    const { publicKey, privateKey } = createWallet(walletType);
    if (walletType === "solana") {
      setWalletDetails({ ...walletDetails, Solana: [...walletDetails.Solana, { publicKey, privateKey }] });
      console.log(localStorage.setItem("solanaWallet", JSON.stringify(walletDetails.Solana)));
    }
    else {
      setWalletDetails({ ...walletDetails, Ethereum: [...walletDetails.Ethereum, { publicKey, privateKey }] });
    }
    setCurrentStep(3);
  };
  return (
    <div className="min-h-screen max-w-7xl mx-auto text-foreground">

      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Wallet Creator</h1>
          </div>
          <p className="text-muted-foreground text-center max-w-md">
            Create and manage your wallets securely. Generate recovery
            phrases and backup your keys safely.
          </p>
        </div>

        <div className=" mx-auto mb-12">
          <WalletStepper currentStep={currentStep} steps={steps} />
        </div>

        <div className="flex flex-col items-center gap-8">

          {currentStep === 1 && (
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={generateMnemonic}
                className="animate-pulse"
              >
                Generate Secret Recovery Phrase
              </Button>
              <div className="flex flex-col items-center gap-6">
                <p className="text-white text-center">
                  Or
                </p>
                <p className="text-muted-foreground text-center">import an existing secret recovery phrase</p>
                <Input
                  type="text"
                  placeholder="Enter your secret recovery phrase"
                  className="input input-bordered w-full "
                  onChange={(e) => setMnemonic(e.target.value)}
                />
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  disabled={!mnemonic}
                >
                  Import Secret Recovery Phrase
                </Button>
              </div>
            </div>
          )}


          {mnemonic && currentStep === 2 && (
            <MnemonicDisplay
              mnemonic={mnemonic}
              checked={checked}
              onCheckChange={setChecked}
              onContinue={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <>
              <Tabs defaultValue="solana" className="w-full max-w-7xl mx-auto flex flex-col items-center gap-2">
                <TabsList className=" w-full mx-auto max-w-3xl  bg-background border-b border-muted-foreground/60 py-6 ">
                  <TabsTrigger value="solana" className="text-xl flex gap-2 items-center" onClick={() => setWalletType("solana")}>
                  <img src="/solana-sol-logo-12828AD23D-seeklogo.com.png" className="w-6 h-6"></img>  Solana
                  </TabsTrigger>
                  <TabsTrigger value="ethereum" className="text-xl gap-2" onClick={() => setWalletType("ethereum")}>
                  <img src="/ethereum-eth-logo.png" className="w-6 h-6"></img> 
                    Ethereum
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="solana" className="w-full flex flex-col items-center">
                <Button
                size="lg"
                onClick={handleCreateWallet}
                className="my-12"
              >
                {walletDetails.Solana.length === 0 ? "Create Wallet" : "Add Wallet"}
              </Button>
              <WalletList walletType={walletType}  wallets={walletDetails.Solana} onDeleted={deleteWallet} />
              </TabsContent>
              <TabsContent value="ethereum" className="w-full flex flex-col items-center">
              <Button
                size="lg"
                onClick={handleCreateWallet}
                className="my-12"
                >
                {walletDetails.Ethereum.length === 0 ? "Create Wallet" : "Add Wallet"}
                </Button>
                <WalletList walletType={walletType} onDeleted={deleteWallet} wallets={walletDetails.Ethereum} />
              </TabsContent>
              </Tabs>
              
            </>
          )}
        </div>
      </div>

    </div>
  );
}
