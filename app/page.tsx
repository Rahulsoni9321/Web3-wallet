"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {  createSolanaWallet, generateSecretPhrase } from "@/lib/create-wallet";
import { Check } from "lucide-react";
import { useState } from "react";


export default function Home() {
   const [mnemonic, setMnemonic] = useState<string | null>(null);
   const [currentStep,setCurrentStep] = useState<number>(1);
   const [walletDetails,setWalletDetails] = useState<{publicKey:string,privateKey:string}[]>([]);
   const [checked, setChecked] = useState<boolean>(false);
    const generateMnemonic = () => {
      const mnemonic = generateSecretPhrase();
      setMnemonic(mnemonic);
    };

    const createWallet = () => {
      const {publicKey,secret} = createSolanaWallet();
      setWalletDetails([...walletDetails,{publicKey,privateKey:secret}]);
    }
  return (
    <div className="min-h-screen text-white bg-black flex flex-col items-center justify-center">
        {currentStep==1 && <> <Button variant={"default"} onClick={generateMnemonic}>Generate Secret Key phrase</Button>
        {
            mnemonic && <div className="max-w-4xl mx-auto border border-sidebar-foreground shadow rounded-xl p-8 mt-4">
          <h1 className="text-2xl font-semibold text-center">Secret Key Phrase</h1>
          <p className="text-sm mt-2 text-muted-foreground">This is the secret key phrase that you can use to recover your wallet. Keep it safe and secure.</p>
         <div className="grid grid-cols-3 gap-2 mt-4">
         { mnemonic.split(" ").map((word, index) => (
              <span key={index} className="bg-neutral-900/40 text-center  text-sidebar-text backdrop-blur-sm text-white  text-sm px-2 py-3 border border-sidebar-foreground  rounded-lg m-1">{word}</span>
            ))}

        </div>
          <div className="mt-4 m-1 flex items-center">
            <Checkbox checked={checked} onClick={()=>setChecked(!checked)}  className="border-sidebar-border"></Checkbox>
            <span className="ml-2 text-primary-foreground font-light text-sm">I have written down the secret key phrase</span>
            </div>
            <Button variant={"outline"} onClick={()=>setCurrentStep(currentStep+1)} className="mt-4 text-black w-full" disabled={!checked}>Continue</Button>
        </div>
          }
          </>}
          {currentStep==2 && <>
          <Button variant={"default"} onClick={createWallet}>Create Wallet</Button>
          <div className="grid grid-cols-1 gap-8 p-6 mt-4">
          {walletDetails.map((wallet,index)=>(
              <div key={index} className="bg-neutral-900/40 p-6 max-w-3xl rounded-lg flex items-center justify-between">
              <div>
              <h1 className="text-lg font-semibold">Wallet {index+1}</h1>
              <p className="text-sm text-muted-foreground">Public Key: {wallet.publicKey}</p>
              <p className="text-sm text-muted-foreground ">Private Key: {wallet.privateKey}</p>
              </div>
              
              </div>
          ))}
          </div>
       </>   }
    </div>
  );
}
